import Header from "@/Frontend/Components/Header/index.jsx";
import "slick-carousel/slick/slick.css";
import Footer from "@/Frontend/Components/Footer";
import {useEffect} from "react";
import {updateHomeData} from "@/Redux/features/pages/home/home";
import {useDispatch} from "react-redux";
import {
    updateContact,
    updateFooter,
    updateGeneral,
    updateSidebar, updateSocialLink,
    updateSubscribe
} from "@/Redux/features/pages/Customize/customize";

export default function FrontendLayout({children}){
    const layoutData = window.layoutsData;
    const customizeSettings = window.customize_settings;
    const dispatch = useDispatch()
    // update layouts data
    useEffect(() => {
        if (!window.location.href.includes('admin')){
            dispatch(updateHomeData(layoutData))
        }
    }, [layoutData])

    // update customize settings
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
    return (
        <>
            <Header variant={true} />
            {children}
            <Footer />
        </>
    )
}
