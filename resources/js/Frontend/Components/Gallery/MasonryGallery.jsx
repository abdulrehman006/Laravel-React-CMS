import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Div from "../Div";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import ModalImage from "react-modal-image";

export default function MasonryGallery({ data }) {
    const [active, setActive] = useState("all");
    const [itemShow, setItemShow] = useState(10);
    const portfolioSection = data;
    const portfolios = data.portfolios;

    const categoryMap = {};

    const categoryMenu = portfolios
        .map((item) => {
            const lowercaseCategory = item.category
                ?.toLowerCase()
                ?.replace(/\s/g, "");

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
        <>
            <Div className="container">
                <Div className="cs-portfolio_1_heading">
                    <SectionHeading
                        title={portfolioSection.sub_title}
                        subtitle={portfolioSection.title}
                    />
                    <Div className="cs-filter_menu cs-style1">
                        <ul className="cs-mp0 cs-center">
                            <li className={active === "all" ? "active" : ""}>
                                <span onClick={() => setActive("all")}>
                                    All
                                </span>
                            </li>
                            {categoryMenu.map((item, index) => (
                                <li
                                    className={
                                        active === item.category ? "active" : ""
                                    }
                                    key={index}
                                >
                                    <span
                                        onClick={() => setActive(item.category)}
                                    >
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Div>
                </Div>
            </Div>
            <Spacing lg="90" md="45" />
            <Div className="cs-masonry_4_col">
                {portfolios.slice(0, itemShow).map((item, index) => (
                    <Div
                        className={`${
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
                        <Div className="cs-portfolio cs-style1 cs-type2">
                            <Div className="cs-lightbox_item">
                                <ModalImage
                                    small={item.thumbnail_image}
                                    large={item.thumbnail_image}
                                    alt={item.title}
                                />
                            </Div>
                            <Div className="cs-portfolio_hover" />
                            <span className="cs-plus" />
                            <Div
                                className="cs-portfolio_bg cs-bg"
                                style={{
                                    backgroundImage: `url("${item.thumbnail_image}")`,
                                }}
                            />
                            <Div className="cs-portfolio_info">
                                <Div className="cs-portfolio_info_bg cs-accent_bg" />
                                <h2 className="cs-portfolio_title">
                                    {item.title}
                                </h2>
                                <Div className="cs-portfolio_subtitle">
                                    {item.category}
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                ))}
            </Div>
            <Div className="container">
                <Div className="text-center">
                    {portfolios.length <= itemShow ? (
                        ""
                    ) : (
                        <>
                            <Spacing lg="65" md="40" />
                            <span
                                className="cs-text_btn"
                                onClick={() => setItemShow(itemShow + 4)}
                            >
                                <span>Load More</span>
                                <Icon icon="bi:arrow-right" />
                            </span>
                        </>
                    )}
                </Div>
            </Div>
        </>
    );
}
