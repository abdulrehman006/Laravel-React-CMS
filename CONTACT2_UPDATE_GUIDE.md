# Contact2 Component Update Guide

## Problem
The Contact2.jsx component was using hardcoded static locations data instead of fetching from the database.

## Solution Implemented

### 1. Updated PageController (✅ COMPLETED)
**File:** `app/Http/Controllers/Frontend/PageController.php`

Added locations data to the contact page case:
```php
case 'contact':
    $data['contact'] = $page;
    $data['locations'] = Location::where('is_active', true)
        ->orderBy('sort_order', 'asc')
        ->get();
    return Inertia::render('Page/ContactPage', $data);
```

### 2. Contact2.jsx Component Update Needed

**File:** `resources/js/Frontend/Components/Contact/Contact2.jsx`

#### Key Changes Required:

1. **Import useEffect**:
```javascript
import React, { useState, useMemo, useEffect } from "react";
```

2. **Get locations from props**:
```javascript
const { google_maps_api_key, locations } = usePage().props;
```

3. **Convert database locations to markers**:
```javascript
const markers = useMemo(() => {
    if (!locations || locations.length === 0) {
        return [];
    }

    return locations
        .filter(location => location.latitude && location.longitude)
        .map((location, index) => ({
            id: location.id || index + 1,
            position: {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude)
            },
            city: location.city || location.name,
            name: location.name,
            address: location.address,
            phone: location.phone,
            email: location.email,
            description: location.description
        }));
}, [locations]);
```

4. **Add dynamic center calculation**:
```javascript
useEffect(() => {
    if (markers.length > 0 && !selectedCity) {
        const avgLat = markers.reduce((sum, marker) => sum + marker.position.lat, 0) / markers.length;
        const avgLng = markers.reduce((sum, marker) => sum + marker.position.lng, 0) / markers.length;
        setMapCenter({ lat: avgLat, lng: avgLng });
    }
}, [markers]);
```

5. **Group locations by city**:
```javascript
const groupedLocations = useMemo(() => {
    const grouped = {};
    markers.forEach(marker => {
        const city = marker.city;
        if (!grouped[city]) {
            grouped[city] = [];
        }
        grouped[city].push(marker);
    });
    return grouped;
}, [markers]);
```

6. **Update city list to show location count and details**:
```javascript
{Object.keys(groupedLocations).sort().map((city) => (
    <li key={city} onClick={() => handleCityClick(city)}>
        <div>
            <span>{city}</span>
            <span>
                ({groupedLocations[city].length} {groupedLocations[city].length === 1 ? 'location' : 'locations'})
            </span>
        </div>
        {selectedCity === city && (
            <div>
                {groupedLocations[city].map((loc, idx) => (
                    <div key={idx}>
                        <div>{loc.name}</div>
                        {loc.address && <div>{loc.address}</div>}
                        {loc.phone && <div>{loc.phone}</div>}
                    </div>
                ))}
            </div>
        )}
    </li>
))}
```

7. **Add empty state when no locations**:
```javascript
{!contact_data.hide_google_map && markers.length === 0 && (
    <Div className="container">
        <Div className="text-center">
            <Icon icon="mdi:map-marker-off" />
            <h4>No Locations Available</h4>
            <p>Locations will be displayed here once they are added.</p>
        </Div>
    </Div>
)}
```

## Testing Steps

1. **Add test locations** in admin panel:
   - Go to `/admin/locations`
   - Click "Add New Location"
   - Fill in: Name, Address, City, Country, Latitude, Longitude
   - Mark as "Active"
   - Save

2. **View contact page**:
   - Visit `/contact`
   - Verify locations appear on left sidebar
   - Verify map shows markers
   - Click on a city to zoom to that location
   - Verify location details show when city is selected

3. **Test empty state**:
   - Mark all locations as inactive
   - Visit `/contact`
   - Verify "No Locations Available" message shows

## Benefits

- ✅ Locations managed from database (no code changes needed to add/remove locations)
- ✅ Dynamic map centering based on actual locations
- ✅ Shows location count per city
- ✅ Displays location details when city is selected
- ✅ Handles empty state gracefully
- ✅ Responsive design maintained
- ✅ Same styling and UX as original design

## Files Modified

1. `app/Http/Controllers/Frontend/PageController.php` - ✅ Updated
2. `resources/js/Frontend/Components/Contact/Contact2.jsx` - ⚠️ Needs manual update (see above)

## Next Steps

1. Manually update Contact2.jsx with the changes listed above
2. Run `npm run dev` to compile assets
3. Test on frontend
4. Commit and push changes
