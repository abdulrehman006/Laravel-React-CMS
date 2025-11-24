import { useState, useEffect, useRef } from "react";
import { IonIcon } from "@ionic/react";
import { callOutline, mailOutline, locationOutline, linkOutline, searchOutline, closeOutline, warningOutline } from "ionicons/icons";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { usePage } from "@inertiajs/react";

export default function LocationsInteractive({ data, locations }) {
    const { google_maps_api_key } = usePage().props;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredLocations, setFilteredLocations] = useState(locations);
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markersRef = useRef([]);

    // Filter locations based on search
    useEffect(() => {
        if (searchTerm) {
            const filtered = locations.filter(location =>
                location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(locations);
        }
    }, [searchTerm, locations]);

    // Initialize Google Map
    useEffect(() => {
        if (!mapRef.current || locations.length === 0) return;

        // Check if Google Maps is loaded
        if (typeof google === 'undefined') {
            console.warn('Google Maps not loaded');
            return;
        }

        // Get locations with coordinates
        const locationsWithCoords = locations.filter(loc => loc.latitude && loc.longitude);

        if (locationsWithCoords.length === 0) return;

        // Calculate center
        const avgLat = locationsWithCoords.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locationsWithCoords.length;
        const avgLng = locationsWithCoords.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locationsWithCoords.length;

        // Get zoom level from settings, default to 5
        const zoomLevel = data.map_zoom ? parseInt(data.map_zoom) : 5;

        // Create map
        const map = new google.maps.Map(mapRef.current, {
            center: { lat: avgLat, lng: avgLng },
            zoom: zoomLevel,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        googleMapRef.current = map;

        // Create info window
        const infoWindow = new google.maps.InfoWindow();

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers for each location
        locationsWithCoords.forEach((location) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(location.latitude),
                    lng: parseFloat(location.longitude)
                },
                map: map,
                title: location.name,
                animation: google.maps.Animation.DROP,
            });

            // Build info window content based on settings
            const buildInfoContent = () => {
                return `
                    <div style="padding: 10px; max-width: 280px;">
                        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">${location.name}</h3>
                        <p style="margin: 5px 0; font-size: 14px; line-height: 1.5;">
                            <strong>Address:</strong><br/>
                            ${location.address}, ${location.city}<br/>
                            ${location.state ? location.state + ', ' : ''}${location.country}
                        </p>
                        ${data.show_phone && location.phone ? `
                            <p style="margin: 5px 0; font-size: 14px;">
                                <strong>Phone:</strong> <a href="tel:${location.phone}" style="color: #DAA520; text-decoration: none;">${location.phone}</a>
                            </p>
                        ` : ''}
                        ${data.show_email && location.email ? `
                            <p style="margin: 5px 0; font-size: 14px;">
                                <strong>Email:</strong> <a href="mailto:${location.email}" style="color: #DAA520; text-decoration: none;">${location.email}</a>
                            </p>
                        ` : ''}
                        ${location.url ? `
                            <p style="margin: 10px 0 0 0;">
                                <a href="${location.url}" target="_blank" rel="noopener noreferrer" style="color: #DAA520; text-decoration: none; font-weight: 500;">
                                    Visit Website →
                                </a>
                            </p>
                        ` : ''}
                    </div>
                `;
            };

            // Show info window on hover
            marker.addListener("mouseover", () => {
                infoWindow.setContent(buildInfoContent());
                infoWindow.open(map, marker);
            });

            // Hide info window on mouseout (unless it's the selected location)
            marker.addListener("mouseout", () => {
                if (selectedLocation?.id !== location.id) {
                    infoWindow.close();
                }
            });

            // Click event for marker - zoom in and highlight
            marker.addListener("click", () => {
                infoWindow.setContent(buildInfoContent());
                infoWindow.open(map, marker);
                map.panTo(marker.getPosition());
                map.setZoom(15); // Zoom closer on click
                setSelectedLocation(location);

                // Bounce animation for selected marker
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => marker.setAnimation(null), 2000);
            });

            markersRef.current.push(marker);
        });

        // Fit bounds to show all markers
        if (locationsWithCoords.length > 1) {
            const bounds = new google.maps.LatLngBounds();
            locationsWithCoords.forEach(loc => {
                bounds.extend(new google.maps.LatLng(parseFloat(loc.latitude), parseFloat(loc.longitude)));
            });
            map.fitBounds(bounds);
        }

    }, [locations]);

    // Handle location click from list
    const handleLocationClick = (location) => {
        if (!location.latitude || !location.longitude) return;

        setSelectedLocation(location);

        if (googleMapRef.current) {
            const position = new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude));
            googleMapRef.current.panTo(position);
            googleMapRef.current.setZoom(15); // Zoom closer when clicking from list

            // Trigger marker click
            const marker = markersRef.current.find(m =>
                m.getPosition().lat() === parseFloat(location.latitude) &&
                m.getPosition().lng() === parseFloat(location.longitude)
            );
            if (marker) {
                google.maps.event.trigger(marker, 'click');
            }
        }
    };

    // Handle location hover from list
    const handleLocationHover = (location) => {
        if (!location.latitude || !location.longitude) return;

        if (googleMapRef.current) {
            // Find and trigger marker mouseover
            const marker = markersRef.current.find(m =>
                m.getPosition().lat() === parseFloat(location.latitude) &&
                m.getPosition().lng() === parseFloat(location.longitude)
            );
            if (marker) {
                google.maps.event.trigger(marker, 'mouseover');
            }
        }
    };

    // Handle location hover end from list
    const handleLocationHoverEnd = (location) => {
        if (!location.latitude || !location.longitude) return;

        if (googleMapRef.current) {
            // Find and trigger marker mouseout
            const marker = markersRef.current.find(m =>
                m.getPosition().lat() === parseFloat(location.latitude) &&
                m.getPosition().lng() === parseFloat(location.longitude)
            );
            if (marker) {
                google.maps.event.trigger(marker, 'mouseout');
            }
        }
    };

    // Handle reset
    const handleReset = () => {
        setSearchTerm("");
        setSelectedLocation(null);

        if (googleMapRef.current && locations.length > 0) {
            const locationsWithCoords = locations.filter(loc => loc.latitude && loc.longitude);
            if (locationsWithCoords.length > 1) {
                const bounds = new google.maps.LatLngBounds();
                locationsWithCoords.forEach(loc => {
                    bounds.extend(new google.maps.LatLng(parseFloat(loc.latitude), parseFloat(loc.longitude)));
                });
                googleMapRef.current.fitBounds(bounds);
            } else if (locationsWithCoords.length === 1) {
                googleMapRef.current.setCenter({
                    lat: parseFloat(locationsWithCoords[0].latitude),
                    lng: parseFloat(locationsWithCoords[0].longitude)
                });
                googleMapRef.current.setZoom(12);
            }
        }
    };

    if (locations.length === 0) {
        return (
            <Div className="container">
                <SectionHeading title={data.title} subtitle={data.sub_title} variant="cs-style1" />
                <Div className="cs-height_50 cs-height_lg_30" />
                <Div className="text-center" style={{ padding: "60px 20px" }}>
                    <IonIcon icon={locationOutline} style={{ fontSize: "64px", color: "#ddd", marginBottom: "20px" }} />
                    <h3 style={{ color: "#999" }}>No locations available at the moment</h3>
                    <p style={{ color: "#bbb" }}>Please check back later for updates</p>
                </Div>
            </Div>
        );
    }

    return (
        <Div className="container-fluid" style={{ padding: "0 30px" }}>
            <Div className="container">
                <Div className="text-center">
                    <SectionHeading title={data.title} subtitle={data.sub_title} variant="cs-style1" />
                    {data.description && (
                        <>
                            <Div className="cs-height_20 cs-height_lg_20" />
                            <p className="mb-4">{data.description}</p>
                        </>
                    )}
                </Div>
            </Div>

            <Div className="cs-height_50 cs-height_lg_30" />

            {/* Main Content: Locations List + Map */}
            <Div className="container">
                <Div className="row">
                    {/* Left Side - City List */}
                    <Div className="col-lg-4">
                        {/* Search Bar - conditional based on settings */}
                        {data.enable_search !== false && (
                            <Div className="mb-3">
                                <Div className="position-relative">
                                    <IonIcon
                                        icon={searchOutline}
                                        style={{
                                            position: "absolute",
                                            left: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            fontSize: "18px",
                                            color: "#999"
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search locations..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            paddingLeft: "40px",
                                            paddingRight: searchTerm ? "40px" : "15px",
                                            height: "45px",
                                            borderRadius: "4px",
                                            border: "1px solid #e0e0e0"
                                        }}
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                padding: "5px"
                                            }}
                                        >
                                            <IonIcon icon={closeOutline} style={{ fontSize: "18px", color: "#999" }} />
                                        </button>
                                    )}
                                </Div>
                            </Div>
                        )}

                        <h3>Our Locations</h3>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }} className="cstm-map-marker">
                                {filteredLocations.map((location, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleLocationClick(location)}
                                        onMouseEnter={() => handleLocationHover(location)}
                                        onMouseLeave={() => handleLocationHoverEnd(location)}
                                        style={{
                                            padding: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: selectedLocation?.id === location.id ? '#f0f0f0' : 'transparent',
                                            borderRadius: '4px',
                                            marginBottom: '5px',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <span>{location.name}</span>
                                    </li>
                                ))}
                                {filteredLocations.length === 0 && (
                                    <li style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                                        No locations found matching your search
                                    </li>
                                )}
                            </ul>
                        </div>
                        <button
                            onClick={handleReset}
                            style={{
                                marginTop: '20px',
                                padding: '8px 15px',
                                backgroundColor: '#DAA520',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            disabled={!selectedLocation}
                        >
                            Show All Locations
                        </button>
                    </Div>

                    {/* Right Side - Map */}
                    <Div className="col-lg-8" style={{ height: '600px', position: 'relative' }}>
                        {!google_maps_api_key && (
                            <Div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1000,
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    padding: '30px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    textAlign: 'center',
                                    maxWidth: '400px',
                                    width: '90%'
                                }}
                            >
                                <IonIcon
                                    icon={warningOutline}
                                    style={{
                                        fontSize: '48px',
                                        color: '#DAA520',
                                        marginBottom: '15px'
                                    }}
                                />
                                <h4 style={{ marginBottom: '10px', color: '#333' }}>
                                    Google Maps API Key Required
                                </h4>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px', lineHeight: '1.5' }}>
                                    To display the interactive map, please configure your Google Maps API key in the admin panel.
                                </p>
                                <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>
                                    <strong>Admin Panel</strong> → Settings → Google Maps API
                                </p>
                            </Div>
                        )}
                        <Div
                            ref={mapRef}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "5px",
                                border: "1px solid #e0e0e0",
                                backgroundColor: '#f5f5f5',
                                filter: !google_maps_api_key ? 'blur(3px)' : 'none'
                            }}
                        />
                    </Div>
                </Div>
            </Div>

            <style>{`
                .cstm-map-marker li:hover {
                    background-color: #f0f0f0 !important;
                }
                .cstm-map-marker li span {
                    display: block;
                }
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </Div>
    );
}
