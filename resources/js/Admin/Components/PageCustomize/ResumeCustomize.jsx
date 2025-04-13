import React, {useEffect, useState} from "react";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function ResumeCustomize({sectionData, spacingCallback, currentSection, updateResumeSection}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData?.layout,
        title: sectionData?.title,
        sub_title: sectionData?.sub_title,
        background_image: sectionData?.background_image,
        education_data: sectionData?.education_data ?? [],
        experience_data: sectionData?.experience_data ?? []
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

    // remove remove Education Data
    const removeEducationDataProgress = (index) => {
        setData(produce((draft) => {
            draft.education_data.splice(index, 1)
        }))
    }

    // add new education data
    const addNewEducationData = () => {
        setData(produce((draft) => {
            draft.education_data.push({title: "", sub_title: ""})
        }))
    }

    // remove remove Experience Data
    const removeExperienceDataProgress = (index) => {
        setData(produce((draft) => {
            draft.experience_data.splice(index, 1)
        }))
    }
    // add new Experience data
    const addNewExperienceData = () => {
        setData(produce((draft) => {
            draft.experience_data.push({title: "", sub_title: ""})
        }))
    }

    // update data
    useEffect(() => {
        updateResumeSection(data)
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
                        <label>Title</label>
                        <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Sub Title</label>
                        <input type="text" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Background Image</label>
                        <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Education info</label>
                    </div>
                    {data.education_data.map((item, index) => (
                        <div className="plan-wrap" key={`education-${index}`}>
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.education_data[index].title = e.target.value
                                }))} value={item.title} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Sub Title</label>
                                <input className="form-control" onChange={(e) => setData(produce((draft) => {
                                    draft.education_data[index].sub_title = e.target.value
                                }))} value={item.sub_title}/>
                            </div>
                            <button className="remove-button" onClick={() => removeEducationDataProgress(index)}>
                                <IonIcon icon={closeOutline} />
                            </button>
                        </div>
                    ))}
                    <div className="text-center">
                        <button onClick={addNewEducationData} className="btn btn-sm btn-success">Add New</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Experience info</label>
                    </div>
                    {data.experience_data.map((item, index) => (
                        <div className="plan-wrap" key={`experience-${index}`}>
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.experience_data[index].title = e.target.value
                                }))} value={item.title} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Sub Title</label>
                                <input className="form-control" onChange={(e) => setData(produce((draft) => {
                                    draft.experience_data[index].sub_title = e.target.value
                                }))} value={item.sub_title}/>
                            </div>
                            <button className="remove-button" onClick={() => removeExperienceDataProgress(index)}>
                                <IonIcon icon={closeOutline} />
                            </button>
                        </div>
                    ))}
                    <div className="text-center">
                        <button onClick={addNewExperienceData} className="btn btn-sm btn-success">Add New</button>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
