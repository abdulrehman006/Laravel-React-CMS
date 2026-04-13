import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import ThSortable from "@/Admin/Components/Table/ThSortable";
import DeleteButton from "@/Admin/Components/Button/DeleteButton";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import Swal from "sweetalert2";

export default function Index() {
    const { locations, filters } = usePage().props;
    const [search, setSearch] = useState(filters?.search || "");
    const [sort, setSort] = useState({
        column: filters?.sort_field || "sort_order",
        order: filters?.sort_direction || "asc",
    });
    const [selectedItems, setSelectedItems] = useState([]);

    // Handle search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("admin.locations.index"),
                {
                    search,
                    sort_field: sort.column,
                    sort_direction: sort.order,
                },
                { preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Handle sort
    const handleSort = (column) => {
        const newSort = {
            column,
            order: sort.column === column && sort.order === "asc" ? "desc" : "asc",
        };
        setSort(newSort);
        router.get(
            route("admin.locations.index"),
            {
                search,
                sort_field: newSort.column,
                sort_direction: newSort.order,
            },
            { preserveState: true, replace: true }
        );
    };

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(locations.data.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    // Handle select item
    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // Handle bulk delete
    const handleBulkDelete = () => {
        if (selectedItems.length === 0) {
            Swal.fire("Error", "Please select at least one location", "error");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete them!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.locations.bulk.delete"), {
                    _method: 'delete',
                    ids: selectedItems,
                    onSuccess: () => setSelectedItems([]),
                });
            }
        });
    };

    return (
        <AdminLayouts>
            <Head title="Locations" />
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Locations</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <div className="search">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <div className="actions">
                                        {selectedItems.length > 0 && (
                                            <button
                                                onClick={handleBulkDelete}
                                                className="btn btn-sm btn-danger me-2"
                                            >
                                                Delete Selected ({selectedItems.length})
                                            </button>
                                        )}
                                        <Link
                                            href={route("admin.locations.create")}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Add New Location
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th width="5%">
                                                        <input
                                                            type="checkbox"
                                                            onChange={handleSelectAll}
                                                            checked={
                                                                locations.data.length > 0 &&
                                                                selectedItems.length ===
                                                                locations.data.length
                                                            }
                                                        />
                                                    </th>
                                                    <ThSortable
                                                        label="Name"
                                                        column="name"
                                                        sort={sort}
                                                        handleSort={handleSort}
                                                    />
                                                    <th>City</th>
                                                    <th>Country</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th width="10%">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {locations.data.length > 0 ? (
                                                    locations.data.map((location) => (
                                                        <tr key={location.id}>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedItems.includes(
                                                                        location.id
                                                                    )}
                                                                    onChange={() =>
                                                                        handleSelectItem(
                                                                            location.id
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                            <td>{location.name}</td>
                                                            <td>{location.city || "—"}</td>
                                                            <td>{location.country || "—"}</td>
                                                            <td>{location.phone || "—"}</td>
                                                            <td>
                                                                <span
                                                                    className={`badge ${
                                                                        location.is_active
                                                                            ? "bg-success"
                                                                            : "bg-danger"
                                                                    }`}
                                                                >
                                                                    {location.is_active
                                                                        ? "Active"
                                                                        : "Inactive"}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    href={route(
                                                                        "admin.locations.edit",
                                                                        location
                                                                    )}
                                                                    className="badge badge-primary me-1"
                                                                >
                                                                    <IonIcon
                                                                        icon={createOutline}
                                                                        style={{
                                                                            height: "16px",
                                                                            width: "16px",
                                                                        }}
                                                                    />
                                                                </Link>
                                                                <DeleteButton
                                                                    href={route(
                                                                        "admin.locations.destroy",
                                                                        location
                                                                    )}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">
                                                            No locations found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {locations.links && locations.links.length > 3 && (
                                        <div className="d-flex justify-content-center mt-3">
                                            {locations.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || "#"}
                                                    className={`btn btn-sm mx-1 ${
                                                        link.active
                                                            ? "btn-primary"
                                                            : "btn-outline-primary"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayouts>
    );
}
