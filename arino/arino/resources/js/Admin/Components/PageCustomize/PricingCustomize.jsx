import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {produce} from "immer";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function PricingCustomize({currentSection, spacingCallback, updatePricingSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState(sectionData)

    // handle add new feature
    const addNewFeature = (index) => {
        setData(produce((draft) => {
            draft.plans[index].features.push('')
        }))
    }

    // remove feature
    const removeFeature = (index, fIndex) => {
        setData(produce((draft) => {
            draft.plans[index].features.splice(fIndex, 1)
        }))
    }

    // handle add new item
    const addNewItem = () => {
        setData(produce((draft) => {
            draft.plans.push({
                name: "",
                price: {monthly: '', yearly: ''},
                features: [
                    ""
                ],
                action_text: "",
                action_url: "",
            },)
        }))
    }

    // handle remove item
    const removeItem = (index) => {
        setData(produce((draft) => {
            draft.plans.splice(index, 1)
        }))
    }

    // update state
    useEffect(() => {
        updatePricingSection(data)
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
                       <input className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})} />
                   </div>
                   <div className="form-group">
                       <label>Currency symbol</label>
                       <input className="form-control" value={data.currency_symbol} onChange={(e) => setData({...data, currency_symbol: e.target.value})} />
                   </div>
                   <div className="form-group">
                       <label>Plans</label>
                   </div>
                   {data.plans.map((plan, index) => (
                       <div key={`plan-${index}`} className="plan-wrap">
                           <div className="form-group">
                               <label>Plan name</label>
                               <input type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                                   draft.plans[index].name = e.target.value
                               }))} value={plan.name}/>
                           </div>
                           <div className="row">
                               <div className="col-md-6">
                                   <div className="form-group">
                                       <label>Price (Monthly)</label>
                                       <input type="number" className="form-control" onChange={(e) => setData(produce((draft) => {
                                           draft.plans[index].price.monthly = e.target.value
                                       }))} value={plan.price.monthly}/>
                                   </div>
                               </div>
                               <div className="col-md-6">
                                   <div className="form-group">
                                       <label htmlFor="">Price (Yearly)</label>
                                       <input type="number" className="form-control"  onChange={(e) => setData(produce((draft) => {
                                           draft.plans[index].price.yearly = e.target.value
                                       }))} value={plan.price.yearly}/>
                                   </div>
                               </div>
                           </div>
                           <div className="form-group">
                               <label htmlFor="">Action text</label>
                               <input type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                                   draft.plans[index].action_text = e.target.value
                               }))} value={plan.action_text}/>
                           </div>
                           <div className="form-group">
                               <label htmlFor="">Action url</label>
                               <input type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                                   draft.plans[index].action_url = e.target.value
                               }))} value={plan.action_url}/>
                           </div>
                           <div className="form-group">
                               <label>Features</label>

                               {plan.features.map((item, fIndex) => (
                                   <div key={fIndex} className="feature-list-wrap">
                                       <input type="text" className="form-control mb-3" onChange={(e) => setData(produce((draft) => {
                                           draft.plans[index].features[fIndex] = e.target.value
                                       }))} value={item}/>
                                       <button className="remove-item" onClick={() => removeFeature(index, fIndex)}>
                                           <IonIcon icon={closeOutline} />
                                       </button>
                                   </div>
                               ))}
                               <div className="text-center">
                                   <a href="#" onClick={() => addNewFeature(index)}>Add new</a>
                               </div>
                           </div>
                           <button className="remove-button" onClick={() => removeItem(index)}>
                               <IonIcon icon={closeOutline} />
                           </button>
                       </div>
                   ))}
                   <div className="text-center">
                       <button className="btn btn-sm btn-success" onClick={addNewItem}>Add New</button>
                   </div>
               </>
           ) : (
               <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
           )}
       </>
    )
}
