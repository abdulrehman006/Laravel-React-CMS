import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    hero_section: {},
    our_fun_fact_section: {},
    service_section: {},
    portfolio_section: {},
    award_section: {},
    video_section: {},
    our_team_section: {},
    testimonial_section: {},
    our_blog: {},
    moving_text_section: {},
    partner_section: {},
    cta_section: {},
    pricing_section: {},
    contact_section: {},
    case_study_section: {},
    about_section: {},
    home_sections: [],
    why_choose_us: {},
    faq_section: {},
    photo_gallery_section: {},
    working_progress_section: {},
    banner_section: {},
    resume_section: {},
    sections_data:{},
}

export const homePageSlice = createSlice({
    name: "HomePage",
    initialState,
    reducers: {
        updateHomeData(state, {payload}){
            state.hero_section = payload.hero_section;
            state.our_fun_fact_section = payload.our_fun_fact_section;
            state.service_section = payload.service_section;
            state.portfolio_section = payload.portfolio_section;
            state.award_section = payload.award_section;
            state.video_section = payload.video_section;
            state.home_sections = payload.home_sections;
            state.our_team_section = payload.our_team_section;
            state.our_blog = payload.our_blog;
            state.moving_text_section = payload.moving_text_section;
            state.partner_section = payload.partner_section;
            state.cta_section = payload.cta_section;
            state.pricing_section = payload.pricing_section;
            state.case_study_section = payload.case_study_section;
            state.about_section = payload.about_section;
            state.why_choose_us = payload.why_choose_us;
            state.faq_section = payload.faq_section;
            state.contact_section = payload.contact_section;
            state.testimonial_section = payload.testimonial_section;
            state.photo_gallery_section = payload.photo_gallery_section ?? {};
            state.working_progress_section = payload.working_progress_section ?? {};
            state.banner_section = payload.banner_section ?? {};
            state.resume_section = payload.resume_section ?? {}
        },
        updateHomeHeroSection(state, action){
            state.hero_section = action.payload
        },
        updateHomeFunFactSection(state, action){
            state.our_fun_fact_section = action.payload
        },
        updateHomeServiceSection(state, action){
            state.service_section = action.payload
        },
        updateHomePortfolioSection(state, action){
            state.portfolio_section = action.payload
        },
        updateHomeAwardSection(state, action){
            state.award_section = action.payload
        },
        updateHomeVideoSection(state, action){
            state.video_section = action.payload
        },
        updateHomeHomeSections(state, action){
            state.home_sections = action.payload
        },
        updateHomeTeamSection(state, action){
            state.our_team_section = action.payload
        },
        updateHomeBlogSection(state, action){
            state.our_blog = action.payload
        },
        updateHomeMovingTextSection(state, action){
            state.moving_text_section = action.payload
        },
        updateHomePartnerSection(state, action){
            state.partner_section = action.payload
        },
        updateHomeCTASection(state, action){
            state.cta_section = action.payload
        },
        updateHomePricingSection(state, action){
            state.pricing_section = action.payload
        },
        updateHomeContactSection(state, action){
            state.contact_section = action.payload
        },
        updateHomeCaseStudySection(state, action){
            state.case_study_section = action.payload
        },
        updateHomeAboutSection(state, action){
            state.about_section = action.payload
        },
        updateHomeWhyChooseUsSection(state, action){
            state.why_choose_us = action.payload
        },
        updateHomeFaqSection(state, action){
            state.faq_section = action.payload
        },
        updateHomeTestimonialSection(state, action){
            state.testimonial_section = action.payload
        },
        updateHomePhotoGallerySection(state, action){
            state.photo_gallery_section = action.payload
        },
        updateHomeWorkingProgressSection(state, action){
            state.working_progress_section = action.payload
        },
        updateHomeBannerSection(state, action){
            state.banner_section = action.payload
        },
        updateHomeResumeSection(state, action){
            state.resume_section = action.payload
        }
    }
})

export default homePageSlice.reducer;
export const {
    updateHomeData,
    updateHomeHeroSection,
    updateHomeFunFactSection,
    updateHomeServiceSection,
    updateHomePortfolioSection,
    updateHomeAwardSection,
    updateHomeVideoSection,
    updateHomeHomeSections,
    updateHomeTeamSection,
    updateHomeBlogSection,
    updateHomeMovingTextSection,
    updateHomePartnerSection,
    updateHomeCTASection,
    updateHomePricingSection,
    updateHomeContactSection,
    updateHomeCaseStudySection,
    updateHomeAboutSection,
    updateHomeWhyChooseUsSection,
    updateHomeFaqSection,
    updateHomeTestimonialSection,
    updateHomePhotoGallerySection,
    updateHomeWorkingProgressSection,
    updateHomeBannerSection,
    updateHomeResumeSection,
} = homePageSlice.actions;
