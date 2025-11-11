import React, { useEffect, useState } from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function APICustomize({
    currentSection,
    spacingCallback,
    updateAPISection,
    sectionData,
}) {
    // Default data if sectionData is undefined
    const defaultData = {
        title: "Fee Calculator",
        sub_title: "Vehicle Inspection Fee",
        description: "Calculate vehicle inspection fees by Registration Number or Chassis Number",
        api_url: "http://3.79.101.195:22110/api/FeeStructure",
    };

    const [data, setData] = useState(sectionData || defaultData);
    const [tab, setTab] = useState("general");

    // Update state
    useEffect(() => {
        updateAPISection(data);
    }, [data]);

    return (
        <>
            <ul className="nav nav-tabs mb-3">
                <li
                    className="nav-item"
                    onClick={() => setTab("general")}
                    style={{ cursor: "pointer" }}
                >
                    <span className={`nav-link ${tab === "general" && "active"}`}>
                        General
                    </span>
                </li>
                <li
                    className="nav-item"
                    onClick={() => setTab("spacing")}
                    style={{ cursor: "pointer" }}
                >
                    <span className={`nav-link ${tab === "spacing" && "active"}`}>
                        Spacing
                    </span>
                </li>
            </ul>
            {tab === "general" ? (
                <>
                    <div className="form-group">
                        <label>Section Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Section Sub Title</label>
                        <input
                            type="text"
                            value={data.sub_title}
                            onChange={(e) =>
                                setData({ ...data, sub_title: e.target.value })
                            }
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Section Description</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={data.description}
                            onChange={(e) =>
                                setData({ ...data, description: e.target.value })
                            }
                        />
                        <small className="text-muted">
                            Brief description about the API
                        </small>
                    </div>

                    <hr className="my-4" />
                    <h6 className="mb-3">API Configuration</h6>

                    <div className="form-group">
                        <label>API Base URL</label>
                        <input
                            type="url"
                            value={data.api_url}
                            onChange={(e) => setData({ ...data, api_url: e.target.value })}
                            className="form-control"
                            placeholder="http://3.79.101.195:22110/api/FeeStructure"
                        />
                        <small className="text-muted">
                            The base URL for the Fee Structure API endpoint
                        </small>
                    </div>

                    <div className="alert alert-info mt-3">
                        <strong>Note:</strong> This section provides an interactive API documentation
                        with a live tester. Users can search by Registration Number or Chassis Number
                        to get vehicle inspection fee information.
                    </div>
                </>
            ) : (
                <SpacingCustomize
                    spacingCallback={spacingCallback}
                    currentSection={currentSection}
                />
            )}
        </>
    );
}
