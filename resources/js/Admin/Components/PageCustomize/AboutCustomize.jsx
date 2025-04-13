import React, {useEffect, useState} from "react";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {IonIcon} from "@ionic/react";
import {closeCircleOutline} from "ionicons/icons";
import {produce} from "immer";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function AboutCustomize({currentSection, spacingCallback, updateAboutSection, sectionData}){
    const [data, setData] = useState(sectionData);
    const [tab, setTab] = useState('general');

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, about_image: res.data})
        })
    }

    // handle upload file
    const handleUploadPhotos = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.photos[index] = res.data
            }))
        })
    }

    // handle add new
    const addNew = () => {
        setData(produce((draft) => {
            draft.photos.push("")
        }))
    }

    // handle remove logo
    const removePhotos = (index) => {
        setData(produce((draft) => {
            draft.photos.splice(index, 1)
        }))
    }

    // conditional render
    let customizer = ""
    if (data.layout === '1'){
        customizer = <>
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Sub Title</label>
                <input className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
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
            </div>
            <div className="form-group">
                <label>About image</label>
                <FileUpload select={(file) => handleUploadFile(file)} value={data.about_image}/>
            </div>
        </>
    } else if(data.layout === '2'){
        customizer =
            <>
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
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.description} onChange={(e) => setData({...data, description: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="">Photos</label>
                    {data.photos.map((img, index) => (
                        <div className="single-partner-logo mb-3">
                            <FileUpload select={(file) => handleUploadPhotos(file, index)} value={img}/>
                            <button className="remove-partner-logo" onClick={() => removePhotos(index)}>
                                <IonIcon icon={closeCircleOutline} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <a href="#" onClick={addNew}>Add new</a>
                </div>
            </>
    }
    // update state
    useEffect(() => {
        updateAboutSection(data)
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
                    {customizer}
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
