import { useState, useEffect, useRef } from "react";
import { Icon } from '@iconify/react';
import Div from "@/Frontend/Components/Div";
import { usePage } from "@inertiajs/react";

export default function ContactLocations({ locations }) {
    const { google_maps_api_key } = usePage().props;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markersRef = useRef([]);

    // Initialize Google Map
    useEffect(() => {
        if (!mapRef.current || !locations || locations.length === 0) return;

        // Load Google Maps Script if not loaded
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${google_maps_api_key}`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        } else {
            initializeMap();
        }

        function initializeMap() {
            if (!window.google) return;

            // Get locations with coordinates
            const locationsWithCoords = locations.filter(loc => loc.latitude && loc.longitude);

            if (locationsWithCoords.length === 0) return;

            // Calculate center
            const avgLat = locationsWithCoords.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locationsWithCoords.length;
            const avgLng = locationsWithCoords.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locationsWithCoords.length;

            // Create map
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: avgLat, lng: avgLng },
                zoom: 7,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
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
                    title: location.city || location.name,
                    animation: google.maps.Animation.DROP,
                });

                // Build info window content
                const buildInfoContent = () => {
                    return `
                        <div style="padding: 10px; max-width: 280px;">
                            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">${location.city || location.name}</h3>
                            ${location.address ? `
                                <p style="margin: 5px 0; font-size: 14px; line-height: 1.5;">
                                    <strong>Address:</strong><br/>
                                    ${location.address}
                                </p>
                            ` : ''}
                            ${location.phone ? `
                                <p style="margin: 5px 0; font-size: 14px;">
                                    <strong>Phone:</strong> <a href="tel:${location.phone}" style="color: #DAA520; text-decoration: none;">${location.phone}</a>
                                </p>
                            ` : ''}
                            ${location.email ? `
                                <p style="margin: 5px 0; font-size: 14px;">
                                    <strong>Email:</strong> <a href="mailto:${location.email}" style="color: #DAA520; text-decoration: none;">${location.email}</a>
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
                    map.setZoom(15);
                    setSelectedLocation(location);
                    setSelectedCity(location.city || location.name);

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
        }

    }, [locations, google_maps_api_key]);

    // Handle location click from list
    const handleCityClick = (location) => {
        if (!location.latitude || !location.longitude) return;

        const city = location.city || location.name;

        if (selectedCity === city) {
            // Clicking the same city again shows all markers
            setSelectedLocation(null);
            setSelectedCity(null);

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
                    googleMapRef.current.setZoom(7);
                }
            }
        } else {
            setSelectedLocation(location);
            setSelectedCity(city);

            if (googleMapRef.current) {
                const position = new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude));
                googleMapRef.current.panTo(position);
                googleMapRef.current.setZoom(15);

                // Trigger marker click
                const marker = markersRef.current.find(m =>
                    m.getPosition().lat() === parseFloat(location.latitude) &&
                    m.getPosition().lng() === parseFloat(location.longitude)
                );
                if (marker) {
                    google.maps.event.trigger(marker, 'click');
                }
            }
        }
    };

    // Handle reset
    const handleReset = () => {
        setSelectedLocation(null);
        setSelectedCity(null);

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
                googleMapRef.current.setZoom(7);
            }
        }
    };

    if (!locations || locations.length === 0) {
        return (
            <Div className="container">
                <Div className="text-center mb-4">
                    <h3 style={{ fontWeight: "600", fontSize: "28px", color: "#333" }}>Our Locations</h3>
                    <p style={{ color: "#666", marginTop: "10px" }}>Find us across multiple cities</p>
                </Div>
                <Div className="text-center" style={{ padding: "60px 20px" }}>
                    <Icon icon="mdi:map-marker-off" style={{ fontSize: "64px", color: "#ddd", marginBottom: "20px" }} />
                    <h3 style={{ color: "#999" }}>No locations available at the moment</h3>
                    <p style={{ color: "#bbb" }}>Please check back later for updates</p>
                </Div>
            </Div>
        );
    }

    return (
        <Div className="container">
            <Div className="text-center mb-4">
                <h3 style={{ fontWeight: "600", fontSize: "28px", color: "#333" }}>Our Locations</h3>
                <p style={{ color: "#666", marginTop: "10px" }}>Find us across multiple cities</p>
            </Div>

            <Div className="row">
                {/* Left Side - City List */}
                <Div className="col-lg-4">
                    <h5 style={{ fontWeight: "600", marginBottom: "20px", color: "#333" }}>
                        Select Location
                    </h5>
                    <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                        <ul style={{ listStyle: 'none', padding: 0 }} className="cstm-map-marker">
                            {locations.map((location, index) => {
                                const city = location.city || location.name;
                                const isSelected = selectedCity === city;

                                return (
                                    <li
                                        key={index}
                                        onClick={() => handleCityClick(location)}
                                        style={{
                                            padding: '12px 15px',
                                            cursor: 'pointer',
                                            backgroundColor: isSelected ? '#DAA520' : 'transparent',
                                            color: isSelected ? '#fff' : '#333',
                                            borderRadius: '6px',
                                            marginBottom: '8px',
                                            transition: 'all 0.3s ease',
                                            border: isSelected ? '2px solid #B8860B' : '1px solid #e0e0e0',
                                            fontWeight: isSelected ? 'bold' : 'normal',
                                            fontSize: isSelected ? '16px' : '14px',
                                            boxShadow: isSelected ? '0 4px 8px rgba(218, 165, 32, 0.3)' : 'none',
                                            transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.backgroundColor = '#f8f8f8';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <span>
                                            {isSelected && '📍 '}
                                            {city}
                                        </span>
                                        {location.address && (
                                            <div style={{ fontSize: '12px', marginTop: '4px', opacity: isSelected ? 1 : 0.8 }}>
                                                {location.address}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <button
                        onClick={handleReset}
                        className="btn w-100"
                        style={{
                            marginTop: '20px',
                            padding: '12px 15px',
                            backgroundColor: '#DAA520',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            opacity: !selectedCity ? '0.6' : '1'
                        }}
                        disabled={!selectedCity}
                    >
                        Show All Locations
                    </button>
                </Div>

                {/* Right Side - Map */}
                <Div className="col-lg-8">
                    <div style={{ height: '600px', position: 'relative' }}>
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
                                <Icon
                                    icon="mdi:alert-circle-outline"
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
                    </div>
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
