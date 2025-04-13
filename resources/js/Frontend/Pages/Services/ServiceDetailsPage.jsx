import React, {Fragment, useEffect} from 'react'
import Button from "@/Frontend/Components/Button";
import IconBox from "@/Frontend/Components/IconBox";
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
    updateServiceDetails,
    updateServiceDetailsSection,
    updateServiceSectionsData
} from "@/Redux/features/pages/Service/service";
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection";
import FaqSection from "@/Frontend/Components/Sections/FaqSection";
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection";
import WorkingProgressSection from "@/Frontend/Components/Sections/WorkingProgressSection";
import BannerSection from "@/Frontend/Components/Sections/BannerSection";
import ResumeSection from "@/Frontend/Components/Sections/ResumeSection";

export default function ServiceDetailsPage() {
    const services = useSelector((state) => state.servicePage)
    const {service} = usePage().props
    const dispatch = useDispatch();
    // page header data
    let pageHeaderData = {
        title: services.service_details?.title,
        breadcrumb: [
            { label: 'Home', url: '/' },
            { label:  services.service_details?.title, url: null },
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
        if (service){
            // set service to state
            dispatch(updateServiceDetails({
                title: service.title,
                icon_box_title: service.icon_box_title,
                icon_box_sub_title: service.icon_box_sub_title,
                category: service.category_id,
                is_show_breadcrumb: service.is_show_breadcrumb,
                icon_box: service.icon_box,
                info_thumbnail_image: service.info_thumbnail_image,
                info_title: service.info_title,
                info_list: service.info_list ?? [],
                meta_title: service.meta_title,
                meta_description: service.meta_description,
                meta_image: service.meta_image,
                meta_tags: service.meta_tags,
            }))
            // set section to state
            dispatch(updateServiceDetailsSection(service.sections))
            dispatch(updateServiceSectionsData(service.sections_data))
        }
    }, [service])
  return (
    <FrontendLayout>
        <Head>
            <title>{services.service_details.title}</title>
            <meta name="description" content={ services.service_details?.meta_description } />

            <meta itemProp="name" content={ services.service_details?.meta_title } />
            <meta itemProp="description" content={ services.service_details?.meta_description } />
            <meta itemProp="image" content={services.service_details?.meta_image_url} />

            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={ services.service_details?.meta_title } />
            <meta property="og:description" content={ services.service_details?.meta_description } />
            <meta property="og:image" content={services.service_details?.meta_image_url} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ services.service_details?.meta_title } />
            <meta name="twitter:description" content={ services.service_details?.meta_description } />
            <meta name="twitter:image" content={services.service_details?.meta_image_url} />
        </Head>
    {services.service_details.is_show_breadcrumb && (
        <PageHeading
            data={pageHeaderData}
            bgSrc='/static/service_hero_bg.jpeg'
        />
    )}
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading
          title={services.service_details.icon_box_title}
          subtitle={services.service_details.icon_box_sub_title}
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
            {services.service_details?.icon_box?.map((item, index) => (
                <Div className="col-lg-4" key={index}>
                    <IconBox
                        icon={item.icon}
                        title={item.title}
                        subtitle={item.details}
                    />
                    <Spacing lg='30' md='30'/>
                </Div>
            ))}
        </Div>
      </Div>
      <Spacing lg='120' md='50'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
                {services.service_details?.info_thumbnail_image &&  <img src={services.service_details?.info_thumbnail_image} alt="Service" className='cs-radius_15 w-100' />}
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">{services.service_details?.info_title}</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                  {services.service_details?.info_list?.slice(0, 6).map((item, index) => (
                      <Fragment key={`first-lg-${index}`}>
                          <Button btnLink={item.url} btnText={item.title} variant='cs-type2'/>
                          <Spacing lg='20' md='10'/>
                      </Fragment>
                  ))}
              </Div>
              <Div className="col-lg-6">
                  {services.service_details?.info_list?.slice(6).map((item, index) => (
                      <Fragment key={`second-lg-${index}`}>
                          <Button btnLink={item.url} btnText={item.title} variant='cs-type2'/>
                          <Spacing lg='20' md='10'/>
                      </Fragment>
                  ))}
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
        {services.sections.map(section => {
            const SectionComponent = sectionComponents[section.id];
            return (
                <>
                    <Spacing lg={section.spacing.top.lg ?? 0} md={section.spacing.top.md ?? 0} />
                    <SectionComponent key={section.id} sections_data={services.sections_data} />
                    <Spacing lg={section.spacing.bottom.lg ?? 0} md={section.spacing.bottom.md ?? 0} />
                </>
            );
        })}
    </FrontendLayout>
  )
}
