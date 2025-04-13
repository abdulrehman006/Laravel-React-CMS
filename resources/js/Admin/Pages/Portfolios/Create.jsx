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
import TeamCustomize from "@/Admin/Components/PageCustomize/TeamCustomize";
import BlogCustomize from "@/Admin/Components/PageCustomize/BlogCustomize";
import MovingTextCustomize from "@/Admin/Components/PageCustomize/MovingTextCustomize";
import PartnerCustomize from "@/Admin/Components/PageCustomize/PartnerCustomize";
import CTACustomize from "@/Admin/Components/PageCustomize/CTACustomize";
import PricingCustomize from "@/Admin/Components/PageCustomize/PricingCustomize";
import ContactCustomize from "@/Admin/Components/PageCustomize/ContactCustomize";
import CaseStudyCustomize from "@/Admin/Components/PageCustomize/CaseStudyCustomize";
import AboutCustomize from "@/Admin/Components/PageCustomize/AboutCustomize";
import PortfolioDetails from "@/Admin/Components/PageCustomize/PortfolioDetails";
import AddSection from "@/Admin/Components/PageCustomize/AddSection";
import { produce } from "immer";
import {
    updatePortfolioAboutSection,
    updatePortfolioAwardSection, updatePortfolioBannerSection,
    updatePortfolioBlogSection,
    updatePortfolioCaseStudySection,
    updatePortfolioContactSection,
    updatePortfolioCTASection,
    updatePortfolioFaqSection,
    updatePortfolioFunFactSection,
    updatePortfolioHeroSection,
    updatePortfolioMovingTextSection,
    updatePortfolioPartnerSection, updatePortfolioPhotoGallerySection,
    updatePortfolioPortfolioSection,
    updatePortfolioPricingSection, updatePortfolioResumeSection,
    updatePortfolioSection,
    updatePortfolioServiceSection,
    updatePortfolioTeamSection, updatePortfolioTestimonialSection,
    updatePortfolioVideoSection,
    updatePortfolioWhyChooseUsSection, updatePortfolioWorkingProgressSection,
} from "@/Redux/features/pages/Portfolio/portfolio";
import { Head, Link, router, usePage } from "@inertiajs/react";
import WhyCooseUsCustomize from "@/Admin/Components/PageCustomize/WhyCooseUsCustomize";
import FaqCustomize from "@/Admin/Components/PageCustomize/FaqCustomize";
import TestimonialCustomize from "@/Admin/Components/PageCustomize/TestimonialCustomize";
import PhotoGalleryCustomize from "@/Admin/Components/PageCustomize/PhotoGalleryCustomize";
import WorkingProgressCustomize from "@/Admin/Components/PageCustomize/WorkingProgressCustomize";
import BannerCustomize from "@/Admin/Components/PageCustomize/BannerCustomize";
import ResumeCustomize from "@/Admin/Components/PageCustomize/ResumeCustomize";

