import { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { callOutline, mailOutline, locationOutline, linkOutline, searchOutline, closeOutline } from "ionicons/icons";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { usePage } from "@inertiajs/react";
import GoogleMapWithMarkers from "@/Frontend/Components/Contact/GoogleMapWithMarkers";

export default function LocationsInteractive({ data, locations }) {
    const { google_maps_api_key } = usePage().props;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredLocations, setFilteredLocations] = useState(locations);

    // Get view mode from settings: "1" = grid, "2" = list, "3" = map
    const viewMode = data.layout === "1" ? "grid" : data.layout === "2" ? "list" : "map";

    // Prepare markers for GoogleMapWithMarkers component
    const filteredMarkers = filteredLocations
        .filter(loc => loc.latitude && loc.longitude)
        .map(location => ({
            id: location.id,
            city: location.city || location.name,
            position: {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude)
            }
        }));

    // Calculate map center based on filtered locations
    const mapCenter = filteredMarkers.length > 0
        ? {
            lat: filteredMarkers.reduce((sum, m) => sum + m.position.lat, 0) / filteredMarkers.length,
            lng: filteredMarkers.reduce((sum, m) => sum + m.position.lng, 0) / filteredMarkers.length
        }
        : { lat: 31.99879, lng: 72.720796 }; // Default center

    // Get zoom level from settings
    const zoomLevel = data.map_zoom ? parseInt(data.map_zoom) : 6;

    // Get selected city for highlighting on map
    const selectedCity = selectedLocation ? (selectedLocation.city || selectedLocation.name) : null;

    // Filter locations based on search
    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const filtered = locations.filter(location =>
                (location.name || '').toLowerCase().includes(term) ||
                (location.city || '').toLowerCase().includes(term) ||
                (location.country || '').toLowerCase().includes(term) ||
                (location.address || '').toLowerCase().includes(term)
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(locations);
        }
    }, [searchTerm, locations]);

    // Handle location click from list
    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };

    // Simplified hover handlers (map interactions now handled by GoogleMapWithMarkers)
    const handleLocationHover = (location) => {
        // Visual feedback only for sidebar
    };

    const handleLocationHoverEnd = (location) => {
        // Visual feedback only for sidebar
    };

    // Handle reset
    const handleReset = () => {
        setSearchTerm("");
        setSelectedLocation(null);
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

            {/* Main Content: Conditional View Rendering */}
            <Div className="container">
                {viewMode === 'map' ? (
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

                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }} className="cstm-map-marker">
                                {(() => {
                                    const citiesMap = new Map();
                                    filteredLocations.forEach(location => {
                                        const cityName = location.city || location.name;
                                        if (!citiesMap.has(cityName)) {
                                            citiesMap.set(cityName, location);
                                        }
                                    });
                                    const uniqueCities = Array.from(citiesMap.values());

                                    return uniqueCities.map((location) => (
                                        <li
                                            key={location.id}
                                            onClick={() => handleLocationClick(location)}
                                            onMouseEnter={() => handleLocationHover(location)}
                                            onMouseLeave={() => handleLocationHoverEnd(location)}
                                            style={{
                                                padding: '12px 15px',
                                                cursor: 'pointer',
                                                backgroundColor: selectedLocation?.id === location.id ? '#DAA520' : 'transparent',
                                                color: selectedLocation?.id === location.id ? '#fff' : '#333',
                                                borderRadius: '6px',
                                                border: selectedLocation?.id === location.id ? '2px solid #B8860B' : '1px solid #e0e0e0',
                                                fontWeight: selectedLocation?.id === location.id ? 'bold' : 'normal',
                                                fontSize: selectedLocation?.id === location.id ? '16px' : '14px',
                                                marginBottom: '8px',
                                                boxShadow: selectedLocation?.id === location.id ? '0 4px 8px rgba(218, 165, 32, 0.3)' : 'none',
                                                transform: selectedLocation?.id === location.id ? 'scale(1.02)' : 'scale(1)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <span>
                                                {selectedLocation?.id === location.id && '📍 '}
                                                {location.city || location.name}
                                            </span>
                                        </li>
                                    ));
                                })()}
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
                                padding: '10px 20px',
                                backgroundColor: '#DAA520',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                width: '100%',
                                opacity: !selectedLocation ? '0.6' : '1',
                                transition: 'opacity 0.3s ease'
                            }}
                            disabled={!selectedLocation}
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
                ) : viewMode === 'grid' ? (
                    <Div className="row">
                        {filteredLocations.map((location, index) => (
                            <Div key={index} className="col-lg-4 col-md-6 mb-4">
                                <Div className="card h-100" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                                    <Div className="card-body" style={{ padding: '20px' }}>
                                        <h5 style={{ color: '#DAA520', marginBottom: '15px', fontWeight: '600' }}>
                                            <IonIcon icon={locationOutline} style={{ marginRight: '8px' }} />
                                            {location.name}
                                        </h5>
                                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px', lineHeight: '1.6' }}>
                                            <strong>Address:</strong><br/>
                                            {location.address}{location.city ? `, ${location.city}` : ''}<br/>
                                            {location.state ? location.state + ', ' : ''}{location.country || ''}
                                        </p>
                                        {data.show_phone && location.phone && (
                                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                                                <IonIcon icon={callOutline} style={{ marginRight: '8px', color: '#DAA520' }} />
                                                <a href={`tel:${location.phone}`} style={{ color: '#666', textDecoration: 'none' }}>{location.phone}</a>
                                            </p>
                                        )}
                                        {data.show_email && location.email && (
                                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                                                <IonIcon icon={mailOutline} style={{ marginRight: '8px', color: '#DAA520' }} />
                                                <a href={`mailto:${location.email}`} style={{ color: '#666', textDecoration: 'none' }}>{location.email}</a>
                                            </p>
                                        )}
                                        {location.url && (
                                            <p style={{ marginTop: '15px' }}>
                                                <a href={location.url} target="_blank" rel="noopener noreferrer" style={{ color: '#DAA520', textDecoration: 'none', fontWeight: '500' }}>
                                                    <IonIcon icon={linkOutline} style={{ marginRight: '5px' }} />
                                                    Visit Website
                                                </a>
                                            </p>
                                        )}
                                    </Div>
                                </Div>
                            </Div>
                        ))}
                        {filteredLocations.length === 0 && (
                            <Div className="col-12 text-center" style={{ padding: "60px 20px" }}>
                                <IonIcon icon={locationOutline} style={{ fontSize: "64px", color: "#ddd", marginBottom: "20px" }} />
                                <h3 style={{ color: "#999" }}>No locations found</h3>
                            </Div>
                        )}
                    </Div>
                ) : (
                    <Div className="row">
                        <Div className="col-12">
                            {filteredLocations.map((location, index) => (
                                <Div key={index} className="card mb-3" style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                    <Div className="card-body" style={{ padding: '20px' }}>
                                        <Div className="row">
                                            <Div className="col-md-8">
                                                <h5 style={{ color: '#DAA520', marginBottom: '15px', fontWeight: '600' }}>
                                                    <IonIcon icon={locationOutline} style={{ marginRight: '8px' }} />
                                                    {location.name}
                                                </h5>
                                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px', lineHeight: '1.6' }}>
                                                    <strong>Address:</strong><br/>
                                                    {location.address}{location.city ? `, ${location.city}` : ''}<br/>
                                                    {location.state ? location.state + ', ' : ''}{location.country || ''}
                                                </p>
                                            </Div>
                                            <Div className="col-md-4">
                                                {data.show_phone && location.phone && (
                                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                                                        <IonIcon icon={callOutline} style={{ marginRight: '8px', color: '#DAA520' }} />
                                                        <a href={`tel:${location.phone}`} style={{ color: '#666', textDecoration: 'none' }}>{location.phone}</a>
                                                    </p>
                                                )}
                                                {data.show_email && location.email && (
                                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                                                        <IonIcon icon={mailOutline} style={{ marginRight: '8px', color: '#DAA520' }} />
                                                        <a href={`mailto:${location.email}`} style={{ color: '#666', textDecoration: 'none' }}>{location.email}</a>
                                                    </p>
                                                )}
                                                {location.url && (
                                                    <p style={{ marginTop: '15px' }}>
                                                        <a href={location.url} target="_blank" rel="noopener noreferrer" style={{ color: '#DAA520', textDecoration: 'none', fontWeight: '500' }}>
                                                            <IonIcon icon={linkOutline} style={{ marginRight: '5px' }} />
                                                            Visit Website
                                                        </a>
                                                    </p>
                                                )}
                                            </Div>
                                        </Div>
                                    </Div>
                                </Div>
                            ))}
                            {filteredLocations.length === 0 && (
                                <Div className="text-center" style={{ padding: "60px 20px" }}>
                                    <IonIcon icon={locationOutline} style={{ fontSize: "64px", color: "#ddd", marginBottom: "20px" }} />
                                    <h3 style={{ color: "#999" }}>No locations found</h3>
                                </Div>
                            )}
                        </Div>
                    </Div>
                )}
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
