import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {produce} from "immer";
import {updateFooter} from "@/Redux/features/pages/Customize/customize";

export default function FooterCustomize(){
    const footer = useSelector((state) => state.customize.footer)
    const dispatch = useDispatch();
    const [data, setData] = useState({
        ...footer,
        footer_is_show_social_media: footer.footer_is_show_social_media === "1"
    })

    useEffect(() => {
        dispatch(updateFooter(data))
    }, [data])

    return(
        <>
            <div className="form-group">
                <label>Footer Description</label>
                <textarea value={data.footer_description} onChange={(e) => setData({...data, footer_description: e.target.value})} className="form-control"></textarea>
            </div>
            <div className="form-group">
                <label>Contact Title</label>
                <input type="text" value={data.contact_us_title} onChange={(e) => setData({...data, contact_us_title: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Show Social Media:
                    <div className={`yoo-switch ${data.footer_is_show_social_media ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.footer_is_show_social_media = !draft.footer_is_show_social_media
                    }))}>
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label>Copyright Text</label>
                <input type="text" value={data.copyright_text} onChange={(e) => setData({...data, copyright_text: e.target.value})} className="form-control"/>
            </div>
        </>

    )
}
