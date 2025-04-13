import { IonIcon } from "@ionic/react";
import {
    mic,
    search,
    ellipsisHorizontal,
    cube,
    newspaperOutline,
    chatboxOutline,
    fileTray,
    peopleOutline,
    idCardOutline,
    chevronForward,
    starOutline,
    pencilOutline,
    shieldOutline,
    imageOutline,
    mailOpenOutline,
    sendOutline,
    cardOutline,
    cogOutline,
    cashOutline,
} from "ionicons/icons";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import hasPermission from "@/Admin/Utils/hasPermission";

export default function Sidebar() {
    const { auth } = usePage().props;
    const [toggle, setToggle] = useState(false);
    const [expandMenu, setExpandMenu] = useState({
        postMenu:
            !!route().current("admin.posts.*") ||
            !!route().current("admin.categories.*") ||
            !!route().current("admin.tags.*"),
        pageMenu: !!route().current("admin.pages.*"),
        appearanceMenu:
            !!route().current("admin.themes.*") ||
            !!route().current("admin.menus.*"),
        portfolioMenu: !!route().current("admin.portfolios.*"),
        serviceMenu: !!route().current("admin.services.*"),
        caseStudyMenu: !!route().current("admin.case.study.*"),
        teamMenu: !!route().current("admin.teams.*"),
        testimonialMenu: !!route().current("admin.testimonials.*"),
        userMenu:
            !!route().current("admin.users.*") ||
            !!route().current("admin.roles.permissions.*"),
        settingsMenu: !!route().current("admin.settings.*"),
    });
    const handleToggle = () => {
        var body = document.body;
        if (toggle) {
            setToggle(false);
            body.classList.remove("yoo-sidebar-active");
        } else {
            setToggle(true);
            body.classList.add("yoo-sidebar-active");
        }
    };
    return (
        <>
            {/* .yoo-header */}
            <div className="yoo-sidebarheader-toggle" onClick={handleToggle}>
                <div className="yoo-button-bar1" />
                <div className="yoo-button-bar2" />
                <div className="yoo-button-bar3" />
            </div>
            {/* .yoo-sidebarheader-toggle */}
            <div className="yoo-sidebarheader yoo-with-boxed-icon">
                <div className="yoo-sidebarheader-in">
                    <div className="yoo-sidebar-nav">
                        <ul className="yoo-sidebar-nav-list yoo-mp0">
                            <li
                                className={`yoo-sidebar-has-children ${
                                    route().current("admin.dashboard") &&
                                    "active"
                                }`}
                            >
                                <Link href={route("admin.dashboard")}>
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                            <IonIcon icon={cube} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Dashboard
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        postMenu: !expandMenu.postMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                            <IonIcon icon={newspaperOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Posts
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.postMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("posts.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.posts.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.posts.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All posts
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("posts.create") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.posts.create"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.posts.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add new
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("post_category.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.categories.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.categories.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Categories
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("post_tags.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.tags.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route("admin.tags.index")}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Tags
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            {hasPermission("comments.index") && (
                                <li
                                    className={`yoo-sidebar-has-children ${
                                        route().current("admin.comments.*") &&
                                        "active"
                                    }`}
                                >
                                    <Link href={route("admin.comments.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-light-blue-bg">
                                                <IonIcon
                                                    icon={chatboxOutline}
                                                />
                                            </span>
                                            <span className="yoo-sidebar-link-text">
                                                Comments
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            {hasPermission("subscribers.index") && (
                                <li
                                    className={`yoo-sidebar-has-children ${
                                        route().current(
                                            "admin.subscribers.*"
                                        ) && "active"
                                    }`}
                                >
                                    <Link
                                        href={route("admin.subscribers.index")}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-green-bg">
                                                <IonIcon
                                                    icon={mailOpenOutline}
                                                />
                                            </span>
                                            <span className="yoo-sidebar-link-text">
                                                Subscribers
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            {hasPermission("contacts.index") && (
                                <li
                                    className={`yoo-sidebar-has-children ${
                                        route().current("admin.contacts.*") &&
                                        "active"
                                    }`}
                                >
                                    <Link href={route("admin.contacts.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-red-bg">
                                                <IonIcon icon={sendOutline} />
                                            </span>
                                            <span className="yoo-sidebar-link-text">
                                                Contacts
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            <li
                                className={`yoo-sidebar-has-children ${
                                    route().current("admin.pricing.plans.*") &&
                                    "active"
                                }`}
                            >
                                <Link href={route("admin.pricing.plans.index")}>
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                            <IonIcon icon={cashOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Pricing Plan
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li
                                className={`yoo-sidebar-has-children ${
                                    route().current(
                                        "admin.payment.history.*"
                                    ) && "active"
                                }`}
                            >
                                <Link
                                    href={route("admin.payment.history.index")}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-green-bg">
                                            <IonIcon icon={cardOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Payment History
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        portfolioMenu:
                                            !expandMenu.portfolioMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                            <IonIcon icon={idCardOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Portfolios
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.portfolioMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("portfolios.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.portfolios.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.portfolios.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All Portfolio
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("portfolios.create") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.portfolios.create"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.portfolios.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add new
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(
                                        "portfolio_categories.index"
                                    ) && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.portfolios.categories.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.portfolios.categories.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Categories
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        serviceMenu: !expandMenu.serviceMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                            <IonIcon icon={shieldOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Services
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.serviceMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("services.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.services.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.services.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All Services
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("services.create") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.services.create"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.services.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add new
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(
                                        "service_categories.index"
                                    ) && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.services.categories.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.services.categories.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Categories
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        caseStudyMenu:
                                            !expandMenu.caseStudyMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-green-bg">
                                            <IonIcon icon={imageOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Case Study
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.caseStudyMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("case_study.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.case.study.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.case.study.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All Case Study
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("case_study.create") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.case.study.create"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.case.study.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add new
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(
                                        "case_study_categories.index"
                                    ) && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.case.study.categories.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.case.study.categories.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Categories
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        teamMenu: !expandMenu.teamMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-light-blue-bg">
                                            <IonIcon icon={peopleOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Teams
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.teamMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("teams.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.teams.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.teams.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All Team Member
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("teams.create") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.teams.create"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.teams.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add new
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        testimonialMenu:
                                            !expandMenu.testimonialMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                            <IonIcon icon={starOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Testimonials
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.testimonialMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("testimonials.index") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.testimonials.index"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.testimonials.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All testimonial
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("testimonials.create") && (
                                        <li
                                            className={`${
                                                route().current(
                                                    "admin.testimonials.create"
                                                ) && "active"
                                            }`}
                                        >
                                            <Link
                                                href={route(
                                                    "admin.testimonials.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add new
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        pageMenu: !expandMenu.pageMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                            <IonIcon icon={fileTray} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Pages
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.pageMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("pages.index") && (
                                        <li
                                            className={
                                                route().current(
                                                    "admin.pages.index"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "admin.pages.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All Pages
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("pages.create") && (
                                        <li>
                                            <Link
                                                href={route(
                                                    "admin.pages.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add New Page
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        appearanceMenu:
                                            !expandMenu.appearanceMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-gray-bg">
                                            <IonIcon icon={pencilOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Appearance
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.appearanceMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("appearance.themes") && (
                                        <li
                                            className={
                                                route().current(
                                                    "admin.themes.index"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "admin.themes.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Themes
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("appearance.customize") && (
                                        <li>
                                            <Link
                                                href={route(
                                                    "admin.customize.customize"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Customize
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("appearance.menus") && (
                                        <li
                                            className={
                                                route().current(
                                                    "admin.menus.index"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "admin.menus.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Menus
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        userMenu: !expandMenu.userMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-pink-bg">
                                            <IonIcon icon={peopleOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Users
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.userMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    {hasPermission("users.index") && (
                                        <li
                                            className={
                                                route().current(
                                                    "admin.users.index"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "admin.users.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        All Users
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("users.create") && (
                                        <li
                                            className={
                                                route().current(
                                                    "admin.users.create"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "admin.users.create"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Add User
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {auth.user.role_name === "admin" && (
                                        <li
                                            className={
                                                route().current(
                                                    "admin.roles.permissions.index"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={route(
                                                    "admin.roles.permissions.index"
                                                )}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        Role & Permission
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>

                            <li
                                className="yoo-sidebar-has-children"
                                onClick={() =>
                                    setExpandMenu({
                                        ...expandMenu,
                                        settingsMenu: !expandMenu.settingsMenu,
                                    })
                                }
                            >
                                <a href="#">
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                            <IonIcon icon={cogOutline} />
                                        </span>
                                        <span className="yoo-sidebar-link-text">
                                            Settings
                                        </span>
                                    </span>
                                </a>
                                <ul
                                    className="yoo-sidebar-nav-dropdown"
                                    style={
                                        expandMenu.settingsMenu
                                            ? { display: "block" }
                                            : { display: "none" }
                                    }
                                >
                                    <li
                                        className={`${
                                            route().current(
                                                "admin.settings.payment.gateway"
                                            ) && "active"
                                        }`}
                                    >
                                        <Link
                                            href={route(
                                                "admin.settings.payment.gateway"
                                            )}
                                        >
                                            <span className="yoo-sidebar-link-title">
                                                <span className="yoo-sidebar-link-text">
                                                    Payment Gateways
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                    <li
                                        className={`${
                                            route().current(
                                                "admin.settings.smtp.setting"
                                            ) && "active"
                                        }`}
                                    >
                                        <Link
                                            href={route(
                                                "admin.settings.smtp.setting"
                                            )}
                                        >
                                            <span className="yoo-sidebar-link-title">
                                                <span className="yoo-sidebar-link-text">
                                                    SMTP Settings
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>

                                <span className="yoo-dropdown-arrow">
                                    <IonIcon
                                        icon={chevronForward}
                                        role="img"
                                        className="md hydrated"
                                        aria-label="chevron forward"
                                    />
                                </span>
                            </li>
                        </ul>
                        {/* .yoo-sidebar-nav-list */}
                    </div>
                </div>
            </div>
        </>
    );
}
