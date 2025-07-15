import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from '@iconify/react';
import React, { useState, useMemo } from "react";
import ContactForm from "@/Frontend/Components/Contact/ContactForm";
import GoogleMapWithMarkers from "@/Frontend/Components/Contact/GoogleMapWithMarkers";

export default function Contact2({ contact_data }) {
    const [selectedCity, setSelectedCity] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 31.1704, lng: 72.7097 }); // Default center for Pakistan
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
            setMapCenter({ lat: 31.1704, lng: 72.7097 }); // Reset to Pakistan center
            setZoomLevel(7); // Reset to default zoom
        } else {
            setSelectedCity(city);
            const cityMarker = markers.find(marker => marker.city === city);
            if (cityMarker) {
                setMapCenter(cityMarker.position);
                setZoomLevel(12); // Zoom in when a city is selected
            }
        }
    };

    return (
        <>
            <Div className="container">
                <Div className="row">
                    <Div className="col-lg-6">
                        <SectionHeading
                            title={contact_data.title}
                            subtitle={contact_data.sub_title}
                        />
                        <Spacing lg="55" md="30" />
                        <ul className="cs-menu_widget cs-style1 cs-mp0">
                            {contact_data.phone_number ? (
                                <li>
                                    <span className='cs-accent_color'><Icon icon="material-symbols:add-call-rounded" /></span>
                                    {contact_data.phone_number}
                                </li>
                            ) : null}
                            {contact_data.email_address ? (
                                <li>
                                    <span className='cs-accent_color'><Icon icon="mdi:envelope" /></span>
                                    {contact_data.email_address}
                                </li>
                            ) : null}

                            {contact_data.address ? (
                                <li>
                                    <span className='cs-accent_color'><Icon icon="mdi:map-marker" /></span>
                                    {contact_data.address}
                                </li>
                            ) : null}
                        </ul>
                        <Spacing lg="0" md="50" />
                    </Div>
                    <Div className="col-lg-6">
                        <ContactForm />
                    </Div>
                </Div>
            </Div>
            <Spacing lg="50" md="30" />
            
            {/* Map Section with City List */}
            <Div className="container">
                <Div className="row">
                    {/* Left Side - City List */}
                    <Div className="col-lg-4">
                        <h3>Our Locations</h3>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }} class="cstm-map-marker">
                                {markers.map((marker) => (
                                    <li 
                                        key={marker.id}
                                        onClick={() => handleCityClick(marker.city)}
                                        style={{
                                            padding: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: selectedCity === marker.city ? '#f0f0f0' : 'transparent',
                                            borderRadius: '4px',
                                            marginBottom: '5px',
                                            transition: 'background-color 0.2s'
                                        }}
                                    ><span>
                                        {marker.city}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button 
                            onClick={() => {
                                setSelectedCity(null);
                                setMapCenter({ lat: 31.1704, lng: 72.7097 });
                                setZoomLevel(7);
                            }}
                            style={{
                                marginTop: '20px',
                                padding: '8px 15px',
                                backgroundColor: '#DAA520',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            disabled={!selectedCity}
                        >
                            Show All Locations
                        </button>
                    </Div>
                    
                    {/* Right Side - Map */}
                    <Div className="col-lg-8" style={{ height: '600px' }}>
                        <GoogleMapWithMarkers 
                            markers={filteredMarkers} 
                            center={mapCenter}
                            zoom={zoomLevel}
                        />
                    </Div>
                </Div>
            </Div>
            <Spacing lg="80" md="40" />
        </>
    );
}