import React from "react";
import moment from "moment";
import gravatarUrl from "gravatar-url";
import { Link } from "@inertiajs/react";

export default function PostList() {
    const blogs = window.blogs;
    return (
        <ul className="cs-post_3_list cs-mp0">
            {blogs?.slice(0, 3).map((item, index) => (
                <li key={index}>
                    <div className="cs-post cs-style3">
                        <div className="cs-post_left">
                            <div className="cs-posted_by">
                                <span className="cs-primary_font">
                                    {moment(item.created_at).format("DD")}
                                </span>
                                <span>
                                    {moment(item.created_at).format("MMM")}{" "}
                                    <br />
                                    {moment(item.created_at).format("Y")}
                                </span>
                            </div>
                        </div>
                        <div className="cs-post_right">
                            <h2 className="cs-post_title">
                                <Link href={route("blog.show", item.slug)}>
                                    {item.title}
                                </Link>
                            </h2>
                            <div className="cs-post_subtitle">
                                {item.subtitle}
                            </div>
                            <div className="cs-post_meta">
                                <div className="cs-post_avatar">
                                    <div className="cs-post_avatar_img">
                                        <img
                                            src={gravatarUrl(item.user.email)}
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className="cs-post_avatar_info">
                                        <h4>{item.user.name}</h4>
                                        <p>{item.user.about}</p>
                                    </div>
                                </div>
                                <Link
                                    href={route("blog.show", item.slug)}
                                    className="cs-text_btn"
                                >
                                    <span>Read More</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
