import SectionHeading from "@/Frontend/Components/SectionHeading";
import TestimonialSliderStyle4 from "@/Frontend/Components/Testimonial/TestimonialSliderStyle4";

export default function Testimonial4({testimonial_data}){
    return(
        <section>
            <div className="container">
                <SectionHeading
                    title={testimonial_data.title}
                    subtitle={testimonial_data.sub_title}
                />
                <div className="cs-height_90 cs-height_lg_45" />
                <TestimonialSliderStyle4 />
            </div>
        </section>
    )
}
