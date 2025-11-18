import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "600px",
};

const defaultCenter = {
    lat: 31.99879, // Default latitude
    lng: 72.720796, // Default longitude
};

export default function GoogleMapWithMarkers({ markers, center, zoom, selectedCity, googleMapsApiKey }) {
    // Helper function to create marker icons safely
    const getMarkerIcon = (isSelected) => {
        // Check if Google Maps is loaded
        if (!window.google || !window.google.maps) {
            return undefined; // Return undefined if not loaded yet
        }

        if (isSelected) {
            return {
                url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                scaledSize: new window.google.maps.Size(60, 60),
            };
        } else {
            return {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
            };
        }
    };

    // Helper function to get animation safely
    const getAnimation = (isSelected) => {
        if (!window.google || !window.google.maps || !isSelected) {
            return null;
        }
        return window.google.maps.Animation.BOUNCE;
    };

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey || ""}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center || defaultCenter}
                zoom={zoom || 6}
                options={{
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true,
                }}
            >
                {markers.map((marker) => {
                    const isSelected = selectedCity && marker.city === selectedCity;

                    return (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={getMarkerIcon(isSelected)}
                            title={marker.city}
                            animation={getAnimation(isSelected)}
                            label={isSelected ? {
                                text: marker.city,
                                color: '#000',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            } : null}
                        />
                    );
                })}
            </GoogleMap>
        </LoadScript>
    );
}
