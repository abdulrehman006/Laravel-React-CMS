import { Head } from "@inertiajs/react";
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout.jsx";
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
import { useDispatch, useSelector } from "react-redux";
import PricingSection from "@/Frontend/Components/Sections/PricingSection";
import ContactSection from "@/Frontend/Components/Sections/ContactSection";
import CaseStudySection from "@/Frontend/Components/Sections/CaseStudySection";
import AboutSection from "@/Frontend/Components/Sections/AboutSection";
import { Fragment, useEffect } from "react";
import { updateHomeData } from "@/Redux/features/pages/home/home";
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection";
import FaqSection from "@/Frontend/Components/Sections/FaqSection";
import Spacing from "@/Frontend/Components/Spacing";
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection";
import WorkingProgressSection from "@/Frontend/Components/Sections/WorkingProgressSection";
import BannerSection from "@/Frontend/Components/Sections/BannerSection";
import ResumeSection from "@/Frontend/Components/Sections/ResumeSection";
import limitString from "@/utils/limitString";
import removeHTMLTags from "@/utils/removeHTMLTags";

export default function Welcome({ home_data }) {
    const homeData = useSelector((state) => state.homePage);
    const dispatch = useDispatch();
    const tagline = window.tagline;

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
        dispatch(updateHomeData(home_data));
    }, []);

    return (
        <>
            <FrontendLayout>
                <Head>
                    <title>{tagline}</title>
                    <meta name="description" content={ window.seo?.meta_description } />

                    <meta itemProp="name" content={ tagline + " - " + window.seo?.meta_title } />
                    <meta itemProp="description" content={ window.seo?.meta_description } />
                    <meta itemProp="image" content={window.seo?.meta_image} />

                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:title" content={ tagline + " - " + window.seo?.meta_title } />
                    <meta property="og:description" content={ window.seo?.meta_description } />
                    <meta property="og:image" content={window.seo?.meta_image} />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={ tagline + " - " + window.seo?.meta_title } />
                    <meta name="twitter:description" content={ window.seo?.meta_description } />
                    <meta name="twitter:image" content={window.seo?.meta_image} />
                </Head>

                {homeData.home_sections.map((section, index) => {
                    const SectionComponent = sectionComponents[section.id];
                    return (
                        <Fragment key={index}>
                            <Spacing
                                lg={section.spacing.top.lg ?? 0}
                                md={section.spacing.top.md ?? 0}
                            />
                            <SectionComponent key={section.id} sections_data={homeData} />
                            <Spacing
                                lg={section.spacing.bottom.lg ?? 0}
                                md={section.spacing.bottom.md ?? 0}
                            />
                        </Fragment>
                    );
                })}
            </FrontendLayout>
        </>
    );
}
