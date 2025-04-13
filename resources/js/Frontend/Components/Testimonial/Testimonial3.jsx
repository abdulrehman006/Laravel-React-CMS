import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import TestimonialSliderStyle3 from "@/Frontend/Components/Testimonial/TestimonialSliderStyle3";

export default function Testimonial3({testimonial_data}){
    return(
        <section>
            <div className="container">
                <SectionHeading
                    title={testimonial_data.title}
                    subtitle={testimonial_data.sub_title}
                    variant="cs-style1 text-center"
                />
                <Spacing lg="90" md="45" />
                <TestimonialSliderStyle3 />
            </div>
        </section>
    )
}
