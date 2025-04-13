import React from "react";
import Div from "../Div";
import Slider from "react-slick";
import PortfolioItem from "@/Frontend/Components/Portfolio/PortfolioItem";

export default function PortfolioSlider({ portfolios }) {
    /** Slider Settings **/
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings} className="cs-slider cs-style3 cs-gap-24">
            {portfolios.map((item, index) => (
                <Div key={index}>
                    <PortfolioItem
                        title={item.title}
                        subtitle={item.action_text}
                        href={item.action_url}
                        src={item.thumbnail_image}
                    />
                </Div>
            ))}
        </Slider>
    );
}
