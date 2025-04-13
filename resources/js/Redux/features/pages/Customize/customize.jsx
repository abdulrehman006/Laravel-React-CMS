import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    general: {
        site_name: "",
        site_logo: "",
        site_favicon: "",
        site_color: "",
        is_page_breadcrumbs: true,
        enable_rtl: false,
    },
    sidebar: {
       is_show_logo: true,
       is_show_contact_info: true,
       contact_title: "",
        contact_subtitle: "",
        is_show_subscribe: true,
        is_show_social_media: true,

    },
    footer: {
        footer_description: "",
        footer_is_show_social_media: true,
        contact_us_title: "",
        copyright_text: "",
    },
    social_links: {
        facebook_url: "",
        linkedin_url: "",
        twitter_url: "",
        youtube_url: "",
        slack_url: "",
    },
    subscriber: {
        subscribe_title: "",
        subscribe_description: "",
    },
    contact: {
        contact_phone_number: "",
        contact_email: "",
        contact_address: "",
    },
    custom_css: "",
    html_embed_code: ""
}

const customizeSlice = createSlice({
    name: "customize",
    initialState,
    reducers: {
        updateGeneral(state, action){
            state.general = action.payload
        },
        updateSidebar(state, action){
            state.sidebar = action.payload
        },
        updateFooter(state, action){
            state.footer = action.payload
        },
        updateContact(state, action){
            state.contact = action.payload
        },
        updateSubscribe(state, action){
            state.subscriber = action.payload
        },
        updateSocialLink(state, action){
            state.social_links = action.payload
        },
        updateCustomCss(state, action){
            state.custom_css = action.payload
        },
        updateHtmlEmbedCode(state, action){
            state.html_embed_code = action.payload;
        }
    }
})

export default customizeSlice.reducer;
export const {updateFooter, updateGeneral, updateSidebar, updateContact, updateSubscribe, updateSocialLink, updateCustomCss, updateHtmlEmbedCode} = customizeSlice.actions
