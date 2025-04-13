import WhyChooseUs1 from "@/Frontend/Components/WhyChooseUs/WhyChooseUs1";
import WhyChooseUs2 from "@/Frontend/Components/WhyChooseUs/WhyChooseUs2";

export default function WhyChooseUsSection({sections_data}){
    const whyChooseUs = sections_data.why_choose_us;
    const layout = whyChooseUs.layout ?? "1";
    // conditionally rendering
    let section_data = null;
    if (layout === "1"){
        section_data = <WhyChooseUs1 whyChooseUs={whyChooseUs}/>
    } else{
        section_data = <WhyChooseUs2 whyChooseUs={whyChooseUs}/>
    }
    return (
        <>
            {section_data}
        </>
    )
}