export default function Create() {
    const { errors } = usePage().props;
    const portfolio = useSelector((state) => state.portfolioPage) || [];
    const portfolioSections =
        useSelector((state) => state.portfolioPage.sections) || [];
    const homePageData = useSelector((state) => state.homePage);
    const dispatch = useDispatch();
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const [isExpandInfo, setIsExpandInfo] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [expandCustomize, setExpandCustomize] = useState("PortfolioDetails");
    const [customizeSections, setCustomizeSections] = useState([]);
    const [isAddSection, setIsAddSection] = useState(false);
    const [sectionIndex, setSectionIndex] = useState("");
    const currentSection = portfolio.sections[sectionIndex];

    // handle expand
    const handleExpand = (name, index) => {
        setExpandCustomize(name);
        setSectionIndex(index);
        setIsOpen(true);
    };

    const handleUpdateSpacing = (e) => {
        let customizeSpacing = JSON.parse(JSON.stringify(portfolio.sections));
        customizeSpacing[sectionIndex].spacing.top.lg = e.top.lg;
        customizeSpacing[sectionIndex].spacing.top.md = e.top.md;
        customizeSpacing[sectionIndex].spacing.bottom.lg = e.bottom.lg;
        customizeSpacing[sectionIndex].spacing.bottom.md = e.bottom.md;
        dispatch(updatePortfolioSection(customizeSpacing));
    };

    const updateHeroSection = (data) => {
        dispatch(updatePortfolioHeroSection(data));
    };
    const updateFunFactSection = (data) => {
        dispatch(updatePortfolioFunFactSection(data));
    };
    const updateServiceSection = (data) => {
        dispatch(updatePortfolioServiceSection(data));
    };
    const updatePortfolioSectionData = (data) => {
        dispatch(updatePortfolioPortfolioSection(data));
    };
    const updateAwardSection = (data) => {
        dispatch(updatePortfolioAwardSection(data));
    };
    const updateVideoSection = (data) => {
        dispatch(updatePortfolioVideoSection(data));
    };
    const updateTeamSection = (data) => {
        dispatch(updatePortfolioTeamSection(data));
    };
    const updateBlogSection = (data) => {
        dispatch(updatePortfolioBlogSection(data));
    };
    const updateMovingTextSection = (data) => {
        dispatch(updatePortfolioMovingTextSection(data));
    };
    const updatePartnerSection = (data) => {
        dispatch(updatePortfolioPartnerSection(data));
    };
    const updateCTASection = (data) => {
        dispatch(updatePortfolioCTASection(data));
    };
    const updatePricingSection = (data) => {
        dispatch(updatePortfolioPricingSection(data));
    };
    const updateContactSection = (data) => {
        dispatch(updatePortfolioContactSection(data));
    };
    const updateCaseStudySection = (data) => {
        dispatch(updatePortfolioCaseStudySection(data));
    };
    const updateAboutSectionData = (data) => {
        dispatch(updatePortfolioAboutSection(data));
    };
    const updateWhyChooseUsSection = (data) => {
        dispatch(updatePortfolioWhyChooseUsSection(data));
    };
    const updateFaqSection = (data) => {
        dispatch(updatePortfolioFaqSection(data));
    };
    const updateTestimonialSection = (data) => {
        dispatch(updatePortfolioTestimonialSection(data))
    };
    const updatePhotoGallerySection = (data) => {
        dispatch(updatePortfolioPhotoGallerySection(data))
    };
    const updateWorkingProgressSection = (data) => {
        dispatch(updatePortfolioWorkingProgressSection(data))
    };
    const updateBannerSection = (data) => {
        dispatch(updatePortfolioBannerSection(data))
    };
    const updateResumeSection = (data) => {
        dispatch(updatePortfolioResumeSection(data))
    }

    // conditional customize section render
    let customizeSection = "";
    switch (expandCustomize) {
        case "PortfolioDetails":
            customizeSection = <PortfolioDetails isEdit={false} />;
            break;
        case "Hero":
            customizeSection = (
                <HeroSectionCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateHeroSection={updateHeroSection}
                    sectionData={portfolio.sections_data.hero_section}
                />
            );
            break;
        case "FunFact":
            customizeSection = (
                <FunFactSectionCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateFunFactSection={updateFunFactSection}
                    sectionData={portfolio.sections_data.our_fun_fact_section}
                />
            );
            break;
        case "Service":
            customizeSection = (
                <ServiceCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateServiceSection={updateServiceSection}
                    sectionData={portfolio.sections_data.service_section}
                />
            );
            break;
        case "Portfolio":
            customizeSection = (
                <PortfolioCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updatePortfolioSection={updatePortfolioSectionData}
                    sectionData={portfolio.sections_data.portfolio_section}
                />
            );
            break;
        case "Award":
            customizeSection = (
                <AwardCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateAwardSection={updateAwardSection}
                    sectionData={portfolio.sections_data.award_section}
                />
            );
            break;
        case "Video":
            customizeSection = (
                <VideoCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateVideoSection={updateVideoSection}
                    sectionData={portfolio.sections_data.video_section}
                />
            );
            break;
        case "Team":
            customizeSection = (
                <TeamCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateTeamSection={updateTeamSection}
                    sectionData={portfolio.sections_data.our_team_section}
                />
            );
            break;
        case "Blog":
            customizeSection = (
                <BlogCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateBlogSection={updateBlogSection}
                    sectionData={portfolio.sections_data.our_blog}
                />
            );
            break;
        case "MovingText":
            customizeSection = (
                <MovingTextCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateMovingTextSection={updateMovingTextSection}
                    sectionData={portfolio.sections_data.moving_text_section}
                />
            );
            break;
        case "Partner":
            customizeSection = (
                <PartnerCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updatePartnerSection={updatePartnerSection}
                    sectionData={portfolio.sections_data.partner_section}
                />
            );
            break;
        case "CTA":
            customizeSection = (
                <CTACustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateCTASection={updateCTASection}
                    sectionData={portfolio.sections_data.cta_section}
                />
            );
            break;
        case "Pricing":
            customizeSection = (
                <PricingCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updatePricingSection={updatePricingSection}
                    sectionData={portfolio.sections_data.pricing_section}
                />
            );
            break;
        case "Contact":
            customizeSection = (
                <ContactCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateContactSection={updateContactSection}
                    sectionData={portfolio.sections_data.contact_section}
                />
            );
            break;
        case "CaseStudy":
            customizeSection = (
                <CaseStudyCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateCaseStudySection={updateCaseStudySection}
                    sectionData={portfolio.sections_data.case_study_section}
                />
            );
            break;
        case "About":
            customizeSection = (
                <AboutCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateAboutSection={updateAboutSectionData}
                    sectionData={portfolio.sections_data.about_section}
                />
            );
            break;
        case "WhyChooseUs":
            customizeSection = (
                <WhyCooseUsCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateWhyChooseUsSection={updateWhyChooseUsSection}
                    sectionData={portfolio.sections_data.why_choose_us}
                />
            );
            break;
        case "Faq":
            customizeSection = (
                <FaqCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateFaqSection={updateFaqSection}
                    sectionData={portfolio.sections_data.faq_section}
                />
            );
            break;
        case "Testimonial":
            customizeSection = (
                <TestimonialCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    updateTestimonialSection={updateTestimonialSection}
                    sectionData={portfolio.sections_data.testimonial_section}
                />
            );
            break;
        case "PhotoGallery":
            customizeSection = (
                <PhotoGalleryCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={portfolio.sections_data.photo_gallery_section}
                    updatePhotoGallerySection={updatePhotoGallerySection}
                />
            )
            break;
        case "WorkingProgress":
            customizeSection = (
                <WorkingProgressCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={portfolio.sections_data.working_progress_section}
                    updateWorkingProgressSection={updateWorkingProgressSection}
                />
            )
            break;
        case "Banner":
            customizeSection = (
                <BannerCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={portfolio.sections_data.banner_section}
                    updateBannerSection={updateBannerSection}
                />
            )
            break;
        case "Resume":
            customizeSection = (
                <ResumeCustomize
                    currentSection={currentSection}
                    spacingCallback={handleUpdateSpacing}
                    sectionData={portfolio.sections_data.resume_section}
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
        router.post(route("admin.portfolios.store"), {
            ...portfolio.portfolioDetails,
            sections_data: portfolio.sections_data,
            sections: portfolio.sections,
        });
    };

    // handle set state
    useEffect(() => {
        setCustomizeSections(portfolioSections);
    }, [portfolioSections]);

    // update section to state
    useEffect(() => {
        dispatch(updatePortfolioSection(customizeSections));
    }, [customizeSections]);

    // if have any validation error than open customize section
    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            setExpandCustomize("PortfolioDetails");
            setIsOpen(true);
        }
    }, [errors]);

    return (
        <PageCustomizeLayout type="portfolios">
            <Head title="Create portfolio" />
            <div className="customize-header-actions">
                <Link
                    href={route("admin.portfolios.index")}
                    className="dismiss"
                >
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
                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("PortfolioDetails")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Portfolio Details</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>
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
