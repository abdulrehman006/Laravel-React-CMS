<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\CustomizeRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomizeController extends Controller
{
    /**
     * Get customization
     */
    public function customize(CustomizeRepository $repository, SettingRepository $settingRepository): Response
    {
        $data['customize_settings'] = $repository->getCustomize($settingRepository);
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();
        $data['sitemap_url'] = asset('sitemap.xml');

        return Inertia::render('Customize/Customize', $data);
    }

    /**
     * Update customization
     */
    public function update(Request $request, CustomizeRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->update($request, $settingRepository);

        return back()->with('success', 'Successfully updated');
    }
}
