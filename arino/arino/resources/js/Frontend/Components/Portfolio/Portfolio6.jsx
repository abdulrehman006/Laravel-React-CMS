import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import { Icon } from "@iconify/react";
import { useState } from "react";
import PortfolioItem from "@/Frontend/Components/Portfolio/PortfolioItem";

export default function Portfolio6({ portfolio }) {
    const [active, setActive] = useState("all");
    const [itemShow, setItemShow] = useState(10);
    const portfolios = portfolio.portfolios;

    const categoryMap = {};

    const categoryMenu = portfolios
        .map((item) => {
            const lowercaseCategory = item.category
                ?.toLowerCase()
                .replace(/\s/g, "");

            if (!categoryMap[lowercaseCategory]) {
                categoryMap[lowercaseCategory] = true;
                return {
                    title: item.category,
                    category: lowercaseCategory,
                };
            }

            return null;
        })
        .filter((item) => item !== null);

    return (
        <Div className="container">
            <Div className="cs-portfolio_1_heading">
                <SectionHeading
                    title={portfolio.title}
                    subtitle={portfolio.sub_title}
                />
                <Div className="cs-filter_menu cs-style1">
                    <ul className="cs-mp0 cs-center">
                        <li className={active === "all" ? "active" : ""}>
                            <span onClick={() => setActive("all")}>All</span>
                        </li>
                        {categoryMenu.map((item, index) => (
                            <li
                                className={
                                    active === item.category ? "active" : ""
                                }
                                key={index}
                            >
                                <span onClick={() => setActive(item.category)}>
                                    {item.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Div>
            </Div>
            <Spacing lg="90" md="45" />
            <Div className="row">
                {portfolios.slice(0, itemShow).map((item, index) => (
                    <Div
                        className={`${
                            index === 3 || index === 6 ? "col-lg-8" : "col-lg-4"
                        } ${
                            active === "all"
                                ? ""
                                : !(
                                      active ===
                                      item.category
                                          ?.toLowerCase()
                                          ?.replace(/\s/g, "")
                                  )
                                ? "d-none"
                                : ""
                        }`}
                        key={index}
                    >
                        <PortfolioItem
                            title={item.title}
                            subtitle={item.action_text}
                            href={item.action_url}
                            src={item.thumbnail_image}
                            variant="cs-style1 cs-type1"
                        />
                        <Spacing lg="25" md="25" />
                    </Div>
                ))}
            </Div>

            <Div className="text-center">
                {portfolios.length <= itemShow ? (
                    ""
                ) : (
                    <>
                        <Spacing lg="65" md="40" />
                        <span
                            className="cs-text_btn"
                            onClick={() => setItemShow(itemShow + 3)}
                        >
                            <span>Load More</span>
                            <Icon icon="bi:arrow-right" />
                        </span>
                    </>
                )}
            </Div>
        </Div>
    );
}
