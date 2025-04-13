import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import {produce} from "immer";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";

export default function CaseStudyCustomize({currentSection, spacingCallback, updateCaseStudySection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState(sectionData)

    const addNewItem = () => {
        setData(produce((draft) => {
            draft.caseStudies.push({title: "", url: ""})
        }))
    }

    const removeService = (index) => {
        setData(produce((draft) => {
            draft.caseStudies.splice(index);
        }))
    }

    // update state
    useEffect(() => {
        updateCaseStudySection(data)
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
                        <label>Title</label>
                        <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Sub Title</label>
                        <input type="text" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <label>Case Studies</label>
                    </div>
                    {data.caseStudies.map((item, index) => (
                        <div className="plan-wrap" key={`case-${index}`}>
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.caseStudies[index].title = e.target.value
                                }))} value={item.title} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">URL</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.caseStudies[index].url = e.target.value
                                }))} value={item.url} className="form-control" />
                            </div>
                            <button className="remove-button" onClick={() => removeService(index)}>
                                <IonIcon icon={closeOutline} />
                            </button>
                        </div>
                    ))}
                    <div className="text-center">
                        <button onClick={addNewItem} className="btn btn-sm btn-success">Add New</button>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />

            )}
        </>
    )
}
