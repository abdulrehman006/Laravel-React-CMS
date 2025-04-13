import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    hero_section: {
        layout: '2',
        title: "Creativity In Our Blood Line",
        sub_title: "We deliver best problem solving solution for our client and provide finest finishing product in present and upcoming future.",
        action_text: "Get a Quote",
        background_image_url: "/static/hero_bg.jpeg",
        action_url: "#",
        social_links: {
            title: "Follow Us",
            links: [
                {title: "Facebook", url: "#"},
                {title: "Twitter", url: "#"},
                {title: "Instagram", url: "#"},
            ],
        },
        email_address: 'mahadicreation@gmail.com',
        phone_number: '01722285902',
        photography_slider: [
            {
                title: 'Wedding',
                imageUrl: '/static/wedding.jpeg',
                href: '/service/service-details',
            },
            {
                title: 'Fashion',
                imageUrl: '/static/fashion.jpeg',
                href: '/service/service-details',
            },
            {
                title: 'Commercial',
                imageUrl: '/static/commercial.jpeg',
                href: '/service/service-details',
            },
            {
                title: 'Landscape',
                imageUrl: '/static/landscape.jpeg',
                href: '/service/service-details',
            },
        ]
    },
    our_fun_fact_section: {
        layout: "1",
        title: "Our fun fact",
        sub_title: "Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
        background_color: "linear-gradient(267.18deg, #161616 0%, #080808 100%)",
        fun_facts: [
            {
                title: "Global Happy Clients",
                value: "40K"
            },
            {
                title: "Project Completed",
                value: "50K"
            },
            {
                title: "Team Members",
                value: "245"
            },
            {
                title: "Digital products",
                value: "550"
            },
        ]
    },
    service_section: {
        layout: "1",
        title: "What Can We Do",
        sub_title: "Services we can help you with",
        action_text: "See All Services",
    },
    portfolio_section: {
        layout: "1",
        title: "Latest Projects",
        sub_title: "Portfolio to explore",
        background_color: "#181818",
        action_text: "See Details",
    },
    award_section: {
        title: "Our Awards",
        sub_title: "We get multiple awards",
        background_color: "#181818",
        items: [
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
            {year: 2019, title: "Google awards", list_item: ["Website of the day", "Mobile exelence"]},
        ]
    },
    video_section: {
        layout: "1",
        title: "Our agile process is ability to adapt and respond to change. Agile organizations view change as an opportunity, not a threat.",
        sub_title: "",
        thumbnail_image_url: "/static/video_bg.jpeg",
        video_url: "https://www.youtube.com/watch?v=rIfdg_Ot-LI",
        action_text: "Learn more",
        action_url: "",
    },
    our_team_section: {
        title: "Our Team",
        sub_title: "Awesome team member",
    },
    testimonial_section: {
        background_color: "#181818"
    },
    our_blog: {
        layout: "1",
        title: "Our Blog",
        sub_title: "Explore recent publication",
        action_text: "View More Blog"
    },
    moving_text_section: {
        text: "Our reputed world wide partners",
    },
    partner_section: {
        layout: "1",
        title: "Top Clients",
        sub_title: "Our reputed partner",
        logos: [
            '/static/partner_1.svg',
            '/static/partner_2.svg',
            '/static/partner_3.svg',
            '/static/partner_4.svg',
            '/static/partner_5.svg'
        ]
    },
    cta_section: {
        title: "Let’s disscuse make <br />something <i>cool</i> together",
        background_image_url: "/static/cta_bg.jpeg",
        action_text: "Apply For Metting",
        action_url: "#"
    },
    pricing_section: {
        title: "Pricing & Packaging",
        sub_title: "Providing best pricing for client",
        currency_symbol: "$",
        plans: [
            {
                name: "Standard",
                price: {monthly: 10, yearly: 10},
                features: [
                    'Static responsive website',
                    'Video marketing',
                    'Keywords research',
                    'Facebook campaign',
                    'eCommerce solution',
                    'Google adword',
                ],
                action_text: "Purchase Now",
                action_url: "#",
            },
            {
                name: "Professional",
                price: {monthly: 99, yearly: 199},
                features: [
                    'Static responsive website',
                    'Video marketing',
                    'Keywords research',
                    'Facebook campaign',
                    'eCommerce solution',
                    'Google adword',
                ],
                action_text: "Purchase Now",
                action_url: "#",
            },
            {
                name: "Ultimate",
                price: {monthly: 199, yearly: 299},
                features: [
                    'Static responsive website',
                    'Video marketing',
                    'Keywords research',
                    'Facebook campaign',
                    'eCommerce solution',
                    'Google adword',
                ],
                action_text: "Purchase Now",
                action_url: "#",
            },
        ]
    },
    contact_section: {
        title: "Contact Us",
        sub_title: "Getting touch",
        action_button_text: "Send Message",
        map_iframe_url: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29520.8871222201!2d90.3344973!3d22.349441399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1691222409957!5m2!1sen!2sbd"
    },
    case_study_section: {
        title: "Case Study",
        sub_title: "Featured case study",
    },
    about_section: {
        title: "About Us",
        sub_title: "We are UK based photography <br/>agency",
        action_text: "Learn More",
        action_url: "#",
        about_image: "/static/about_img_5.jpeg"
    },
    home_sections: [
        { id: 'Hero', title: 'Hero Section' },
        { id: 'FunFact', title: 'Fun fact Section' },
        { id: 'Service', title: 'Services Section' },
        { id: 'Portfolio', title: 'Portfolio Section' },
        { id: 'Award', title: 'Award Section' },
        { id: 'Video', title: 'Video Section' },
        { id: 'Team', title: 'Team Section' },
        { id: 'Testimonial', title: 'Testimonial Section' },
        { id: 'Blog', title: 'Blog Section' },
        { id: 'MovingText', title: 'Moving Text Section' },
        { id: 'Partner', title: 'Partner Section' },
        { id: 'CTA', title: 'CTA Section' },
        { id: 'Pricing', title: 'Pricing Section' },
        { id: 'Contact', title: 'Contact Section' },
        { id: 'CaseStudy', title: 'Case Study Section' },
        { id: 'About', title: 'About Section' },
    ]
}

