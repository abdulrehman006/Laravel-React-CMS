import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {produce} from "immer";
import {updateGeneral} from "@/Redux/features/pages/Customize/customize";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect";
import {ChromePicker, SketchPicker} from "react-color";
import {Link, usePage} from "@inertiajs/react";

export default function GeneralCustomize(){
    const {sitemap_url} = usePage().props;
    const general = useSelector((state) => state.customize.general)
    const dispatch = useDispatch();
    const [fontLists, setFontLists] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef(null);

    const [data, setData] = useState({
        ...general,
        is_page_breadcrumbs: general.is_page_breadcrumbs === "1",
        enable_rtl: general.enable_rtl === "1",
    })
    // handle upload file
    const handleUploadLogo = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, site_logo: res.data})
        })
    }
    // handle upload file
    const handleUploadFav = (file) => {
        const body = new FormData();
        body.append('file', file)
        axios.post(route('admin.pages.upload.file'), body).then((res) => {
            setData({...data, site_favicon: res.data})
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

    useEffect(() => {
        dispatch(updateGeneral(data))
    }, [data])

    useEffect(() => {
        axios.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD2wtvt62x3jtd1LxDM9ZZnY7f7jnSzgVM&sort=popularity').then((res) => {
            const items = res.data.items.map((item) => {
                return {label: item.family, value: item.family}
            });
            setFontLists(items)
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [colorPickerRef]);

    return(
        <>
            <div className="form-group">
                <label>Site Title</label>
                <input type="text" value={data.site_name} onChange={(e) => setData({...data, site_name: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Tagline</label>
                <input type="text" value={data.tagline} onChange={(e) => setData({...data, tagline: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Meta Title</label>
                <input type="text" value={data.meta_title} onChange={(e) => setData({...data, meta_title: e.target.value})} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Meta Tags</label>
                <input type="text" value={data.meta_tags} onChange={(e) => setData({...data, meta_tags: e.target.value})} className="form-control"/>
                <span>Separate with coma</span>
            </div>
            <div className="form-group">
                <label>Meta Description</label>
                <textarea cols="30" rows="10" value={data.meta_description} onChange={(e) => setData({...data, meta_description: e.target.value})} className="form-control"></textarea>
            </div>
            <div className="form-group">
                <label>Site Logo</label>
                <FileUpload select={(file) => handleUploadLogo(file)} value={data.site_logo}/>
            </div>
            <div className="form-group">
                <label>Site Favicon</label>
                <FileUpload select={(file) => handleUploadFav(file)} value={data.site_favicon}/>
            </div>
            <div className="form-group">
                <label>Meta Image</label>
                <FileUpload select={(file) => handleUploadMeta(file)} value={data.meta_image}/>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-lg-6">
                        <label>Sitemap URL</label>
                    </div>
                    <div className="col-md-6">
                        <Link href={route('admin.generate.sitemap')} style={{color: "#0d6efd"}}>Generate Sitemap</Link>
                    </div>
                </div>
                <code>{sitemap_url}</code>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Is Show Breadcrumbs:
                    <div className={`yoo-switch ${data.is_page_breadcrumbs ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.is_page_breadcrumbs = !draft.is_page_breadcrumbs
                    }))}>
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Enable RTL:
                    <div className={`yoo-switch ${data.enable_rtl ? "active" : ""}`} onClick={() => setData(produce((draft) => {
                        draft.enable_rtl = !draft.enable_rtl
                    }))}>
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="">Primary Font</label>
                <CustomSelect
                    options={fontLists}
                    placeholder="Select Primary Font"
                    value={data.primary_font}
                    onSelect={(e) => setData(produce((draft) => {
                        draft.primary_font = e;
                    }))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Secondary Font</label>
                <CustomSelect
                    options={fontLists}
                    placeholder="Select Secondary Font"
                    value={data.secondary_font}
                    onSelect={(e) => setData(produce((draft) => {
                        draft.secondary_font = e;
                    }))}
                />
            </div>

            <div className="form-group">
                <label htmlFor="" style={{display: "flex", gap: "10px"}}>Site Color:
                    <div className="color" style={{width: "50px", height: "20px", backgroundColor: data.site_color, cursor: "pointer"}} onClick={() => setShowColorPicker(!showColorPicker)}>
                    </div>
                </label>
            </div>

            {showColorPicker && (
                <div ref={colorPickerRef}>
                    <ChromePicker
                        color={{ hex: data.site_color, a: 1 }}
                        disableAlpha={true}
                        onChange={(color) => {
                            setData(produce((draft) => {
                                draft.site_color = color.hex;
                            }))
                        }}
                    />
                </div>
            )}
        </>

    )
}
