import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function ContactCustomize({currentSection, spacingCallback, updateContactSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState(sectionData);

    // update state
    useEffect(() => {
        updateContactSection(data)
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
                        <label>Action button text</label>
                        <input type="text" className="form-control" value={data.action_button_text} onChange={(e) => setData({...data, action_button_text: e.target.value})} />
                    </div>
                    {data.layout !== '3' && (
                        <div className="form-group">
                            <label>Map Iframe url</label>
                            <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.map_iframe_url} onChange={(e) => setData({...data, map_iframe_url: e.target.value})}></textarea>
                        </div>
                    )}
                    {(data.layout === '2' || data.layout === '3') ? (
                        <>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control" value={data.phone_number} onChange={(e) => setData({...data, phone_number: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="text" className="form-control" value={data.email_address} onChange={(e) => setData({...data, email_address: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" value={data.address} onChange={(e) => setData({...data, address: e.target.value})} />
                            </div>
                        </>
                    ) : null}
                </>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
