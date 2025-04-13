import ProfileDropdown from "@/Admin/Components/Header/ProfileDropdown/index.jsx";
import { useSelector } from "react-redux";
import React from "react";
import {Link} from "@inertiajs/react";

export default function Header() {
    const customize = useSelector((state) => state.customize);
    return (
        <header className="yoo-header yoo-style1 yoo-sticky-menu">
            <div className="yoo-main-header">
                <div className="yoo-main-header-in">
                    <div className="yoo-main-header-left">
                        <Link href={route('admin.dashboard')} className="yoo-logo-link yoo-light-logo">
                            <img
                                src={customize?.general?.site_logo}
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="yoo-main-header-right">
                        <div className="yoo-nav-wrap yoo-fade-up"></div>
                        {/* .yoo-nav-wrap */}
                        <ul className="yoo-ex-nav yoo-style1 yoo-flex yoo-mp0">
                            <li>
                                <ProfileDropdown />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
