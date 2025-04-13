import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import TeamSlider from "@/Frontend/Components/Slider/TeamSlider";
import Div from "@/Frontend/Components/Div";

export default function Team1({data}) {
    return(
        <Div className="container">
            <SectionHeading
                title={data.title}
                subtitle={data.sub_title}
                variant="cs-style1"
            />
            <Spacing lg="85" md="45" />
            <TeamSlider />
        </Div>
    )
}
