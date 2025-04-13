import Div from "@/Frontend/Components/Div";
import Spacing from "@/Frontend/Components/Spacing";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import VideoModal from "@/Frontend/Components/VideoModal/index";

export default function Video2({video_data}){
    return(
        <Div className="cs-shape_wrap_4">
            <Div className="cs-shape_4"></Div>
            <Div className="cs-shape_4"></Div>
            <Spacing lg="150" md="80" />
            <Div className="container">
                <Div className="row">
                    <Div className="col-lg-5 col-xl-4">
                        <SectionHeading
                            title={video_data.title}
                            subtitle={video_data.sub_title}
                            btnText={video_data.action_text}
                            btnLink={video_data.action_url}
                        />
                        <Spacing lg="45" md="45" />
                    </Div>
                    <Div className="col-lg-7 offset-xl-1">
                        <Div className="cs-half_screen">
                            <VideoModal
                                videoSrc={video_data.video_url}
                                bgUrl={video_data.thumbnail_image_url}
                                variant="cs-style1 cs-size1"
                            />
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}
