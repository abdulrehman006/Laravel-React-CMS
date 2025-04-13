import React from 'react';
import Div from '../Div';
import Slider from 'react-slick';
import TestimonialStyle2 from '../Testimonial/TestimonialStyle2';
export default function TestimonialSliderStyle3() {
    const testimonials = window.testimonials;
    /** Slider Settings **/
    const settings = {
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <Slider {...settings} className="cs-slider cs-gap-24">
            {testimonials.map((item, index) => (
                <Div key={index}>
                    <TestimonialStyle2
                        avatarImgUrl={item.client_image_url}
                        avatarName={item.name}
                        avatarDesignation={item.designation}
                        testimonialText={item.review_description}
                        ratings={item.rating_count}
                    />
                </Div>
            ))}
        </Slider>
    );
}
