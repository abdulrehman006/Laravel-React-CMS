import React from "react";
import Div from "../Div";
import RecentPost from "../Widget/RecentPost";
import SearchWidget from "../Widget/SearchWidget";
import SideMenuWidget from "../Widget/SideMenuWidget";
import TagWidget from "../Widget/TagWidget";
import { usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { props } = usePage();

    // categories
    const categories = props.categories.map((item) => {
        return {
            title: item.title,
            url: route("blog.index", { filter: { category: item.title } }),
        };
    });
    // tags
    const tags = props.tags.map((tag) => {
        return {
            title: tag,
            url: route("blog.index", { filter: { tag: tag } }),
        };
    });
    return (
        <>
            <Div className="cs-sidebar_item">
                <SearchWidget title="Search" />
            </Div>
            <Div className="cs-sidebar_item">
                <SideMenuWidget title="Categories" data={categories} />
            </Div>
            <Div className="cs-sidebar_item">
                <RecentPost title="Recent Post" data={props?.recent_post} />
            </Div>
            <Div className="cs-sidebar_item">
                <TagWidget title="Tag Cloud" data={tags} />
            </Div>
        </>
    );
}
