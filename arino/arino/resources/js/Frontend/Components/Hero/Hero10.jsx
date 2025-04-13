import React from 'react';
import Button from '../Button';

export default function Hero10({
       data
   }) {
    return (
        <div className="cs-hero cs-style7" id="home">
            <div className="container">
                <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: data.title}}></h1>
            </div>
            <div className="container">
                <div className="cs-hero_text_in">
                    <div className="cs-hero_subtitle" dangerouslySetInnerHTML={{__html: data.sub_title}}></div>
                    <div className="cs-hero_btn">
                        <Button btnLink={data.action_url} btnText={data.action_text} />
                    </div>
                </div>
            </div>
            <div className="cs-hero_img_1">
                <img src="/static/hero_img_2.png" alt="Hero Img" />
            </div>
            <div className="cs-hero_img_2">
                <img src="/static/hero_img_3.png" alt="Hero Img" />
            </div>
            <div className="cs-hero_img_3">
                <img src="/static/hero_img_4.png" alt="Hero Img" />
            </div>
        </div>
    );
}
