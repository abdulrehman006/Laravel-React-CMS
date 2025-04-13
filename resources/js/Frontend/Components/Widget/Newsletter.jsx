import React from "react";
import Div from "../Div";
import { useForm, usePage } from "@inertiajs/react";
import { useSelector } from "react-redux";

export default function Newsletter({ title, subtitle, placeholder }) {
    const { flash } = usePage().props;
    const subscriber = useSelector((state) => state.customize.subscriber);
    const { errors, data, setData, post, processing, wasSuccessful, reset } =
        useForm({
            email: "",
        });

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("subscribe"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("email");
            },
        });
    };
    return (
        <>
            {subscriber.subscribe_title && (
                <h2 className="cs-widget_title">
                    {subscriber.subscribe_title}
                </h2>
            )}
            <Div className="cs-newsletter cs-style1">
                <form onSubmit={handleSubmit} className="cs-newsletter_form">
                    <input
                        type="email"
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                        className="cs-newsletter_input"
                        placeholder={placeholder}
                    />
                    <button disabled={processing} className="cs-newsletter_btn">
                        <span>Send</span>
                    </button>
                </form>
                {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                )}
                {wasSuccessful && (
                    <span className="text-success">{flash.success}</span>
                )}
                <Div className="cs-newsletter_text">
                    {subscriber.subscribe_description}
                </Div>
            </Div>
        </>
    );
}
