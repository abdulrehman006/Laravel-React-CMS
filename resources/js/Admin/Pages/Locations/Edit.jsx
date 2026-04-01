import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import FormButton from "@/Admin/Components/Button/FormButton";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import FromValidationError from "@/Admin/Components/Validation/FromValidationError";

export default function Edit() {
    const { location } = usePage().props;

    const { data, setData, post, errors, processing } = useForm({
        _method: 'put',
        name: location.name || "",
        address: location.address || "",
        city: location.city || "",
        state: location.state || "",
        country: location.country || "",
        postal_code: location.postal_code || "",
        phone: location.phone || "",
        email: location.email || "",
        url: location.url || "",
        latitude: location.latitude || "",
        longitude: location.longitude || "",
        image: "",
        description: location.description || "",
        is_active: location.is_active ?? true,
        sort_order: location.sort_order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.locations.update", location), {
            forceFormData: true,
        });
    };

    const handleFileUpload = (file) => {
        setData("image", file);
    };

    return (
        <AdminLayouts>
            <Head title={`Edit Location - ${location.name}`} />
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Edit Location</h4>
                                <Link
                                    href={route("admin.locations.index")}
                                    className="btn btn-sm btn-secondary"
                                >
                                    Back to List
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Location Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData("name", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.name} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Address <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.address}
                                                        onChange={(e) =>
                                                            setData("address", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.address} />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">City</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.city}
                                                        onChange={(e) =>
                                                            setData("city", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.city} />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">State/Province</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.state}
                                                        onChange={(e) =>
                                                            setData("state", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.state} />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Country</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.country}
                                                        onChange={(e) =>
                                                            setData("country", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.country} />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Postal Code</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.postal_code}
                                                        onChange={(e) =>
                                                            setData("postal_code", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.postal_code} />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Phone</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.phone}
                                                        onChange={(e) =>
                                                            setData("phone", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.phone} />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData("email", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.email} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Custom URL</label>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={data.url}
                                                        onChange={(e) =>
                                                            setData("url", e.target.value)
                                                        }
                                                        placeholder="https://example.com"
                                                    />
                                                    <small className="text-muted">
                                                        Optional custom URL for this location
                                                    </small>
                                                    <FromValidationError error={errors.url} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Latitude</label>
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        className="form-control"
                                                        value={data.latitude}
                                                        onChange={(e) =>
                                                            setData("latitude", e.target.value)
                                                        }
                                                    />
                                                    <small className="text-muted">
                                                        For Google Maps integration
                                                    </small>
                                                    <FromValidationError error={errors.latitude} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Longitude</label>
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        className="form-control"
                                                        value={data.longitude}
                                                        onChange={(e) =>
                                                            setData("longitude", e.target.value)
                                                        }
                                                    />
                                                    <small className="text-muted">
                                                        For Google Maps integration
                                                    </small>
                                                    <FromValidationError error={errors.longitude} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="4"
                                                        value={data.description}
                                                        onChange={(e) =>
                                                            setData("description", e.target.value)
                                                        }
                                                    />
                                                    <FromValidationError error={errors.description} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Location Image</label>
                                                    <FileUpload
                                                        select={handleFileUpload}
                                                        value={data.image}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Sort Order</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={data.sort_order}
                                                        onChange={(e) =>
                                                            setData("sort_order", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={data.is_active}
                                                            onChange={(e) =>
                                                                setData("is_active", e.target.checked)
                                                            }
                                                        />
                                                        <label className="form-check-label">
                                                            {data.is_active ? "Active" : "Inactive"}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <FormButton processing={processing} label="Update Location" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayouts>
    );
}
