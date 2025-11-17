import { useState, useEffect } from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function HTMLCustomize({
    currentSection,
    spacingCallback,
    updateHTMLSection,
    sectionData,
}) {
    const defaultData = {
        title: "",
        sub_title: "",
        html_content: "<p>Add your custom HTML content here</p>",
    };

    const [data, setData] = useState(sectionData || defaultData);
    const [tab, setTab] = useState("general");
    const [editorMode, setEditorMode] = useState("visual"); // 'visual' or 'code'

    useEffect(() => {
        if (sectionData) {
            setData(sectionData);
        }
    }, [sectionData]);

    useEffect(() => {
        updateHTMLSection(data);
    }, [data]);

    const handleEditorChange = (content) => {
        setData({ ...data, html_content: content });
    };

    // Quill editor modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'list', 'bullet', 'indent',
        'align',
        'blockquote', 'code-block',
        'link', 'image', 'video'
    ];

    return (
        <>
            {/* Tabs */}
            <div className="customize-tab">
                <div className="customize-tab-item-wrap">
                    <div
                        onClick={() => setTab("general")}
                        className={`customize-tab-item ${
                            tab === "general" ? "active" : ""
                        }`}
                    >
                        General
                    </div>
                    <div
                        onClick={() => setTab("spacing")}
                        className={`customize-tab-item ${
                            tab === "spacing" ? "active" : ""
                        }`}
                    >
                        Spacing
                    </div>
                </div>
            </div>

            {/* General Tab */}
            {tab === "general" && (
                <div className="customize-tab-content">
                    <div className="form-group">
                        <label>Section Title (Optional)</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                setData({ ...data, title: e.target.value })
                            }
                            className="form-control"
                            placeholder="Enter section title"
                        />
                        <small className="text-muted">
                            Leave empty to hide section heading
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Section Subtitle (Optional)</label>
                        <input
                            type="text"
                            value={data.sub_title}
                            onChange={(e) =>
                                setData({ ...data, sub_title: e.target.value })
                            }
                            className="form-control"
                            placeholder="Enter section subtitle"
                        />
                    </div>

                    <hr />

                    <div className="form-group">
                        <label>
                            Custom HTML Content
                            <span className="text-danger">*</span>
                        </label>

                        {/* Editor Mode Tabs */}
                        <div className="btn-group mb-3 d-flex" role="group">
                            <button
                                type="button"
                                className={`btn ${editorMode === 'visual' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setEditorMode('visual')}
                                style={{ flex: 1 }}
                            >
                                Visual Editor
                            </button>
                            <button
                                type="button"
                                className={`btn ${editorMode === 'code' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setEditorMode('code')}
                                style={{ flex: 1 }}
                            >
                                HTML Code
                            </button>
                        </div>

                        {/* Visual Editor */}
                        {editorMode === 'visual' && (
                            <>
                                <ReactQuill
                                    theme="snow"
                                    value={data.html_content}
                                    onChange={handleEditorChange}
                                    modules={modules}
                                    formats={formats}
                                    style={{ height: '400px', marginBottom: '50px' }}
                                />
                                <small className="text-muted">
                                    Use the visual editor to create your custom HTML content.
                                    You can add text, images, videos, links, and more with rich formatting options.
                                </small>
                            </>
                        )}

                        {/* Code Editor */}
                        {editorMode === 'code' && (
                            <>
                                <textarea
                                    className="form-control"
                                    value={data.html_content}
                                    onChange={(e) => setData({ ...data, html_content: e.target.value })}
                                    rows={20}
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: '13px',
                                        whiteSpace: 'pre',
                                        overflowWrap: 'normal',
                                        overflowX: 'scroll'
                                    }}
                                    placeholder="<div>Your HTML code here...</div>"
                                />
                                <small className="text-muted">
                                    Edit raw HTML code directly. You can paste HTML with tags and classes.
                                    Changes will be reflected in the Visual Editor when you switch tabs.
                                </small>
                            </>
                        )}
                    </div>

                    <div className="alert alert-info mt-3">
                        <strong>Tips:</strong>
                        <ul className="mb-0 mt-2">
                            <li><strong>Visual Editor:</strong> Use the toolbar for rich text formatting, images, links, and more</li>
                            <li><strong>HTML Code:</strong> Paste or write raw HTML with custom tags, classes, and inline styles</li>
                            <li>Switch between tabs to see your content in both formats</li>
                            <li>HTML pasted in the code tab will render properly in the visual editor</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Spacing Tab */}
            {tab === "spacing" && (
                <SpacingCustomize
                    currentSection={currentSection}
                    spacingCallback={spacingCallback}
                />
            )}
        </>
    );
}
