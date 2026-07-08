<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // License activation check (previously obfuscated as eval(base64_decode(...))).
        $file = storage_path('laravel.txt');
        if (file_exists($file)) {
            config()->set('app.active', base64_decode(file_get_contents($file)) == 'active');
        }
    }
}
