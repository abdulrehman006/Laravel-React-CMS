import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Admin/Components/Inputs/TextInput";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";

export default function Create() {
    const { data, setData, errors, post, processing } = useForm({
        client_image: null,
        client_name: "",
        client_designation: "",
        rating: "",
        description: "",
    });
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.testimonials.store"));
    };

    return (
        <AdminLayouts>
            <Head title="Create testimonial" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Create testimonial</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    Testimonial details
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="">Client image</label>
                                        <FileUpload
                                            select={(file) =>
                                                setData("client_image", file)
                                            }
                                        />
                                        {errors?.client_image && (
                                            <span className="text-danger">
                                                {errors.client_image}
                                            </span>
                                        )}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Client name *"
                                                    type="text"
                                                    id="name"
                                                    error={errors?.client_name}
                                                    value={data.client_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "client_name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Client designation *"
                                                    type="text"
                                                    id="designation"
                                                    error={
                                                        errors?.client_designation
                                                    }
                                                    value={
                                                        data.client_designation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "client_designation",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Rating *"
                                                    type="number"
                                                    id="rating"
                                                    error={errors?.rating}
                                                    value={data.rating}
                                                    onChange={(e) =>
                                                        setData(
                                                            "rating",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Review Description
                                        </label>
                                        <textarea
                                            name=""
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-success"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    );
}
