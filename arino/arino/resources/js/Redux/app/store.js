import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "@/Redux/features/pages/home/home.js";
import portfolioReducer from "@/Redux/features/pages/Portfolio/portfolio";
import ServiceReducer from "@/Redux/features/pages/Service/service";
import caseStudyReducer from "@/Redux/features/pages/CaseStudy/case_study";
import AboutReducer from "@/Redux/features/pages/About/about";
import FaqReducer from "@/Redux/features/pages/FAQ/faq";
import ContactReducer from "@/Redux/features/pages/Contact/contact";
import PageReducer from "@/Redux/features/pages/Page/page";
import Customize from "@/Redux/features/pages/Customize/customize";
import spacingReducer from "@/Redux/features/Customize/spacing";

export const store = configureStore({
    reducer: {
        homePage: homeReducer,
        portfolioPage: portfolioReducer,
        servicePage: ServiceReducer,
        caseStudyPage: caseStudyReducer,
        aboutPage: AboutReducer,
        faqPage: FaqReducer,
        contactPage: ContactReducer,
        pages: PageReducer,
        customize: Customize,
        spacing: spacingReducer,
    },
    devTools: false,
});
