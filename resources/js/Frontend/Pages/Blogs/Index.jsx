import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div.jsx";
import Pagination from "@/Frontend/Components/Pagination";
import PostStyle2 from "@/Frontend/Components/Post/PostStyle2";
import limitString from "@/utils/limitString.js";
import removeHTMLTags from "@/utils/removeHTMLTags.js";
import { Head } from "@inertiajs/react";
import moment from "moment";
import BlogLayout from "@/Frontend/Layouts/BlogLayout";

export default function Index({ posts, search, filter }) {
    // page header data
    let pageHeaderData = {
        title: "Blog",
        breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Blog", url: null },
        ],
    };
    // dynamic assigned page header data
    if (filter.category) {
        pageHeaderData.title = `Category: ${filter.category}`;
        pageHeaderData.breadcrumb = [
            { label: "Home", url: "/" },
            { label: "Blog", url: route("blog.index") },
            { label: filter.category, url: null },
        ];
    } else if (filter.tag) {
        pageHeaderData.title = `Tag: ${filter.tag}`;
        pageHeaderData.breadcrumb = [
            { label: "Home", url: "/" },
            { label: "Blog", url: route("blog.index") },
            { label: filter.tag, url: null },
        ];
    } else if (filter.author) {
        pageHeaderData.title = `Author: ${filter.author}`;
        pageHeaderData.breadcrumb = [
            { label: "Home", url: "/" },
            { label: "Blog", url: route("blog.index") },
            { label: filter.author, url: null },
        ];
    } else if (search) {
        pageHeaderData.title = `Search Results for: ${search}`;
        pageHeaderData.breadcrumb = [
            { label: "Home", url: "/" },
            { label: `Search Results for: ${search}`, url: null },
        ];
    }
    return (
        <BlogLayout pageHeaderData={pageHeaderData}>
            <Head title="Blog" />
            {search && !posts.data.length ? (
                <div className="postbox__wrapper">
                    <section className="no-results not-found">
                        <header className="page-header">
                            <h1 className="page-title blog-search-title">
                                Nothing Found
                            </h1>
                        </header>
                        {/* .page-header */}
                        <div className="pageontent blog-search-content  mt-20 mb-10">
                            <p>
                                Sorry, but nothing matched your search terms.
                                Please try again with some different keywords.
                            </p>
                            <div className="sidebar-search-form position-relative">
                                <form
                                    action="https://themedox.com/arino/"
                                    method="get"
                                >
                                    <input
                                        type="text"
                                        defaultValue="dcfvdsvds"
                                        required=""
                                        name="s"
                                        placeholder="Search"
                                    />
                                    <button type="submit">
                                        <svg
                                            width={16}
                                            height={16}
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13 6.5C13 7.93438 12.5344 9.25938 11.75 10.3344L15.7063 14.2937C16.0969 14.6844 16.0969 15.3188 15.7063 15.7094C15.3156 16.1 14.6812 16.1 14.2906 15.7094L10.3344 11.75C9.25938 12.5375 7.93438 13 6.5 13C2.90937 13 0 10.0906 0 6.5C0 2.90937 2.90937 0 6.5 0C10.0906 0 13 2.90937 13 6.5ZM6.5 11C7.09095 11 7.67611 10.8836 8.22208 10.6575C8.76804 10.4313 9.26412 10.0998 9.68198 9.68198C10.0998 9.26412 10.4313 8.76804 10.6575 8.22208C10.8836 7.67611 11 7.09095 11 6.5C11 5.90905 10.8836 5.32389 10.6575 4.77792C10.4313 4.23196 10.0998 3.73588 9.68198 3.31802C9.26412 2.90016 8.76804 2.56869 8.22208 2.34254C7.67611 2.1164 7.09095 2 6.5 2C5.90905 2 5.32389 2.1164 4.77792 2.34254C4.23196 2.56869 3.73588 2.90016 3.31802 3.31802C2.90016 3.73588 2.56869 4.23196 2.34254 4.77792C2.1164 5.32389 2 5.90905 2 6.5C2 7.09095 2.1164 7.67611 2.34254 8.22208C2.56869 8.76804 2.90016 9.26412 3.31802 9.68198C3.73588 10.0998 4.23196 10.4313 4.77792 10.6575C5.32389 10.8836 5.90905 11 6.5 11Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>{" "}
                        </div>
                        {/* .page-content */}
                    </section>
                    {/* .no-results */}
                </div>
            ) : (
                <>
                    {posts.data.map((item, index) => (
                        <Div key={index}>
                            <PostStyle2
                                thumb={item.thumbnail_image_url}
                                title={item.title}
                                subtitle={limitString(
                                    removeHTMLTags(item.content),
                                    183
                                )}
                                date={moment(item.created_at).format("ll")}
                                author={item.user_name}
                                commentCount={item.comment_count_string}
                                commentHref={
                                    route("blog.show", { slug: item.slug }) +
                                    "/#response"
                                }
                                authorUrl={"Mahad"}
                                href={route("blog.show", { slug: item.slug })}
                            />
                            {posts.data.length > index + 1 && (
                                <Spacing lg="95" md="60" />
                            )}
                        </Div>
                    ))}
                    <Spacing lg="60" md="40" />
                    <Pagination links={posts.links} />
                    <Spacing lg="150" md="80" />
                </>
            )}
        </BlogLayout>
    );
}
