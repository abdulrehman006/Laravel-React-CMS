import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import Editor from "@/Admin/Components/Inputs/Editor.jsx";
import FromValidationError from "@/Admin/Components/Validation/FromValidationError.jsx";
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect.jsx";
import TagInput from "@/Admin/Components/Inputs/TagInput.jsx";
import FileUpload from "@/Admin/Components/Inputs/FileUpload.jsx";
import DangerButton from "@/Admin/Components/Button/DangerButton.jsx";
import SuccessButton from "@/Admin/Components/Button/SuccessButton.jsx";

export default function Edit({ categories, edited_post }) {
    const { data, setData, errors, post, processing } = useForm({
        _method: "put",
        category: edited_post.category_id,
        category_name: "",
        tags: edited_post.tags,
        thumbnail_image: null,
        add_new_category: false,
        title: edited_post.title,
        content: edited_post.content,
        status: edited_post.status,
        meta_title: edited_post.meta_title,
        meta_description: edited_post.meta_description,
    });

    // handle update
    const handleUpdate = (e) => {
        e.preventDefault();
        post(route("admin.posts.update", edited_post));
    };
    return (
        <AdminLayouts>
            <Head title="Edit post" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Edit Posts</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handleUpdate}>
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
                                        id="title"
                                        error={errors?.title}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    <div className="form-group">
                                        <label htmlFor="">Content *</label>
                                        <Editor
                                            value={edited_post.content}
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
                                            value={edited_post.category_id}
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
                                        value={edited_post.tags}
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
                                        value={edited_post.thumbnail_image_url}
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
                                    Update
                                </SuccessButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    );
}
