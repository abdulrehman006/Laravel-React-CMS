import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function TestimonialCustomize({currentSection, spacingCallback, sectionData, updateTestimonialSection}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        background_image: sectionData.background_image,
    });

    // handle background image
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, background_image: res.data})
        })
    }

    // set data
    useEffect(() => {
        updateTestimonialSection(data)
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
                            <option value="4">Style 4</option>
                        </select>
                    </div>
                    {(data.layout === "3" || data.layout === "4") && (
                        <>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Sub Title</label>
                                <input className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                            </div>
                        </>
                    )}
                    {data.layout === "2" && (
                        <div className="form-group">
                            <label>Background image</label>
                            <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image}/>
                        </div>
                    )}
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
