import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function About1({about_data}){
    return(
        <>
            <Div className="container">
                <Div className="row align-items-center cs-column_reverse_lg">
                    <Div className="col-lg-5">
                        <Div className="cs-radius_15 cs-shine_hover_1">
                            <img
                                src={about_data.about_image}
                                alt="About"
                                className="cs-w100 cs-radius_5"
                            />
                        </Div>
                    </Div>
                    <Div className="col-lg-6 offset-lg-1">
                        <SectionHeading
                            title={about_data.title}
                            subtitle={about_data.sub_title}
                            btnText={about_data.action_text}
                            btnLink={about_data.action_url}
                        />
                        <Spacing lg="0" md="40" />
                    </Div>
                </Div>
            </Div>
        </>
    )
}
