import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";

export default function WhyChooseUs2({whyChooseUs}){
    return(
        <div className="container">
            <div className="row align-items-center ">
                <div className="col-lg-5">
                    {whyChooseUs.image ? (
                        <img
                            src={whyChooseUs.image}
                            alt="About"
                            className="w-100 cs-radius_5"
                        />
                    ) : null}
                </div>
                <div className="col-lg-6 offset-lg-1">
                    <div className="cs-height_0 cs-height_lg_40" />
                    <SectionHeading
                        title={whyChooseUs.title}
                        subtitle={whyChooseUs.sub_title}
                        btnText={whyChooseUs.action_text}
                        btnLink={whyChooseUs.action_url}
                    >
                        <Spacing lg="30" md="20" />
                        <p dangerouslySetInnerHTML={{__html: whyChooseUs.description}}></p>
                    </SectionHeading>
                </div>
            </div>
        </div>
    )
}
