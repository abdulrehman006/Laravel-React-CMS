import React from 'react';
import VerticalLinks from '../VerticalLinks';
import NavigationLink from "@/Components/NavigationLink";

export default function Hero8({data}) {
    return (
        <div
            className="cs-hero cs-style3 cs-type1 cs-bg cs-fixed_bg cs-shape_wrap_1"
            style={{ backgroundImage: `url(${data.background_image_url})` }}
            id="home"
        >
            <div className="container">
                <div className="cs-hero_text">
                    <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: data.title}}></h1>
                    <div className="cs-hero_subtitle" dangerouslySetInnerHTML={{__html: data.sub_title}}></div>
                    <NavigationLink href={data.action_url} className="cs-btn cs-style1 cs-type1">
                        <span>{data.action_text}</span>
                        <svg
                            width={26}
                            height={12}
                            viewBox="0 0 26 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M25.5303 6.53033C25.8232 6.23744 25.8232 5.76256 25.5303 5.46967L20.7574 0.696699C20.4645 0.403806 19.9896 0.403806 19.6967 0.696699C19.4038 0.989593 19.4038 1.46447 19.6967 1.75736L23.9393 6L19.6967 10.2426C19.4038 10.5355 19.4038 11.0104 19.6967 11.3033C19.9896 11.5962 20.4645 11.5962 20.7574 11.3033L25.5303 6.53033ZM0 6.75H25V5.25H0V6.75Z"
                                fill="currentColor"
                            />
                        </svg>
                    </NavigationLink>
                </div>
            </div>
            <div className="cs-hero_highlite cs-primary_color cs-accent_color cs-center">
                {data.highlight_letter}
                <div className="cs-round_img cs-center">
                    <img src="/static/hero_img.svg" alt="Circle" />
                </div>
            </div>
            <VerticalLinks
                data={data.social_links.links}
                title={data.social_links.title}
                variant="cs-left_side"
            />
        </div>
    );
}
