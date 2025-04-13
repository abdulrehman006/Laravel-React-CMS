import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function FaqCustomize({currentSection, spacingCallback, updateFaqSection, sectionData}){
    const [data, setData] = useState(sectionData);
    const [tab, setTab] = useState('general');

    // handle remove item
    const removeFaq = (index) => {
        setData(produce((draft) => {
            draft.faqs.splice(index, 1)
        }))
    }
    // remove category
    const removeCategory = (index) => {
        setData(produce((draft) => {
            draft.categories.splice(index, 1)
        }))
    }

    // handle add new faq
    const addNewFaq = () => {
        setData(produce((draft) => {
            draft.faqs.push({
                questions: "",
                answers: ""
            })
        }))
    }

    // handle add new category
    const addNewCategory = () => {
        setData(produce((draft) => {
            draft.categories.push({
                "name": "",
                "url": ""
            })
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
        </>
    } else if(data.layout === '2'){
        customizer =
            <>
                <div className="form-group">
                    <label>Categories</label>
                </div>
                {data.categories.map((item, index) => (
                    <div key={`category-${index}`} className="plan-wrap">
                        <div className="form-group">
                            <label htmlFor="">Category Name</label>
                            <input type="text" value={item.name} onChange={(e) => setData(produce((draft) => {
                                draft.categories[index].name = e.target.value
                            }))} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Url</label>
                            <input value={item.url} onChange={(e) => setData(produce((draft) => {
                                draft.categories[index].url = e.target.value
                            }))} className="form-control" />
                        </div>
                        <button className="remove-button" onClick={() => removeCategory(index)}>
                            <IonIcon icon={closeOutline} />
                        </button>
                    </div>

                ))}
                <div className="text-center">
                    <button className="btn btn-sm btn-primary" onClick={addNewCategory}>Add New Category</button>
                </div>
            </>
    }
    // update state
    useEffect(() => {
        updateFaqSection(data)
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
                    <div className="form-group">
                        <label>Faqs</label>
                    </div>
                    {data.faqs.map((item, index) => (
                        <div key={`plan-${index}`} className="plan-wrap">
                            <div className="form-group">
                                <label htmlFor="">Question</label>
                                <input type="text" value={item.questions} onChange={(e) => setData(produce((draft) => {
                                    draft.faqs[index].questions = e.target.value
                                }))} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Answer</label>
                                <textarea name="" value={item.answers} onChange={(e) => setData(produce((draft) => {
                                    draft.faqs[index].answers = e.target.value
                                }))} id="" cols="30" rows="10" className="form-control"></textarea>
                            </div>
                            <button className="remove-button" onClick={() => removeFaq(index)}>
                                <IonIcon icon={closeOutline} />
                            </button>
                        </div>
                    ))}
                    <div className="text-center">
                        <button className="btn btn-sm btn-primary" onClick={addNewFaq}>Add New FAQ</button>
                    </div>
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
