import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {usePage} from "@inertiajs/react";
import {useDispatch} from "react-redux";
import {
    updatePageBreadcrumb,
    updatePageDescription, updatePageMetaDescription, updatePageMetaImage, updatePageMetaTags,
    updatePageMetaTitle,
    updatePageTitle
} from "@/Redux/features/pages/Page/page";
import Editor from "@/Admin/Components/Inputs/Editor";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function PageDetailsCustomize(){
    const dispatch = useDispatch()
    const {errors, page} = usePage().props;
    const [data, setData] = useState({
        title: "",
        description: "",
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
        dispatch(updatePageTitle(data.title))
        dispatch(updatePageDescription(data.description))
        dispatch(updatePageBreadcrumb(data.is_show_breadcrumb))
        dispatch(updatePageMetaTitle(data.meta_title))
        dispatch(updatePageMetaDescription(data.meta_description))
        dispatch(updatePageMetaTags(data.meta_tags))
        dispatch(updatePageMetaImage(data.meta_image))
    }, [data])

    useEffect(() => {
        setData({
            title: page?.title,
            description: page?.content,
            is_show_breadcrumb: page?.is_show_breadcrumb,
            meta_title: page?.meta_title,
            meta_tags: page?.meta_tags,
            meta_description: page?.meta_description,
            meta_image: page?.meta_image,
        })
    }, [page])
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
            <div className="form-group">
                <label htmlFor="">Description</label>
                <Editor onChange={(data) => setData(produce((draft) => {
                    draft.description = data;
                }))} value={data.description ?? ""} />
                {errors?.description && <span className="text-danger">{errors?.description}</span>}
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
