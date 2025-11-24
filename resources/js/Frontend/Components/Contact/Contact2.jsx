import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from '@iconify/react';
import React from "react";
import ContactForm from "@/Frontend/Components/Contact/ContactForm";
import ContactLocations from "@/Frontend/Components/Locations/ContactLocations";
import { usePage } from "@inertiajs/react";

export default function Contact2({ contact_data }) {
    const { locations } = usePage().props;

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
                    <Spacing lg="30" md="20" />
                    <ContactLocations locations={locations || []} />
                    <Spacing lg="80" md="40" />
                </>
            )}
        </>
    );
}