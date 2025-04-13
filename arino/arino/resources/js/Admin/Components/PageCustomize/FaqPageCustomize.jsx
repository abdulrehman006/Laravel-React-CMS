import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {usePage} from "@inertiajs/react";
import {useDispatch} from "react-redux";
import {
    updateFaqBreadcrumb,
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

    // update state
    useEffect(() => {
        dispatch(updateFaqTitle(data.title))
        dispatch(updateFaqBreadcrumb(data.is_show_breadcrumb))
        dispatch(updateFaqMetaTitle(data.meta_title))
        dispatch(updateFaqMetaDescription(data.meta_description))
        dispatch(updateFaqMetaTags(data.meta_tags))
        dispatch(updateFaqMetaImage(data.meta_image))
    }, [data])

    useEffect(() => {
        setData({
            title: faq.title,
            is_show_breadcrumb: faq.is_show_breadcrumb,
            meta_title: faq.meta_title,
            meta_tags: faq.meta_tags,
            meta_description: faq.meta_description,
            meta_image: faq.meta_image,
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
