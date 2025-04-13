import React, {useEffect, useState} from "react";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function BannerCustomize({ sectionData, spacingCallback, currentSection, updateBannerSection }){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData?.layout,
        title: sectionData?.title,
        background_image: sectionData?.background_image,
        action_url: sectionData?.action_url,
    })

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.background_image = res.data
            }))
        })
    }

    // banner section
    useEffect(() => {
        updateBannerSection(data)
    }, [data])

    return(
        <>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item" onClick={() => setTab('general')} style={{cursor: "pointer"}}>
                    <span className={`nav-link ${tab === "general" && "active"}`}>General</span>
                </li>
                <li className="nav-item" onClick={() => setTab('spacing')} style={{cursor: "pointer"}}>
                    <span className={`nav-link ${tab === "spacing" && "active"}`}>Spacing</span>
                </li>
            </ul>
            {tab === "general" ? (
                <>
                    <div className="form-group">
                        <label>Select layout</label>
                        <select className="form-control" value={data.layout} onChange={(e) => setData({...data, layout: e.target.value})}>
                            <option value="1">Style 1</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Background Image</label>
                        <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image}/>
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Action URL</label>
                        <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
