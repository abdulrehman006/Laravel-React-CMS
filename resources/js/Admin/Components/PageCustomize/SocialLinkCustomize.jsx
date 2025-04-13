import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateSocialLink} from "@/Redux/features/pages/Customize/customize";

export default function SocialLinkCustomize(){
    const social_links = useSelector((state) => state.customize.social_links)
    const dispatch = useDispatch();
    const [data, setData] = useState(social_links)

    useEffect(() => {
        dispatch(updateSocialLink(data))
    }, [data])

    return(
        <>
            <div className="form-group">
                <label>Facebook URL</label>
                <input type="text" value={data.facebook_url} onChange={(e) => setData({...data, facebook_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Linkedin URL</label>
                <input type="text" value={data.linkedin_url} onChange={(e) => setData({...data, linkedin_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Twitter URL</label>
                <input type="text" value={data.twitter_url} onChange={(e) => setData({...data, twitter_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Youtube URL</label>
                <input type="text" value={data.youtube_url} onChange={(e) => setData({...data, youtube_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Slack URL</label>
                <input type="text" value={data.slack_url} onChange={(e) => setData({...data, slack_url: e.target.value})} className="form-control"/>
            </div>

            <div className="form-group">
                <label>WhatsApp URL</label>
                <input type="text" value={data.whatsapp_url} onChange={(e) => setData({...data, whatsapp_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Telegram URL</label>
                <input type="text" value={data.telegram_url} onChange={(e) => setData({...data, telegram_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Instagram URL</label>
                <input type="text" value={data.instagram_url} onChange={(e) => setData({...data, instagram_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Pinterest URL</label>
                <input type="text" value={data.pinterest_url} onChange={(e) => setData({...data, pinterest_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Reddit URL</label>
                <input type="text" value={data.reddit_url} onChange={(e) => setData({...data, reddit_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Snapchat URL</label>
                <input type="text" value={data.snapchat_url} onChange={(e) => setData({...data, snapchat_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Tiktok URL</label>
                <input type="text" value={data.tiktok_url} onChange={(e) => setData({...data, tiktok_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Tumblr URL</label>
                <input type="text" value={data.tumblr_url} onChange={(e) => setData({...data, tumblr_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>VK URL</label>
                <input type="text" value={data.vk_url} onChange={(e) => setData({...data, vk_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Discord URL</label>
                <input type="text" value={data.discord_url} onChange={(e) => setData({...data, discord_url: e.target.value})} className="form-control"/>
            </div>
        </>

    )
}
