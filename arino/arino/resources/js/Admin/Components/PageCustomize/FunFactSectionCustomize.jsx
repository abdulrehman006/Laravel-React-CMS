import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function FunFactSectionCustomize({currentSection, spacingCallback, updateFunFactSection, sectionData}){
    const dispatch = useDispatch()
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        background_color: sectionData.background_color,
        background_image: sectionData.background_image,
        fun_facts: sectionData.fun_facts
    })

    // handle fun fact
    const removeFunFact = (index) => {
        setData(produce((draft) => {
            draft.fun_facts.splice(index, 1)
        }))
    }

    // handle fun fact
    const addNew = () => {
        setData(produce((draft) => {
            draft.fun_facts.push({title: "", value: ""})
        }))
    }

    // handle background image upload
    const handleBackgroundImageUpload = (file ) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.background_image = res.data;
            }))
        })
    }

    // conditional render
    let customizer = ""
    if (data.layout === "1" || data.layout === "3" || data.layout === "6"){
        customizer =
            <>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
            </>
    }

    // update edited data to redux store
    useEffect(() => {
        updateFunFactSection(data)
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
                        </select>
                    </div>
                    {customizer}
                    {data.layout === "6" && (
                        <div className="form-group">
                            <label>Background Image</label>
                            <FileUpload select={(file) => handleBackgroundImageUpload(file)} value={data.background_image} />
                        </div>
                    )}
                    <div className="fun-fact-items">
                        {data.fun_facts.map((item, index) => (
                            <div className="social-media-wrap" key={index}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="">FunFact Title</label>
                                            <input type="text" value={item.title} onChange={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.fun_facts[index].title = e.target.value
                                                    })
                                                )
                                            }} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="">FunFact Value</label>
                                            <input type="text" value={item.value} onChange={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.fun_facts[index].value = e.target.value
                                                    })
                                                )
                                            }}  className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <button className="remove-button" onClick={() => removeFunFact(index)}>
                                    <IonIcon icon={trashOutline} />
                                </button>
                            </div>
                        ))}
                        <div className="text-center">
                            <button onClick={addNew} className="btn btn-sm btn-success">Add new</button>
                        </div>
                    </div>
                </>
            ): (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
