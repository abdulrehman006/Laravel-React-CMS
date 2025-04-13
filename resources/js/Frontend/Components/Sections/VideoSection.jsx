import Video1 from "@/Frontend/Components/VideoModal/Video1";
import Video2 from "@/Frontend/Components/VideoModal/Video2";
import Video3 from "@/Frontend/Components/VideoModal/Video3";

export default function VideoSection({sections_data}) {
    const videoLayout = sections_data.video_section.layout;
    // conditional rendering
    let layoutSection = "";
    if (videoLayout === "1"){
        layoutSection = <Video1 video_data={sections_data.video_section} />
    } else if(videoLayout === "2"){
        layoutSection = <Video2 video_data={sections_data.video_section} />
    } else if(videoLayout === "3"){
        layoutSection = <Video3 video_data={sections_data.video_section} />
    }
    return(
        <>
            {layoutSection}
        </>
    )
}
