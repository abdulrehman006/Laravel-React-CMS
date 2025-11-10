import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import LocationsInteractive from "@/Frontend/Components/Locations/LocationsInteractive";

export default function LocationsSection({ sections_data }) {
    const { locations, google_maps_api_key } = usePage().props;

    // Default data if locations_section doesn't exist
    const locationsSection = sections_data?.locations_section || {
        title: "Our Locations",
        sub_title: "Where to find us",
        description: "Visit us at any of our convenient locations worldwide",
        layout: "1",
        limit: "",
        show_phone: true,
        show_email: true,
        show_map: true,
        enable_search: true,
        map_zoom: 5,
    };

    // Filter active locations
    const activeLocations = locations?.filter(loc => loc.is_active) || [];

    // Apply limit if specified
    const displayLocations = locationsSection.limit
        ? activeLocations.slice(0, parseInt(locationsSection.limit))
        : activeLocations;

    // Load Google Maps script dynamically with API key from settings
    useEffect(() => {
        if (!google_maps_api_key) {
            console.warn('Google Maps API key not configured. Please add it in Settings > Google Maps API');
            return;
        }

        // Check if script is already loaded
        if (window.google && window.google.maps) {
            return;
        }

        // Check if script is being loaded
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
            return;
        }

        // Load script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${google_maps_api_key}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }, [google_maps_api_key]);

    return <LocationsInteractive data={locationsSection} locations={displayLocations} />;
}
