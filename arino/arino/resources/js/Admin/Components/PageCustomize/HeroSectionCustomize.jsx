import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import React, {useEffect, useState} from "react";
import {IonIcon} from "@ionic/react";
import {closeOutline} from "ionicons/icons/index.mjs";
import {produce} from "immer";
import {trashOutline} from "ionicons/icons";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";


export default function HeroSectionCustomize({currentSection, spacingCallback, updateHeroSection, sectionData}){
    const [tab, setTab] = useState('general');

    const [data, setData] = useState({
        layout: sectionData.layout,
        title: sectionData.title,
        sub_title: sectionData.sub_title,
        action_text: sectionData.action_text,
        background_image_url: sectionData.background_image_url,
        action_url: sectionData.action_url,
        social_links: {
            title: sectionData.social_links.title,
            links: sectionData.social_links.links,
        },
        email_address: sectionData.email_address,
        phone_number: sectionData.phone_number,
        photography_slider: sectionData.photography_slider,
        portfolio_slider: sectionData.portfolio_slider ?? [],
        case_study_slider: sectionData.case_study_slider ?? [],
        highlight_letter: sectionData.highlight_letter ?? "",
        youtube_link: sectionData.youtube_link ?? "",
        hero_image: sectionData.hero_image ?? "",
        intro_title: sectionData.intro_title ?? "",
        experience_year: sectionData.experience_year ?? "",
        experience_title: sectionData.experience_title ?? "",
        project_complete: sectionData.project_complete ?? "",
        project_complete_title: sectionData.project_complete_title ?? "",
    })

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, background_image_url: res.data})
        })
    }
    // handle hero upload file
    const handleHeroUploadFile = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, hero_image: res.data})
        })
    }

    // remove slider
    const removeSlider = (title) => {
        setData(
            produce((draft) => {
                draft.photography_slider = draft.photography_slider.filter(
                    (item) => item.title !== title
                );
            })
        );
    };

    // remove portfolio slider
    const removePortfolioSlider = (title) => {
        setData(produce((draft) => {
            draft.portfolio_slider = draft.portfolio_slider.filter((item) => item.title !== title)
        }))
    }

    // remove case study slider
    const removeCaseStudySlider = (title) => {
        setData(produce((draft) => {
            draft.case_study_slider = draft.case_study_slider.filter((item) => item.title !== title)
        }))
    }

    // addNewSlider
    const addNewSlider = () => {
        setData(
            produce((draft) => {
                draft.photography_slider = [
                    ...draft.photography_slider,
                    { title: '', imageUrl: '', href: '' },
                ];
            })
        );
    };

    // add new portfolio slider
    const addNewPortfolioSlider = () => {
        setData(produce((draft) => {
            draft.portfolio_slider.push({title: '', imageUrl: '', href: ''})
        }))
    }

    // ad new case study slider
    const addNewCaseStudySlider = () => {
        setData(produce((draft) => {
            draft.case_study_slider.push({title: '', imageUrl: '', href: '', action_text: ""})
        }))
    }

    // handle slider file upload
    const handleSliderFileUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(
                produce((draft) => {
                    draft.photography_slider[index].imageUrl = res.data
                })
            )
        })
    }

    // handle portfolio slider bg upload
    const handlePortfolioSliderFileUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(
                produce((draft) => {
                    draft.portfolio_slider[index].imageUrl = res.data
                })
            )
        })
    }

    // handle case study slider bg upload
    const handleCaseStudySliderFileUpload = (file, index) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData(
                produce((draft) => {
                    draft.case_study_slider[index].imageUrl = res.data
                })
            )
        })
    }

    // add new social media
    const addNewSocialMedia = () => {
        setData(produce((draft) => {
            draft.social_links.links.push({
                title: '',
                imageUrl: '',
                href: '',
            },)
        }))
    }

    // remove social media
    const removeSocial = (index) => {
        setData(produce((draft) => {
            draft.social_links.links.splice(index, 1)
        }))
    }

    // conditional rendering

    let customizer = ''
    if (data.layout === "1"){
        customizer =
            <div className="hero hero-1">
                <div className="form-group">
                    <label>Background image</label>
                    <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image_url}/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Social link Text</label>
                    <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
                </div>
                <div className="social-link-items">
                    {data.social_links.links.map((item, index) => (
                        <div className="social-media-wrap" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social Name</label>
                                        <input type="text" value={item.title} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].title = e.target.value
                                                })
                                            )
                                        }} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social link</label>
                                        <input type="text" value={item.url} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].url = e.target.value
                                                })
                                            )
                                        }}  className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeSocial(index)}>
                                <IonIcon icon={trashOutline} />
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{textAlign: "center"}}>
                    <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
                </div>
            </div>
    } else if(data.layout === "2"){
        customizer =
            <>
                <div className="hero hero-2">
                    <div className="form-group">
                        <label htmlFor="">Email Address</label>
                        <input type="email" value={data.email_address} onChange={(e) => setData({...data, email_address: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input type="email" value={data.phone_number} onChange={(e) => setData({...data, phone_number: e.target.value})} className="form-control"/>
                    </div>
                    {data.photography_slider.map((item, index) => (
                        <div className="slider-wrap" key={index}>
                            <div className="form-group">
                                <label htmlFor="">Slider Title</label>
                                <input type="text" value={item.title} onChange={(e) => {
                                    setData(
                                        produce((draft) => {
                                            draft.photography_slider[index].title = e.target.value
                                        })
                                    )
                                }} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Slider Url</label>
                                <input type="text" value={item.href} onChange={(e) => {
                                    setData(
                                        produce((draft) => {
                                            draft.photography_slider[index].href = e.target.value
                                        })
                                    )
                                }} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Slider image</label>
                                <FileUpload select={(file) => handleSliderFileUpload(file, index)} value={item.imageUrl}/>
                            </div>
                            <button className="remove-button" onClick={() => removeSlider(item.title)}>
                                <IonIcon icon={closeOutline} />
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{textAlign: "center"}}>
                    <button className="btn btn-sm btn-primary" onClick={addNewSlider}>Add new</button>
                </div>
            </>
    } else if(data.layout === "3"){
        customizer =
            <div className="hero hero-3">
                <div className="form-group">
                    <label>Background image</label>
                    <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image_url}/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Social link Text</label>
                    <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
                </div>
                <div className="social-link-items">
                    {data.social_links.links.map((item, index) => (
                        <div className="social-media-wrap" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social Name</label>
                                        <input type="text" value={item.title} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].title = e.target.value
                                                })
                                            )
                                        }} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social link</label>
                                        <input type="text" value={item.url} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].url = e.target.value
                                                })
                                            )
                                        }}  className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeSocial(index)}>
                                <IonIcon icon={trashOutline} />
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{textAlign: "center"}}>
                    <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
                </div>
            </div>
    } else if(data.layout === "4"){
        customizer =
            <div className="hero hero-4">
                <div className="form-group">
                    <label>Background image</label>
                    <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image_url}/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="">Email Address</label>
                    <input type="email" value={data.email_address} onChange={(e) => setData({...data, email_address: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input type="email" value={data.phone_number} onChange={(e) => setData({...data, phone_number: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Social link Text</label>
                    <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
                </div>
                <div className="social-link-items">
                    {data.social_links.links.map((item, index) => (
                        <div className="social-media-wrap" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social Name</label>
                                        <input type="text" value={item.title} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].title = e.target.value
                                                })
                                            )
                                        }} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social link</label>
                                        <input type="text" value={item.url} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].url = e.target.value
                                                })
                                            )
                                        }}  className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeSocial(index)}>
                                <IonIcon icon={trashOutline} />
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{textAlign: "center"}}>
                    <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
                </div>
            </div>
    } else if (data.layout === "5"){
        customizer =
            <div className="hero hero-5">
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Sub Title</label>
                <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
            </div>
            <div className="form-group">
                <label>Action link text</label>
                <input type="text" value={data.action_text} onChange={(e) => {
                    setData({...data, action_text: e.target.value})
                }} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Action link</label>
                <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Social link Text</label>
                <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
            </div>
            <div className="social-link-items">
                {data.social_links.links.map((item, index) => (
                    <div className="social-media-wrap" key={index}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Social Name</label>
                                    <input type="text" value={item.title} onChange={(e) => {
                                        setData(
                                            produce((draft) => {
                                                draft.social_links.links[index].title = e.target.value
                                            })
                                        )
                                    }} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Social link</label>
                                    <input type="text" value={item.url} onChange={(e) => {
                                        setData(
                                            produce((draft) => {
                                                draft.social_links.links[index].url = e.target.value
                                            })
                                        )
                                    }}  className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <button className="remove-button" onClick={() => removeSocial(index)}>
                            <IonIcon icon={trashOutline} />
                        </button>
                    </div>
                ))}
            </div>
            <div style={{textAlign: "center"}}>
                <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
            </div>
        </div>
    } else if (data.layout === "6"){
       customizer =  <>
           <div className="hero hero-2">
               {data.portfolio_slider.map((item, index) => (
                   <div className="slider-wrap" key={index}>
                       <div className="form-group">
                           <label htmlFor="">Title</label>
                           <input type="text" value={item.title} onChange={(e) => {
                               setData(
                                   produce((draft) => {
                                       draft.portfolio_slider[index].title = e.target.value
                                   })
                               )
                           }} className="form-control"/>
                       </div>
                       <div className="form-group">
                           <label htmlFor="">URL</label>
                           <input type="text" value={item.href} onChange={(e) => {
                               setData(
                                   produce((draft) => {
                                       draft.portfolio_slider[index].href = e.target.value
                                   })
                               )
                           }} className="form-control"/>
                       </div>
                       <div className="form-group">
                           <label>Background Image</label>
                           <FileUpload select={(file) => handlePortfolioSliderFileUpload(file, index)} value={item.imageUrl}/>
                       </div>
                       <button className="remove-button" onClick={() => removePortfolioSlider(item.title)}>
                           <IonIcon icon={closeOutline} />
                       </button>
                   </div>
               ))}
           </div>
           <div style={{textAlign: "center"}}>
               <button className="btn btn-sm btn-primary" onClick={addNewPortfolioSlider}>Add new</button>
           </div> <br/>
           <div className="form-group">
               <label>Social link Text</label>
               <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
           </div>
           <div className="social-link-items">
               {data.social_links.links.map((item, index) => (
                   <div className="social-media-wrap" key={index}>
                       <div className="row">
                           <div className="col-md-6">
                               <div className="form-group">
                                   <label htmlFor="">Social Name</label>
                                   <input type="text" value={item.title} onChange={(e) => {
                                       setData(
                                           produce((draft) => {
                                               draft.social_links.links[index].title = e.target.value
                                           })
                                       )
                                   }} className="form-control"/>
                               </div>
                           </div>
                           <div className="col-md-6">
                               <div className="form-group">
                                   <label htmlFor="">Social link</label>
                                   <input type="text" value={item.url} onChange={(e) => {
                                       setData(
                                           produce((draft) => {
                                               draft.social_links.links[index].url = e.target.value
                                           })
                                       )
                                   }}  className="form-control"/>
                               </div>
                           </div>
                       </div>
                       <button className="remove-button" onClick={() => removeSocial(index)}>
                           <IonIcon icon={trashOutline} />
                       </button>
                   </div>
               ))}
           </div>
           <div style={{textAlign: "center"}}>
               <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
           </div>
       </>
    } else if (data.layout === "7"){
        customizer =  <>
            <div className="hero hero-2">
                {data.case_study_slider.map((item, index) => (
                    <div className="slider-wrap" key={index}>
                        <div className="form-group">
                            <label htmlFor="">Title</label>
                            <input type="text" value={item.title} onChange={(e) => {
                                setData(
                                    produce((draft) => {
                                        draft.case_study_slider[index].title = e.target.value
                                    })
                                )
                            }} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Action Text</label>
                            <input type="text" value={item.action_text} onChange={(e) => {
                                setData(
                                    produce((draft) => {
                                        draft.case_study_slider[index].action_text = e.target.value
                                    })
                                )
                            }} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">URL</label>
                            <input type="text" value={item.href} onChange={(e) => {
                                setData(
                                    produce((draft) => {
                                        draft.case_study_slider[index].href = e.target.value
                                    })
                                )
                            }} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Background Image</label>
                            <FileUpload select={(file) => handleCaseStudySliderFileUpload(file, index)} value={item.imageUrl}/>
                        </div>
                        <button className="remove-button" onClick={() => removeCaseStudySlider(item.title)}>
                            <IonIcon icon={closeOutline} />
                        </button>
                    </div>
                ))}
            </div>
            <div style={{textAlign: "center"}}>
                <button className="btn btn-sm btn-primary" onClick={addNewCaseStudySlider}>Add new</button>
            </div> <br/>
            <div className="form-group">
                <label>Social link Text</label>
                <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
            </div>
            <div className="social-link-items">
                {data.social_links.links.map((item, index) => (
                    <div className="social-media-wrap" key={index}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Social Name</label>
                                    <input type="text" value={item.title} onChange={(e) => {
                                        setData(
                                            produce((draft) => {
                                                draft.social_links.links[index].title = e.target.value
                                            })
                                        )
                                    }} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Social link</label>
                                    <input type="text" value={item.url} onChange={(e) => {
                                        setData(
                                            produce((draft) => {
                                                draft.social_links.links[index].url = e.target.value
                                            })
                                        )
                                    }}  className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <button className="remove-button" onClick={() => removeSocial(index)}>
                            <IonIcon icon={trashOutline} />
                        </button>
                    </div>
                ))}
            </div>
            <div style={{textAlign: "center"}}>
                <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
            </div>
        </>
    }

    else if (data.layout === "8"){
        customizer =
            <div className="hero hero-1">
                <div className="form-group">
                    <label>Background image</label>
                    <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image_url}/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Highlight letter</label>
                    <input type="text" value={data.highlight_letter} onChange={(e) => setData({...data, highlight_letter: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Social link Text</label>
                    <input type="text" value={data.social_links.title} onChange={(e) => setData({...data, social_links: {...data.social_links, title: e.target.value}})} className="form-control"/>
                </div>
                <div className="social-link-items">
                    {data.social_links.links.map((item, index) => (
                        <div className="social-media-wrap" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social Name</label>
                                        <input type="text" value={item.title} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].title = e.target.value
                                                })
                                            )
                                        }} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Social link</label>
                                        <input type="text" value={item.url} onChange={(e) => {
                                            setData(
                                                produce((draft) => {
                                                    draft.social_links.links[index].url = e.target.value
                                                })
                                            )
                                        }}  className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeSocial(index)}>
                                <IonIcon icon={trashOutline} />
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{textAlign: "center"}}>
                    <button onClick={addNewSocialMedia} className="btn btn-sm btn-success">Add New</button>
                </div>
            </div>
    }
    else if (data.layout === "9"){
        customizer =
            <div className="hero hero-1">
                <div className="form-group">
                    <label>Background image</label>
                    <FileUpload select={(file) => handleUploadFile(file)} value={data.background_image_url}/>
                </div>
                <div className="form-group">
                    <label>Hero image</label>
                    <FileUpload select={(file) => handleHeroUploadFile(file)} value={data.hero_image}/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Youtube URL</label>
                    <input type="text" value={data.youtube_link} onChange={(e) => setData({...data, youtube_link: e.target.value})} className="form-control"/>
                </div>
            </div>
    }
    else if (data.layout === "10"){
        customizer =
            <div className="hero hero-1">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div>
            </div>
    }
    else if (data.layout === "11"){
        customizer =
            <div className="hero hero-1">
                <div className="form-group">
                    <label>Hero image</label>
                    <FileUpload select={(file) => handleHeroUploadFile(file)} value={data.hero_image}/>
                </div>
                <div className="form-group">
                    <label>Intro title</label>
                    <input type="text" value={data.intro_title} onChange={(e) => setData({...data, intro_title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control" value={data.sub_title} onChange={(e) => setData({...data, sub_title: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label>Action link text</label>
                    <input type="text" value={data.action_text} onChange={(e) => {
                        setData({...data, action_text: e.target.value})
                    }} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input type="text" value={data.action_url} onChange={(e) => setData({...data, action_url: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Experience year</label>
                    <input type="text" value={data.experience_year} onChange={(e) => setData({...data, experience_year: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Experience title</label>
                    <input type="text" value={data.experience_title} onChange={(e) => setData({...data, experience_title: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Project complete</label>
                    <input type="text" value={data.project_complete} onChange={(e) => setData({...data, project_complete: e.target.value})} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Project complete title</label>
                    <input type="text" value={data.project_complete_title} onChange={(e) => setData({...data, project_complete_title: e.target.value})} className="form-control"/>
                </div>
            </div>
    }



    useEffect(() => {
        updateHeroSection(data)
    }, [data])
    return(
        <>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item" onClick={() => setTab('general')} style={{cursor: "pointer"}}>
                    <span className={`nav-link ${tab === "general" && "active"}`}>General</span>
                </li>
                <li className="nav-item" onClick={() => setTab('spacing')} style={{cursor: "pointer"}}>
                    <span className={`nav-link ${tab === "spacing" && "active"}`}>Spacing</span>
                </li>
            </ul>
            {tab === "general" ? (
                <>
                    <div className="form-group">
                        <label>Select layout</label>
                        <select className="form-control" value={data.layout} onChange={(e) => setData({...data, layout: e.target.value})}>
                            <option value="1">Creative Agency</option>
                            <option value="2">Photography Agency</option>
                            <option value="3">Creative Portfolio</option>
                            <option value="4">Digital Agency</option>
                            <option value="5">Marketing Agency</option>
                            <option value="6">Showcase Portfolio</option>
                            <option value="7">Case Study Showcase</option>
                            <option value="8">Freelancer Agency</option>
                            <option value="9">Architecture Agency</option>
                            <option value="10">Creative Solution</option>
                            <option value="11">Personal Portfolio</option>
                        </select>
                    </div>
                    {customizer}
                </>
            ): (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
