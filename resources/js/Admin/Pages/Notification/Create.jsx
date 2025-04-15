import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import { useForm, Head } from "@inertiajs/react";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import Editor from "@/Admin/Components/Inputs/Editor";
import FromValidationError from "@/Admin/Components/Validation/FromValidationError";

export default function Create({ currencies }) {
    const { data, setData, errors, post, processing } = useForm({
        title: "",
        description: "",

    });

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault();
        post(route("admin.notifications.store"));
    };

    return (
        <AdminLayouts>
            <Head title="Create notification" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Create notification</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Notification Details
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Title *"
                                        type="text"
                                        id="title"
                                        error={errors?.title}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />

                                    <div className="form-group">
                                        <label htmlFor="">Description *</label>
                                        <Editor
                                            onChange={(data) =>
                                                setData("description", data)
                                            }
                                        />
                                        <FromValidationError
                                            message={errors?.description}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    );
}
