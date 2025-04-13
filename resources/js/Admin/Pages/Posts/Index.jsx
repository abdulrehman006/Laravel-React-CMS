import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, Link } from "@inertiajs/react";
import { newspaperOutline, search } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { trashOutline, createOutline, eyeOutline } from "ionicons/icons";
import moment from "moment";
import { useState } from "react";
import { router } from "@inertiajs/react";
import ThSortable from "@/Admin/Components/Table/ThSortable";
import DropDownButton from "@/Admin/Components/Button/DropDownButton";
import { showAlert } from "@/Admin/Utils/SweetAlert.js";
import DeleteButton from "@/Admin/Components/Button/DeleteButton";
import hasPermission from "@/Admin/Utils/hasPermission";

export default function AllPosts({ posts, sort, categories, filter }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("Bulk Action");
    const [isMarkAll, setIsMarkAll] = useState(false);
    const [markItems, setMarkItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(filter.status);
    const [selectedCategory, setSelectedCategory] = useState(filter.category);

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.posts.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: { status: selectedStatus, category: selectedCategory },
            }),
            {},
            { preserveState: true }
        );
    };

    // mark all
    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([]);
            setIsMarkAll(false);
        } else {
            const items = posts.data.map((post) => post.id);
            setMarkItems(items);
            setIsMarkAll(true);
        }
    };

    // handle mark unmark
    const handleMark = (postId) => {
        const existsMark = markItems.some((item) => item === postId);
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== postId);
            setMarkItems(removeItem);
        } else {
            const addedItem = [...markItems, postId];
            setMarkItems(addedItem);
        }
    };

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = "";
        let action = "";

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected posts?";
            action = "admin.posts.bulk.delete";
        } else if (selectedOption === "Publish") {
            confirmMessage = "You want to publish selected posts?";
            action = "admin.posts.bulk.publish";
        } else if (selectedOption === "UnPublish") {
            confirmMessage = "You want to unpublish selected posts?";
            action = "admin.posts.bulk.unpublish";
        }
        setIsMarkAll([]);
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.post(route(action, { ids: markItems.join(",") }));
        });
    };

    // handle post status toggle
    const handlePostStatusToggle = (postId) => {
        router.post(route("admin.posts.status.toggle", { id: postId }));
    };

    return (
        <>
            <Head title="All posts" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">All Posts</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={newspaperOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    </span>
                                    Posts
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div className="">
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left">
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton
                                                        selectedOption={
                                                            selectedOption
                                                        }
                                                        disabled={
                                                            !markItems.length
                                                        }
                                                    >
                                                        <a
                                                            onClick={() =>
                                                                setSelectedOption(
                                                                    "Publish"
                                                                )
                                                            }
                                                            className={`dropdown-item ${
                                                                selectedOption ===
                                                                "Publish"
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            href="#"
                                                        >
                                                            Publish
                                                        </a>
                                                        <a
                                                            onClick={() =>
                                                                setSelectedOption(
                                                                    "UnPublish"
                                                                )
                                                            }
                                                            className={`dropdown-item ${
                                                                selectedOption ===
                                                                "UnPublish"
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            href="#"
                                                        >
                                                            UnPublish
                                                        </a>
                                                        <a
                                                            onClick={() =>
                                                                setSelectedOption(
                                                                    "Delete"
                                                                )
                                                            }
                                                            className={`dropdown-item ${
                                                                selectedOption ===
                                                                "Delete"
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            href="#"
                                                        >
                                                            Delete
                                                        </a>
                                                    </DropDownButton>
                                                </div>
                                                <button
                                                    disabled={!markItems.length}
                                                    onClick={() =>
                                                        handleBulkAction()
                                                    }
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                            <div className="position-relative">
                                                <DropDownButton
                                                    selectedOption={
                                                        selectedStatus
                                                    }
                                                >
                                                    <a
                                                        onClick={() =>
                                                            setSelectedStatus(
                                                                "All Status"
                                                            )
                                                        }
                                                        className={`dropdown-item ${
                                                            selectedStatus ===
                                                            "All Status"
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        href="#"
                                                    >
                                                        All Status
                                                    </a>
                                                    <a
                                                        onClick={() =>
                                                            setSelectedStatus(
                                                                "Published"
                                                            )
                                                        }
                                                        className={`dropdown-item ${
                                                            selectedStatus ===
                                                            "Published"
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        href="#"
                                                    >
                                                        Published
                                                    </a>
                                                    <a
                                                        onClick={() =>
                                                            setSelectedStatus(
                                                                "UnPublished"
                                                            )
                                                        }
                                                        className={`dropdown-item ${
                                                            selectedStatus ===
                                                            "UnPublished"
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        href="#"
                                                    >
                                                        UnPublished
                                                    </a>
                                                </DropDownButton>
                                            </div>
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton
                                                        selectedOption={
                                                            selectedCategory
                                                        }
                                                    >
                                                        <a
                                                            onClick={() =>
                                                                setSelectedCategory(
                                                                    "All Categories"
                                                                )
                                                            }
                                                            className={`dropdown-item ${
                                                                selectedCategory ===
                                                                "All Categories"
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            href="#"
                                                        >
                                                            All Category
                                                        </a>
                                                        {categories.map(
                                                            (category) => (
                                                                <a
                                                                    onClick={() =>
                                                                        setSelectedCategory(
                                                                            category.title
                                                                        )
                                                                    }
                                                                    className={`dropdown-item ${
                                                                        selectedCategory ===
                                                                        category.title
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                    href="#"
                                                                >
                                                                    {
                                                                        category.title
                                                                    }
                                                                </a>
                                                            )
                                                        )}
                                                    </DropDownButton>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        getResults(searchQuery)
                                                    }
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Filter
                                                </button>
                                            </div>
                                        </div>
                                        <div className="dataTables_heading_right">
                                            <div
                                                id="yooDataTable_filter"
                                                className="dataTables_filter"
                                            >
                                                <label>
                                                    <input
                                                        type="search"
                                                        className=""
                                                        placeholder="Search..."
                                                        value={searchQuery}
                                                        onChange={(e) => {
                                                            setSearchQuery(
                                                                e.target.value
                                                            );
                                                            getResults(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </label>
                                                <button className="dataTables_filter_btn">
                                                    <IonIcon icon={search} />
                                                </button>
                                            </div>
                                            {hasPermission("posts.create") && (
                                                <Link
                                                    href={route(
                                                        "admin.posts.create"
                                                    )}
                                                    className="btn btn-success btn-sm yoo-table-btn1"
                                                >
                                                    <span className="yoo-add">
                                                        +
                                                    </span>{" "}
                                                    Create New
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        id="yooDataTable_wrapper"
                                        className="dataTables_wrapper no-footer"
                                    >
                                        <table
                                            id="yooDataTable"
                                            className="display dataTable no-footer"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr role="row">
                                                    <th
                                                        onClick={() =>
                                                            markAll()
                                                        }
                                                        style={{ width: "1%" }}
                                                    >
                                                        <div
                                                            className={`yoo-check-mark-all ${
                                                                isMarkAll &&
                                                                "active"
                                                            }`}
                                                        >
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </th>
                                                    <ThSortable
                                                        width="40%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="title"
                                                    >
                                                        Title
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="10%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="published_by"
                                                    >
                                                        Published By
                                                    </ThSortable>

                                                    <ThSortable
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="category"
                                                    >
                                                        Categories
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="1%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="comment_count"
                                                    >
                                                        Comments
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="created_at"
                                                    >
                                                        Date
                                                    </ThSortable>
                                                    {hasPermission(
                                                        "posts.edit"
                                                    ) && (
                                                        <ThSortable
                                                            width="9%"
                                                            sort={sort}
                                                            onSorted={() =>
                                                                getResults(
                                                                    searchQuery
                                                                )
                                                            }
                                                            column="status"
                                                        >
                                                            Status
                                                        </ThSortable>
                                                    )}
                                                    <th
                                                        style={{ width: "1%" }}
                                                        className="sorting"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {posts.data.map(
                                                    (post, index) => (
                                                        <tr
                                                            className="odd"
                                                            key={index}
                                                        >
                                                            <td
                                                                className="sorting_1"
                                                                onClick={() =>
                                                                    handleMark(
                                                                        post.id
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={`yoo-check-mark ${
                                                                        markItems.some(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item ===
                                                                                post.id
                                                                        ) &&
                                                                        "active"
                                                                    }`}
                                                                />
                                                            </td>
                                                            <td>
                                                                {post.title}
                                                            </td>
                                                            <td>
                                                                <div className="yoo-table-medias yoo-style1">
                                                                    <a href="">
                                                                        {
                                                                            post.user_name
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="yoo-base-color1">
                                                                    {
                                                                        post.category_name
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="yoo-line-1-2 yoo-base-color1">
                                                                    {
                                                                        post.comment_count
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    post.created_at
                                                                ).format("ll")}
                                                            </td>
                                                            {hasPermission(
                                                                "posts.edit"
                                                            ) && (
                                                                <td>
                                                                    <div
                                                                        className={`yoo-switch ${
                                                                            post.status ===
                                                                            "1"
                                                                                ? "active"
                                                                                : ""
                                                                        }`}
                                                                        onClick={() =>
                                                                            handlePostStatusToggle(
                                                                                post.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <div className="yoo-switch-in" />
                                                                    </div>
                                                                </td>
                                                            )}
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "5px",
                                                                    }}
                                                                >
                                                                    {hasPermission(
                                                                        "posts.edit"
                                                                    ) && (
                                                                        <Link
                                                                            href={route(
                                                                                "admin.posts.edit",
                                                                                post
                                                                            )}
                                                                            className="badge badge-primary"
                                                                        >
                                                                            <IonIcon
                                                                                icon={
                                                                                    createOutline
                                                                                }
                                                                                style={{
                                                                                    height: "16px",
                                                                                    width: "16px",
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    )}
                                                                    {hasPermission(
                                                                        "posts.show"
                                                                    ) && (
                                                                        <a
                                                                            href={route('blog.show', post.slug)}
                                                                            target="_blank"
                                                                            className="badge badge-secondary"
                                                                        >
                                                                            <IonIcon
                                                                                icon={
                                                                                    eyeOutline
                                                                                }
                                                                                style={{
                                                                                    height: "16px",
                                                                                    width: "16px",
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    )}
                                                                    {hasPermission(
                                                                        "posts.delete"
                                                                    ) && (
                                                                        <DeleteButton
                                                                            href={route(
                                                                                "admin.posts.destroy",
                                                                                post
                                                                            )}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        {!posts.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px",
                                                }}
                                            >
                                                <p>No Posts found!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {posts.total > 1 && (
                        <div
                            className="pagination-wrapper"
                            style={{ marginTop: "10px" }}
                        >
                            <ul className="pagination">
                                {posts.links.map((link, index) => (
                                    <li
                                        className={`page-item ${
                                            link.active ? "active" : ""
                                        }`}
                                        key={`pagination_${index}`}
                                    >
                                        <Link
                                            href={link.url}
                                            className="page-link"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="yoo-height-b30 yoo-height-lg-b30" />
                </div>
            </AdminLayouts>
        </>
    );
}
