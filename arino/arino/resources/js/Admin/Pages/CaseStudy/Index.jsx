import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, Link } from "@inertiajs/react";
import { imageOutline, newspaperOutline, search } from "ionicons/icons";
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

export default function Index({ case_studies, sort, categories, filter }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("Bulk Action");
    const [isMarkAll, setIsMarkAll] = useState(false);
    const [markItems, setMarkItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(filter.status);
    const [selectedCategory, setSelectedCategory] = useState(filter.category);

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.case.study.index", {
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
            const items = case_studies.data.map((case_study) => case_study.id);
            setMarkItems(items);
            setIsMarkAll(true);
        }
    };

    // handle mark unmark
    const handleMark = (case_studyId) => {
        const existsMark = markItems.some((item) => item === case_studyId);
        if (existsMark) {
            const removeItem = markItems.filter(
                (item) => item !== case_studyId
            );
            setMarkItems(removeItem);
        } else {
            const addedItem = [...markItems, case_studyId];
            setMarkItems(addedItem);
        }
    };

    // handle bulk action
    const handleBulkAction = () => {
        setIsMarkAll([]);
        showAlert(
            "Are you sure?",
            "You want to delete selected case_studies?",
            "Delete!",
            () => {
                router.delete(
                    route("admin.case.study.bulk.delete", {
                        ids: markItems.join(","),
                    })
                );
            }
        );
    };

    return (
        <>
            <Head title="All case study" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">All case study</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={imageOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    </span>
                                    case study
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
                                                "case_study.create"
                                            ) && (
                                                <Link
                                                    href={route(
                                                        "admin.case.study.create"
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
                                                {case_studies.data.map(
                                                    (case_study, index) => (
                                                        <tr
                                                            className="odd"
                                                            key={index}
                                                        >
                                                            <td
                                                                className="sorting_1"
                                                                onClick={() =>
                                                                    handleMark(
                                                                        case_study.id
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
                                                                                case_study.id
                                                                        ) &&
                                                                        "active"
                                                                    }`}
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    case_study.title
                                                                }
                                                            </td>
                                                            <td>
                                                                <span className="yoo-base-color1">
                                                                    {
                                                                        case_study
                                                                            .category
                                                                            .title
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    case_study.created_at
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
                                                                        "case_study.edit"
                                                                    ) && (
                                                                        <Link
                                                                            href={route(
                                                                                "admin.case.study.edit",
                                                                                case_study
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
                                                                        "case_study.show"
                                                                    ) && (
                                                                        <a
                                                                            href={route(
                                                                                "case.study.show",
                                                                                case_study.slug
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
                                                                        "case_study.delete"
                                                                    ) && (
                                                                        <DeleteButton
                                                                            href={route(
                                                                                "admin.case.study.destroy",
                                                                                case_study
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
                                        {!case_studies.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px",
                                                }}
                                            >
                                                <p>No case study found!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {case_studies.total > 1 && (
                        <div
                            className="pagination-wrapper"
                            style={{ marginTop: "10px" }}
                        >
                            <ul className="pagination">
                                {case_studies.links.map((link, index) => (
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
