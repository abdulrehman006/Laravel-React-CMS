import React, {useEffect, useState} from 'react';
import Frame from "react-frame-component";
import Welcome from "@/Frontend/Pages/Welcome.jsx";
import "./page-customize.scss"
import {usePage} from "@inertiajs/react";
import {updateHomeData} from "@/Redux/features/pages/home/home";
import {useDispatch, useSelector} from "react-redux";
import ServiceDetailsPage from "@/Frontend/Pages/Services/ServiceDetailsPage";
import PortfolioDetailsPage from "@/Frontend/Pages/Portfolios/PortfolioDetailsPage";
import CaseStudyDetailsPage from "@/Frontend/Pages/CaseStudy/CaseStudyDetailsPage";
import AboutPage from "@/Frontend/Pages/Page/AboutPage";
import FaqPage from "@/Frontend/Pages/Page/FaqPage";
import ContactPage from "@/Frontend/Pages/Page/ContactPage";
import Page from "@/Frontend/Pages/Page/Page";
import toast, { Toaster } from 'react-hot-toast';
import {
    updateContact,
    updateFooter,
    updateGeneral,
    updateSidebar, updateSocialLink,
    updateSubscribe
} from "@/Redux/features/pages/Customize/customize";

const PageCustomizeLayout = ({ type, children }) => {
    const { home_data, flash } = usePage().props;
    const customizeSettings = window.customize_settings;
    const customize = useSelector((state) => state.customize);
    const [iframeMount, setIsIframeMount] = useState(false);
    const dispatch = useDispatch();
    // conditional rendering
    let pageElement = ""
    if (type === "home" || type === "customize"){
        pageElement = <Welcome home_data={home_data} />
    } else if(type === "portfolios"){
        pageElement = <PortfolioDetailsPage />
    } else if(type === "services"){
        pageElement = <ServiceDetailsPage />
    } else if(type === "case_study"){
        pageElement = <CaseStudyDetailsPage />
    } else if(type === "about"){
        pageElement = <AboutPage />
    } else if (type === "faq"){
        pageElement = <FaqPage />
    } else if(type === "contact"){
        pageElement = <ContactPage />
    } else if(type === "page"){
        pageElement = <Page />
    }

    // update layouts data
    useEffect(() => {
        dispatch(updateHomeData(home_data))
    }, [home_data])

    useEffect(() => {
        if (customizeSettings){
            dispatch(updateGeneral(customizeSettings.general))
            dispatch(updateSidebar(customizeSettings.sidebar))
            dispatch(updateFooter(customizeSettings.footer))
            dispatch(updateContact(customizeSettings.contact))
            dispatch(updateSubscribe(customizeSettings.subscriber))
            dispatch(updateSocialLink(customizeSettings.social_links))
        }
    }, [customizeSettings])

    // show toast notification
    useEffect(() => {
        if (flash.success){
            toast.success(flash.success, {
                duration: 3000,
            })
        }
        else if (flash.error){
            toast.error(flash.error, {
                duration: 3000,
            })
        }
    }, [flash])

    // Callback function to be executed after content is mounted
    const handleContentDidMount = () => {
        // Access the document of the iframe
        const iframeDocument = document.querySelector('iframe').contentDocument;

        // Add a class to the body element
        if (iframeDocument) {
            if (customize.general.enable_rtl === "1"){
                iframeDocument.body.classList.add("rtl");
            }
        }
    };

    return (
        <div className="page-customizer-wrap">
            <div className="page-customizer-left">{children}</div>
            <div className="page-customizer-right">
                <Frame
                    head={
                        <>
                            <link href={`https://fonts.googleapis.com/css2?family=${customize.general.primary_font}:wght@400;500;600;700;800;900&display=swap`} rel="stylesheet" />
                            <link href={`https://fonts.googleapis.com/css2?family=${customize.general.secondary_font}:wght@400;500;600;700;800;900&display=swap`} rel="stylesheet" />
                            <style>
                                {customize.custom_css}
                                {`:root {
                                    --accent: ${customize.general.site_color};
                                    --primary-font: ${customize.general.primary_font}, sans-serif;
                                    --secondary-font: ${customize.general.secondary_font}, sans-serif;
                                }
                            `}
                            </style>
                        </>
                    }
                    contentDidMount={handleContentDidMount}
                    initialContent='
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <link rel="stylesheet" href="/css/frontend/bootstrap.min.css">
                    <link rel="stylesheet" href="/css/frontend/globals.css">
                    <link rel="stylesheet" href="/css/frontend/slick.css">
                    </head>
                    <body>
                        <div></div>
                    </body>
                    </html>
                    '>
                    {pageElement}
                </Frame>
            </div>
            <Toaster />
        </div>
    );
};

export default PageCustomizeLayout;
