import Contact1 from "@/Frontend/Components/Contact/Contact1";
import Contact2 from "@/Frontend/Components/Contact/Contact2";
import Contact3 from "@/Frontend/Components/Contact/Contact3";

export default function ContactSection({sections_data}){
    const contactSection = sections_data.contact_section;
    // conditional rendering
    let section = ""
    if (contactSection.layout === "1"){
        section = <Contact1 contact_data={contactSection} />
    } else if(contactSection.layout === "2"){
        section = <Contact2 contact_data={contactSection} />
    } else if(contactSection.layout === "3"){
        section = <Contact3 contact_data={contactSection} />
    }
    return(
        <>
            {section}
        </>
    )
}
