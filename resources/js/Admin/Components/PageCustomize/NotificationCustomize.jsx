import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
export default function NotificationCustomize({currentSection, spacingCallback, updateNotificationSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        layout: sectionData?.layout,
        title: sectionData?.title,
        sub_title: sectionData?.sub_title,
        action_text: sectionData?.action_text,
    });

    // update state
    useEffect(() => {
        updateNotificationSection(data)
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
               </>
           ): (
               <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
           )}
       </>
    )
}
