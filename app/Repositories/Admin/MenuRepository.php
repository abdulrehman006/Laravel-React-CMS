<?php

namespace App\Repositories\Admin;

use App\Models\Setting;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;

class MenuRepository
{
    /**
     * Store menu
     */
    public function store(Request $request, SettingRepository $settingRepository): void
    {
        foreach ($request->display_location as $location) {
            $settingRepository->updateSettingByGroup('menu_settings', [$location => json_encode($request->menus)]);
        }
    }

    /**
     * Get menus
     */
    public function getMenus($edit_action): array
    {
        $menus = Setting::pull($edit_action);

        return $menus ? json_decode($menus) : [];
    }
}
