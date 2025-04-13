import React, { useEffect, useState } from "react";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import Div from "@/Frontend/Components/Div.jsx";
import {Link, usePage} from "@inertiajs/react";
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy";
import MenuItem from "@/Admin/Components/Header/MenuItem";
import { useSelector } from "react-redux";

export default function Header({ variant }) {
    const customize = useSelector((state) => state.customize);
    const [isSticky, setIsSticky] = useState(false);
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false);
    const [mobileToggle, setMobileToggle] = useState(false);
    const {active_theme} = usePage().props
    const menus = window.menus
        ? organizeMenusIntoHierarchy(window.menus.main_menu)
        : [];

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        });
    }, []);

    return (
        <>
            <header
                className={`cs-site_header cs-style1 text-uppercase ${
                    variant ? variant : ""
                } cs-sticky_header ${
                    isSticky ? "cs-sticky_header_active" : ""
                } ${active_theme === "case_study_showcase" || active_theme === "showcase_portfolio" || active_theme === "creative_portfolio" ? "cs-site_header_full_width" : ""}`}
            >
                <Div className="cs-main_header">
                    <Div className="container">
                        <Div className="cs-main_header_in">
                            <Div className="cs-main_header_left">
                                <Link
                                    className="cs-site_branding"
                                    to="/"
                                    href="/"
                                >
                                    <img
                                        src={customize?.general?.site_logo}
                                        alt="Logo"
                                    />
                                </Link>
                            </Div>
                            <div className="cs-main_header_center">
                                <div className="cs-nav cs-primary_font cs-medium">
                                    <ul
                                        className="cs-nav_list"
                                        style={{
                                            display: `${
                                                mobileToggle ? "block" : "none"
                                            }`,
                                        }}
                                    >
                                        {menus.map((menuItem) => (
                                            <MenuItem
                                                setMobileToggle={
                                                    setMobileToggle
                                                }
                                                key={menuItem.id}
                                                item={menuItem}
                                            />
                                        ))}
                                    </ul>
                                    <span
                                        className={
                                            mobileToggle
                                                ? "cs-munu_toggle cs-toggle_active"
                                                : "cs-munu_toggle"
                                        }
                                        onClick={() =>
                                            setMobileToggle(!mobileToggle)
                                        }
                                    >
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                            <Div className="cs-main_header_right">
                                <Div className="cs-toolbox">
                                    <span
                                        className="cs-icon_btn"
                                        onClick={() =>
                                            setSideHeaderToggle(
                                                !sideHeaderToggle
                                            )
                                        }
                                    >
                                        <span className="cs-icon_btn_in">
                                            <span />
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </span>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </header>

            <Div
                className={
                    sideHeaderToggle
                        ? "cs-side_header active"
                        : "cs-side_header"
                }
            >
                <button
                    className="cs-close"
                    onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                />
                <Div
                    className="cs-side_header_overlay"
                    onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                />
                <Div className="cs-side_header_in">
                    <Div className="cs-side_header_shape" />
                    {customize.sidebar.is_show_logo === "1" && (
                        <Link className="cs-site_branding" to="/" href="/">
                            <img
                                src={customize?.general?.site_logo}
                                alt="Logo"
                            />
                        </Link>
                    )}
                    {customize.sidebar.is_show_contact_info === "1" && (
                        <>
                            <Div className="cs-side_header_box">
                                <h2 className="cs-side_header_heading">
                                    {customize.sidebar.contact_title}
                                </h2>
                            </Div>
                            <Div className="cs-side_header_box">
                                <ContactInfoWidget
                                    title={customize.sidebar.contact_subtitle}
                                    withIcon
                                />
                            </Div>
                        </>
                    )}
                    {customize.sidebar.is_show_subscribe === "1" && (
                        <Div className="cs-side_header_box">
                            <Newsletter placeholder="example@gmail.com" />
                        </Div>
                    )}
                    {customize.sidebar.is_show_social_media === "1" && (
                        <Div className="cs-side_header_box">
                            <SocialWidget />
                        </Div>
                    )}
                </Div>
            </Div>
        </>
    );
}
