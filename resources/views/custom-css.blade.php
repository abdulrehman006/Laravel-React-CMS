@php
$custom_css = \App\Models\Setting::pull('custom_css');
$site_color = \App\Models\Setting::pull('site_color');
$primary_font = \App\Models\Setting::pull('primary_font');
$secondary_font = \App\Models\Setting::pull('secondary_font');
@endphp

:root {
    --accent: {{$site_color}} !important;
    --primary-font: {{$primary_font}}, sans-serif;
    --secondary-font: {{$secondary_font}}, sans-serif;
}

{{$custom_css}}
