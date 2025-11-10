import { IonIcon } from "@ionic/react";
import { callOutline, mailOutline, locationOutline, navigateOutline } from "ionicons/icons";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function Locations3({ data, locations }) {
    return (
        <Div className="container">
            <SectionHeading title={data.title} subtitle={data.sub_title} variant="cs-style1" />
            {data.description && (
                <>
                    <Div className="cs-height_20 cs-height_lg_20" />
                    <p className="text-center mb-5">{data.description}</p>
                </>
            )}
            <Div className="cs-height_50 cs-height_lg_30" />
            <Div className="row">
                {locations.map((location, index) => (
                    <Div key={index} className="col-lg-6 mb-4">
                        <Div
                            className="cs-card"
                            style={{
                                border: "2px solid #f0f0f0",
                                borderRadius: "10px",
                                padding: "30px",
                                height: "100%",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {data.show_map && location.latitude && location.longitude && (
                                <Div className="mb-4">
                                    <iframe
                                        src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                                        width="100%"
                                        height="250"
                                        style={{ border: 0, borderRadius: "8px" }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </Div>
                            )}
                            <h3 className="cs-accent_color mb-3">{location.name}</h3>
                            <Div className="mb-3">
                                <Div className="d-flex align-items-start mb-2">
                                    <IonIcon
                                        icon={locationOutline}
                                        className="me-2 mt-1"
                                        style={{ fontSize: "20px" }}
                                    />
                                    <Div style={{ fontSize: "14px" }}>
                                        {location.address}, {location.city}
                                        {location.state && `, ${location.state}`}
                                        <br />
                                        {location.country}
                                        {location.postal_code && ` - ${location.postal_code}`}
                                    </Div>
                                </Div>
                                {data.show_phone && location.phone && (
                                    <Div className="d-flex align-items-center mb-2">
                                        <IonIcon
                                            icon={callOutline}
                                            className="me-2"
                                            style={{ fontSize: "20px" }}
                                        />
                                        <a
                                            href={`tel:${location.phone}`}
                                            style={{ fontSize: "14px" }}
                                        >
                                            {location.phone}
                                        </a>
                                    </Div>
                                )}
                                {data.show_email && location.email && (
                                    <Div className="d-flex align-items-center mb-2">
                                        <IonIcon
                                            icon={mailOutline}
                                            className="me-2"
                                            style={{ fontSize: "20px" }}
                                        />
                                        <a
                                            href={`mailto:${location.email}`}
                                            style={{ fontSize: "14px" }}
                                        >
                                            {location.email}
                                        </a>
                                    </Div>
                                )}
                            </Div>
                            {location.description && (
                                <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                                    {location.description}
                                </p>
                            )}
                            {location.latitude && location.longitude && (
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cs-text_btn"
                                >
                                    <IonIcon icon={navigateOutline} className="me-2" />
                                    <span>Get Directions</span>
                                </a>
                            )}
                        </Div>
                    </Div>
                ))}
            </Div>
            {locations.length === 0 && (
                <Div className="text-center">
                    <p>No locations available at the moment.</p>
                </Div>
            )}
        </Div>
    );
}
