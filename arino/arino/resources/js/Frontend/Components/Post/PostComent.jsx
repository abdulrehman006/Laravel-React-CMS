import Spacing from "@/Frontend/Components/Spacing/index.jsx";
import Div from "@/Frontend/Components/Div/index.jsx";
import { Icon } from "@iconify/react";
import { useForm } from "@inertiajs/react";
import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useState } from "react";

export default function BlogComment({ blog, commnets }) {
    const [isReplay, setIsReplay] = useState(false);
    const [replayAuthName, setReplayAuthName] = useState("");
    const { data, setData, post, errors, processing, reset } = useForm({
        full_name: "",
        email: "",
        website: "",
        comment: "",
        post_id: blog.id,
        comment_parent: null,
    });
    // handle comment
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("blog.comment"), {
            onSuccess: () => {
                reset(
                    "full_name",
                    "email",
                    "website",
                    "comment",
                    "comment_parent"
                );
                setIsReplay(false);
            },
        });
    };
    return (
        <>
            {commnets.length ? (
                <div className="comment-wrap">
                    <div className="comment-wrap-title mb-35">
                        <h5 className="title">{blog.comment_count_string} </h5>
                    </div>
                    <div className="latest-comments mb-65">
                        <ul className="list-wrap">
                            {commnets.map((comment, index) => (
                                <li id={`comment-${comment.id}`} key={index}>
                                    <div className="comments-box">
                                        <div className="comments-avatar">
                                            <img
                                                alt=""
                                                src={gravatarUrl(
                                                    comment.comment_author_email
                                                )}
                                                className="avatar avatar-110 photo"
                                                height={110}
                                                width={110}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="comment-text">
                                            <div className="avatar-name mb-10">
                                                <h6 className="name">
                                                    <a
                                                        href={
                                                            comment.comment_author_website
                                                        }
                                                        rel="external nofollow ugc"
                                                        className="url"
                                                    >
                                                        {
                                                            comment.comment_author_name
                                                        }
                                                    </a>
                                                    <span
                                                        onClick={() => {
                                                            setIsReplay(true);
                                                            setReplayAuthName(
                                                                comment.comment_author_name
                                                            );
                                                            setData(
                                                                "comment_parent",
                                                                comment.id
                                                            );
                                                        }}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        className="comment-reply-link"
                                                    >
                                                        <svg
                                                            width={18}
                                                            height={14}
                                                            viewBox="0 0 18 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M6.54375 0.234322C6.25938 -0.0656777 5.78438 -0.0781777 5.48438 0.206197L1.05625 4.41245C0.434375 5.00307 0.434375 5.99682 1.05625 6.58745L5.48438 10.7937C5.78438 11.0781 6.25938 11.0656 6.54375 10.7656C6.82813 10.4656 6.81563 9.99057 6.51563 9.7062L2.0875 5.49995L6.51563 1.2937C6.81563 1.00932 6.82813 0.534322 6.54375 0.234322ZM11 0.999947C11 0.606197 10.7688 0.246822 10.4063 0.0874474C10.0438 -0.0719277 9.625 -0.0063026 9.33125 0.256197L4.33125 4.7562C4.12188 4.94682 4 5.21557 4 5.49995C4 5.78432 4.12188 6.05307 4.33125 6.2437L9.33125 10.7437C9.625 11.0093 10.0469 11.0749 10.4063 10.9124C10.7656 10.7499 11 10.3937 11 9.99995V7.99995H12C13.6563 7.99995 15 9.3437 15 10.9999C15 11.9499 14.6 12.4968 14.3063 12.7718C14.1344 12.9312 14 13.1468 14 13.3812C14 13.7218 14.275 13.9968 14.6156 13.9968C14.7031 13.9968 14.7906 13.9781 14.8688 13.9374C15.4531 13.6218 18 12.0406 18 8.49995C18 5.46245 15.5375 2.99995 12.5 2.99995H11V0.999947Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        Reply
                                                    </span>
                                                </h6>
                                                <span className="date">
                                                    {moment(
                                                        comment.created_at
                                                    ).format("ll")}
                                                </span>
                                            </div>
                                            <p>{comment.comment_content}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {/* #comment-## */}
                        </ul>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <h2 className="cs-font_50 cs-m0" id="response">
                {isReplay ? `Replay to ${replayAuthName}` : "Leave A Reply"}
            </h2>
            {isReplay ? (
                <small
                    onClick={() => {
                        setIsReplay(false);
                        setData("comment_parent", null);
                    }}
                >
                    <span style={{ cursor: "pointer" }}>Cancel reply</span>
                </small>
            ) : (
                <></>
            )}
            <Spacing lg="5" md="5" />
            <p className="cs-m0">
                Your email address will not be published. Required fields are
                marked *
            </p>
            <Spacing lg="40" md="30" />
            <form className="row" onSubmit={handleSubmit}>
                <Div className="col-lg-6">
                    <label>Full Name*</label>
                    <input
                        type="text"
                        className="cs-form_field"
                        value={data.full_name}
                        onChange={(e) => setData("full_name", e.target.value)}
                        required
                    />
                    {errors.full_name && (
                        <span className="text-danger">{errors.full_name}</span>
                    )}
                    <Div className="cs-height_20 cs-height_lg_20" />
                    <Div
                        data-lastpass-icon-root="true"
                        style={{
                            position: "relative !important",
                            height: "0px !important",
                            width: "0px !important",
                            float: "left !important",
                        }}
                    />
                </Div>
                <Div className="col-lg-6">
                    <label>Email*</label>
                    <input
                        type="email"
                        className="cs-form_field"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                    )}
                    <Div className="cs-height_20 cs-height_lg_20" />
                </Div>
                <Div className="col-lg-12">
                    <label>Website</label>
                    <input
                        type="text"
                        className="cs-form_field"
                        value={data.website}
                        onChange={(e) => setData("website", e.target.value)}
                    />
                    {errors.website && (
                        <span className="text-danger">{errors.website}</span>
                    )}
                    <Div className="cs-height_20 cs-height_lg_20" />
                </Div>
                <Div className="col-lg-12">
                    <label>Write Your Comment*</label>
                    <textarea
                        cols={30}
                        rows={7}
                        className="cs-form_field"
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                        required
                    />
                    {errors.comment && (
                        <span className="text-danger">{errors.comment}</span>
                    )}
                    <Div className="cs-height_25 cs-height_lg_25" />
                </Div>
                <Div className="col-lg-12">
                    <button className="cs-btn cs-style1" disabled={processing}>
                        <span>Post Comment</span>
                        <Icon icon="bi:arrow-right" />
                    </button>
                </Div>
            </form>
        </>
    );
}
