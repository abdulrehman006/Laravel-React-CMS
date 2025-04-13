import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import IconBox from "@/Frontend/Components/IconBox";

export default function WorkingProgress({sectionData}){
    return(
        <Div className="container">
            <SectionHeading
                title={sectionData.title}
                subtitle={sectionData.sub_title}
                variant="cs-style1 text-center"
            />
            <Spacing lg="90" md="45" />
            <Div className="row">
                {sectionData.progress_box?.map((item, index) => (
                    <Div className="col-lg-4" key={index}>
                        <IconBox
                            icon={item.icon}
                            title={item.title}
                            subtitle={item.description}
                        />
                        <Spacing lg="30" md="30" />
                    </Div>
                ))}
            </Div>
        </Div>
    )
}
