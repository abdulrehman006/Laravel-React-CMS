import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from '@iconify/react';
import React, { useState, useMemo } from "react";
import ContactForm from "@/Frontend/Components/Contact/ContactForm";
import GoogleMapWithMarkers from "@/Frontend/Components/Contact/GoogleMapWithMarkers";
import { usePage } from "@inertiajs/react";

export default function Contact2({ contact_data }) {
    const { google_maps_api_key } = usePage().props;
    const [selectedCity, setSelectedCity] = useState(null);
    const defaultCenter = { lat: 31.1704, lng: 72.7097 }; // Default center for Pakistan
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(7); // Default zoom level

    const markers = [
        { id: 1, position: { lat: 33.8169920, lng: 72.3552620 }, city: "Attock" },
        { id: 2, position: { lat: 33.630755, lng: 73.042288 }, city: "Rawalpindi (Pir Wadhai)" },
        { id: 3, position: { lat: 32.59649552207346, lng: 73.45482065693264 }, city: "Mandi Bahaudin" },
        { id: 4, position: { lat: 32.048894, lng: 73.697794 }, city: "Hafizabad" },
        { id: 5, position: { lat: 31.73966634340954, lng: 72.97822944616748 }, city: "Chiniot" },
        { id: 6, position: { lat: 31.42761894025939, lng: 73.09541553861119 }, city: "Faisalabad" },
        { id: 7, position: { lat: 29.111385992261432, lng: 70.35889589547014 }, city: "Rajanpur" },
        { id: 8, position: { lat: 29.274302, lng: 71.731049 }, city: "Bahawalpur" },
        { id: 9, position: { lat: 30.049945, lng: 70.652212 }, city: "DG Khan" },
        { id: 10, position: { lat: 30.635991, lng: 73.095079 }, city: "Sahiwal" },
        { id: 11, position: { lat: 32.005825, lng: 74.217376 }, city: "Gujranwala" },
        { id: 12, position: { lat: 31.99879, lng: 72.720796 }, city: "Sargodha" },
        { id: 13, position: { lat: 33.458439, lng: 73.212223 }, city: "Rawalpindi (Rawat)" },
        { id: 14, position: { lat: 32.962838, lng: 72.871590 }, city: "Chakwal" },
        { id: 15, position: { lat: 32.667226, lng: 73.981852 }, city: "Gujrat" },
        { id: 16, position: { lat: 30.992652, lng: 72.510870 }, city: "Toba T.Singh" },
        { id: 17, position: { lat: 31.240476, lng: 72.326802 }, city: "Jhang" },
        { id: 18, position: { lat: 30.030174, lng: 72.311004 }, city: "Vehari" },
        { id: 19, position: { lat: 29.507625, lng: 71.638091 }, city: "Lodhran" },
        { id: 20, position: { lat: 31.579145, lng: 73.479672 }, city: "Nankana New(shah kot)" },
        { id: 21, position: { lat: 30.294111, lng: 71.908193 }, city: "Khanewal" },
        { id: 22, position: { lat: 30.068381, lng: 71.159626 }, city: "Muzaffargarh" },
        { id: 23, position: { lat: 30.975484, lng: 70.962140 }, city: "Layyah" },
        { id: 24, position: { lat: 30.361448, lng: 73.367537 }, city: "Pakpattan" },
        { id: 25, position: { lat: 28.438248, lng: 70.301580 }, city: "Rahim Yar Khan" },
        { id: 26, position: { lat: 32.537283, lng: 71.555468 }, city: "Mianwali" },
        { id: 27, position: { lat: 31.633333, lng: 71.066666 }, city: "Bhakkar" },
        { id: 28, position: { lat: 30.1784716, lng: 71.5108671 }, city: "Multan" },
        { id: 29, position: { lat: 31.432020, lng: 74.312940 }, city: "Green Town" },
        { id: 30, position: { lat: 31.701359, lng: 74.271872 }, city: "Kala Shah Kaku" },
        { id: 31, position: { lat: 31.43193, lng: 74.185324 }, city: "Chung" },
        { id: 32, position: { lat: 32.42927207842168, lng: 74.5037330151352 }, city: "Sialkot" },
        { id: 33, position: { lat: 31.12452306091609, lng: 74.47350595618535 }, city: "Kasur" },
        { id: 34, position: { lat: 30.788933133787996, lng: 73.45141855934895 }, city: "Okara" },
    ];

    const filteredMarkers = useMemo(() => {
        return selectedCity
            ? markers.filter(marker => marker.city === selectedCity)
            : markers;
    }, [selectedCity]);

    const handleCityClick = (city) => {
        if (selectedCity === city) {
            // Clicking the same city again shows all markers
            setSelectedCity(null);
            setMapCenter(defaultCenter);
            setZoomLevel(7);
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
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedCity(null);
                                        setMapCenter(defaultCenter);
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