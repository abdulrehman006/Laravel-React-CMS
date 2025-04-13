import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import VideoModal from "@/Frontend/Components/VideoModal/index";
export default function Video1({video_data}){
    return(
        <>
            <Div className="container">
                <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
                    {video_data.title}
                </h2>
                <Spacing lg="70" md="70" />
                <VideoModal
                    videoSrc={video_data.video_url}
                    bgUrl={video_data.thumbnail_image_url}
                />
            </Div>
        </>
    )
}
