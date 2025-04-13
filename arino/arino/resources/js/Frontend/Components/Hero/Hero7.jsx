
import Div from "@/Frontend/Components/Div";
import FullScreenVerticalSlider from "@/Frontend/Components/Slider/FullScreenVerticalSlider";
import VerticalLinks from "@/Frontend/Components/VerticalLinks";

export default function Hero7({
  data
}) {
  return (
    <Div className="cs-hero_7_wrap">
      <VerticalLinks data={data.social_links.links} title={data.social_links.title} />
      <FullScreenVerticalSlider data={data.case_study_slider} />
    </Div>
  );
}
