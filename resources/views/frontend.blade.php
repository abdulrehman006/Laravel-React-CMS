<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    @php
        $settings = app(\App\Repositories\SettingRepository::class);
        $themeData = app(\App\Repositories\Frontend\PageRepository::class);
        $layoutsData = $themeData->getHomePageData();
        $customize_settings = $settings->getSiteSettings();
        $fav_icon = \App\Models\Setting::pull('site_favicon');
        $is_rtl = \App\Models\Setting::pull('enable_rtl') == "1";
        $primary_font = \App\Models\Setting::pull('primary_font');
        $secondary_font = \App\Models\Setting::pull('secondary_font');
        $meta_title = \App\Models\Setting::pull('meta_title');
        $meta_description = \App\Models\Setting::pull('meta_description');
        $meta_image = asset(\App\Models\Setting::pull('meta_image'));
        $meta_tags = \App\Models\Setting::pull('meta_tags');
    @endphp

    <meta name="robots" content="index, follow">
    <meta name="keywords" content="{{$meta_tags}}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family={{$primary_font}}:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family={{$secondary_font}}:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ mix('css/frontend/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ mix('css/frontend/globals.css') }}">
    <script src="{{ mix('js/frontend/app.js') }}" defer></script>
    <link rel="stylesheet" href="{{ route('custom.css') }}" />

    <link rel="icon" type="image/x-icon" href="{{$fav_icon}}">

    <script>
        window.menus = {
            main_menu: {!! \App\Models\Setting::pull("main_menu") !!},
            services_menu: {!! \App\Models\Setting::pull("services_menu") !!},
            footer_menu: {!! \App\Models\Setting::pull("footer_menu") !!},
        };
        window.tagline = "{{ \App\Models\Setting::pull('tagline') }}";
        window.layoutsData = {!! json_encode($layoutsData, JSON_PRETTY_PRINT) !!};
        window.blogs = {!! json_encode(\App\Models\Post::where('status', '1')->latest()->limit(10)->get(), JSON_PRETTY_PRINT) !!};
        window.teams = {!! json_encode(\App\Models\Team::latest()->get(), JSON_PRETTY_PRINT) !!}
        window.testimonials = {!! json_encode(\App\Models\Testimonial::latest()->get(), JSON_PRETTY_PRINT) !!}
        window.customize_settings = {!! json_encode($customize_settings, JSON_PRETTY_PRINT) !!}

        window.seo = {
            meta_title: "{{ $meta_title }}",
            meta_description: "{{ $meta_description }}",
            meta_image: "{{ $meta_image }}",
            meta_tags: "{{ $meta_tags }}",
            og_url: "{{ url('/') }}",
    }
    </script>

    @routes
</head>
<body class="font-sans antialiased {{$is_rtl ? "rtl" : ""}}">
@inertia

{!! \App\Models\Setting::pull('html_embed_code') !!}
</body>
</html>
