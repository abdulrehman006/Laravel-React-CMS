import { IonIcon } from "@ionic/react";
import { callOutline, mailOutline, locationOutline } from "ionicons/icons";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function Locations1({ data, locations }) {
    return (
        <Div className="container">
            <SectionHeading title={data.title} subtitle={data.sub_title} variant="cs-style1" />
            {data.description && (
                <Div className="cs-height_20 cs-height_lg_20" />
            )}
            {data.description && (
                <p className="text-center mb-5">{data.description}</p>
            )}
            <Div className="row">
                {locations.map((location, index) => (
                    <Div key={index} className="col-lg-4 col-md-6 mb-4">
                        <Div className="cs-card cs-style1">
                            {location.image && (
                                <Div className="cs-card_thumb">
                                    <img
                                        src={location.image_url}
                                        alt={location.name}
                                        className="w-100"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "8px 8px 0 0",
                                        }}
                                    />
                                </Div>
                            )}
                            <Div className="cs-card_body">
                                <h3 className="cs-card_title">{location.name}</h3>
                                <Div className="cs-card_subtitle">
                                    <IonIcon icon={locationOutline} className="me-2" />
                                    {location.address}, {location.city}
                                    <br />
                                    {location.state && `${location.state}, `}
                                    {location.country}
                                    {location.postal_code && ` - ${location.postal_code}`}
                                </Div>
                                <Div className="cs-height_15 cs-height_lg_15" />
                                {data.show_phone && location.phone && (
                                    <Div className="cs-card_info">
                                        <IonIcon icon={callOutline} className="me-2" />
                                        <a href={`tel:${location.phone}`}>{location.phone}</a>
                                    </Div>
                                )}
                                {data.show_email && location.email && (
                                    <Div className="cs-card_info">
                                        <IonIcon icon={mailOutline} className="me-2" />
                                        <a href={`mailto:${location.email}`}>{location.email}</a>
                                    </Div>
                                )}
                                {location.description && (
                                    <>
                                        <Div className="cs-height_15 cs-height_lg_15" />
                                        <p className="cs-m0">{location.description}</p>
                                    </>
                                )}
                                {data.show_map &&
                                    location.latitude &&
                                    location.longitude && (
                                        <Div className="mt-3">
                                            <a
                                                href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cs-text_btn"
                                            >
                                                <span>View on Map</span>
                                            </a>
                                        </Div>
                                    )}
                            </Div>
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
