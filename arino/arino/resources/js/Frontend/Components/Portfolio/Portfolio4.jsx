import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import PortfolioItem from "@/Frontend/Components/Portfolio/PortfolioItem";
import { Icon } from '@iconify/react';
import {useState} from "react";

export default function Portfolio4({portfolio}){
    const [itemShow, setItemShow] = useState(6);
    const portfolios = portfolio.portfolios;
    return(
        <>
            <Div className="container">
                <SectionHeading
                    title={portfolio.title}
                    subtitle={portfolio.sub_title}
                    variant="cs-style1 text-center"
                />
                <Spacing lg="90" md="45" />
                <Div className="row">
                    {portfolios.slice(0, itemShow).map((item, index) => (
                        <Div
                            className={`${
                                index === 0 || index === 3 || index === 4
                                    ? 'col-lg-8'
                                    : 'col-lg-4'
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
                        ''
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
        </>
    )
}
