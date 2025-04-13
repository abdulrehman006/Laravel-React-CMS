import React, {useEffect, useState} from "react";
import {produce} from "immer";

export default function SpacingCustomize({spacingCallback, currentSection}){
    const [spacing, setSpacing] = useState(currentSection.spacing)

    useEffect(() => {
        spacingCallback(spacing)
    }, [spacing])

    return(
        <>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">Top Desktop (px)</label>
                        <input type="number" className="form-control" value={spacing.top.lg} onChange={(e) => setSpacing(produce((draft) => {
                            draft.top.lg = e.target.value
                        }))}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">Top Mobile (px)</label>
                        <input type="number" className="form-control" value={spacing.top.md} onChange={(e) => setSpacing(produce((draft) => {
                            draft.top.md = e.target.value
                        }))}/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">Bottom Desktop (px)</label>
                        <input type="number" className="form-control" value={spacing.bottom.lg} onChange={(e) => setSpacing(produce((draft) => {
                            draft.bottom.lg = e.target.value
                        }))}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">Bottom Mobile (px)</label>
                        <input type="number" className="form-control" value={spacing.bottom.md} onChange={(e) => setSpacing(produce((draft) => {
                            draft.bottom.md = e.target.value
                        }))}/>
                    </div>
                </div>
            </div>
        </>
    )
}
