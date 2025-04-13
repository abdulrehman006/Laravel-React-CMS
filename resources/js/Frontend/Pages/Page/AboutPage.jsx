import React, { useEffect } from 'react';
import PageHeading from "@/Frontend/Components/PageHeading";
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout";
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
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection";
import FaqSection from "@/Frontend/Components/Sections/FaqSection";
import {useDispatch, useSelector} from "react-redux";
import {Head, usePage} from "@inertiajs/react";
import {
    updateAboutBreadcrumb, updateAboutMetaDescription, updateAboutMetaImage, updateAboutMetaTags, updateAboutMetaTitle,
    updateAboutSection,
    updateAboutSectionsData,
    updateAboutTitle
} from "@/Redux/features/pages/About/about";
import Spacing from "@/Frontend/Components/Spacing";
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection";
import WorkingProgressSection from "@/Frontend/Components/Sections/WorkingProgressSection";
import BannerSection from "@/Frontend/Components/Sections/BannerSection";
import ResumeSection from "@/Frontend/Components/Sections/ResumeSection";

export default function AboutPage() {
    const {sections, title, sections_data, is_show_breadcrumb} = useSelector((state) => state.aboutPage) || {}
    const {about} = usePage().props
    const dispatch = useDispatch();
    // page header data
    let pageHeaderData = {
        title: title,
        breadcrumb: [
            { label: 'Home', url: '/' },
            { label: title, url: '#' },
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

    useEffect(() => {
        dispatch(updateAboutTitle(about.title))
        dispatch(updateAboutSection(about.sections))
        dispatch(updateAboutSectionsData(about.sections_data))
        dispatch(updateAboutBreadcrumb(about.is_show_breadcrumb))
        dispatch(updateAboutMetaTitle(about.meta_title))
        dispatch(updateAboutMetaDescription(about.meta_description))
        dispatch(updateAboutMetaImage(about.meta_image))
        dispatch(updateAboutMetaTags(about.meta_tags))
    }, [about])

  return (
    <FrontendLayout>
        <Head>
            <title>{title}</title>
            <meta name="description" content={ about.meta_description } />

            <meta itemProp="name" content={ about.meta_title } />
            <meta itemProp="description" content={ about.meta_description } />
            <meta itemProp="image" content={about.meta_image_url} />

            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={ about.meta_title } />
            <meta property="og:description" content={ about.meta_description } />
            <meta property="og:image" content={about.meta_image_url} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ about.meta_title } />
            <meta name="twitter:description" content={ about.meta_description } />
            <meta name="twitter:image" content={about.meta_image_url} />
        </Head>
      {/* Start Page Heading Section */}
        {is_show_breadcrumb && (
            <PageHeading
                data={pageHeaderData}
                bgSrc="/static/blog_hero_bg.jpeg"
            />
        )}
      {/* End Page Heading Section */}

    {sections.map(section => {
        const SectionComponent = sectionComponents[section.id];
        return (
            <>
                <Spacing lg={section.spacing.top.lg ?? 0} md={section.spacing.top.md ?? 0} />
                <SectionComponent key={section.id} sections_data={sections_data} />
                <Spacing lg={section.spacing.bottom.lg ?? 0} md={section.spacing.bottom.md ?? 0} />
            </>
        );
    })}

    </FrontendLayout>
  );
}
