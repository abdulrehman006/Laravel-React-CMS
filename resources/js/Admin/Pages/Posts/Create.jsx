import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect.jsx";
import TagInput from "@/Admin/Components/Inputs/TagInput";
import FileUpload from "@/Admin/Components/Inputs/FileUpload.jsx";
import { useForm, Head } from "@inertiajs/react";
import Editor from "@/Admin/Components/Inputs/Editor";
import SuccessButton from "@/Admin/Components/Button/SuccessButton";
import DangerButton from "@/Admin/Components/Button/DangerButton.jsx";
import FromValidationError from "@/Admin/Components/Validation/FromValidationError.jsx";

export default function Create({ categories }) {
    const { data, setData, errors, post, processing } = useForm({
        category: "",
        category_name: "",
        tags: [],
        thumbnail_image: null,
        add_new_category: false,
        title: "",
        content: "",
        status: "",
        meta_title: "",
        meta_description: "",
    });

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault();
        post(route("admin.posts.store"));
    };
    return (
        <AdminLayouts>
            <Head title="Create post" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Create Posts</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Post Details
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Title *"
                                        type="text"
                                        id="email"
                                        error={errors?.title}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    <div className="form-group">
                                        <label htmlFor="">Content *</label>
                                        <Editor
                                            onChange={(data) =>
                                                setData("content", data)
                                            }
                                        />
                                        <FromValidationError
                                            message={errors?.content}
                                        />
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        SEO Details
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextInput
                                                title="Meta Title"
                                                type="text"
                                                id="meta-title"
                                                error={errors?.meta_title}
                                                value={data.meta_title}
                                                onChange={(e) =>
                                                    setData(
                                                        "meta_title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput
                                                title="Meta Description"
                                                type="text"
                                                id="meta-desc"
                                                error={errors?.meta_description}
                                                value={data.meta_description}
                                                onChange={(e) =>
                                                    setData(
                                                        "meta_description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">Category</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    {data.add_new_category ? (
                                        <TextInput
                                            title="Category Name"
                                            type="text"
                                            id="category_name"
                                            error={errors?.category_name}
                                            value={data.category_name}
                                            marginBottom="0"
                                            onChange={(e) =>
                                                setData(
                                                    "category_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        <CustomSelect
                                            options={categories.data}
                                            placeholder="Select category"
                                            onSelect={(e) =>
                                                setData("category", e)
                                            }
                                        />
                                    )}
                                    <FromValidationError
                                        message={errors?.category}
                                    />
                                    <div className="yoo-height-b10 yoo-height-lg-b10" />
                                    {data.add_new_category ? (
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setData(
                                                    "add_new_category",
                                                    false
                                                )
                                            }
                                        >
                                            + Select existing category
                                        </span>
                                    ) : (
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setData(
                                                    "add_new_category",
                                                    true
                                                )
                                            }
                                        >
                                            + Add new category
                                        </span>
                                    )}
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">Tags</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TagInput
                                        title="Tags"
                                        type="text"
                                        selectTag={(tags) =>
                                            setData("tags", tags)
                                        }
                                        id="tags"
                                    />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Featured image
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <FileUpload
                                        select={(file) =>
                                            setData("thumbnail_image", file)
                                        }
                                    />
                                    <FromValidationError
                                        message={errors?.thumbnail_image}
                                    />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="publish-button-group">
                            <div>
                                <DangerButton
                                    isLoading={
                                        processing && data.status === "0"
                                    }
                                    onClick={() => setData("status", "0")}
                                >
                                    UnPublish
                                </DangerButton>
                                <SuccessButton
                                    isLoading={
                                        processing && data.status === "1"
                                    }
                                    onClick={() => setData("status", "1")}
                                >
                                    Publish
                                </SuccessButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    );
}
