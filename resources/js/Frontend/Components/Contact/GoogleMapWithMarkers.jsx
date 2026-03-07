import React, { useRef, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "600px",
};

const defaultCenter = {
    lat: 31.99879,
    lng: 72.720796,
};

export default function GoogleMapWithMarkers({ markers, center, zoom, selectedCity, googleMapsApiKey }) {
    const mapRef = useRef(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey || "",
    });

    // Store map instance on load
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    // Pan and zoom to selected location
    useEffect(() => {
        if (!mapRef.current || !selectedCity) return;

        const selectedMarker = markers.find(m => m.city === selectedCity);
        if (selectedMarker) {
            mapRef.current.panTo(selectedMarker.position);
            mapRef.current.setZoom(14);
        }
    }, [selectedCity, markers]);

    // Reset to show all markers when selection is cleared
    useEffect(() => {
        if (!mapRef.current || selectedCity) return;

        if (markers.length > 1) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach(m => bounds.extend(m.position));
            mapRef.current.fitBounds(bounds);
        } else if (markers.length === 1) {
            mapRef.current.panTo(markers[0].position);
            mapRef.current.setZoom(zoom || 6);
        }
    }, [selectedCity, markers, zoom]);

    const getMarkerIcon = (isSelected) => {
        if (!window.google || !window.google.maps || !window.google.maps.Size) {
            return isSelected
                ? { url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" }
                : { url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" };
        }

        try {
            return {
                url: isSelected
                    ? "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(isSelected ? 60 : 40, isSelected ? 60 : 40),
            };
        } catch (error) {
            return isSelected
                ? { url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" }
                : { url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" };
        }
    };

    const getAnimation = (isSelected) => {
        if (!window.google || !window.google.maps || !isSelected) return null;
        return window.google.maps.Animation.BOUNCE;
    };

    if (loadError) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '600px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px'
            }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: '#dc3545', marginBottom: '10px', fontWeight: '600' }}>Error loading maps</p>
                    <p style={{ color: '#6c757d', fontSize: '14px' }}>Please check your Google Maps API key configuration</p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '600px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px'
            }}>
                <p style={{ color: '#6c757d' }}>Loading maps...</p>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center || defaultCenter}
            zoom={zoom || 6}
            onLoad={onMapLoad}
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
    );
}
