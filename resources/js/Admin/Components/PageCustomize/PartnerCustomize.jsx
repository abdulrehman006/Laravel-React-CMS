import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeCircleOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function PartnerCustomize({currentSection, spacingCallback, updatePartnerSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        logos: sectionData.logos
    })
    // handle upload file
    const handleUploadFile = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.logos[index] = res.data
            }))
        })
    }

    // handle add new
    const addNew = () => {
        setData(produce((draft) => {
            draft.logos.push("")
        }))
    }

    // handle remove logo
    const removeLogo = (index) => {
        setData(produce((draft) => {
            draft.logos.splice(index, 1)
        }))
    }

    // update state
    useEffect(() => {
        updatePartnerSection(data)
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
                    {sectionData.layout === "2" && (
                        <>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Sub Title</label>
                                <input className="form-control" type="text" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label htmlFor="">Logos</label>
                        {data.logos.map((img, index) => (
                            <div className="single-partner-logo mb-3">
                                <FileUpload select={(file) => handleUploadFile(file, index)} value={img}/>
                                <button className="remove-partner-logo" onClick={() => removeLogo(index)}>
                                    <IonIcon icon={closeCircleOutline} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <a href="#" onClick={addNew}>Add new</a>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
