import React, { Fragment, useEffect } from "react";
import Div from "@/Frontend/Components/Div";
import PageHeading from "@/Frontend/Components/PageHeading";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import { useDispatch, useSelector } from "react-redux";
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
import { Head, usePage } from "@inertiajs/react";
import {
    updateCaseStudyDetails,
    updateCaseStudySection,
    updateCaseStudySectionsData,
} from "@/Redux/features/pages/CaseStudy/case_study";
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection";
import FaqSection from "@/Frontend/Components/Sections/FaqSection";
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection";
import WorkingProgressSection from "@/Frontend/Components/Sections/WorkingProgressSection";
import BannerSection from "@/Frontend/Components/Sections/BannerSection";
import ResumeSection from "@/Frontend/Components/Sections/ResumeSection";

export default function CaseStudyDetailsPage() {
    const caseStudy = useSelector((state) => state.caseStudyPage) || {};
    const dispatch = useDispatch();
    const { caseStudy: caseStudyData } = usePage().props;
    // page header data
    let pageHeaderData = {
        title: caseStudy.case_study_details?.title,
        breadcrumb: [
            { label: "Home", url: "/" },
            { label: caseStudy.case_study_details?.title, url: null },
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
        WhyChooseUs: WhyChooseUsSection,
        Faq: FaqSection,
        PhotoGallery: PhotoGallerySection,
        WorkingProgress: WorkingProgressSection,
        Banner: BannerSection,
        Resume: ResumeSection,
    };

    useEffect(() => {
        if (caseStudyData) {
            dispatch(
                updateCaseStudyDetails({
                    title: caseStudyData.title,
                    page_sub_title: caseStudyData.page_sub_title,
                    page_title: caseStudyData.page_title,
                    thumbnail_image: caseStudyData.thumbnail_image,
                    is_show_breadcrumb: caseStudyData.is_show_breadcrumb,
                    category: caseStudyData.category_id,
                    details: caseStudyData.details,
                    meta_title: caseStudyData.meta_title,
                    meta_description: caseStudyData.meta_description,
                    meta_image: caseStudyData.meta_image,
                    meta_tags: caseStudyData.meta_tags,
                })
            );

            // update case study section to state
            dispatch(updateCaseStudySection(caseStudyData.sections));
            dispatch(updateCaseStudySectionsData(caseStudyData.sections_data));
        }
    }, [caseStudyData]);
    return (
        <FrontendLayout>
            <Head>
                <title>{caseStudyData?.title}</title>
                <meta name="description" content={ caseStudyData?.meta_description } />

                <meta itemProp="name" content={ caseStudyData?.meta_title } />
                <meta itemProp="description" content={ caseStudyData?.meta_description } />
                <meta itemProp="image" content={caseStudyData?.meta_image_url} />

                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={ caseStudyData?.meta_title } />
                <meta property="og:description" content={ caseStudyData?.meta_description } />
                <meta property="og:image" content={caseStudyData?.meta_image_url} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={ caseStudyData?.meta_title } />
                <meta name="twitter:description" content={ caseStudyData?.meta_description } />
                <meta name="twitter:image" content={caseStudyData?.meta_image_url} />
            </Head>
            {caseStudy.case_study_details.is_show_breadcrumb && (
                <PageHeading
                    data={pageHeaderData}
                    bgSrc="/static/service_hero_bg.jpeg"
                />
            )}
            <Spacing lg="145" md="80" />
            <Div className="container">
                <SectionHeading
                    title={caseStudy.case_study_details?.page_title}
                    subtitle={caseStudy.case_study_details?.page_sub_title}
                    variant="cs-style1 text-center"
                />
                <Spacing lg="90" md="45" />
                {caseStudy.case_study_details?.thumbnail_image && (
                    <img
                        src={caseStudy.case_study_details?.thumbnail_image}
                        alt="Thumb"
                        className="w-100 cs-radius_15"
                    />
                )}
                {caseStudy.case_study_details?.details?.is_overview_active && (
                    <>
                        <Spacing lg="140" md="80" />
                        <h2 className="cs-font_38 text-center">
                            {
                                caseStudy.case_study_details?.details
                                    ?.overview_title
                            }
                        </h2>
                        <Spacing lg="60" md="45" />
                        <p
                            className="cs-m0"
                            dangerouslySetInnerHTML={{
                                __html: caseStudy.case_study_details?.details
                                    ?.overview_details,
                            }}
                        ></p>
                        <Spacing lg="65" md="45" />
                        <Div className="row">
                            {caseStudy.case_study_details?.details?.overview_images?.map(
                                (image, index) => (
                                    <Div
                                        className="col-sm-6"
                                        key={`images-${index}`}
                                    >
                                        {image && (
                                            <>
                                                <img
                                                    src={image}
                                                    alt="Thumb"
                                                    className="w-100 cs-radius_5"
                                                />
                                                <Spacing lg="25" md="25" />
                                            </>
                                        )}
                                    </Div>
                                )
                            )}
                        </Div>
                        <Spacing lg="125" md="55" />
                    </>
                )}
            </Div>

            {caseStudy.case_study_details?.details?.is_research_active && (
                <Div className="cs-gradient_bg_1 cs-shape_wrap_6">
                    <Div className="cs-shape_2"></Div>
                    <Div className="cs-shape_2"></Div>
                    <Div className="container">
                        <Spacing lg="145" md="80" />
                        <h2 className="cs-font_38 text-center">
                            {
                                caseStudy.case_study_details?.details
                                    ?.research_title
                            }
                        </h2>
                        <Spacing lg="90" md="45" />
                        {caseStudy.case_study_details?.details?.researches?.map(
                            (item, index) => (
                                <Fragment key={index}>
                                    <Div
                                        className={`row cs_gap_40_y align-items-center ${
                                            index % 2 === 1
                                                ? "flex-lg-row-reverse"
                                                : "cs-column_reverse_lg"
                                        }`}
                                    >
                                        <Div
                                            className={`col-lg-5 ${
                                                index % 2 === 1 && "offset-lg-1"
                                            }`}
                                        >
                                            <h3 className="cs-font_30 cs-m0">
                                                {item.title}
                                            </h3>
                                            <Spacing lg="45" md="30" />
                                            <p
                                                className="cs-m0"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.details,
                                                }}
                                            ></p>
                                        </Div>
                                        <Div
                                            className={`col-lg-6 ${
                                                index % 2 !== 1 && "offset-lg-1"
                                            } text-center`}
                                        >
                                            <Div className="cs-portfolio_img_in cs-shine_hover_1 rounded-circle">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt="Case study"
                                                        className="w-100"
                                                    />
                                                )}
                                            </Div>
                                        </Div>
                                    </Div>
                                    <Spacing lg="100" md="80" />
                                </Fragment>
                            )
                        )}
                    </Div>
                </Div>
            )}
            {caseStudy.case_study_details?.details?.is_result_active && (
                <>
                    <Spacing lg="140" md="80" />
                    <Div className="container text-center">
                        <Div className="row col-lg-10 offset-lg-1">
                            <h2 className="cs-font_38 cs-m0">
                                {
                                    caseStudy.case_study_details?.details
                                        ?.result_title
                                }
                            </h2>
                            <Spacing lg="60" md="45" />
                            <p
                                className="cs-m0"
                                dangerouslySetInnerHTML={{
                                    __html: caseStudy.case_study_details
                                        ?.details?.result_details,
                                }}
                            ></p>
                        </Div>
                    </Div>
                </>
            )}
            <Spacing lg="145" md="80" />
            {caseStudy.sections.map((section) => {
                const SectionComponent = sectionComponents[section.id];
                return (
                    <>
                        <Spacing
                            lg={section.spacing.top.lg ?? 0}
                            md={section.spacing.top.md ?? 0}
                        />
                        <SectionComponent
                            key={section.id}
                            sections_data={caseStudy.sections_data}
                        />
                        <Spacing
                            lg={section.spacing.bottom.lg ?? 0}
                            md={section.spacing.bottom.md ?? 0}
                        />
                    </>
                );
            })}
        </FrontendLayout>
    );
}
