import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Link, Head, usePage } from "@inertiajs/react";
import { IonIcon } from "@ionic/react";
import {
    albums,
    archive,
    chatboxOutline,
    fileTray,
    idCardOutline,
    imageOutline,
    layers,
    mailOpenOutline,
    newspaper,
    people,
    sendOutline,
    shieldOutline,
} from "ionicons/icons";
import gravatarUrl from "gravatar-url";

export default function Dashboard() {
    const {
        post_count,
        service_count,
        portfolio_count,
        case_study_count,
        comment_count,
        user_count,
        subscriber_count,
        contact_count,
        latest_contacts,
        latest_comments,
    } = usePage().props;
    return (
        <>
            <Head title="Dashboard" />
            <AdminLayouts>
                {/* .yoo-sidebarheader */}
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">Dashboard</h2>
                    </div>
                </div>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-blue-bg yoo-blue-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        TOTAL POSTS
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {post_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={newspaper} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-green-bg yoo-green-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        TOTAL USERS
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {user_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={people} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-gray-bg yoo-gray-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        TOTAL CASE STUDY
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {case_study_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={imageOutline} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-light-blue-bg yoo-light-blue-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        Total portfolio
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {portfolio_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={idCardOutline} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-light-blue-bg yoo-light-blue-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        Total Service
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {service_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={shieldOutline} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-gray-bg yoo-gray-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        TOTAL Comment
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {comment_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={chatboxOutline} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-green-bg yoo-green-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        TOTAL Subscriber
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {subscriber_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={mailOpenOutline} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {/* .col */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-blue-bg yoo-blue-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">
                                        TOTAL CONTACTS
                                    </div>
                                    <div className="yoo-iconbox-number">
                                        {contact_count}
                                    </div>
                                    <div className="yoo-iconbox-icon">
                                        <IonIcon icon={sendOutline} />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="yoo-card yoo-style1">
                                <div className="yoo-card-heading">
                                    <div className="yoo-card-heading-left">
                                        <h2 className="yoo-card-title">
                                            <span className="yoo-card-title-icon yoo-light-blue-bg">
                                                <IonIcon
                                                    icon={sendOutline}
                                                    style={{
                                                        width: "16px",
                                                        height: "16px",
                                                    }}
                                                />
                                            </span>
                                            Latest Contacts
                                        </h2>
                                    </div>
                                </div>
                                <div className="yoo-card-body">
                                    <div className="yoo-padd-lr-20">
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                        <div className="yoo-margin-bottom-3">
                                            <ul className="yoo-list-group yoo-style1 yoo-type1 yoo-mp0">
                                                {latest_contacts.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                href={route(
                                                                    "admin.contacts.show",
                                                                    item
                                                                )}
                                                            >
                                                                <div className="yoo-medias yoo-style1 yoo-type1">
                                                                    <div className="yoo-media-img">
                                                                        <div className="yoo-box-md yoo-radious10 yoo-img-box yoo-purple-box">
                                                                            <img
                                                                                src={gravatarUrl(
                                                                                    item.email
                                                                                )}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="yoo-media-meta">
                                                                        <h2 className="yoo-media-title yoo-margin-bottom-0">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </h2>
                                                                        <div className="yoo-media-subtitle">
                                                                            {
                                                                                item.email
                                                                            }
                                                                        </div>
                                                                        <div className="yoo-media-text">
                                                                            {
                                                                                item.message
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    {item.is_open ===
                                                                    "1" ? (
                                                                        <span className="badge badge-success">
                                                                            Opened
                                                                        </span>
                                                                    ) : (
                                                                        <span className="badge badge-danger">
                                                                            Not
                                                                            Opened
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                                {!latest_contacts.length && (
                                                    <div className="text-center">
                                                        No contacts found
                                                    </div>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="yoo-height-b15 yoo-height-lg-b15" />
                                    </div>
                                </div>
                            </div>
                            {/* .yoo-card */}
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        <div className="col-lg-6">
                            <div className="yoo-card yoo-style1">
                                <div className="yoo-card-heading">
                                    <div className="yoo-card-heading-left">
                                        <h2 className="yoo-card-title">
                                            <span className="yoo-card-title-icon yoo-light-blue-bg">
                                                <IonIcon
                                                    icon={chatboxOutline}
                                                    style={{
                                                        width: "16px",
                                                        height: "16px",
                                                    }}
                                                />
                                            </span>
                                            Latest Comments
                                        </h2>
                                    </div>
                                </div>
                                <div className="yoo-card-body">
                                    <div className="yoo-padd-lr-20">
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                        <div className="yoo-margin-bottom-3">
                                            <ul className="yoo-list-group yoo-style1 yoo-type1 yoo-mp0">
                                                {latest_comments.map(
                                                    (item, index) => (
                                                        <li
                                                            key={`comments-${index}`}
                                                        >
                                                            <div className="yoo-medias yoo-style1 yoo-type1">
                                                                <div className="yoo-media-img">
                                                                    <div className="yoo-box-md yoo-radious10 yoo-img-box yoo-purple-box">
                                                                        <img
                                                                            src={gravatarUrl(
                                                                                item.comment_author_email
                                                                            )}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="yoo-media-meta">
                                                                    <h2 className="yoo-media-title yoo-margin-bottom-0">
                                                                        {
                                                                            item.comment_author_name
                                                                        }
                                                                    </h2>
                                                                    <div className="yoo-media-subtitle">
                                                                        {
                                                                            item.comment_author_email
                                                                        }
                                                                    </div>
                                                                    <div className="yoo-media-text">
                                                                        {
                                                                            item.comment_content
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {item.is_approved ===
                                                                "1" ? (
                                                                    <span className="badge badge-success">
                                                                        Approved
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge badge-danger">
                                                                        Not
                                                                        Approved
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                                {!latest_comments.length && (
                                                    <div className="text-center">
                                                        No comments found
                                                    </div>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="yoo-height-b15 yoo-height-lg-b15" />
                                    </div>
                                </div>
                            </div>
                            {/* .yoo-card */}
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                    </div>
                </div>
                {/* .yoo-content */}
            </AdminLayouts>
        </>
    );
}
