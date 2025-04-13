import React from "react";
import Slider from "react-slick";
import Div from "../Div";
import Post from "../Post";
import moment from "moment";

export default function PostSlider() {
    const blogs = window.blogs;

    /** Slider Settings **/
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings} className="cs-gap-24">
            {blogs.map((item, index) => (
                <Div key={index}>
                    <Post
                        url={route("blog.show", item.slug)}
                        src={item.thumbnail_image_url}
                        alt="Post"
                        date={moment(item.created_at).format("ll")}
                        title={item.title}
                    />
                </Div>
            ))}
        </Slider>
    );
}
