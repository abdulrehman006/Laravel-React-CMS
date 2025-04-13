import React, {useEffect, useState} from "react";
import {produce} from "immer";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {IonIcon} from "@ionic/react";
import {closeCircleOutline, closeOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function WorkingProgressCustomize({sectionData, spacingCallback, currentSection, updateWorkingProgressSection}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData?.layout,
        progress_box: sectionData?.progress_box ?? [],
        title: sectionData?.title,
        sub_title: sectionData?.sub_title,
    })

    // handle upload file
    const handleUploadFile = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.progress_box[index].icon = res.data
            }))
        })
    }

    // handle add new
    const addNewItem = () => {
        setData(produce((draft) => {
            draft.progress_box.push({
                title: "",
                description: "",
                icon: ""
            })
        }))
    }

    // handle remove logo
    const removeWorkingProgress = (index) => {
        setData(produce((draft) => {
            draft.progress_box.splice(index, 1)
        }))
    }

    // update data
    useEffect(() => {
        updateWorkingProgressSection(data)
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
                    {data.progress_box.map((item, index) => (
                        <div className="plan-wrap" key={`progress-${index}`}>
                            <div className="form-group">
                                <label>Icon</label>
                                <FileUpload select={(file) => handleUploadFile(file, index)} value={item.icon}  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.progress_box[index].title = e.target.value
                                }))} value={item.title} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" cols="30" rows="10" className="form-control" onChange={(e) => setData(produce((draft) => {
                                    draft.progress_box[index].description = e.target.value
                                }))} value={item.description}></textarea>
                            </div>
                            <button className="remove-button" onClick={() => removeWorkingProgress(index)}>
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
