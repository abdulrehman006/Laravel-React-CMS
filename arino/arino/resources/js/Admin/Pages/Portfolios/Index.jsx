import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, Link } from "@inertiajs/react";
import { idCardOutline, newspaperOutline, search } from "ionicons/icons";
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

export default function Index({ portfolios, sort, categories, filter }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("Bulk Action");
    const [isMarkAll, setIsMarkAll] = useState(false);
    const [markItems, setMarkItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(filter.status);
    const [selectedCategory, setSelectedCategory] = useState(filter.category);

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.portfolios.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: { category: selectedCategory },
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
            const items = portfolios.data.map((portfolio) => portfolio.id);
            setMarkItems(items);
            setIsMarkAll(true);
        }
    };

    // handle mark unmark
    const handleMark = (portfolioId) => {
        const existsMark = markItems.some((item) => item === portfolioId);
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== portfolioId);
            setMarkItems(removeItem);
        } else {
            const addedItem = [...markItems, portfolioId];
            setMarkItems(addedItem);
        }
    };

    // handle bulk action
    const handleBulkAction = () => {
        setIsMarkAll([]);
        showAlert(
            "Are you sure?",
            "You want to delete selected portfolios?",
            "Delete!",
            () => {
                router.delete(
                    route("admin.portfolios.bulk.delete", {
                        ids: markItems.join(","),
                    })
                );
            }
        );
    };

    return (
        <>
            <Head title="All portfolios" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">All portfolios</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={idCardOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    </span>
                                    portfolios
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
                                            {hasPermission(
                                                "portfolios.create"
                                            ) && (
                                                <Link
                                                    href={route(
                                                        "admin.portfolios.create"
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
                                                        column="sub_title"
                                                    >
                                                        Sub Title
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
                                                    <th
                                                        style={{ width: "1%" }}
                                                        className="sorting"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {portfolios.data.map(
                                                    (portfolio, index) => (
                                                        <tr
                                                            className="odd"
                                                            key={index}
                                                        >
                                                            <td
                                                                className="sorting_1"
                                                                onClick={() =>
                                                                    handleMark(
                                                                        portfolio.id
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
                                                                                portfolio.id
                                                                        ) &&
                                                                        "active"
                                                                    }`}
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    portfolio.title
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    portfolio.sub_title
                                                                }
                                                            </td>
                                                            <td>
                                                                <span className="yoo-base-color1">
                                                                    {
                                                                        portfolio
                                                                            .category
                                                                            .title
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    portfolio.created_at
                                                                ).format("ll")}
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "5px",
                                                                    }}
                                                                >
                                                                    {hasPermission(
                                                                        "portfolios.edit"
                                                                    ) && (
                                                                        <Link
                                                                            href={route(
                                                                                "admin.portfolios.edit",
                                                                                portfolio
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
                                                                        "portfolios.show"
                                                                    ) && (
                                                                        <a
                                                                            href={route(
                                                                                "portfolio.show",
                                                                                portfolio.slug
                                                                            )}
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
                                                                        "portfolios.delete"
                                                                    ) && (
                                                                        <DeleteButton
                                                                            href={route(
                                                                                "admin.portfolios.destroy",
                                                                                portfolio
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
                                        {!portfolios.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px",
                                                }}
                                            >
                                                <p>No portfolios found!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {portfolios.total > 1 && (
                        <div
                            className="pagination-wrapper"
                            style={{ marginTop: "10px" }}
                        >
                            <ul className="pagination">
                                {portfolios.links.map((link, index) => (
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
