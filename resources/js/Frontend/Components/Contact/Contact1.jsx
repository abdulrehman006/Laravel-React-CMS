import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import ContactForm from "@/Frontend/Components/Contact/ContactForm";

export default function Contact1({contact_data}) {
    return (
        <>
            <Div className="container">
                <SectionHeading
                    title={contact_data.title}
                    subtitle={contact_data.sub_title}
                    variant="cs-style1 text-center"
                />
                <Spacing lg="90" md="45" />
            </Div>
            <Div className="cs-gradient_bg_1">
                <Div className="container">
                    <Div className="row">
                        <Div className="col-xl-5 col-lg-6">
                            <Spacing lg="100" md="80" />
                            <ContactForm />
                            <Spacing lg="100" md="60" />
                        </Div>
                        <Div className="col-lg-6 offset-xl-1">
                            <Div
                                className="cs-google_map cs-type1 cs-bg"
                                data-src="assets/img/map_img_1.jpeg"
                            >
                                <iframe
                                    src={contact_data.map_iframe_url}
                                    allowFullScreen
                                    title="Google Map"
                                />
                            </Div>
                            <Spacing lg="0" md="80" />
                        </Div>
                    </Div>
                </Div>
            </Div>
        </>
    );
}
