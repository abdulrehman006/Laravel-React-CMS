import Portfolio from "@/Frontend/Components/Portfolio";
import Portfolio2 from "@/Frontend/Components/Portfolio/Portfolio2";
import Portfolio3 from "@/Frontend/Components/Portfolio/Portfolio3";
import Portfolio4 from "@/Frontend/Components/Portfolio/Portfolio4";
import Portfolio5 from "@/Frontend/Components/Portfolio/Portfolio5";
import Portfolio6 from "@/Frontend/Components/Portfolio/Portfolio6";
import Portfolio7 from "@/Frontend/Components/Portfolio/Portfolio7";

export default function PortfolioSection({sections_data}){
    const portfolioSection = sections_data.portfolio_section;
    // conditional rendering
    let layoutSection = "";
    if (portfolioSection.layout === "1"){
        layoutSection = <Portfolio portfolio={portfolioSection} />
    } else if(portfolioSection.layout === "2"){
        layoutSection = <Portfolio2 portfolio={portfolioSection} />
    } else if(portfolioSection.layout === "3"){
        layoutSection = <Portfolio3 portfolio={portfolioSection} />
    } else if(portfolioSection.layout === "4"){
        layoutSection = <Portfolio4 portfolio={portfolioSection} />
    } else if (portfolioSection.layout === "5"){
        layoutSection = <Portfolio5 portfolio={portfolioSection} />
    } else if (portfolioSection.layout === "6"){
        layoutSection = <Portfolio6 portfolio={portfolioSection} />
    } else if (portfolioSection.layout === "7"){
        layoutSection = <Portfolio7 portfolio={portfolioSection} />
    }
    return(
        <>
            {layoutSection}
        </>
    )
}
