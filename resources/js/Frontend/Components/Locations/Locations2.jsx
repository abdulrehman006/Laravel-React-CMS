import { IonIcon } from "@ionic/react";
import { callOutline, mailOutline, locationOutline } from "ionicons/icons";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function Locations2({ data, locations }) {
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
            {locations.map((location, index) => (
                <Div key={index} className="row align-items-center mb-5">
                    {location.image && (
                        <Div className="col-lg-5">
                            <Div className="cs-radius_15 cs-shine_hover_1">
                                <img
                                    src={location.image_url}
                                    alt={location.name}
                                    className="cs-radius_15 w-100"
                                    style={{
                                        height: "300px",
                                        objectFit: "cover",
                                    }}
                                />
                            </Div>
                            <Div className="cs-height_0 cs-height_lg_40" />
                        </Div>
                    )}
                    <Div className={location.image ? "col-lg-7" : "col-lg-12"}>
                        <Div className="cs-section_heading cs-style1">
                            <h2 className="cs-section_title">{location.name}</h2>
                            <Div className="cs-height_10 cs-height_lg_10" />
                            <Div className="cs-separator cs-accent_bg" />
                            <Div className="cs-height_25 cs-height_lg_25" />
                        </Div>
                        <Div className="row">
                            <Div className="col-lg-6">
                                <Div className="d-flex align-items-start mb-3">
                                    <IonIcon
                                        icon={locationOutline}
                                        className="me-3 mt-1"
                                        style={{ fontSize: "24px", color: "var(--accent)" }}
                                    />
                                    <Div>
                                        <strong>Address:</strong>
                                        <br />
                                        {location.address}
                                        <br />
                                        {location.city}
                                        {location.state && `, ${location.state}`}
                                        <br />
                                        {location.country}
                                        {location.postal_code && ` - ${location.postal_code}`}
                                    </Div>
                                </Div>
                            </Div>
                            <Div className="col-lg-6">
                                {data.show_phone && location.phone && (
                                    <Div className="d-flex align-items-center mb-3">
                                        <IonIcon
                                            icon={callOutline}
                                            className="me-3"
                                            style={{ fontSize: "24px", color: "var(--accent)" }}
                                        />
                                        <Div>
                                            <strong>Phone:</strong>
                                            <br />
                                            <a href={`tel:${location.phone}`}>
                                                {location.phone}
                                            </a>
                                        </Div>
                                    </Div>
                                )}
                                {data.show_email && location.email && (
                                    <Div className="d-flex align-items-center mb-3">
                                        <IonIcon
                                            icon={mailOutline}
                                            className="me-3"
                                            style={{ fontSize: "24px", color: "var(--accent)" }}
                                        />
                                        <Div>
                                            <strong>Email:</strong>
                                            <br />
                                            <a href={`mailto:${location.email}`}>
                                                {location.email}
                                            </a>
                                        </Div>
                                    </Div>
                                )}
                            </Div>
                        </Div>
                        {location.description && (
                            <>
                                <Div className="cs-height_20 cs-height_lg_20" />
                                <p>{location.description}</p>
                            </>
                        )}
                        {data.show_map && location.latitude && location.longitude && (
                            <Div className="mt-3">
                                <a
                                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cs-btn cs-style1"
                                >
                                    <span>View on Google Maps</span>
                                </a>
                            </Div>
                        )}
                    </Div>
                    {index < locations.length - 1 && (
                        <Div className="cs-height_100 cs-height_lg_60" />
                    )}
                </Div>
            ))}
            {locations.length === 0 && (
                <Div className="text-center">
                    <p>No locations available at the moment.</p>
                </Div>
            )}
        </Div>
    );
}
