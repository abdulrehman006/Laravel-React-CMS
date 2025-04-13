import { IonIcon } from "@ionic/react";
import {
    chevronForward,
    closeOutline,
    helpCircle,
    chevronBackOutline,
    trashOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCustomizeLayout from "@/Admin/Layouts/PageCustomizeLayout";
import HeroSectionCustomize from "@/Admin/Components/PageCustomize/HeroSectionCustomize";
import FunFactSectionCustomize from "@/Admin/Components/PageCustomize/FunFactSectionCustomize";
import ServiceCustomize from "@/Admin/Components/PageCustomize/ServiceCustomize";
import PortfolioCustomize from "@/Admin/Components/PageCustomize/PortfolioCustomize";
import AwardCustomize from "@/Admin/Components/PageCustomize/AwardCustomize";
import VideoCustomize from "@/Admin/Components/PageCustomize/VideoCustomize";
import {
    updateHomeAboutSection,
    updateHomeAwardSection, updateHomeBannerSection,
    updateHomeBlogSection,
    updateHomeCaseStudySection,
    updateHomeContactSection,
    updateHomeCTASection,
    updateHomeFaqSection,
    updateHomeFunFactSection,
    updateHomeHeroSection,
    updateHomeHomeSections,
    updateHomeMovingTextSection,
    updateHomePartnerSection, updateHomePhotoGallerySection,
    updateHomePortfolioSection,
    updateHomePricingSection, updateHomeResumeSection,
    updateHomeSections,
    updateHomeServiceSection,
    updateHomeTeamSection, updateHomeTestimonialSection,
    updateHomeVideoSection,
    updateHomeWhyChooseUsSection, updateHomeWorkingProgressSection,
} from "@/Redux/features/pages/home/home";
import TeamCustomize from "@/Admin/Components/PageCustomize/TeamCustomize";
import BlogCustomize from "@/Admin/Components/PageCustomize/BlogCustomize";
import MovingTextCustomize from "@/Admin/Components/PageCustomize/MovingTextCustomize";
import PartnerCustomize from "@/Admin/Components/PageCustomize/PartnerCustomize";
import CTACustomize from "@/Admin/Components/PageCustomize/CTACustomize";
import PricingCustomize from "@/Admin/Components/PageCustomize/PricingCustomize";
import ContactCustomize from "@/Admin/Components/PageCustomize/ContactCustomize";
import CaseStudyCustomize from "@/Admin/Components/PageCustomize/CaseStudyCustomize";
import AboutCustomize from "@/Admin/Components/PageCustomize/AboutCustomize";
import WhyCooseUsCustomize from "@/Admin/Components/PageCustomize/WhyCooseUsCustomize";
import FaqCustomize from "@/Admin/Components/PageCustomize/FaqCustomize";
import AddSection from "@/Admin/Components/PageCustomize/AddSection";
import { produce } from "immer";
import { Link, router, usePage } from "@inertiajs/react";
import TestimonialCustomize from "@/Admin/Components/PageCustomize/TestimonialCustomize";
import PhotoGalleryCustomize from "@/Admin/Components/PageCustomize/PhotoGalleryCustomize";
import WorkingProgressCustomize from "@/Admin/Components/PageCustomize/WorkingProgressCustomize";
import BannerCustomize from "@/Admin/Components/PageCustomize/BannerCustomize";
import ResumeCustomize from "@/Admin/Components/PageCustomize/ResumeCustomize";

export default function HomeEdit() {
    const { home } = usePage().props;
    const homePageData = useSelector((state) => state.homePage);
    const homeSections =
        useSelector((state) => state.homePage.home_sections) || [];
    const dispatch = useDispatch();
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const [isExpandInfo, setIsExpandInfo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [expandCustomize, setExpandCustomize] = useState("");
    const [customizeSections, setCustomizeSections] = useState([]);
    const [isAddSection, setIsAddSection] = useState(false);
    const [sectionIndex, setSectionIndex] = useState("");
    const currentSection = homeSections[sectionIndex];

    // handle expand
    const handleExpand = (name, index) => {
        setExpandCustomize(name);
        setSectionIndex(index);
        setIsOpen(true);
    };

    const handleUpdateSpacing = (e) => {
        let customizeSpacing = JSON.parse(JSON.stringify(homeSections));
        customizeSpacing[sectionIndex].spacing.top.lg = e.top.lg;
        customizeSpacing[sectionIndex].spacing.top.md = e.top.md;
        customizeSpacing[sectionIndex].spacing.bottom.lg = e.bottom.lg;
        customizeSpacing[sectionIndex].spacing.bottom.md = e.bottom.md;
        dispatch(updateHomeHomeSections(customizeSpacing));
    };

    const updateHeroSection = (data) => {
        dispatch(updateHomeHeroSection(data));
    };
    const updateFunFactSection = (data) => {
        dispatch(updateHomeFunFactSection(data));
    };
    const updateServiceSection = (data) => {
        dispatch(updateHomeServiceSection(data));
    };
    const updatePortfolioSection = (data) => {
        dispatch(updateHomePortfolioSection(data));
    };
    const updateAwardSection = (data) => {
        dispatch(updateHomeAwardSection(data));
    };
    const updateVideoSection = (data) => {
        dispatch(updateHomeVideoSection(data));
    };
    const updateTeamSection = (data) => {
        dispatch(updateHomeTeamSection(data));
    };
    const updateBlogSection = (data) => {
        dispatch(updateHomeBlogSection(data));
    };
    const updateMovingTextSection = (data) => {
        dispatch(updateHomeMovingTextSection(data));
    };
    const updatePartnerSection = (data) => {
        dispatch(updateHomePartnerSection(data));
    };
    const updateCTASection = (data) => {
        dispatch(updateHomeCTASection(data));
    };
    const updatePricingSection = (data) => {
        dispatch(updateHomePricingSection(data));
    };
    const updateContactSection = (data) => {
        dispatch(updateHomeContactSection(data));
    };
    const updateCaseStudySection = (data) => {
        dispatch(updateHomeCaseStudySection(data));
    };
    const updateAboutSection = (data) => {
        dispatch(updateHomeAboutSection(data));
    };
    const updateWhyChooseUsSection = (data) => {
        dispatch(updateHomeWhyChooseUsSection(data));
    };
    const updateFaqSection = (data) => {
        dispatch(updateHomeFaqSection(data));
    };
    const updateTestimonialSection = (data) => {
        dispatch(updateHomeTestimonialSection(data))
    };
    const updatePhotoGallerySection = (data) => {
        dispatch(updateHomePhotoGallerySection(data))
    };
    const updateWorkingProgressSection = (data) => {
        dispatch(updateHomeWorkingProgressSection(data))
    };
    const updateBannerSection = (data) => {
        dispatch(updateHomeBannerSection(data))
    };
    const updateResumeSection = (data) => {
        dispatch(updateHomeResumeSection(data))
    }

    // conditional customize section render
    let customizeSection = "";
    switch (expandCustomize) {
        case "Hero":
            customizeSection = (
                <HeroSectionCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateHeroSection={updateHeroSection}
                    sectionData={homePageData.hero_section}
                />
            );
            break;
        case "FunFact":
            customizeSection = (
                <FunFactSectionCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateFunFactSection={updateFunFactSection}
                    sectionData={homePageData.our_fun_fact_section}
                />
            );
            break;
        case "Service":
            customizeSection = (
                <ServiceCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateServiceSection={updateServiceSection}
                    sectionData={homePageData.service_section}
                />
            );
            break;
        case "Portfolio":
            customizeSection = (
                <PortfolioCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updatePortfolioSection={updatePortfolioSection}
                    sectionData={homePageData.portfolio_section}
                />
            );
            break;
        case "Award":
            customizeSection = (
                <AwardCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateAwardSection={updateAwardSection}
                    sectionData={homePageData.award_section}
                />
            );
            break;
        case "Video":
            customizeSection = (
                <VideoCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateVideoSection={updateVideoSection}
                    sectionData={homePageData.video_section}
                />
            );
            break;
        case "Team":
            customizeSection = (
                <TeamCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateTeamSection={updateTeamSection}
                    sectionData={homePageData.our_team_section}
                />
            );
            break;
        case "Blog":
            customizeSection = (
                <BlogCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateBlogSection={updateBlogSection}
                    sectionData={homePageData.our_blog}
                />
            );
            break;
        case "MovingText":
            customizeSection = (
                <MovingTextCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateMovingTextSection={updateMovingTextSection}
                    sectionData={homePageData.moving_text_section}
                />
            );
            break;
        case "Partner":
            customizeSection = (
                <PartnerCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updatePartnerSection={updatePartnerSection}
                    sectionData={homePageData.partner_section}
                />
            );
            break;
        case "CTA":
            customizeSection = (
                <CTACustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateCTASection={updateCTASection}
                    sectionData={homePageData.cta_section}
                />
            );
            break;
        case "Pricing":
            customizeSection = (
                <PricingCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updatePricingSection={updatePricingSection}
                    sectionData={homePageData.pricing_section}
                />
            );
            break;
        case "Contact":
            customizeSection = (
                <ContactCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateContactSection={updateContactSection}
                    sectionData={homePageData.contact_section}
                />
            );
            break;
        case "CaseStudy":
            customizeSection = (
                <CaseStudyCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateCaseStudySection={updateCaseStudySection}
                    sectionData={homePageData.case_study_section}
                />
            );
            break;
        case "About":
            customizeSection = (
                <AboutCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateAboutSection={updateAboutSection}
                    sectionData={homePageData.about_section}
                />
            );
            break;
        case "WhyChooseUs":
            customizeSection = (
                <WhyCooseUsCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateWhyChooseUsSection={updateWhyChooseUsSection}
                    sectionData={homePageData.why_choose_us}
                />
            );
            break;
        case "Faq":
            customizeSection = (
                <FaqCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateFaqSection={updateFaqSection}
                    sectionData={homePageData.faq_section}
                />
            );
            break;
        case "Testimonial":
            customizeSection = (
                <TestimonialCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateTestimonialSection={updateTestimonialSection}
                    sectionData={homePageData.testimonial_section}
                />
            );
            break;
        case "PhotoGallery":
            customizeSection = (
                <PhotoGalleryCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={homePageData.photo_gallery_section}
                    updatePhotoGallerySection={updatePhotoGallerySection}
                />
            )
            break;
        case "WorkingProgress":
            customizeSection = (
                <WorkingProgressCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={homePageData.working_progress_section}
                    updateWorkingProgressSection={updateWorkingProgressSection}
                />
            )
            break;
        case "Banner":
            customizeSection = (
                <BannerCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={homePageData.banner_section}
                    updateBannerSection={updateBannerSection}
                />
            )
            break;
        case "Resume":
            customizeSection = (
                <ResumeCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={homePageData.resume_section}
                    updateResumeSection={updateResumeSection}
                />
            )
    }
    // handle remove section
    const handleRemoveSection = () => {
        if (window.confirm("Are you sure you want to remove this section?")) {
            setCustomizeSections(
                produce((draft) => {
                    draft.splice(sectionIndex, 1);
                })
            );
            setIsOpen(false);
        }
    };

    // on drag end
    const handleSort = () => {
        // duplicate section
        const copiedCustomizeSections = [...customizeSections];
        const draggedItemContent = copiedCustomizeSections.splice(
            dragItem.current,
            1
        )[0];
        copiedCustomizeSections.splice(
            dragOverItem.current,
            0,
            draggedItemContent
        );
        dragItem.current = 0;
        dragOverItem.current = 0;
        setCustomizeSections(copiedCustomizeSections);
    };

    // handle publish
    const handlePublish = () => {
        router.put(route("admin.pages.update", home), {
            layouts_data: homePageData,
        });
    };

    // update home sections
    useEffect(() => {
        dispatch(updateHomeHomeSections(customizeSections));
    }, [customizeSections]);

    // handle set state
    useEffect(() => {
        setCustomizeSections(homeSections);
    }, [homeSections]);

    return (
        <PageCustomizeLayout type="home">
            <div className="customize-header-actions">
                <Link href={route("admin.pages.index")} className="dismiss">
                    <IonIcon icon={closeOutline} />
                </Link>
                <div className="publish">
                    <button
                        onClick={handlePublish}
                        className="btn btn-sm btn-success"
                    >
                        Published
                    </button>
                </div>
            </div>
            <div className="customize-section-wrap">
                <div className={`add-sections ${isAddSection ? "active" : ""}`}>
                    <AddSection
                        setIsAddSection={setIsAddSection}
                        addSection={(section) =>
                            setCustomizeSections(
                                produce((draft) => {
                                    draft.push(section);
                                })
                            )
                        }
                    />
                </div>
                <div className="customize-section-area">
                    <div className="page-customize-notice">
                        <div className="page-customize-notice-title">
                            <span>
                                You are customizing <br />{" "}
                                <strong>Home Page</strong>
                            </span>
                            <IonIcon
                                onClick={() => setIsExpandInfo(!isExpandInfo)}
                                icon={helpCircle}
                            />
                        </div>
                        <div
                            className={`page-customize-notice-content ${
                                isExpandInfo ? "show" : ""
                            }`}
                        >
                            <p>
                                The Customizer allows you to preview changes to
                                your site before publishing them. You can't
                                navigate to different pages on your site within
                                the preview. Edit shortcuts are shown for some
                                editable elements, and you can also sort
                                sections by drag and drop.
                            </p>
                        </div>
                    </div>
                    <div className="customize-sections">
                        {customizeSections.map((item, index) => (
                            <div
                                key={index}
                                className="customize-sections-item"
                                onClick={() => handleExpand(item.id, index)}
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() =>
                                    (dragOverItem.current = index)
                                }
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="customize-sections-item-title">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="customize-sections-item-icon">
                                    <IonIcon icon={chevronForward} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="customizer-footer">
                        <button
                            onClick={() => setIsAddSection(true)}
                            className="btn btn-sm btn-success"
                        >
                            Add Section
                        </button>
                    </div>
                </div>
                <div className={`customize-options ${isOpen ? "active" : ""}`}>
                    <div className="customize-section-description-container">
                        <div className="customize-section-title">
                            <button onClick={() => setIsOpen(false)}>
                                <IonIcon icon={chevronBackOutline} />
                            </button>
                            <span>
                                Customizing <br />{" "}
                                <strong>{expandCustomize} Section</strong>
                            </span>
                            <span
                                className="remove-section"
                                onClick={handleRemoveSection}
                            >
                                <IonIcon icon={trashOutline} />
                            </span>
                        </div>
                        <div className="customize-field">
                            {customizeSection}
                        </div>
                    </div>
                </div>
            </div>
        </PageCustomizeLayout>
    );
}
