import Div from "@/Frontend/Components/Div";
import VerticalLinks from "@/Frontend/Components/VerticalLinks";
import FullScreenHorizontalSlider from "@/Frontend/Components/Slider/FullScreenHorizontalSlider";


export default function Hero6({
  data
}) {
  return (
    <Div className="cs-hero_6_wrap">
      <VerticalLinks data={data.social_links.links} title={data.social_links.title} />
      <FullScreenHorizontalSlider data={data.portfolio_slider} />
    </Div>
  );
}
