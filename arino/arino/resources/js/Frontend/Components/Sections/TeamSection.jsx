import Team1 from "@/Frontend/Components/Team/Team1";
import Team2 from "@/Frontend/Components/Team/Team2";

export default function TeamSection({sections_data}){
    const teamSection = sections_data.our_team_section;
    // conditional rendering
    let sections;
    if (teamSection.layout === "1"){
        sections = <Team1 data={teamSection}/>
    } else{
        sections = <Team2 data={teamSection}/>
    }
    return(
        <>
            {sections}
        </>
    )
}
