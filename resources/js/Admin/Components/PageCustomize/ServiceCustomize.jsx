import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function ServiceCustomize({currentSection, spacingCallback, updateServiceSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        services: sectionData.services,
        sub_title: sectionData.sub_title,
        action_text: sectionData.action_text,
        action_url: sectionData.action_url
    })

    const addNewItem = () => {
        setData(produce((draft) => {
            draft.services.push({title: '', thumbnail_image: "", description: "", action_url: ""})
        }))
    }

    const removeService = (index) => {
        setData(produce((draft) => {
            draft.services.splice(index, 1)
        }))
    }

    const handleThumbnailUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.services[index].thumbnail_image = res.data;
            }))
        })
    }

    useEffect(() => {
        updateServiceSection(data)
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
                            <option value="5">Style 5</option>
                            <option value="6">Style 6</option>
                            <option value="7">Style 7</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Sub Title</label>
                        <input name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                    </div>
                    {(data.layout === "1" || data.layout === "5" || data.layout === "6") && (
                        <>
                            <div className="form-group">
                                <label>Action text</label>
                                <input type="text" className="form-control" value={data.action_text} onChange={(e) => setData({...data, action_text: e.target.value})}></input>
                            </div>
                            <div className="form-group">
                                <label>Action URL</label>
                                <input type="text" className="form-control" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})}></input>
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label>Services</label>
                    </div>
                    {data.services.map((item, index) => (
                        <div className="plan-wrap" key={`service-${index}`}>
                            {(data.layout !== "3" && data.layout !== "5") && (
                                <div className="form-group">
                                    <label>{data.layout === "6" ? "Icon" : "Thumbnail Image"}</label>
                                    <FileUpload select={(file) => handleThumbnailUpload(file, index)} value={item.thumbnail_image} />
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.services[index].title = e.target.value
                                }))} value={item.title} type="text" className="form-control"/>
                            </div>
                            {(data.layout === '2' || data.layout === '5' || data.layout === '6' || data.layout === '7') && (
                                <div className="form-group">
                                    <label htmlFor="">Short Description</label>
                                    <input onChange={(e) => setData(produce((draft) => {
                                        draft.services[index].description = e.target.value
                                    }))} value={item.description} type="text" className="form-control"/>
                                </div>
                            )}
                            {/*{data.layout === "6" && (*/}
                            {/*    <div className="form-group">*/}
                            {/*        <label htmlFor="">Action Text</label>*/}
                            {/*        <input onChange={(e) => setData(produce((draft) => {*/}
                            {/*            draft.services[index].action_text = e.target.value*/}
                            {/*        }))} value={item.action_text} className="form-control" />*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            <div className="form-group">
                                <label htmlFor="">URL</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.services[index].action_url = e.target.value
                                }))} value={item.action_url} className="form-control" />
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
