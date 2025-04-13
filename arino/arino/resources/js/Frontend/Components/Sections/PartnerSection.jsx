import Partner1 from "@/Frontend/Components/Partner/Partner1";
import Partner2 from "@/Frontend/Components/Partner/Partner2";

export default function PartnerSection({sections_data}){
    const partnerSectionLayout = sections_data.partner_section.layout;

    // conditional rendering
    let layout = ''
    if (partnerSectionLayout === "1"){
        layout = <Partner1 partner_data={sections_data.partner_section} />
    } else if(partnerSectionLayout === "2"){
        layout = <Partner2 partner_data={sections_data.partner_section} />
    }
    return(
        <>
            {layout}
        </>
    )
}
