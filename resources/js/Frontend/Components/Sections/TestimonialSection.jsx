import TestimonialSlider from "@/Frontend/Components/Slider/TestimonialSlider.jsx";
import Testimonial2 from "@/Frontend/Components/Testimonial/Testimonial2";
import Testimonial3 from "@/Frontend/Components/Testimonial/Testimonial3";
import Testimonial4 from "@/Frontend/Components/Testimonial/Testimonial4";

export default function TestimonialSection({sections_data}){
    const testimonialSection = sections_data.testimonial_section;
    const layout = testimonialSection.layout ?? "1";
    // conditional rendering
    let section = ""
    if (layout === "1"){
        section = <TestimonialSlider testimonial_data={testimonialSection} />;
    } else if(layout === "2"){
        section = <Testimonial2 testimonial_data={testimonialSection}/>
    } else if (layout === "3"){
        section = <Testimonial3 testimonial_data={testimonialSection} />
    } else if (layout === "4"){
        section = <Testimonial4 testimonial_data={testimonialSection} />
    }
    return(
        <>
            {section}
        </>
    )
}
