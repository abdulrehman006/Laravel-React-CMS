<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\SmtpSettingUpdateRequest;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function paymentGateway(SettingRepository $repository)
    {
        $data['gateway_credentials'] = $repository->getPaymentGatewayConfiguration();
        return Inertia::render('Settings/PaymentGateway', $data);
    }

    public function paymentGatewayUpdate(Request $request, SettingRepository $repository)
    {
        $repository->updatePaymentGatewayConfigure($request->all());
        return back()->with('success', 'Payment settings has been update');
    }

    public function smtpSetting(SettingRepository $repository)
    {
        $data['smtp_config'] = $repository->getSmtpConfiguration();
        return Inertia::render('Settings/SmtpSettings', $data);
    }

    public function smtpUpdate(SmtpSettingUpdateRequest $request, SettingRepository $repository)
    {
        $repository->updateEnvByKey($request->all());
        return back()->with('success', 'Mail setting has been updated');
    }

    public function googleMapsSetting(SettingRepository $repository)
    {
        $data['google_maps_config'] = $repository->getGoogleMapsConfiguration();
        return Inertia::render('Settings/GoogleMapsSettings', $data);
    }

    public function googleMapsUpdate(Request $request, SettingRepository $repository)
    {
        $request->validate([
            'google_maps_api_key' => 'nullable|string|max:255',
        ]);

        $repository->updateSettingByGroup('google_maps_settings', $request->only('google_maps_api_key'));
        return back()->with('success', 'Google Maps settings have been updated');
    }
}
