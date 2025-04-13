import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import Button from "@/Frontend/Components/Button";
import { Icon } from '@iconify/react';
import Accordion from "@/Frontend/Components/Accordion";

export default function Faq2({faq_data}){
    const categories = faq_data.categories || []
    return(
        <>
            <Div className="container">
                <Div className="row">
                    <Div className="col-lg-4">
                        <Div className="cs-faq_nav cs-radius_15">
                            <h2 className="cs-faq_nav_title cs-m0">FAQ Category</h2>
                            <Div className="cs-height_30 cs-height_lg_30" />
                            <ul className="cs-list cs-style1 cs-mp0">
                                {categories.map((item) => (
                                    <li>
                                        <Button
                                            variant="cs-type2"
                                            btnLink={item.url}
                                            btnText={item.name}
                                            icon={
                                                <Icon icon="material-symbols:content-copy-outline-rounded" />
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Div>
                    </Div>
                    <Div className="col-lg-7 offset-lg-1">
                        <Spacing lg="0" md="40" />
                        <Accordion faqs={faq_data.faqs}/>
                    </Div>
                </Div>
            </Div>
        </>
    )
}
