import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";
import {usePage} from "@inertiajs/react";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {updatePortfolioDetails} from "@/Redux/features/pages/Portfolio/portfolio";

export default function PortfolioDetails(){
    const dispatch = useDispatch()
    const {categories, errors, portfolio} = usePage().props;
    const [data, setData] = useState({
        title: "",
        sub_title: "",
        is_show_breadcrumb: false,
        thumbnail_image: "",
        category: "",
        details: "",
        project_info_text: "Project Info -",
        projectInfo: [],
        meta_title: "",
        meta_tags: "",
        meta_description: "",
        meta_image: "",
    });

    // handle add new
    const handleAddNew = () => {
        setData(produce((draft) => {
            draft.projectInfo.push({infoTitle: "", infoValue: ""})
        }))
    }

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.thumbnail_image = res.data
            }))
        })
    }

    // handle upload meta image
    const handleUploadMeta = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, meta_image: res.data})
        })
    }

    // handle remove Info
    const removeInfo = (index) => {
        setData(produce((draft) => {
            draft.projectInfo.splice(index, 1)
        }))
    }

    // update state
    useEffect(() => {
        dispatch(updatePortfolioDetails(data))
    }, [data])

    useEffect(() => {
        if (portfolio){
            setData({
                title: portfolio.title,
                sub_title:  portfolio.sub_title,
                thumbnail_image: portfolio.thumbnail_image,
                is_show_breadcrumb: portfolio.is_show_breadcrumb,
                category: portfolio.category_id,
                project_info_text: portfolio.project_info_text,
                projectInfo: portfolio.project_info,
                details: portfolio.content,
                meta_title: portfolio.meta_title,
                meta_description: portfolio.meta_description,
                meta_image: portfolio.meta_image,
                meta_tags: portfolio.meta_tags,
            })
        }
    }, [portfolio])
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
                <label>Thumbnail image</label>
                <FileUpload select={(file) => handleUploadFile(file)} value={data.thumbnail_image}/>
                {errors?.thumbnail_image && <span className="text-danger">{errors?.thumbnail_image}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Select Category</label>
                <CustomSelect
                    options={categories.data}
                    placeholder="Select category"
                    onSelect={(e) => setData(produce((draft) => {
                        draft.category = e;
                    }))} value={data.category} />
                {errors?.category && <span className="text-danger">{errors?.category}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Title</label>
                <input onChange={(e) => setData(produce((draft) => {
                    draft.title = e.target.value
                }))} type="text" value={data.title} className="form-control"/>
                {errors?.title && <span className="text-danger">{errors?.title}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Sub Title</label>
                <input  onChange={(e) => setData(produce((draft) => {
                    draft.sub_title = e.target.value
                }))}type="text" value={data.sub_title} className="form-control"/>
                {errors?.sub_title && <span className="text-danger">{errors?.sub_title}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Details</label>
                <textarea onChange={(e) => setData(produce((draft) => {
                    draft.details = e.target.value
                }))} value={data.details} className="form-control"></textarea>
                {errors?.details && <span className="text-danger">{errors?.details}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Project Info Text</label>
                <input value={data.project_info_text} onChange={(e) => setData(produce((draft) => {
                    draft.project_info_text = e.target.value
                }))} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="">Infos: </label>
            </div>
            {data.projectInfo.map((item, index) => (
                <div style={{position: "relative"}}>
                    <div className="row" key={index}>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Info Title</label>
                                <input value={item.infoTitle} type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                                    draft.projectInfo[index].infoTitle = e.target.value
                                }))}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Info Value</label>
                                <input value={item.infoValue} type="text" className="form-control"onChange={(e) => setData(produce((draft) => {
                                    draft.projectInfo[index].infoValue = e.target.value
                                }))}/>
                            </div>
                        </div>
                    </div>
                    <button className="remove-button"  onClick={() => removeInfo(index)}>
                        <IonIcon icon={trashOutline} />
                    </button>
                </div>
            ))}
            <div className="text-center">
                <button className="btn btn-sm btn-primary" onClick={handleAddNew}>Add New</button>
            </div>
            <br/>
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
