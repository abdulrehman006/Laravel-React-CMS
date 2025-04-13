import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import Team from "@/Frontend/Components/Team/index";
import React from "react";

export default function Team2({data}){
    const teams = window.teams;
    return(
        <Div className="container">
            <SectionHeading
                title={data.title}
                subtitle={data.sub_title}
                variant="cs-style1 text-center"
            />
            <Spacing lg="90" md="45" />
            <Div className="row">
                {teams.map((item, index) => (
                    <Div key={index} className="col-lg-3 col-sm-6">
                        <Team
                            memberImage={item.image_url}
                            memberName={item.name}
                            memberDesignation={item.designation}
                            facebook_link={item.facebook_url}
                            twitter_link={item.twitter_url}
                            instagram_link={item.instagram_url}
                            linkedin_link={item.linkedin_url}
                        />
                        <Spacing lg="80" md="30" />
                    </Div>
                ))}
            </Div>
        </Div>
    )
}
