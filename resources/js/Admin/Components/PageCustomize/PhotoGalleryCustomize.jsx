import React, {useEffect, useState} from "react";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import {IonIcon} from "@ionic/react";
import {closeCircleOutline} from "ionicons/icons";
import {produce} from "immer";

export default function PhotoGalleryCustomize({ currentSection, spacingCallback, updatePhotoGallerySection, sectionData }){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData?.layout,
        gallery: sectionData?.gallery ?? [],
    })

    // handle upload file
    const handleUploadFile = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.gallery[index] = res.data
            }))
        })
    }

    // handle add new
    const addNew = () => {
        setData(produce((draft) => {
            draft.gallery.push("")
        }))
    }

    // handle remove logo
    const removeLogo = (index) => {
        setData(produce((draft) => {
            draft.gallery.splice(index, 1)
        }))
    }

    // update data
    useEffect(() => {
        updatePhotoGallerySection(data)
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
                        <label htmlFor="">Images</label>
                        {data.gallery.map((img, index) => (
                            <div className="single-partner-logo mb-3">
                                <FileUpload select={(file) => handleUploadFile(file, index)} value={img}/>
                                <button className="remove-partner-logo" onClick={() => removeLogo(index)}>
                                    <IonIcon icon={closeCircleOutline} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <a href="#" onClick={addNew} className="btn btn-sm btn-primary">Add new</a>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