export const homePageSlice = createSlice({
    name: "HomePage",
    initialState,
    reducers: {
        updateHomeData(state, action){
            state = action.payload
        },
        updateHeroSection(state, action){
            state.hero_section = action.payload
        },
        updateFunFactSection(state, action){
            state.our_fun_fact_section = action.payload
        },
        updateServiceSection(state, action){
            state.service_section = action.payload
        },
        updatePortfolioSection(state, action){
            state.portfolio_section = action.payload
        },
        updateAwardSection(state, action){
            state.award_section = action.payload
        },
        updateVideoSection(state, action){
            state.video_section = action.payload
        },
        updateHomeSections(state, action){
            state.home_sections = action.payload
        },
        updateTeamSection(state, action){
            state.our_team_section = action.payload
        },
        updateBlogSection(state, action){
            state.our_blog = action.payload
        },
        updateMovingTextSection(state, action){
            state.moving_text_section = action.payload
        },
        updatePartnerSection(state, action){
            state.partner_section = action.payload
        },
        updateCTASection(state, action){
            state.cta_section = action.payload
        },
        updatePricingSection(state, action){
            state.pricing_section = action.payload
        },
        updateContactSection(state, action){
            state.contact_section = action.payload
        },
        updateCaseStudySection(state, action){
            state.case_study_section = action.payload
        },
        updateAboutSection(state, action){
            state.about_section = action.payload
        },
    }
})

export default homePageSlice.reducer;
export const {
    updateHomeData,
    updateHeroSection,
    updateFunFactSection,
    updateServiceSection,
    updatePortfolioSection,
    updateAwardSection,
    updateVideoSection,
    updateHomeSections,
    updateTeamSection,
    updateBlogSection,
    updateMovingTextSection,
    updatePartnerSection,
    updateCTASection,
    updatePricingSection,
    updateContactSection,
    updateCaseStudySection,
    updateAboutSection
} = homePageSlice.actions;
