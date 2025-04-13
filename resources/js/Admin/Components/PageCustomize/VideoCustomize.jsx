import React, {useEffect, useState} from "react";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function VideoCustomize({currentSection, spacingCallback, updateVideoSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        thumbnail_image_url: sectionData.thumbnail_image_url,
        video_url: sectionData.video_url,
        action_text: sectionData.action_text,
        action_url: sectionData.action_url,
    })

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, thumbnail_image_url: res.data})
        })
    }

    // conditional field rendering
    let fields = "";
    if (sectionData.layout === "2"){
        fields =
            <>
                <div className="form-group">
                    <label>Sub Title</label>
                    <input type="text" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></input>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div></>
    }

    // update state
    useEffect(() => {
        updateVideoSection(data)
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
                            <option value="2">Style 2</option>
                            <option value="3">Style 3</option>
                        </select>
                    </div>
                    {sectionData.layout !== "3" && (
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                        </div>
                    )}
                    {fields}
                    <div className="form-group">
                        <label>Thumbnail Image</label>
                        <FileUpload select={(file) => handleUploadFile(file)} value={data.thumbnail_image_url}/>
                    </div>
                    <div className="form-group">
                        <label>Youtube Video URL</label>
                        <input type="text" value={data.video_url} onChange={(e) => setData({...data, video_url: e.target.value})} className="form-control"/>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
