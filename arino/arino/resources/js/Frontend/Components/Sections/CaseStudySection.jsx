import Spacing from "@/Frontend/Components/Spacing";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import CaseStudy from "@/Frontend/Components/CaseStudy";
import Div from "@/Frontend/Components/Div";

export default function CaseStudySection({sections_data}){
    const caseStudySection = sections_data.case_study_section;
    const caseStudies = caseStudySection.caseStudies
    return(
       <>
           <Div className="container">
               <SectionHeading
                   title={caseStudySection.title}
                   subtitle={caseStudySection.sub_title}
                   variant="cs-style1 text-center"
               />
               <Spacing lg="90" md="45" />
           </Div>
           {caseStudies.map((item, index) => (
               <CaseStudy
                   key={index}
                   title={item.title}
                   bgUrl="/static/case_study_2.jpeg"
                   href={item.url}
                   variant={index === 0 || index === 2 ? "cs-style2" : ""}
               />
           ))}
       </>
    )
}
