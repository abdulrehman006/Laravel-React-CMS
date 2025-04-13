import React from "react";
import { Icon } from "@iconify/react";
import Div from "../Div";

export default function Team({
    memberImage,
    memberName,
    memberDesignation,
    facebook_link,
    twitter_link,
    instagram_link,
    linkedin_link,
}) {
    return (
        <Div className="cs-team cs-style1">
            <Div className="cs-member_thumb">
                <img src={memberImage} alt={memberName} />
                <Div className="cs-member_overlay" />
            </Div>
            <Div className="cs-member_info">
                <h2 className="cs-member_name">{memberName}</h2>
                <Div className="cs-member_designation">{memberDesignation}</Div>
            </Div>
            <Div className="cs-member_social cs-primary_color">
                {linkedin_link && (
                    <a href={linkedin_link} target="_blank">
                        <Icon icon="fa6-brands:linkedin-in" />
                    </a>
                )}
                {twitter_link && (
                    <a href={twitter_link} target="_blank">
                        <Icon icon="fa-brands:twitter" />
                    </a>
                )}
                {instagram_link && (
                    <a href={instagram_link} target="_blank">
                        <Icon icon="fa-brands:instagram" />
                    </a>
                )}
                {facebook_link && (
                    <a href={facebook_link} target="_blank">
                        <Icon icon="fa-brands:facebook-f" />
                    </a>
                )}
            </Div>
        </Div>
    );
}
