import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from '@iconify/react';
import React, { useState, useMemo, useEffect } from "react";
import ContactForm from "@/Frontend/Components/Contact/ContactForm";
import GoogleMapWithMarkers from "@/Frontend/Components/Contact/GoogleMapWithMarkers";
import { usePage } from "@inertiajs/react";

export default function Contact2({ contact_data }) {
    const { google_maps_api_key, locations } = usePage().props;
    const [selectedCity, setSelectedCity] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 31.1704, lng: 72.7097 }); // Default center for Pakistan
    const [zoomLevel, setZoomLevel] = useState(7); // Default zoom level

    // Convert database locations to markers format
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
                email: location.email
            }));
    }, [locations]);

    // Calculate dynamic center based on all markers
    useEffect(() => {
        if (markers.length > 0 && !selectedCity) {
            const avgLat = markers.reduce((sum, m) => sum + m.position.lat, 0) / markers.length;
            const avgLng = markers.reduce((sum, m) => sum + m.position.lng, 0) / markers.length;
            setMapCenter({ lat: avgLat, lng: avgLng });
        }
    }, [markers, selectedCity]);

    const filteredMarkers = useMemo(() => {
        return selectedCity 
            ? markers.filter(marker => marker.city === selectedCity)
            : markers;
    }, [selectedCity]);

    const handleCityClick = (city) => {
        if (selectedCity === city) {
            // Clicking the same city again shows all markers
            setSelectedCity(null);
            setMapCenter({ lat: 31.1704, lng: 72.7097 }); // Reset to Pakistan center
            setZoomLevel(7); // Reset to default zoom
        } else {
            setSelectedCity(city);
            const cityMarker = markers.find(marker => marker.city === city);
            if (cityMarker) {
                setMapCenter(cityMarker.position);
                setZoomLevel(15); // Much higher zoom for better focus (was 12, now 15)
            }
        }
    };

    return (
        <>
            {!contact_data.hide_contact_form && (
                <>
                    <Div className="container">
                        <Div className="text-center">
                            <SectionHeading
                                title={contact_data.title}
                                subtitle={contact_data.sub_title}
                                variant="cs-style1"
                            />
                        </Div>

                        <Spacing lg="50" md="30" />

                        <Div className="row">
                            {/* Contact Information */}
                            <Div className="col-lg-5 mb-4">
                                <h4 style={{ fontWeight: "600", marginBottom: "25px", color: "#333" }}>
                                    Get In Touch
                                </h4>
                                <ul className="cs-menu_widget cs-style1 cs-mp0">
                                    {contact_data.phone_number ? (
                                        <li style={{ marginBottom: "20px" }}>
                                            <span className='cs-accent_color' style={{ marginRight: "10px" }}>
                                                <Icon icon="material-symbols:add-call-rounded" />
                                            </span>
                                            {contact_data.phone_number}
                                        </li>
                                    ) : null}
                                    {contact_data.email_address ? (
                                        <li style={{ marginBottom: "20px" }}>
                                            <span className='cs-accent_color' style={{ marginRight: "10px" }}>
                                                <Icon icon="mdi:envelope" />
                                            </span>
                                            {contact_data.email_address}
                                        </li>
                                    ) : null}
                                    {contact_data.address ? (
                                        <li style={{ marginBottom: "20px" }}>
                                            <span className='cs-accent_color' style={{ marginRight: "10px" }}>
                                                <Icon icon="mdi:map-marker" />
                                            </span>
                                            {contact_data.address}
                                        </li>
                                    ) : null}
                                </ul>
                            </Div>

                            {/* Contact Form */}
                            <Div className="col-lg-7 mb-4">
                                <h4 style={{ fontWeight: "600", marginBottom: "25px", color: "#333" }}>
                                    Send Message
                                </h4>
                                <ContactForm />
                            </Div>
                        </Div>
                    </Div>
                    <Spacing lg="50" md="30" />
                </>
            )}

            {/* Map Section with City List */}
            {!contact_data.hide_google_map && (
                <>
                    <Div className="container">
                        <Div className="text-center mb-4">
                            <h3 style={{ fontWeight: "600", fontSize: "28px", color: "#333" }}>Our Locations</h3>
                            <p style={{ color: "#666", marginTop: "10px" }}>Find us across multiple cities</p>
                        </Div>

                        <Spacing lg="30" md="20" />

                        <Div className="row">
                            {/* Left Side - City List */}
                            <Div className="col-lg-4">
                                <h5 style={{ fontWeight: "600", marginBottom: "20px", color: "#333" }}>
                                    Select Location
                                </h5>
                                {markers.length === 0 ? (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                        <Icon icon="mdi:map-marker-off" style={{ fontSize: '48px', marginBottom: '10px' }} />
                                        <p>No locations available</p>
                                    </div>
                                ) : (
                                    <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                                        <ul style={{ listStyle: 'none', padding: 0 }} className="cstm-map-marker">
                                            {markers.map((marker) => (
                                                <li
                                                    key={marker.id}
                                                    onClick={() => handleCityClick(marker.city)}
                                                    style={{
                                                        padding: '12px 15px',
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedCity === marker.city ? '#DAA520' : 'transparent',
                                                        color: selectedCity === marker.city ? '#fff' : '#333',
                                                        borderRadius: '6px',
                                                        marginBottom: '8px',
                                                        transition: 'all 0.3s ease',
                                                        border: selectedCity === marker.city ? '2px solid #B8860B' : '1px solid #e0e0e0',
                                                        fontWeight: selectedCity === marker.city ? 'bold' : 'normal',
                                                        fontSize: selectedCity === marker.city ? '16px' : '14px',
                                                        boxShadow: selectedCity === marker.city ? '0 4px 8px rgba(218, 165, 32, 0.3)' : 'none',
                                                        transform: selectedCity === marker.city ? 'scale(1.02)' : 'scale(1)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (selectedCity !== marker.city) {
                                                            e.currentTarget.style.backgroundColor = '#f8f8f8';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (selectedCity !== marker.city) {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                        }
                                                    }}
                                                >
                                                    <span>
                                                        {selectedCity === marker.city && '📍 '}
                                                        {marker.city}
                                                    </span>
                                                    {marker.address && (
                                                        <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
                                                            {marker.address}
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedCity(null);
                                        setMapCenter({ lat: 31.1704, lng: 72.7097 });
                                        setZoomLevel(7);
                                    }}
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
                                <div style={{ height: '600px' }}>
                                    <GoogleMapWithMarkers
                                        markers={filteredMarkers}
                                        center={mapCenter}
                                        zoom={zoomLevel}
                                        selectedCity={selectedCity}
                                        googleMapsApiKey={google_maps_api_key}
                                    />
                                </div>
                            </Div>
                        </Div>
                    </Div>
                    <Spacing lg="80" md="40" />
                </>
            )}
        </>
    );
}