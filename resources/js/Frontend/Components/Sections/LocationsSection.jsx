import { usePage } from "@inertiajs/react";
import LocationsInteractive from "@/Frontend/Components/Locations/LocationsInteractive";

export default function LocationsSection({ sections_data }) {
    const { locations } = usePage().props;

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

    return <LocationsInteractive data={locationsSection} locations={displayLocations} />;
}
