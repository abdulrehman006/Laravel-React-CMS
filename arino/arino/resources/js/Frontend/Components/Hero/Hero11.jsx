import React from 'react';
import Button from '../Button';
import SocialWidget from '../Widget/SocialWidget';

export default function Hero11({
    data,
   }) {
    return (
        <div className="cs-hero cs-style8 cs-shape_wrap_1" id="home">
            <div className="cs-shape_1" />
            <div className="container">
                <div className="cs-hero_img_box">
                    <img src={data.hero_image} alt="Hero" />
                    <div className="cs-hero_card cs-position_1">
                        <h3 className="mb-0">{data.experience_year}</h3>
                        <p className="mb-0">{data.experience_title}</p>
                    </div>
                    <div className="cs-hero_card cs-position_2">
                        <h3 className="mb-0">{data.project_complete}</h3>
                        <p className="mb-0">{data.project_complete_title}</p>
                    </div>
                </div>
                <div className="cs-height_0 cs-height_lg_50" />
                <div className="cs-hero_text">
                    <h2 className="cs-hero_intro_title" dangerouslySetInnerHTML={{__html: data.intro_title}}></h2>
                    <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: data.title}}></h1>
                    <div className="cs-hero_subtitle" dangerouslySetInnerHTML={{__html: data.sub_title}}></div>
                    <SocialWidget />
                    <div className="cs-hero_btn">
                        <Button btnLink={data.action_url} btnText={data.action_text} />
                    </div>
                </div>
            </div>
        </div>
    );
}
