import Resume from "@/Frontend/Components/Resume/Resume";

export default function ResumeSection({sections_data}){
    const resume = sections_data.resume_section ?? {};
    return(
        <Resume section_data={resume} />
    )
}
