import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import React, {useEffect, useState} from "react";
import {produce} from "immer";
import {IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";
import {usePage} from "@inertiajs/react";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {updateServiceDetails} from "@/Redux/features/pages/Service/service";

export default function ServiceDetails(){
    const serviceDetails = useSelector((state) => state.servicePage.service_details)
    const dispatch = useDispatch()
    const {categories, errors} = usePage().props;
    const [data, setData] = useState({
        title: "",
        icon_box_title: "",
        icon_box_sub_title: "",
        thumbnail_image: "",
        is_show_breadcrumb: false,
        category: "",
        details: "",
        icon_box: [],
        info_thumbnail_image: "",
        info_title: "",
        info_list: [],
        meta_title: "",
        meta_tags: "",
        meta_description: "",
        meta_image: "",
    });

    // handle add new
    const handleAddNewIcon = () => {
        setData(produce((draft) => {
            draft.icon_box.push({title: "", details: "", icon: ""})
        }))
    }

    // handle upload file
    const handleUploadInfoFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.info_thumbnail_image = res.data
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

    // handle icon upload
    const handleIconUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(produce((draft) => {
                draft.icon_box[index].icon = res.data
            }))
        })
    }

    // handle remove Info
    const removeIconBox = (index) => {
        setData(produce((draft) => {
            draft.icon_box.splice(index, 1)
        }))
    }

    // handle add new info list
    const addNewInfoList = () => {
        setData(produce((draft) => {
            draft.info_list.push({title: "", url: ""})
        }))
    }

    // handle remove info list
    const removeInfoList = (index) => {
        setData(produce((draft) => {
            draft.info_list.splice(index, 1)
        }))
    }

    // update state
    useEffect(() => {
        dispatch(updateServiceDetails(data))
    }, [data])

    useEffect(() => {
        setData(serviceDetails)
    }, [serviceDetails])
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
                <label htmlFor="">Icon Box Title</label>
                <input  onChange={(e) => setData(produce((draft) => {
                    draft.icon_box_title = e.target.value
                }))}type="text" value={data.icon_box_title} className="form-control"/>
                {errors?.icon_box_title && <span className="text-danger">{errors?.icon_box_title}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Icon Box Sub Title</label>
                <input  onChange={(e) => setData(produce((draft) => {
                    draft.icon_box_sub_title = e.target.value
                }))}type="text" value={data.icon_box_sub_title} className="form-control"/>
                {errors?.icon_box_sub_title && <span className="text-danger">{errors?.icon_box_sub_title}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Icon Box: </label>
            </div>
            {data.icon_box.map((item, index) => (
                <div style={{position: "relative"}} className="service-icon-box">
                   <div className="box">
                       <div className="form-group">
                           <label htmlFor="">Icon</label>
                           <FileUpload select={(file) => handleIconUpload(file, index)} value={item.icon}/>
                       </div>
                       <div className="form-group">
                           <label htmlFor="">Title</label>
                           <input type="text" className="form-control" value={item.title} onChange={(e) => setData(produce((draft) => {
                               draft.icon_box[index].title = e.target.value
                           }))}/>
                       </div>
                       <div className="form-group">
                           <label htmlFor="">Details</label>
                           <textarea name="" id="" cols="30" rows="10" className="form-control" value={item.details} onChange={(e) => setData(produce((draft) => {
                               draft.icon_box[index].details = e.target.value
                           }))}></textarea>
                       </div>
                   </div>
                    <button className="remove-button"  onClick={() => removeIconBox(index)}>
                        <IonIcon icon={trashOutline} />
                    </button>
                </div>
            ))}
            <div className="text-center">
                <button className="btn btn-sm btn-primary" onClick={handleAddNewIcon}>Add New</button>
            </div>

            <div className="form-group">
                <label htmlFor="">Info Title</label>
                <input type="text" className="form-control" value={data.info_title} onChange={(e) => setData(produce((draft) => {
                    draft.info_title = e.target.value
                }))}/>
                {errors?.info_title && <span className="text-danger">{errors?.info_title}</span>}
            </div>
            <div className="form-group">
                <label>Info Thumbnail image</label>
                <FileUpload select={(file) => handleUploadInfoFile(file)} value={data.info_thumbnail_image}/>
                {errors?.info_thumbnail_image && <span className="text-danger">{errors?.info_thumbnail_image}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="">Info Lists: </label>
            </div>

            {data.info_list.map((item, index) => (
                <div style={{position: "relative"}}>
                    <div className="box">
                        <div className="form-group">
                            <label htmlFor="">Title</label>
                            <input type="text" className="form-control" value={item.title} onChange={(e) => setData(produce((draft) => {
                                draft.info_list[index].title = e.target.value
                            }))}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Url</label>
                            <input type="text" className="form-control" value={item.url} onChange={(e) => setData(produce((draft) => {
                                draft.info_list[index].url = e.target.value
                            }))}/>
                        </div>
                    </div>
                    <button className="remove-button"  onClick={() => removeInfoList(index)}>
                        <IonIcon icon={trashOutline} />
                    </button>
                </div>
            ))}
            <div className="text-center">
                <button className="btn btn-sm btn-primary" onClick={addNewInfoList}>Add New</button>
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
