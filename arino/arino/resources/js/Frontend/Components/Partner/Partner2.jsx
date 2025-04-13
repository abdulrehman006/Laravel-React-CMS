import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import LogoList from "@/Frontend/Components/LogoList";

export default function Partner2({partner_data}){
    return(
        <>
            <Div className="container">
                <SectionHeading
                    title={partner_data.title}
                    subtitle={partner_data.sub_title}
                    variant="cs-style1 text-center"
                />
                <Spacing lg="70" md="45" />
                <LogoList partner_data={partner_data} />
            </Div>
        </>
    )
}
