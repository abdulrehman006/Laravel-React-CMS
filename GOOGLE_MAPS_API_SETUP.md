# Google Maps API Setup & Management Guide

## How Google Maps API is Managed in Your Project

### 1. Database Storage
The Google Maps API key is stored in the `settings` table with:
- **setting_group**: `google_maps_settings`
- **setting_key**: `google_maps_api_key`
- **setting_value**: Your actual API key

### 2. Backend Management

#### SettingRepository (`app/Repositories/SettingRepository.php`)
```php
public function getGoogleMapsApiKey(): ?string
{
    $setting = $this->model->where('setting_group', 'google_maps_settings')
        ->where('setting_key', 'google_maps_api_key')
        ->first();

    return $setting ? $setting->setting_value : null;
}
```

#### HandleInertiaRequests Middleware (`app/Http/Middleware/HandleInertiaRequests.php`)
The API key is globally shared with all Inertia pages:
```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'google_maps_api_key' => $settingRepository->getGoogleMapsApiKey(),
        // ... other shared data
    ]);
}
```

This means **every React component** has access to `google_maps_api_key` via:
```javascript
const { google_maps_api_key } = usePage().props;
```

#### SettingController (`app/Http/Controllers/Admin/SettingController.php`)
Admin can update the API key:
```php
public function googleMapsUpdate(Request $request, SettingRepository $repository)
{
    $request->validate([
        'google_maps_api_key' => 'nullable|string|max:255',
    ]);

    $repository->updateSettingByGroup('google_maps_settings', $request->only('google_maps_api_key'));
    return back()->with('success', 'Google Maps settings have been updated');
}
```

### 3. Frontend Usage

#### Current Implementation (Contact2.jsx)
```javascript
import { usePage } from "@inertiajs/react";

export default function Contact2({ contact_data }) {
    const { google_maps_api_key } = usePage().props;
    
    // Use it in GoogleMapWithMarkers component
    <GoogleMapWithMarkers
        markers={markers}
        googleMapsApiKey={google_maps_api_key}
    />
}
```

#### GoogleMapWithMarkers Component
```javascript
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function GoogleMapWithMarkers({ googleMapsApiKey }) {
    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey || ""}>
            <GoogleMap>
                {/* Markers */}
            </GoogleMap>
        </LoadScript>
    );
}
```

## How to Set Up Google Maps API Key

### Option 1: Through Admin Panel (Recommended)
1. Login to admin panel
2. Go to Settings → Google Maps Settings
3. Enter your Google Maps API Key
4. Click "Save"

### Option 2: Direct Database Insert
```sql
INSERT INTO settings (setting_group, setting_key, setting_value, created_at, updated_at)
VALUES ('google_maps_settings', 'google_maps_api_key', 'YOUR_API_KEY_HERE', NOW(), NOW())
ON DUPLICATE KEY UPDATE setting_value = 'YOUR_API_KEY_HERE', updated_at = NOW();
```

### Option 3: Via Laravel Tinker
```bash
php artisan tinker
```
```php
App\Models\Setting::updateOrCreate(
    ['setting_key' => 'google_maps_api_key', 'setting_group' => 'google_maps_settings'],
    ['setting_value' => 'YOUR_API_KEY_HERE']
);
```

## Getting a Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a Project** (if you don't have one)
   - Click "Select a project" → "New Project"
   - Enter project name → Click "Create"

3. **Enable Required APIs**
   - Go to "APIs & Services" → "Library"
   - Enable these APIs:
     - ✅ Maps JavaScript API
     - ✅ Geocoding API (for address lookups)
     - ✅ Places API (if using place search)

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "API key"
   - Copy the generated key

5. **Restrict API Key** (Important for security!)
   - Click on the API key to edit
   - Under "Application restrictions":
     - Select "HTTP referrers (web sites)"
     - Add your domains:
       - `http://localhost/*` (for development)
       - `https://yourdomain.com/*` (for production)
   - Under "API restrictions":
     - Select "Restrict key"
     - Select: Maps JavaScript API, Geocoding API, Places API
   - Click "Save"

## Checking if API Key is Set

### In Browser Console (Frontend)
```javascript
console.log(usePage().props.google_maps_api_key);
```

### Via Laravel Route
Create a test route to verify:
```php
Route::get('/test-maps-api', function () {
    $repo = app(\App\Repositories\SettingRepository::class);
    return response()->json([
        'api_key_set' => !empty($repo->getGoogleMapsApiKey()),
        'api_key' => substr($repo->getGoogleMapsApiKey(), 0, 10) . '...' // Show first 10 chars only
    ]);
});
```

## Troubleshooting

### Map Not Loading
1. **Check if API key is set**:
   ```php
   php artisan tinker
   App\Models\Setting::where('setting_key', 'google_maps_api_key')->first();
   ```

2. **Check browser console for errors**:
   - "This page can't load Google Maps correctly" → API key is missing or invalid
   - "RefererNotAllowedMapError" → Your domain is not authorized in API restrictions
   - "ApiNotActivatedMapError" → Required APIs are not enabled

3. **Verify API is enabled**:
   - Go to Google Cloud Console
   - Check if "Maps JavaScript API" is enabled

4. **Check API key restrictions**:
   - Make sure your domain is added to HTTP referrers
   - For local development, add `http://localhost/*`

### Map Shows but Markers Don't Appear
- Check if locations have valid latitude/longitude values in database
- Check browser console for JavaScript errors
- Verify markers array is not empty

## Security Best Practices

1. ✅ **Always restrict API keys** in Google Cloud Console
2. ✅ **Never commit API keys** to version control
3. ✅ **Use different keys** for development and production
4. ✅ **Monitor API usage** in Google Cloud Console
5. ✅ **Set usage quotas** to prevent unexpected charges

## Current Setup Status

✅ Google Maps API key is stored in database (not in .env)
✅ API key is globally available via Inertia middleware
✅ Can be updated through admin panel
✅ GoogleMapWithMarkers component properly uses the API key
✅ LoadScript handles API key loading

## Next Steps for Contact2 Integration

1. ✅ PageController already passes `google_maps_api_key` globally
2. ✅ Contact2 can access it via `usePage().props`
3. ✅ GoogleMapWithMarkers already accepts `googleMapsApiKey` prop
4. ⚠️ Just need to pass `locations` from database to Contact2
5. ⚠️ Update Contact2 to convert locations to markers format

Everything is already set up correctly for the Google Maps API! 🎉
