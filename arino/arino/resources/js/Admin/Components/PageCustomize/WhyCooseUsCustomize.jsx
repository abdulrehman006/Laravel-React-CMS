import React, {useEffect, useState} from "react";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function WhyCooseUsCustomize({currentSection, spacingCallback, updateWhyChooseUsSection, sectionData}){
    const [data, setData] = useState(sectionData);
    const [tab, setTab] = useState('general');

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, image: res.data})
        })
    }

    // update state
    useEffect(() => {
        updateWhyChooseUsSection(data)
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
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Sub Title</label>
                        <input className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="" id="" cols="30" value={data.description} rows="10" className="form-control" onChange={(e) => setData({...data, description: e.target.value})}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <FileUpload select={(file) => handleUploadFile(file)} value={data.image}/>
                    </div>
                    {data.layout === "2" && (
                        <>
                            <div className="form-group">
                                <label>Action Text</label>
                                <input type="text" value={data.action_text} onChange={(e) => setData({...data, action_text: e.target.value})} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Action URL</label>
                                <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
