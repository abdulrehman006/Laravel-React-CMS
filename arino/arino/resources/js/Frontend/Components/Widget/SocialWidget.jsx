import React from "react";
import { Icon } from "@iconify/react";
import Div from "../Div";
import { useSelector } from "react-redux";

export default function SocialWidget() {
    const socialLink = useSelector((state) => state.customize.social_links);
    return (
        <Div className="cs-social_btns cs-style1">
            {socialLink.facebook_url && (
                <a
                    href={socialLink.facebook_url}
                    className="cs-center"
                    target="_blank"
                >
                    <Icon icon="fa6-brands:facebook" />
                </a>
            )}
            {socialLink.linkedin_url && (
                <a
                    className="cs-center"
                    href={socialLink.linkedin_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:linkedin-in" />
                </a>
            )}
            {socialLink.twitter_url && (
                <a
                    className="cs-center"
                    href={socialLink.twitter_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:twitter" />
                </a>
            )}
            {socialLink.youtube_url && (
                <a
                    className="cs-center"
                    href={socialLink.youtube_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:youtube" />
                </a>
            )}
            {socialLink.slack_url && (
                <a
                    className="cs-center"
                    href={socialLink.slack_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:slack" />
                </a>
            )}
            {socialLink.whatsapp_url && (
                <a
                    className="cs-center"
                    href={socialLink.whatsapp_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:whatsapp" />
                </a>
            )}
            {socialLink.telegram_url && (
                <a
                    className="cs-center"
                    href={socialLink.telegram_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:telegram" />
                </a>
            )}
            {socialLink.instagram_url && (
                <a
                    className="cs-center"
                    href={socialLink.instagram_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:instagram" />
                </a>
            )}
            {socialLink.pinterest_url && (
                <a
                    className="cs-center"
                    href={socialLink.pinterest_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:pinterest" />
                </a>
            )}
            {socialLink.reddit_url && (
                <a
                    className="cs-center"
                    href={socialLink.reddit_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:reddit" />
                </a>
            )}
            {socialLink.snapchat_url && (
                <a
                    className="cs-center"
                    href={socialLink.snapchat_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:snapchat" />
                </a>
            )}
            {socialLink.tiktok_url && (
                <a
                    className="cs-center"
                    href={socialLink.tiktok_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:tiktok" />
                </a>
            )}
            {socialLink.tumblr_url && (
                <a
                    className="cs-center"
                    href={socialLink.tumblr_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:tumblr" />
                </a>
            )}
            {socialLink.vk_url && (
                <a
                    className="cs-center"
                    href={socialLink.vk_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:vk" />
                </a>
            )}
            {socialLink.discord_url && (
                <a
                    className="cs-center"
                    href={socialLink.discord_url}
                    target="_blank"
                >
                    <Icon icon="fa6-brands:discord" />
                </a>
            )}
        </Div>
    );
}
