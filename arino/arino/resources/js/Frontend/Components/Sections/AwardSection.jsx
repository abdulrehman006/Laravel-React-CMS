import Spacing from "@/Frontend/Components/Spacing/index.jsx";
import Div from "@/Frontend/Components/Div.jsx";
import SectionHeading from "@/Frontend/Components/SectionHeading/index.jsx";
import TimelineSlider from "@/Frontend/Components/Slider/TimelineSlider.jsx";

export default function AwardSection({sections_data}) {
    const awardSection = sections_data.award_section;
    return(
        <>
            <Div className="cs-shape_wrap_2">
                <Div className="cs-shape_2">
                    <Div />
                </Div>
                <Div className="container">
                    <Div className="row">
                        <Div className="col-xl-4">
                            <SectionHeading
                                title={awardSection.title}
                                subtitle={awardSection.sub_title}
                                variant="cs-style1"
                            />
                            <Spacing lg="90" md="45" />
                        </Div>
                        <Div className="col-xl-7 offset-xl-1">
                            <TimelineSlider data={awardSection} />
                        </Div>
                    </Div>
                </Div>
            </Div>
        </>
    )
}
