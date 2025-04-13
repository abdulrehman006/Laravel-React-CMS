import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from '@iconify/react';
import React from "react";
import ContactForm from "@/Frontend/Components/Contact/ContactForm";


export default function Contact2({contact_data}){
    return(
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
                            ) : null }

                            {contact_data.address ? (
                                <li>
                                    <span className='cs-accent_color'><Icon icon="mdi:map-marker" /></span>
                                    {contact_data.address}
                                </li>
                            ) : null }
                        </ul>
                        <Spacing lg="0" md="50" />
                    </Div>
                    <Div className="col-lg-6">
                        <ContactForm />
                    </Div>
                </Div>
            </Div>
            <Spacing lg="150" md="80" />
            {contact_data.map_iframe_url ? (
                <Div className="cs-google_map">
                    <iframe
                        src={contact_data.map_iframe_url}
                        allowFullScreen
                        title="Google Map"
                    />
                </Div>
            ) : null}
        </>
    )
}
