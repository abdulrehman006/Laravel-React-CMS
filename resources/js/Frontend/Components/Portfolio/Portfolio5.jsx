import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import PortfolioItem2 from "@/Frontend/Components/Portfolio/PortfolioItem2";
import PortfolioItem3 from "@/Frontend/Components/Portfolio/PortfolioItem3";

export default function Portfolio5({portfolio}) {
    const portfolios = portfolio.portfolios;
    return (
        <>
            {portfolios.map((item, index) =>
                index % 2 === 0 ? (
                    <Div key={index}>
                        <PortfolioItem2
                            title={item.title}
                            subtitle={item.sub_title}
                            btnText={item.action_text}
                            btnLink={item.action_url}
                            imageUrl={item.thumbnail_image}
                            category={item.category}
                        />
                        <Spacing lg="100" md="70" />
                    </Div>
                ) : (
                    <Div key={index}>
                        <PortfolioItem3
                            title={item.title}
                            subtitle={item.sub_title}
                            btnText={item.action_text}
                            btnLink={item.action_url}
                            imageUrl={item.thumbnail_image}
                            category={item.category}
                        />
                        <Spacing lg="100" md="70" />
                    </Div>
                )
            )}
        </>
    );
}
