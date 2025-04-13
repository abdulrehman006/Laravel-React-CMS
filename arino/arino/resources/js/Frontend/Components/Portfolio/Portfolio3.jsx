import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import PortfolioSlider2 from "@/Frontend/Components/Slider/PortfolioSlider2";

export default function Portfolio3({portfolio}){
    return(
        <>
            <Div className="container">
                <h2 className="cs-font_50 cs-m0 cs-line_height_4 text-center">
                    {portfolio.title}
                </h2>
            </Div>
            <Spacing lg="90" md="70" />
            <PortfolioSlider2 portfolio={portfolio.portfolios} />
        </>
    )
}
