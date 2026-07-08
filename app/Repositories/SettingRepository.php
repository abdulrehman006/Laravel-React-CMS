<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingRepository
{
    use ModelRepositoryTraits;

    protected $model;

    public function __construct(Setting $setting)
    {
        $this->model = $setting;
    }

    /**
     * Get setting by group
     */
    private function getSettingByGroup($groupName): array
    {

        $settings = $this->model->where('setting_group', $groupName)->get();
        $data = [];
        foreach ($settings as $setting) {
            $data[$setting->setting_key] = $setting->setting_value;
        }

        return $data;
    }

    /**
     * Get payment configure settings
     *
     * @return array
     */
    public function getPaymentGatewayConfiguration(): array
    {
        return $this->getSettingByGroup('payment_gateways');
    }

    /**
     * Get site settings
     */
    public function getSiteSettings(): array
    {
        return [
            'general' => $this->getSettingByGroup('general_settings'),
            'sidebar' => $this->getSettingByGroup('sidebar_settings'),
            'footer' => $this->getSettingByGroup('footer_settings'),
            'contact' => $this->getSettingByGroup('contact_settings'),
            'subscriber' => $this->getSettingByGroup('subscribe_settings'),
            'social_links' => $this->getSettingByGroup('social_settings'),
            'custom_css' => $this->getSettingByGroup('custom_css'),
            'html_embed_code' => $this->getSettingByGroup('embed_html'),
        ];
    }

    /**
     * Get Smtp Configuration
     */
    public function getSmtpConfiguration()
    {
        return [
            'MAIL_HOST' => env('MAIL_HOST'),
            'MAIL_PORT' => env('MAIL_PORT'),
            'MAIL_USERNAME' => env('MAIL_USERNAME'),
            'MAIL_PASSWORD' => env('MAIL_PASSWORD'),
            'MAIL_ENCRYPTION' => env('MAIL_ENCRYPTION'),
            'MAIL_FROM_ADDRESS' => env('MAIL_FROM_ADDRESS'),
        ];
    }

    /**
     * Get Google Maps Configuration
     */
    public function getGoogleMapsConfiguration(): array
    {
        return $this->getSettingByGroup('google_maps_settings');
    }

    /**
     * Get Google Maps API Key
     */
    public function getGoogleMapsApiKey(): ?string
    {
        $setting = $this->model->where('setting_group', 'google_maps_settings')
            ->where('setting_key', 'google_maps_api_key')
            ->first();

        return $setting ? $setting->setting_value : null;
    }

    /**
     * Update setting by group
     */
    public function updateSettingByGroup($settingGroup, array $values = []): void
    {
        $settingKeys = array_keys($values);
        foreach ($settingKeys as $settingKey) {
            $this->model->updateOrCreate(
                ['setting_key' => $settingKey, 'setting_group' => $settingGroup],
                ['setting_value' => $values[$settingKey]]
            );
            Cache::forget('settings:'.$settingKey);
        }
    }

    public function updateEnvByKey($data = []) {

        $path = base_path('.env');
        if (file_exists($path)) {
            foreach ($data as $key => $value) {
                $this->writeEnvironmentFile($key, $value);
            }
        }
    }


    private function writeEnvironmentFile($key, $value)
    {
        // Only allow known MAIL_ keys to prevent arbitrary env manipulation
        $allowedKeys = ['MAIL_HOST', 'MAIL_PORT', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'MAIL_ENCRYPTION', 'MAIL_FROM_ADDRESS'];
        if (!in_array($key, $allowedKeys)) {
            return;
        }

        // Reject values containing newlines, null bytes, or control characters
        if (preg_match('/[\r\n\x00]/', $value)) {
            return;
        }

        $path = base_path('.env');
        if (file_exists($path)) {
            $contents = file_get_contents($path);

            // Always quote values. Escape backslashes, double quotes, and '$' — phpdotenv
            // interpolates $VAR / ${VAR} inside double-quoted values, which would corrupt
            // passwords/keys that contain a literal '$'.
            $escapedValue = str_replace(['\\', '"', '$'], ['\\\\', '\\"', '\\$'], (string) $value);
            $newLine = $key . '=' . '"' . $escapedValue . '"';

            // Replace/append line-by-line. Note: preg_replace() is deliberately NOT used
            // for the substitution — the replacement string can contain '$' and '\', which
            // preg_replace would re-interpret as backreferences and strip our escaping.
            $lines = preg_split('/\r\n|\r|\n/', $contents);
            $found = false;
            foreach ($lines as $i => $line) {
                if (strpos($line, $key . '=') === 0) {
                    $lines[$i] = $newLine;
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                // Key not present yet: append it so the setting is not silently dropped.
                $lines[] = $newLine;
            }

            file_put_contents($path, implode(PHP_EOL, $lines));
        }
    }


    /**
     * Store theme data
     */
    public function storeThemeData($themeData): void
    {
        $activeTheme = Setting::pull('active_theme');
        $selectedTheme = '';
        switch ($activeTheme) {
            case 'default':
                $selectedTheme = 'default_theme_data';
                break;
            case 'photography_agency':
                $selectedTheme = 'photography_agency_theme_data';
                break;
            case 'creative_portfolio':
                $selectedTheme = 'creative_portfolio_theme_data';
                break;
            case 'digital_agency':
                $selectedTheme = 'digital_agency_theme_data';
                break;
            case 'marketing_agency':
                $selectedTheme = 'marketing_agency_theme_data';
                break;
            case 'showcase_portfolio':
                $selectedTheme = 'showcase_portfolio_theme_data';
                break;
            case 'case_study_showcase':
                $selectedTheme = 'case_study_showcase_theme_data';
                break;
            case 'freelancing_agency':
                $selectedTheme = 'freelancing_agency_theme_data';
                break;
            case 'architecture_agency':
                $selectedTheme = 'architecture_agency_theme_data';
                break;
            case 'creative_solution':
                $selectedTheme = 'creative_solution_theme_data';
                break;
            case 'personal_portfolio':
                $selectedTheme = 'personal_portfolio_theme_data';
                break;
            default:
                $homeData = '';
        }
        $this->updateSettingByGroup('theme_settings', [$selectedTheme => $themeData]);
    }

    /**
     * Update payment gateway configure
     *
     * @param array $data
     * @return void
     */
    public function updatePaymentGatewayConfigure(array $data): void
    {
        $this->updateSettingByGroup('payment_gateways', $data);
    }
}
