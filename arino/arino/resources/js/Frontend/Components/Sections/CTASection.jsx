import Div from "@/Frontend/Components/Div.jsx";
import Cta from "@/Frontend/Components/Cta/index.jsx";
import Cta2 from "@/Frontend/Components/Cta/Cta2";

export default function CTASection({sections_data}){
    const ctaSection = sections_data.cta_section;
    // conditional render
    let sections;
    if (ctaSection.layout === "1"){
        sections = <Div className="container">
                <Cta
                    title={ctaSection.title}
                    btnText={ctaSection.action_text}
                    btnLink={ctaSection.action_url}
                    bgSrc={ctaSection.background_image_url}
                />
            </Div>
    } else if(ctaSection.layout === "2") {
        sections = <Cta2
            title={ctaSection.title}
            bgSrc={ctaSection.background_image_url}
            variant="rounded-0"
        />
    } else if(ctaSection.layout === "3"){
        sections = <Cta
            title={ctaSection.title}
            btnText={ctaSection.action_text}
            btnLink={ctaSection.action_url}
            bgSrc={ctaSection.background_image_url}
            variant="cs-type_1"
        />
    }
    return(
        <>
            {sections}
        </>
    )
}
