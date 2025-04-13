import WorkingProgress from "@/Frontend/Components/WorkingProgress/WorkingProgress";

export default function WorkingProgressSection({sections_data}){
    const workingProgress = sections_data.working_progress_section ?? {};
    return(
        <WorkingProgress sectionData={workingProgress} />
    )
}
