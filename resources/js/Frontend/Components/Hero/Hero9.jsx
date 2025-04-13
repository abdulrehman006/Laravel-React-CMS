import React, { useState } from 'react';
import Button from '../Button';
import Div from '../Div';

export default function Hero9({
      data
  }) {
    const [iframeSrc, setIframeSrc] = useState('about:blank');
    const [toggle, setToggle] = useState(false);
    const handelClick = () => {
        const video = data.youtube_link?.split('?v=')[1].trim();
        setIframeSrc(`https://www.youtube.com/embed/${video}`);
        setToggle(!toggle);
    };
    const handelClose = () => {
        setIframeSrc('about:blank');
        setToggle(!toggle);
    };
    return (
        <>
            <div
                className="cs-hero cs-style6 cs-bg cs-fixed_bg"
                style={{ backgroundImage: `url(${data.background_image_url})` }}
                id="home"
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-7 col-lg-6">
                            <div className="cs-hero_text">
                                <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: data.title}}></h1>
                                <div className="cs-hero_subtitle" dangerouslySetInnerHTML={{__html: data.sub_title}}></div>
                                <Button btnLink={data.action_url} btnText={data.action_text} />
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6">
                            <div className="cs-height_0 cs-height_lg_50" />
                            <div className="cs-hero_img">
                                <img src={data.hero_image} alt="Thumb" />
                                <span
                                    className="cs-hero_video_btn cs-center"
                                    onClick={handelClick}
                                >
                  <img src="/static/hero_img.svg" alt="Circle" />
                  <svg
                      width={25}
                      height={32}
                      viewBox="0 0 25 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0V31.8177L24.5967 15.9088L0 0Z" fill="white" />
                  </svg>
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Div className={toggle ? 'cs-video_popup active' : 'cs-video_popup'}>
                <Div className="cs-video_popup_overlay" />
                <Div className="cs-video_popup_content">
                    <Div className="cs-video_popup_layer" />
                    <Div className="cs-video_popup_container">
                        <Div className="cs-video_popup_align">
                            <Div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    src={iframeSrc}
                                    title="video modal"
                                />
                            </Div>
                        </Div>
                        <Div className="cs-video_popup_close" onClick={handelClose} />
                    </Div>
                </Div>
            </Div>
        </>
    );
}
