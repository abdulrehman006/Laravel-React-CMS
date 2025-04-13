import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";

export default function PortfolioCustomize({currentSection, spacingCallback, updatePortfolioSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        portfolios: sectionData.portfolios,
    })

    const addNewItem = () => {
        setData(produce((draft) => {
            draft.portfolios.push({title: "", sub_title: "", action_text: "", action_link: "", thumbnail_image: "", category: ""})
        }))
    }

    const removeService = (index) => {
        setData(produce((draft) => {
            draft.portfolios.splice(index, 1)
        }))
    }

    const handleThumbnailUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.portfolios[index].thumbnail_image = res.data;
            }))
        })
    }

    useEffect(() => {
         updatePortfolioSection(data)
    }, [data])

    // conditional rendering
    let customizeField = ""
    if (sectionData.layout === "1" || sectionData.layout === "2" || sectionData.layout === "6" || sectionData.layout === "4" || sectionData.layout === "7"){
        customizeField =
            <>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <input type="text" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></input>
                </div>
        </>
    } else if(sectionData.layout === "3"){
        customizeField =
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
            </div>
    }
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
                    {customizeField}

                    {data.portfolios.map((item, index) => (
                        <div className="plan-wrap" key={`service-${index}`}>
                            <div className="form-group">
                                <label>Thumbnail Image</label>
                                <FileUpload select={(file) => handleThumbnailUpload(file, index)} value={item.thumbnail_image} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.portfolios[index].title = e.target.value
                                }))} value={item.title} type="text" className="form-control"/>
                            </div>
                            {data.layout === "5" && (
                                <div className="form-group">
                                    <label htmlFor="">Sub Title</label>
                                    <input onChange={(e) => setData(produce((draft) => {
                                        draft.portfolios[index].sub_title = e.target.value
                                    }))} value={item.sub_title} type="text" className="form-control"/>
                                </div>
                            )}
                            {data.layout === "2" || data.layout === "5" || data.layout === "6" ||  data.layout === "7"? (
                                <div className="form-group">
                                    <label htmlFor="">Category</label>
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.portfolios[index].category = e.target.value;
                                                })
                                            )
                                        }
                                        value={item.category}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            ) : null}
                            <div className="form-group">
                                <label htmlFor="">Action Text</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.portfolios[index].action_text = e.target.value
                                }))} value={item.action_text} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Action URL</label>
                                <input onChange={(e) => setData(produce((draft) => {
                                    draft.portfolios[index].action_url = e.target.value
                                }))} value={item.action_url} type="text" className="form-control"/>
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
            ): (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
