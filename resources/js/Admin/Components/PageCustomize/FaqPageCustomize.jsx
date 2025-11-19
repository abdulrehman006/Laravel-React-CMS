import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {usePage} from "@inertiajs/react";
import {useDispatch} from "react-redux";
import {
    updateFaqBreadcrumb,
    updateFaqBreadcrumbBgType,
    updateFaqBreadcrumbBgImage,
    updateFaqBreadcrumbBgColor,
    updateFaqMetaDescription, updateFaqMetaImage, updateFaqMetaTags,
    updateFaqMetaTitle,
    updateFaqTitle
} from "@/Redux/features/pages/FAQ/faq";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function FaqPageCustomize(){
    const dispatch = useDispatch()
    const {errors, faq} = usePage().props;
    const [data, setData] = useState({
        title: "",
        is_show_breadcrumb: false,
        breadcrumb_bg_type: "image",
        breadcrumb_bg_image: "",
        breadcrumb_bg_color: "#000000",
        meta_title: "",
        meta_tags: "",
        meta_description: "",
        meta_image: "",
    });

    // handle upload meta image
    const handleUploadMeta = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, meta_image: res.data})
        })
    }

    // handle upload breadcrumb background image
    const handleUploadBreadcrumbBg = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, breadcrumb_bg_image: res.data})
        })
    }

    // update state
    useEffect(() => {
        dispatch(updateFaqTitle(data.title))
        dispatch(updateFaqBreadcrumb(data.is_show_breadcrumb))
        dispatch(updateFaqBreadcrumbBgType(data.breadcrumb_bg_type))
        dispatch(updateFaqBreadcrumbBgImage(data.breadcrumb_bg_image))
        dispatch(updateFaqBreadcrumbBgColor(data.breadcrumb_bg_color))
        dispatch(updateFaqMetaTitle(data.meta_title))
        dispatch(updateFaqMetaDescription(data.meta_description))
        dispatch(updateFaqMetaTags(data.meta_tags))
        dispatch(updateFaqMetaImage(data.meta_image))
    }, [data])

    useEffect(() => {
        setData({
            title: faq.title || "",
            is_show_breadcrumb: faq.is_show_breadcrumb || false,
            breadcrumb_bg_type: faq.breadcrumb_bg_type || "image",
            breadcrumb_bg_image: faq.breadcrumb_bg_image || "",
            breadcrumb_bg_color: faq.breadcrumb_bg_color || "#000000",
            meta_title: faq.meta_title || "",
            meta_tags: faq.meta_tags || "",
            meta_description: faq.meta_description || "",
            meta_image: faq.meta_image || "",
        })
    }, [faq])
    return(
        <>
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Show Breadcrumb:
                    <div className={`yoo-switch ${data.is_show_breadcrumb ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.is_show_breadcrumb = !draft.is_show_breadcrumb
                    }))}>
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>

            {data.is_show_breadcrumb && (
                <>
                    <div className="form-group">
                        <label htmlFor="">Breadcrumb Background Type</label>
                        <select
                            className="form-control"
                            value={data.breadcrumb_bg_type || "image"}
                            onChange={(e) => setData(produce((draft) => {
                                draft.breadcrumb_bg_type = e.target.value
                            }))}
                        >
                            <option value="image">Background Image</option>
                            <option value="color">Background Color</option>
                        </select>
                    </div>

                    {data.breadcrumb_bg_type === "image" ? (
                        <div className="form-group">
                            <label>Breadcrumb Background Image</label>
                            <FileUpload
                                select={(file) => handleUploadBreadcrumbBg(file)}
                                value={data.breadcrumb_bg_image}
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="">Breadcrumb Background Color</label>
                            <input
                                type="color"
                                value={data.breadcrumb_bg_color || "#000000"}
                                onChange={(e) => setData(produce((draft) => {
                                    draft.breadcrumb_bg_color = e.target.value
                                }))}
                                className="form-control"
                                style={{ height: '50px' }}
                            />
                        </div>
                    )}
                </>
            )}

            <div className="form-group">
                <label htmlFor="">Title</label>
                <input onChange={(e) => setData(produce((draft) => {
                    draft.title = e.target.value
                }))} type="text" value={data.title} className="form-control"/>
                {errors?.title && <span className="text-danger">{errors?.title}</span>}
            </div>

            <div className="form-group"><label htmlFor="">SEO Details: </label></div>
            <div className="form-group">
                <label htmlFor="">Meta Title</label>
                <input onChange={(e) => setData(produce((draft) => {
                    draft.meta_title = e.target.value
                }))} type="text" value={data.meta_title} className="form-control"/>
                {errors?.meta_title && <span className="text-danger">{errors?.meta_title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="">Meta Tags</label>
                <input onChange={(e) => setData(produce((draft) => {
                    draft.meta_tags = e.target.value
                }))} type="text" value={data.meta_tags} className="form-control"/>
                <span>Separate with coma</span>
                {errors?.meta_tags && <span className="text-danger">{errors?.meta_tags}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="">Meta Description</label>
                <textarea onChange={(e) => setData(produce((draft) => {
                    draft.meta_description = e.target.value
                }))}  value={data.meta_description} className="form-control"/>
                {errors?.meta_description && <span className="text-danger">{errors?.meta_description}</span>}
            </div>

            <div className="form-group">
                <label>Meta Image</label>
                <FileUpload select={(file) => handleUploadMeta(file)} value={data.meta_image}/>
            </div>
        </>
    )
}
