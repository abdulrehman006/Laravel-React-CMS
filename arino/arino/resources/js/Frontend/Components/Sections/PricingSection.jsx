import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import PricingTableList from "@/Frontend/Components/PricingTable/PricingTableList";

export default function PricingSection({sections_data}){
    const pricingSection = sections_data.pricing_section
    return(
        <>
            <Div className="container">
                <SectionHeading
                    title={pricingSection.title}
                    subtitle={pricingSection.sub_title}
                />
                <Spacing lg="85" md="40" />
                <PricingTableList pricing_data={pricingSection} />
            </Div>
        </>
    )
}
