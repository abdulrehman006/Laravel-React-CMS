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

export default function GoogleMapWithMarkers({ markers }) {
    return (
        <LoadScript googleMapsApiKey="AIzaSyA-yuY2XPkod81dYXoMUmOGtrbfxLcLShw">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={6}
            >
                {markers.map((marker) => (
                    <Marker key={marker.id} position={marker.position} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}
