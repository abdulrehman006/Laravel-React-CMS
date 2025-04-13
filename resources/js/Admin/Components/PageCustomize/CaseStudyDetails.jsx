import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";
import {usePage} from "@inertiajs/react";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect";
import {useDispatch} from "react-redux";
import {updateCaseStudyDetails} from "@/Redux/features/pages/CaseStudy/case_study";

export default function CaseStudyDetails(){
    const {caseStudy} = usePage().props
    const dispatch = useDispatch()
    const {categories, errors} = usePage().props;
    const [data, setData] = useState({
        title: "",
        page_title: "",
        page_sub_title: "",
        thumbnail_image: "",
        is_show_breadcrumb: false,
        category: "",
        details: {
            is_overview_active: false,
            overview_title: "",
            overview_details: "",
            overview_images: [],
            is_research_active: false,
            research_title: "",
            researches: [],
            is_result_active: false,
            result_title: "",
            result_details: "",
        },
        meta_title: "",
        meta_tags: "",
        meta_description: "",
        meta_image: "",
    });

    // handle add new
    const handleAddNewResearch = () => {
        setData(produce((draft) => {
            draft.details.researches.push({title: "", details: "", image: ""})
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

    // handle icon upload
    const handleResearchUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.details.researches[index].image = res.data
            }))
        })
    }

    // handle remove Info
    const removeResearchBox = (index) => {
        setData(produce((draft) => {
            draft.details.researches.splice(index, 1)
        }))
    }

    // handle add new image
    const handleAddNewImage = () => {
        setData((produce((draft) => {
            draft.details.overview_images.push("")
        })))
    }
    // handle remove image
    const handleRemoveImage = (index) => {
        setData(produce((draft) => {
            draft.details.overview_images.splice(index, 1)
        }))
    }

    // handle upload image
    const handleUploadImage = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.details.overview_images[index] = res.data
            }))
        })
    }

    // update state
    useEffect(() => {
        dispatch(updateCaseStudyDetails(data))
    }, [data])

    useEffect(() => {
        if (caseStudy){
            setData({
                title: caseStudy.title,
                page_title: caseStudy.page_title,
                page_sub_title: caseStudy.page_sub_title,
                thumbnail_image: caseStudy.thumbnail_image,
                is_show_breadcrumb: caseStudy.is_show_breadcrumb,
                category: caseStudy.category_id,
                details: caseStudy.details,
                meta_title: caseStudy.meta_title,
                meta_description: caseStudy.meta_description,
                meta_image: caseStudy.meta_image,
                meta_tags: caseStudy.meta_tags,
            })
        }
    }, [caseStudy])
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
                    value={data.category}
                    onSelect={(e) => setData(produce((draft) => {
                        draft.category = e;
                    }))} />
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
                <label htmlFor="">Page Title</label>
                <input  onChange={(e) => setData(produce((draft) => {
                    draft.page_title = e.target.value
                }))}type="text" value={data.page_title} className="form-control"/>
                {errors?.page_title && <span className="text-danger">{errors?.page_title}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Page Sub Title</label>
                <input  onChange={(e) => setData(produce((draft) => {
                    draft.page_sub_title = e.target.value
                }))}type="text" value={data.page_sub_title} className="form-control"/>
                {errors?.page_sub_title && <span className="text-danger">{errors?.page_sub_title}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Case Study Overview:
                    <div className={`yoo-switch ${data.details.is_overview_active ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.details.is_overview_active = !draft.details.is_overview_active
                    }))}>
                    <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            {data.details.is_overview_active && (
                <>
                    <div className="form-group">
                        <label htmlFor="">Overview Title</label>
                        <input onChange={(e) => setData(produce((draft) => {
                            draft.details.overview_title = e.target.value
                        }))} type="text" value={data.details.overview_title} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Overview Details</label>
                        <textarea name="" id="" cols="30" rows="10" className="form-control" onChange={(e) => setData(produce((draft) => {
                            draft.details.overview_details = e.target.value
                        }))} value={data.details.overview_details} ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Images:</label>
                    </div>
                    {data.details.overview_images.map((image, index) => (
                        <div className="mb-4" style={{position: "relative"}}>
                            <FileUpload select={(file) => handleUploadImage(file, index)} value={image}/>
                            <button className="remove-button" style={{top: "-30px"}} onClick={() => handleRemoveImage(index)}>
                                <IonIcon icon={trashOutline} />
                            </button>
                        </div>
                    ))}

                    <div className="text-center mb-4">
                        <button className="btn btn-sm btn-primary" onClick={handleAddNewImage}>Add New Image</button>
                    </div>
                </>
            )}
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Case Study Research:
                    <div className={`yoo-switch ${data.details.is_research_active ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.details.is_research_active = !draft.details.is_research_active
                    }))}>
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            {data.details.is_research_active && (
                <>
                    <div className="form-group">
                        <label htmlFor="">Research Title</label>
                        <input type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                            draft.details.research_title = e.target.value
                        }))} value={data.details.research_title}/>
                    </div>
                    {data.details.researches.map((item, index) => (
                        <div style={{position: "relative"}} className="service-icon-box">
                            <div className="box">
                                <div className="form-group">
                                    <label htmlFor="">Title</label>
                                    <input type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                                        draft.details.researches[index].title = e.target.value
                                    }))} value={item.title}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Details</label>
                                    <textarea name="" id="" cols="30" rows="10" className="form-control" onChange={(e) => setData(produce((draft) => {
                                        draft.details.researches[index].details = e.target.value
                                    }))} value={item.details}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Image</label>
                                    <FileUpload select={(file) => handleResearchUpload(file, index)} value={item.image}/>
                                </div>
                            </div>
                            <button className="remove-button"  onClick={() => removeResearchBox(index)}>
                                <IonIcon icon={trashOutline} />
                            </button>
                        </div>
                    ))}
                    <div className="text-center" style={{marginBottom: "25px"}}>
                        <button className="btn btn-sm btn-primary" onClick={handleAddNewResearch}>Add New Research</button>
                    </div>
                </>
            )}
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Case Study Result:
                    <div className={`yoo-switch ${data.details.is_result_active ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.details.is_result_active = !draft.details.is_result_active
                    }))}>
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            {data.details.is_result_active && (
                <>
                    <div className="form-group">
                        <label htmlFor="">Result Title</label>
                        <input type="text" className="form-control" onChange={(e) => setData(produce((draft) => {
                            draft.details.result_title = e.target.value
                        }))} value={data.details.result_title}/>
                        {errors?.info_title && <span className="text-danger">{errors?.info_title}</span>}
                    </div>
                    <div className="form-group">
                        <label>Result Details</label>
                        <textarea name="" id="" cols="30" rows="10" className="form-control" onChange={(e) => setData(produce((draft) => {
                            draft.details.result_details = e.target.value
                        }))} value={data.details.result_details}></textarea>
                    </div>
                </>
            )}


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
