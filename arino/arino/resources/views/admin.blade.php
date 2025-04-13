<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @php
        $settings = app(\App\Repositories\SettingRepository::class);
        $themeData = new \App\Repositories\Frontend\PageRepository();
        $layoutsData = $themeData->getHomePageData();
        $customize_settings = $settings->getSiteSettings();
        $fav_icon = \App\Models\Setting::pull('site_favicon');
    @endphp
    <!-- Scripts -->
    @routes
    <link rel="stylesheet" href="{{ mix('css/admin/all.css') }}">
    <script src="{{ mix('js/admin/app.js') }}" defer></script>

    <link rel="icon" type="image/x-icon" href="{{$fav_icon}}">

    <script>
        window.menus = {
            main_menu: {!! \App\Models\Setting::pull("main_menu") !!},
            services_menu: {!! \App\Models\Setting::pull("services_menu") !!},
            footer_menu: {!! \App\Models\Setting::pull("footer_menu") !!},
        };
        window.layoutsData = {!! json_encode($layoutsData, JSON_PRETTY_PRINT) !!};
        window.blogs = {!! json_encode(\App\Models\Post::latest()->limit(10)->get(), JSON_PRETTY_PRINT) !!};
        window.teams = {!! json_encode(\App\Models\Team::latest()->get(), JSON_PRETTY_PRINT) !!}
        window.testimonials = {!! json_encode(\App\Models\Testimonial::latest()->get(), JSON_PRETTY_PRINT) !!}
        window.customize_settings = {!! json_encode($customize_settings, JSON_PRETTY_PRINT) !!}
    </script>
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>
