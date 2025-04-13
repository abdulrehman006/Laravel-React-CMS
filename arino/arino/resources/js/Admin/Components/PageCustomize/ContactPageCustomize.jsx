import {useDispatch} from "react-redux";
import {usePage} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {
    updateContactBreadcrumb, updateContactMetaDescription, updateContactMetaImage, updateContactMetaTags,
    updateContactMetaTitle,
    updateContactTitle
} from "@/Redux/features/pages/Contact/contact";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function ContactPageCustomize(){
    const dispatch = useDispatch()
    const {errors, contact} = usePage().props;
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
        dispatch(updateContactTitle(data.title))
        dispatch(updateContactBreadcrumb(data.is_show_breadcrumb))
        dispatch(updateContactMetaTitle(data.meta_title))
        dispatch(updateContactMetaDescription(data.meta_description))
        dispatch(updateContactMetaTags(data.meta_tags))
        dispatch(updateContactMetaImage(data.meta_image))
    }, [data])

    useEffect(() => {
        setData({
            title: contact.title,
            is_show_breadcrumb: contact.is_show_breadcrumb,
            meta_title: contact.meta_title,
            meta_tags: contact.meta_tags,
            meta_description: contact.meta_description,
            meta_image: contact.meta_image,
        })
    }, [contact])
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
