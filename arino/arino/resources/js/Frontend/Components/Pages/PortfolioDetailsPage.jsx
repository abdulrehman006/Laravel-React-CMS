import React from "react";
import Button from "../Button";
import PageHeading from "../PageHeading";
import Div from "../Div";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import { useSelector } from "react-redux";
import HeroSection from "@/Frontend/Components/Sections/HeroSection";
import FunFactSection from "@/Frontend/Components/Sections/FunFactSection";
import ServiceSection from "@/Frontend/Components/Sections/ServicesSection";
import PortfolioSection from "@/Frontend/Components/Sections/PortfolioSection";
import AwardSection from "@/Frontend/Components/Sections/AwardSection";
import VideoSection from "@/Frontend/Components/Sections/VideoSection";
import TeamSection from "@/Frontend/Components/Sections/TeamSection";
import TestimonialSection from "@/Frontend/Components/Sections/TestimonialSection";
import BlogSection from "@/Frontend/Components/Sections/BlogSection";
import MovingTextSection from "@/Frontend/Components/Sections/MovingTextSection";
import PartnerSection from "@/Frontend/Components/Sections/PartnerSection";
import CTASection from "@/Frontend/Components/Sections/CTASection";
import PricingSection from "@/Frontend/Components/Sections/PricingSection";
import ContactSection from "@/Frontend/Components/Sections/ContactSection";
import CaseStudySection from "@/Frontend/Components/Sections/CaseStudySection";
import AboutSection from "@/Frontend/Components/Sections/AboutSection";

export default function PortfolioDetailsPage() {
    const portfolio = useSelector((state) => state.portfolioPage);
    // page header data
    let pageHeaderData = {
        title: portfolio.portfolioDetails?.title,
        breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Portfolio", url: route("blog.index") },
            { label: portfolio.portfolioDetails?.title, url: null },
        ],
    };
    const sectionComponents = {
        Hero: HeroSection,
        FunFact: FunFactSection,
        Service: ServiceSection,
        Portfolio: PortfolioSection,
        Award: AwardSection,
        Video: VideoSection,
        Team: TeamSection,
        Testimonial: TestimonialSection,
        Blog: BlogSection,
        MovingText: MovingTextSection,
        Partner: PartnerSection,
        CTA: CTASection,
        Pricing: PricingSection,
        Contact: ContactSection,
        CaseStudy: CaseStudySection,
        About: AboutSection,
    };

    return (
        <>
            <PageHeading
                data={pageHeaderData}
                bgSrc="/static/service_hero_bg.jpeg"
            />
            <Spacing lg="150" md="80" />
            <Div className="container">
                {portfolio.portfolioDetails.thumbnail_image && (
                    <img
                        src={portfolio.portfolioDetails.thumbnail_image}
                        alt="Details"
                        className="cs-radius_15 w-100"
                    />
                )}
                <Spacing lg="90" md="40" />
                <Div className="row">
                    <Div className="col-lg-6">
                        <SectionHeading
                            title={portfolio.portfolioDetails.title}
                            subtitle={portfolio.portfolioDetails.sub_title}
                        >
                            <Spacing lg="40" md="20" />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: portfolio.portfolioDetails.details,
                                }}
                            ></div>
                        </SectionHeading>
                    </Div>
                    <Div className="col-lg-5 offset-lg-1">
                        <Spacing lg="60" md="40" />
                        <h2 className="cs-font_30 cs-font_26_sm cs-m0">
                            {portfolio.portfolioDetails.project_info_text}
                        </h2>
                        <Spacing lg="50" md="30" />
                        <Div className="row">
                            {portfolio.portfolioDetails.projectInfo.map(
                                (item, index) => (
                                    <Div className="col-6" key={index}>
                                        <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                                            {item.infoTitle}:
                                        </h3>
                                        <p className="cs-m0">
                                            {item.infoValue}
                                        </p>
                                        <Spacing lg="30" md="30" />
                                    </Div>
                                )
                            )}
                        </Div>
                    </Div>
                </Div>
                <Spacing lg="65" md="10" />
                <Div className="cs-page_navigation cs-center">
                    <Div>
                        <Button
                            btnLink="/portfolio/portfolio-details"
                            btnText="Prev Project"
                            variant="cs-type1"
                        />
                    </Div>
                    <Div>
                        <Button
                            btnLink="/portfolio/portfolio-details"
                            btnText="Next Project"
                        />
                    </Div>
                </Div>
            </Div>
            <Spacing lg="145" md="80" />

            {portfolio.sections.map((section) => {
                const SectionComponent = sectionComponents[section.id];
                return <SectionComponent key={section.id} />;
            })}
        </>
    );
}
