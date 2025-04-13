import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Accordion from "@/Frontend/Components/Accordion";
import {useSelector} from "react-redux";

export default function Faq1({faq_data}){
    return(
        <>
            <Div className="container cs-shape_wrap_4">
                <Div className="cs-shape_4"></Div>
                <Div className="cs-shape_4"></Div>
                <Div className="container">
                    <Div className="row">
                        <Div className="col-xl-5 col-lg-6">
                            <SectionHeading
                                title={faq_data.title}
                                subtitle={faq_data.sub_title}
                            />
                            <Spacing lg='90' md='45'/>
                        </Div>
                        <Div className="col-lg-6 offset-xl-1">
                            <Accordion faqs={faq_data.faqs}/>
                        </Div>
                    </Div>
                </Div>
            </Div>
        </>
    )
}
