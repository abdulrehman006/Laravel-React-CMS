<?php

namespace App\Repositories\Frontend;

use App\Models\Setting;

class PageRepository
{
    /**
     * Get home page data
     */
    public function getHomePageData(): mixed
    {
        $activeTheme = $this->getActiveTheme();
        $homeData = '';
        switch ($activeTheme) {
            case 'default':
                $homeData = Setting::pull('default_theme_data');
                break;
            case 'photography_agency':
                $homeData = Setting::pull('photography_agency_theme_data');
                break;
            case 'creative_portfolio':
                $homeData = Setting::pull('creative_portfolio_theme_data');
                break;
            case 'digital_agency':
                $homeData = Setting::pull('digital_agency_theme_data');
                break;
            case 'marketing_agency':
                $homeData = Setting::pull('marketing_agency_theme_data');
                break;
            case 'showcase_portfolio':
                $homeData = Setting::pull('showcase_portfolio_theme_data');
                break;
            case 'case_study_showcase':
                $homeData = Setting::pull('case_study_showcase_theme_data');
                break;
            case 'freelancing_agency':
                $homeData = Setting::pull('freelancing_agency_theme_data');
                break;
            case 'architecture_agency':
                $homeData = Setting::pull('architecture_agency_theme_data');
                break;
            case 'creative_solution':
                $homeData = Setting::pull('creative_solution_theme_data');
                break;
            case 'personal_portfolio':
                $homeData = Setting::pull('personal_portfolio_theme_data');
                break;
            default:
                $homeData = '';
        }

        return json_decode($homeData);
    }

    public function getActiveTheme()
    {
        return Setting::pull('active_theme');
    }
}
