import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Admin/Components/Inputs/TextInput";
import FileUpload from "@/Admin/Components/Inputs/FileUpload";
import {useState} from "react";

export default function Edit({ team }) {
    const [imageUrl, setImageUrl] = useState('');
    const { data, setData, errors, post, processing } = useForm({
        _method: "put",
        image: team.image_url,
        team_member_name: team.name,
        team_member_designation: team.designation,
        facebook_url: team.facebook_url,
        twitter_url: team.twitter_url,
        instagram_url: team.instagram_url,
        linkedin_url: team.linkedin_url,
    });
    // handle submit
    const handleUpdate = (e) => {
        e.preventDefault();
        post(route("admin.teams.update", team));
    };

    // handle set image
    const handleSetImage = (file) => {
        setData("image", file);
        setImageUrl(URL.createObjectURL(file));
    }

    return (
        <AdminLayouts>
            <Head title="Update team" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Update Team</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    Team member details
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Team member image
                                        </label>
                                        <FileUpload
                                            select={(file) =>
                                                handleSetImage(file)
                                            }
                                            value={imageUrl === "" ? data.image : imageUrl}
                                        />
                                        {errors?.image && (
                                            <span className="text-danger">
                                                {errors.image}
                                            </span>
                                        )}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Team member name *"
                                                    type="text"
                                                    id="name"
                                                    error={
                                                        errors?.team_member_name
                                                    }
                                                    value={
                                                        data.team_member_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "team_member_name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Team member designation *"
                                                    type="text"
                                                    id="designation"
                                                    error={
                                                        errors?.team_member_designation
                                                    }
                                                    value={
                                                        data.team_member_designation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "team_member_designation",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Facebook url"
                                                    type="text"
                                                    id="facebook"
                                                    error={errors?.facebook_url}
                                                    value={data.facebook_url}
                                                    onChange={(e) =>
                                                        setData(
                                                            "facebook_url",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Twitter url"
                                                    type="text"
                                                    id="twitter"
                                                    error={errors?.twitter_url}
                                                    value={data.twitter_url}
                                                    onChange={(e) =>
                                                        setData(
                                                            "twitter_url",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Instagram url"
                                                    type="text"
                                                    id="instagram"
                                                    error={
                                                        errors?.instagram_url
                                                    }
                                                    value={data.instagram_url}
                                                    onChange={(e) =>
                                                        setData(
                                                            "instagram_url",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextInput
                                                    title="Linkedin url"
                                                    type="text"
                                                    id="linkedin"
                                                    error={errors?.linkedin_url}
                                                    value={data.linkedin_url}
                                                    onChange={(e) =>
                                                        setData(
                                                            "linkedin_url",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-success"
                                    >
                                        Update
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
