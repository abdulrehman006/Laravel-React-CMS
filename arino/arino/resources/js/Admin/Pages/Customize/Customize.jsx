import { IonIcon } from "@ionic/react";
import postcss from "postcss";
import {
    chevronForward,
    closeOutline,
    helpCircle,
    chevronBackOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCustomizeLayout from "@/Admin/Layouts/PageCustomizeLayout";
import {Head, Link, router, usePage} from "@inertiajs/react";
import GeneralCustomize from "@/Admin/Components/PageCustomize/GeneralCustomize";
import SidebarCustomize from "@/Admin/Components/PageCustomize/SidebarCustomize";
import FooterCustomize from "@/Admin/Components/PageCustomize/FooterCustomize";
import SocialLinkCustomize from "@/Admin/Components/PageCustomize/SocialLinkCustomize";
import CustomizeContact from "@/Admin/Components/PageCustomize/CustomizeContact";
import SubscribeCustomize from "@/Admin/Components/PageCustomize/SubscribeCustomize";
import {
    updateContact,
    updateCustomCss,
    updateFooter,
    updateGeneral, updateHtmlEmbedCode,
    updateSidebar,
    updateSocialLink,
    updateSubscribe,
} from "@/Redux/features/pages/Customize/customize";
import CustomCSSCustomizer from "@/Admin/Components/PageCustomize/CustomCSSCustomizer";
import toast from "react-hot-toast";
import HtmlEmbedCustomize from "@/Admin/Components/PageCustomize/HtmlEmbedCustomize";

export default function Customize({ customize_settings }) {
    const dispatch = useDispatch();
    const customize = useSelector((state) => state.customize);
    const [isExpandInfo, setIsExpandInfo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [expandCustomize, setExpandCustomize] = useState("");

    // handle expand
    const handleExpand = (name) => {
        setExpandCustomize(name);
        setIsOpen(true);
    };

    // conditional customize section render
    let customizeSection = "";
    switch (expandCustomize) {
        case "general":
            customizeSection = <GeneralCustomize />;
            break;
        case "sidebar":
            customizeSection = <SidebarCustomize />;
            break;
        case "footer":
            customizeSection = <FooterCustomize />;
            break;
        case "social":
            customizeSection = <SocialLinkCustomize />;
            break;
        case "contact":
            customizeSection = <CustomizeContact />;
            break;
        case "subscriber":
            customizeSection = <SubscribeCustomize />;
            break;
        case "css":
            customizeSection = <CustomCSSCustomizer />;
            break;
        case "html_embed":
            customizeSection = <HtmlEmbedCustomize />;
            break;
    }

    // handle publish
    const handlePublish = () => {
        if (customize.custom_css) {
            try {
                postcss.parse(customize.custom_css);
            } catch (error) {
                toast.error("You entered invalid css");
                return;
            }
        }
        router.put(route("admin.customize.customize"), customize);
    };

    useEffect(() => {
        dispatch(updateGeneral(customize_settings.general));
        dispatch(updateSidebar(customize_settings.sidebar));
        dispatch(updateFooter(customize_settings.footer));
        dispatch(updateContact(customize_settings.contact));
        dispatch(updateSubscribe(customize_settings.subscriber));
        dispatch(updateSocialLink(customize_settings.social_links));
        dispatch(updateCustomCss(customize_settings.custom_css.custom_css));
        dispatch(updateHtmlEmbedCode(customize_settings.html_embed_code.html_embed_code));
    }, [customize_settings]);

    return (
        <PageCustomizeLayout type="customize">
            <Head title="Customize" />
            <div className="customize-header-actions">
                <Link href="/admin/dashboard" className="dismiss">
                    <IonIcon icon={closeOutline} />
                </Link>
                <div className="publish">
                    <button
                        onClick={handlePublish}
                        className="btn btn-sm btn-success"
                    >
                        Update
                    </button>
                </div>
            </div>
            <div className="customize-section-wrap">
                <div className="customize-section-area">
                    <div className="page-customize-notice">
                        <div className="page-customize-notice-title">
                            <span>
                                You are customizing <br />{" "}
                                <strong>Website</strong>
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
                            onClick={() => handleExpand("general")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>General</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("sidebar")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Sidebar</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("footer")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Footer</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("social")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Social Links</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("contact")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Contacts Info</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("subscriber")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Subscriber</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("css")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>Custom CSS</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>

                        <div
                            className="customize-sections-item"
                            onClick={() => handleExpand("html_embed")}
                        >
                            <div className="customize-sections-item-title">
                                <h3>HTML Embed</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>
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
