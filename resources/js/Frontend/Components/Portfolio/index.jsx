import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import PortfolioSlider from "@/Frontend/Components/Slider/PortfolioSlider";

export default function Portfolio({portfolio}){
    return(
        <>
            <Div>
                <Div className="container">
                    <SectionHeading
                        title={portfolio.title}
                        subtitle={portfolio.sub_title}
                        variant="cs-style1 text-center"
                    />
                    <Spacing lg="90" md="45" />
                </Div>
                <PortfolioSlider portfolios={portfolio.portfolios} />
            </Div>
        </>
    )
}
