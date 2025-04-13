import React, { useEffect } from 'react'
import Button from "@/Frontend/Components/Button";
import PageHeading from "@/Frontend/Components/PageHeading";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import {useDispatch, useSelector} from "react-redux";
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
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout";
import {Head, usePage} from "@inertiajs/react";
import {
    updatePortfolioDetails,
    updatePortfolioSection,
    updatePortfolioSectionsData
} from "@/Redux/features/pages/Portfolio/portfolio";
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection";
import FaqSection from "@/Frontend/Components/Sections/FaqSection";
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection";
import WorkingProgressSection from "@/Frontend/Components/Sections/WorkingProgressSection";
import BannerSection from "@/Frontend/Components/Sections/BannerSection";
import ResumeSection from "@/Frontend/Components/Sections/ResumeSection";

export default function PortfolioDetailsPage() {
    const portfolio = useSelector((state) => state.portfolioPage);
    const {portfolio: portfolioData, nextPortfolio, prevPortfolio} = usePage().props
    const dispatch = useDispatch();
    // page header data
    let pageHeaderData = {
        title: portfolio?.portfolioDetails?.title,
        breadcrumb: [
            { label: 'Home', url: '/' },
            { label: portfolio?.portfolioDetails?.title, url: null },
        ]
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
        WhyChooseUs: WhyChooseUsSection,
        Faq: FaqSection,
        PhotoGallery: PhotoGallerySection,
        WorkingProgress: WorkingProgressSection,
        Banner: BannerSection,
        Resume: ResumeSection,
    };

    // update portfolio data to state
    useEffect(() => {
        if (portfolioData){
            dispatch(updatePortfolioDetails({
                title: portfolioData.title,
                sub_title:  portfolioData.sub_title,
                thumbnail_image: portfolioData.thumbnail_image,
                category: portfolioData.category_id,
                is_show_breadcrumb: portfolioData.is_show_breadcrumb,
                project_info_text: portfolioData.project_info_text,
                projectInfo: portfolioData.project_info,
                details: portfolioData.content
            }))

            // update sections
            dispatch(updatePortfolioSection(portfolioData.sections))
            dispatch(updatePortfolioSectionsData(portfolioData.sections_data))
        }
    }, [portfolioData])

  return (
    <FrontendLayout>
        <Head>
            <title>{portfolioData?.title}</title>
            <meta name="description" content={ portfolioData?.meta_description } />

            <meta itemProp="name" content={ portfolioData?.meta_title } />
            <meta itemProp="description" content={ portfolioData?.meta_description } />
            <meta itemProp="image" content={portfolioData?.meta_image_url} />

            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={ portfolioData?.meta_title } />
            <meta property="og:description" content={ portfolioData?.meta_description } />
            <meta property="og:image" content={portfolioData?.meta_image_url} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ portfolioData?.meta_title } />
            <meta name="twitter:description" content={ portfolioData?.meta_description } />
            <meta name="twitter:image" content={portfolioData?.meta_image_url} />
        </Head>
        {portfolio.portfolioDetails.is_show_breadcrumb && (
            <PageHeading
                data={pageHeaderData}
                bgSrc='/static/service_hero_bg.jpeg'
            />
        )}
      <Spacing lg='150' md='80'/>
      <Div className="container">
        {portfolio.portfolioDetails.thumbnail_image && <img src={portfolio.portfolioDetails.thumbnail_image} alt="Details" className="cs-radius_15 w-100" />}
        <Spacing lg='90' md='40'/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title={portfolio.portfolioDetails.title}
              subtitle={portfolio.portfolioDetails.sub_title}
            >
              <Spacing lg='40' md='20'/>
              <div dangerouslySetInnerHTML={{__html: portfolio.portfolioDetails.details}}></div>
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg='60' md='40'/>
            <h2 className='cs-font_30 cs-font_26_sm cs-m0'>{portfolio.portfolioDetails.project_info_text}</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
                {portfolio.portfolioDetails.projectInfo.map((item, index) => (
                    <Div className="col-6" key={index}>
                        <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>{item.infoTitle}:</h3>
                        <p className='cs-m0'>{item.infoValue}</p>
                        <Spacing lg='30' md='30'/>
                    </Div>
                ))}
            </Div>
          </Div>
        </Div>
        <Spacing lg='65' md='10'/>
          <Div className="cs-page_navigation cs-center">
            {prevPortfolio ? (
                <>
                <Div>
                    <Button btnLink={route('portfolio.show', prevPortfolio.slug)} btnText='Prev Project' variant='cs-type1'/>
                </Div>
                </>
                ): null}
            {nextPortfolio ? (
                <>
                <Div>
                    <Button btnLink={route('portfolio.show', nextPortfolio.slug)} btnText='Next Project'/>
                </Div>
                </>
            ): null}

          </Div>
      </Div>
      <Spacing lg='145' md='80'/>

        {portfolio.sections.map(section => {
            const SectionComponent = sectionComponents[section.id];
            return (
                <Div key={section.id} class={`arino_${section.id.toLowerCase()}`}>
                    <Spacing lg={section.spacing.top.lg ?? 0} md={section.spacing.top.md ?? 0} />
                    <SectionComponent key={section.id} sections_data={portfolio.sections_data} />
                    <Spacing lg={section.spacing.bottom.lg ?? 0} md={section.spacing.bottom.md ?? 0} />
                </Div>
            );
        })}
    </FrontendLayout>
  )
}
