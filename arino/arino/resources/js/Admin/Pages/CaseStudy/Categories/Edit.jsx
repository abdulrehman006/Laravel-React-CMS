import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect.jsx";
import { useForm, Head } from "@inertiajs/react";
import SuccessButton from "@/Admin/Components/Button/SuccessButton";

export default function Edit({ category }) {
    const { data, setData, errors, put, processing } = useForm({
        title: category.title,
    });

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault();
        put(route("admin.case.study.categories.update", category));
    };
    return (
        <AdminLayouts>
            <Head title="Edit categories" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Edit category</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Category Details
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group">
                                        <label>Title *</label>
                                        <TextInput
                                            title="Enter category title"
                                            type="text"
                                            id="email"
                                            error={errors?.title}
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                    </div>
                                    <SuccessButton
                                        isLoading={
                                            processing && data.status === "1"
                                        }
                                    >
                                        Update
                                    </SuccessButton>
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
