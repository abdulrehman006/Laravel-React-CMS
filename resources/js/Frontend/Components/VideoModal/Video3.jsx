import Div from "@/Frontend/Components/Div";
import VideoModal from "@/Frontend/Components/VideoModal/index";

export default function Video3({video_data}){
    return(
        <Div className="cs-video_block_1_wrap">
            <Div className="container">
                <VideoModal
                    videoSrc={video_data.video_url}
                    bgUrl={video_data.thumbnail_image_url}
                />
            </Div>
        </Div>
    )
}
