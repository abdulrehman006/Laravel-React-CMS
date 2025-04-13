import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import PostSlider from "@/Frontend/Components/Slider/PostSlider";
export default function Blog1({blog_data}){
    return(
        <>
            <Div className="cs-shape_wrap_4">
                <Div className="cs-shape_4"></Div>
                <Div className="cs-shape_4"></Div>
                <Div className="container">
                    <Div className="row">
                        <Div className="col-xl-4">
                            <SectionHeading
                                title={blog_data.title}
                                subtitle={blog_data.sub_title}
                                btnText={blog_data.action_text}
                                btnLink="/blog"
                            />
                            <Spacing lg="90" md="45" />
                        </Div>
                        <Div className="col-xl-7 offset-xl-1">
                            <Div className="cs-half_of_full_width">
                                <PostSlider />
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>
        </>
    )
}
