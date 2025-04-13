import {useSelector} from "react-redux";
import Faq1 from "@/Frontend/Components/Faq/Faq1";
import Faq2 from "@/Frontend/Components/Faq/Faq2";

export default function FaqSection({sections_data}){
    const layout = sections_data.faq_section.layout;
    const faq_data = sections_data.faq_section;


    // conditional render
    let section = ""
    if (layout === "1"){
        section = <Faq1 faq_data={faq_data} />
    } else if(layout === "2"){
        section = <Faq2 faq_data={faq_data} />
    }
    return (
        <>
            {section}
        </>
    )
}
