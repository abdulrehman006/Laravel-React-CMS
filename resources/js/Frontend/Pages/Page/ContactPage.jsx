import React, { useEffect } from 'react';
import PageHeading from "@/Frontend/Components/PageHeading";
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout";
import {Head, usePage} from "@inertiajs/react";
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
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection";
import FaqSection from "@/Frontend/Components/Sections/FaqSection";
import {
    updateContactBreadcrumb,
    updateContactMetaDescription,
    updateContactMetaImage,
    updateContactMetaTags,
    updateContactMetaTitle,
    updateContactSection,
    updateContactSectionsData,
    updateContactTitle
} from "@/Redux/features/pages/Contact/contact";
import Spacing from "@/Frontend/Components/Spacing";
import {updatePageBreadcrumb} from "@/Redux/features/pages/Page/page";
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection";
import WorkingProgressSection from "@/Frontend/Components/Sections/WorkingProgressSection";
import BannerSection from "@/Frontend/Components/Sections/BannerSection";
import ResumeSection from "@/Frontend/Components/Sections/ResumeSection";

export default function ContactPage() {
    const {sections, title, sections_data, is_show_breadcrumb} = useSelector((state) => state.contactPage) || {}
    const {contact} = usePage().props
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
        dispatch(updateContactTitle(contact.title))
        dispatch(updateContactSection(contact.sections))
        dispatch(updateContactSectionsData(contact.sections_data))
        dispatch(updateContactBreadcrumb(contact.is_show_breadcrumb))
        dispatch(updateContactMetaTitle(contact.meta_title))
        dispatch(updateContactMetaDescription(contact.meta_description))
        dispatch(updateContactMetaTags(contact.meta_tags))
        dispatch(updateContactMetaImage(contact.meta_image))
    }, [contact])
  return (
      <FrontendLayout>
          <Head>
              <title>{title}</title>
              <meta name="description" content={ contact.meta_description } />

              <meta itemProp="name" content={ contact.meta_title } />
              <meta itemProp="description" content={ contact.meta_description } />
              <meta itemProp="image" content={contact.meta_image_url} />

              <meta property="og:url" content={window.location.href} />
              <meta property="og:title" content={ contact.meta_title } />
              <meta property="og:description" content={ contact.meta_description } />
              <meta property="og:image" content={contact.meta_image_url} />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={ contact.meta_title } />
              <meta name="twitter:description" content={ contact.meta_description } />
              <meta name="twitter:image" content={contact.meta_image_url} />
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
