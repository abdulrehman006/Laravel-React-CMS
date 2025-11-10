import React, { useEffect, useState } from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function LocationsCustomize({
    currentSection,
    spacingCallback,
    updateLocationsSection,
    sectionData,
}) {
    // Default data if sectionData is undefined
    const defaultData = {
        title: "Our Locations",
        sub_title: "Where to find us",
        description: "Visit us at any of our convenient locations worldwide",
        layout: "1",
        limit: "",
        show_phone: true,
        show_email: true,
        show_map: true,
        enable_search: true,
        map_zoom: 5,
    };

    const [data, setData] = useState(sectionData || defaultData);
    const [tab, setTab] = useState("general");

    // Update state
    useEffect(() => {
        updateLocationsSection(data);
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
                            rows="4"
                            value={data.description}
                            onChange={(e) =>
                                setData({ ...data, description: e.target.value })
                            }
                        />
                    </div>

                    <hr className="my-4" />
                    <h6 className="mb-3">Map Settings</h6>

                    <div className="form-group">
                        <label>Default Map Zoom Level</label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={data.map_zoom}
                            onChange={(e) => setData({ ...data, map_zoom: e.target.value })}
                            className="form-control"
                        />
                        <small className="text-muted">
                            Range: 1 (World) to 20 (Buildings). Recommended: 5-12
                        </small>
                    </div>

                    <div className="form-group">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={data.enable_search}
                                onChange={(e) =>
                                    setData({ ...data, enable_search: e.target.checked })
                                }
                            />
                            <label className="form-check-label">Enable Search Bar</label>
                        </div>
                        <small className="text-muted d-block mt-1">
                            Allow users to search and filter locations
                        </small>
                    </div>

                    <hr className="my-4" />
                    <h6 className="mb-3">Display Options</h6>

                    <div className="form-group">
                        <label>Layout Style</label>
                        <select
                            className="form-control"
                            value={data.layout}
                            onChange={(e) => setData({ ...data, layout: e.target.value })}
                        >
                            <option value="1">Grid View</option>
                            <option value="2">List View</option>
                            <option value="3">Map View</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Number of Locations to Display</label>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            value={data.limit}
                            onChange={(e) => setData({ ...data, limit: e.target.value })}
                            className="form-control"
                        />
                        <small className="text-muted">
                            Leave empty to show all locations
                        </small>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={data.show_phone}
                                onChange={(e) =>
                                    setData({ ...data, show_phone: e.target.checked })
                                }
                            />
                            <label className="form-check-label">Show Phone Number</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={data.show_email}
                                onChange={(e) =>
                                    setData({ ...data, show_email: e.target.checked })
                                }
                            />
                            <label className="form-check-label">Show Email</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={data.show_map}
                                onChange={(e) =>
                                    setData({ ...data, show_map: e.target.checked })
                                }
                            />
                            <label className="form-check-label">Show Google Map</label>
                        </div>
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
