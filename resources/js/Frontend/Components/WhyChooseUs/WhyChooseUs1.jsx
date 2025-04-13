import Div from "@/Frontend/Components/Div";
import Spacing from "@/Frontend/Components/Spacing";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function WhyChooseUs1({whyChooseUs}){
    return(
        <Div className="container">
            <Div className="row">
                <Div className="col-xl-5 col-lg-6">
                    <Div className="cs-image_layer cs-style1">
                        <Div className="cs-image_layer_in">
                            {whyChooseUs.image ? (
                                <img
                                    src={whyChooseUs.image}
                                    alt="About"
                                    className="w-100 cs-radius_15"
                                />
                            ) : null}
                        </Div>
                    </Div>
                    <Spacing lg="0" md="40" />
                </Div>
                <Div className="col-xl-5 offset-xl-1 col-lg-6">
                    <SectionHeading
                        title={whyChooseUs.title}
                        subtitle={whyChooseUs.sub_title}
                    >
                        <Spacing lg="30" md="20" />
                        <p className="cs-m0" dangerouslySetInnerHTML={{__html: whyChooseUs.description}}></p>
                        <Spacing lg="30" md="30" />
                        <Div className="cs-separator cs-accent_bg"></Div>
                        <Spacing lg="25" md="0" />
                    </SectionHeading>
                </Div>
            </Div>
        </Div>
    )
}
