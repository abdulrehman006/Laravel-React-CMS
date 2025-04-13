import { Head, Link } from "@inertiajs/react";
import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div/index.jsx";
import moment from "moment";
import BlogLayout from "@/Frontend/Layouts/BlogLayout";
import limitString from "@/utils/limitString.js";
import removeHTMLTags from "@/utils/removeHTMLTags.js";
import gravatarUrl from "gravatar-url";
import BlogComment from "@/Frontend/Components/Post/PostComent";

export default function BlogDetails({ blog }) {
    // page header data
    let pageHeaderData = {
        title: blog.title,
        breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Blog", url: route("blog.index") },
            {
                label: blog.category_name,
                url: route("blog.index", {
                    filter: { category: blog.category_name },
                }),
            },
            { label: blog.title, url: null },
        ],
    };

    return (
        <BlogLayout pageHeaderData={pageHeaderData}>
            <Head>
                <title>{blog.title}</title>
                <meta name="description" content={ blog.meta_description ?? limitString(removeHTMLTags(blog.content), 150)} />

                <meta itemProp="name" content={ blog.meta_title ??  blog.title} />
                <meta itemProp="description" content={ blog.meta_description ?? limitString(removeHTMLTags(blog.content), 150)} />
                <meta itemProp="image" content={blog.thumbnail_image_url} />

                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={ blog.meta_title ??  blog.title} />
                <meta property="og:description" content={ blog.meta_description ?? limitString(removeHTMLTags(blog.content), 150)} />
                <meta property="og:image" content={blog.thumbnail_image_url} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={ blog.meta_title ??  blog.title} />
                <meta name="twitter:description" content={ blog.meta_description ?? limitString(removeHTMLTags(blog.content), 150)} />
                <meta name="twitter:image" content={blog.thumbnail_image_url} />
            </Head>
            {/* Start Details Post Content */}
            <Div className="cs-post cs-style2">
                <Div className="cs-post_thumb cs-radius_15">
                    <img
                        src={blog.thumbnail_image_url}
                        alt="Post"
                        className="w-100 cs-radius_15"
                    />
                </Div>
                <Div className="cs-post_info">
                    <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                        <span className="cs-posted_by">
                            {moment(blog.created_at).format("ll")}
                        </span>
                        <Link href="/blog" className="cs-post_avatar">
                            {blog.category_name}
                        </Link>
                    </Div>
                    <h2 className="cs-post_title">{blog.title}</h2>
                    <div
                        className="post-text"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                </Div>
            </Div>
            {/* End Details Post Content */}
            <div className="blog-avatar-wrap mb-45">
                <div className="blog-post-avatar-img">
                    <Link
                        href={route("blog.index", {
                            filter: { author: blog.user.id },
                        })}
                    >
                        <img
                            alt=""
                            src={gravatarUrl(blog.user.email, { size: 400 })}
                            className="avatar avatar-180 photo"
                            height={180}
                            width={180}
                            loading="lazy"
                            decoding="async"
                        />
                    </Link>
                </div>
                <div className="bd-avatar-info">
                    <span className="designation">Written by</span>
                    <h4 className="name">
                        <Link
                            href={route("blog.index", {
                                filter: { author: blog.user.id },
                            })}
                        >
                            {blog.user.name}
                        </Link>
                    </h4>
                    <p>{blog.user.about}</p>
                </div>
            </div>

            {/* Start Comment Section */}
            <Spacing lg="50" md="50" />
            <BlogComment blog={blog} commnets={blog.comments} />
            {/* End Comment Section */}
        </BlogLayout>
    );
}
