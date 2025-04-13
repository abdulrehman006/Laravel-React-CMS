import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {closeOutline, trashOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function AwardCustomize({currentSection, spacingCallback, updateAwardSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        items: sectionData.items,
    })

    // handle add new item
    const addNewItem = () => {
        setData(produce((draft) => {
            draft.items.push({year: '', title: '', list_item: ['']},);
        }))
    }

    // handle remove item
    const removeItem = (index) => {
        setData(produce((draft) => {
            draft.items.splice(index, 1);
        }))
    }

    // handle add new list item
    const addNewListItem = (index) => {
        setData(produce((draft) => {
            draft.items[index].list_item.push("");
        }))
    }

    // remove list item
    const removeListItem = (listIndex, listItemIndex) => {
        setData(produce((draft) => {
            draft.items[listIndex].list_item.splice(listItemIndex, 1);
        }))
    }

    // update state
    useEffect(() => {
        updateAwardSection(data)
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
                        <input type="text" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Awards</label>
                    </div>
                    {data.items.map((item, index) => (
                        <div className="award mb-3" key={`items-${index}`}>
                            <div className="form-group">
                                <label>Year</label>
                                <input type="text" className="form-control" value={item.year}
                                       onChange={(e) => setData(produce((draft) => {
                                           draft.items[index].year = e.target.value
                                       }))}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" value={item.title}
                                       onChange={(e) => setData(produce((draft) => {
                                           draft.items[index].title = e.target.value
                                       }))}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <label>Items</label>
                                {item.list_item.map((i, itemIndex) => (
                                    <div className="list-wrap">
                                        <input key={`item-${itemIndex}`} type="text" className="form-control mb-3" value={i}
                                               onChange={(e) => setData(produce((draft) => {
                                                   draft.items[index].list_item[itemIndex] = e.target.value
                                               }))}
                                        >
                                        </input>
                                        <button className="remove-item" onClick={() => removeListItem(index, itemIndex)}>
                                            <IonIcon icon={closeOutline} />
                                        </button>
                                    </div>
                                ))}
                                <div className="text-center">
                                    <a href="#" onClick={() => addNewListItem(index)}>Add new</a>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeItem(index)}>
                                <IonIcon icon={trashOutline} />
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
