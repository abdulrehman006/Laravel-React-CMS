import About1 from "@/Frontend/Components/About/About1";
import About2 from "@/Frontend/Components/About/About2";

export default function AboutSection({sections_data}){
    const aboutSection = sections_data.about_section;
    // conditional rendering
    let section = "";
    if (aboutSection.layout === "1"){
        section = <About1 about_data={aboutSection} />
    } else if(aboutSection.layout === "2"){
        section = <About2 about_data={aboutSection} />
    }
    return(
        <>
            {section}
        </>
    )
}
