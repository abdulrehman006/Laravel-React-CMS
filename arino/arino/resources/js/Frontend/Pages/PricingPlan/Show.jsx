import FrontendLayout from "@/Frontend/Layouts/FrontendLayout";
import PageHeading from "@/Frontend/Components/PageHeading";
import React from "react";
import PricingTable from "@/Frontend/Components/PricingTable";
import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import { Icon } from "@iconify/react";
import { Head, useForm } from "@inertiajs/react";
import { produce } from "immer";

export default function Show({ pricing_plan, flash, payment_gateway }) {
    const { data, setData, errors, post } = useForm({
        name: "",
        email: "",
        mobile: "",
        whatsapp_skype: "",
        payment_method: "",
        note: "",
    });

    // handle pay
    const handlePay = () => {
        post(route("pricing.pay", pricing_plan));
    };

    return (
        <FrontendLayout>
            <Head title="Pricing Plan" />
            <PageHeading
                data={{
                    title: pricing_plan.name,
                    breadcrumb: [
                        { label: "Home", url: "/" },
                        { label: "Pricing Plans", url: route('pricing.plan.index') },
                    ],
                }}
                bgSrc="/static/blog_hero_bg.jpeg"
            />
            <Spacing lg="150" md="80" />
            <div className="container">
                <div className="row cs_gap_40_y">
                    <div className="col-xl-4 col-lg-5">
                        <PricingTable
                            title={pricing_plan.name}
                            price={pricing_plan.price}
                            currency={pricing_plan.currency.symbol}
                            timeline={pricing_plan.plan}
                            features={pricing_plan.plan_details}
                            btnText={false}
                            btnLink=""
                            tab={pricing_plan.plan}
                        />
                    </div>
                    <div className="col-lg-7 offset-xl-1">
                        {!flash.payment_status ? (
                            <div className="row">
                                <div className="col-lg-6">
                                    <label className="cs-primary_color">
                                        Your Name*
                                    </label>
                                    <input
                                        type="text"
                                        className="cs-form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.name = e.target.value;
                                                })
                                            )
                                        }
                                    />
                                    {errors.name && (
                                        <span className="text-danger">
                                            {errors.name}
                                        </span>
                                    )}
                                    <Spacing lg="20" md="20" />
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs-primary_color">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        className="cs-form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.email =
                                                        e.target.value;
                                                })
                                            )
                                        }
                                    />
                                    {errors.email && (
                                        <span className="text-danger">
                                            {errors.email}
                                        </span>
                                    )}
                                    <Spacing lg="20" md="20" />
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs-primary_color">
                                        Mobile*
                                    </label>
                                    <input
                                        type="text"
                                        className="cs-form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.mobile =
                                                        e.target.value;
                                                })
                                            )
                                        }
                                    />
                                    {errors.mobile && (
                                        <span className="text-danger">
                                            {errors.mobile}
                                        </span>
                                    )}
                                    <Spacing lg="20" md="20" />
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs-primary_color">
                                        Whatsapp/Skype
                                    </label>
                                    <input
                                        type="text"
                                        className="cs-form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.whatsapp_skype =
                                                        e.target.value;
                                                })
                                            )
                                        }
                                    />
                                    {errors.whatsapp_skype && (
                                        <span className="text-danger">
                                            {errors.whatsapp_skype}
                                        </span>
                                    )}
                                    <Spacing lg="20" md="20" />
                                </div>
                                <div className="col-lg-12">
                                    <label className="cs-primary_color">
                                        Note
                                    </label>
                                    <textarea
                                        id=""
                                        cols="20"
                                        className="cs-form_field"
                                        rows="5"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.note = e.target.value;
                                                })
                                            )
                                        }
                                    ></textarea>
                                    {errors.note && (
                                        <span className="text-danger">
                                            {errors.note}
                                        </span>
                                    )}
                                    <Spacing lg="20" md="20" />
                                </div>
                                <div className="col-lg-12">
                                    <label className="cs-primary_color">
                                        Select Payment Method*
                                    </label>
                                    {errors.payment_method && (
                                        <span className="text-danger">
                                            <br />
                                            {errors.payment_method}
                                        </span>
                                    )}
                                    {payment_gateway.is_paypal_active && (
                                        <div>
                                            <div className="cs-checkbox">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="paypal"
                                                    value="paypal"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method =
                                                                    e.target.value;
                                                            })
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="paypal"
                                                >
                                                    Paypal
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    {payment_gateway.is_stripe_active && (
                                        <div>
                                            <div className="cs-checkbox">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="Stripe"
                                                    value="stripe"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method =
                                                                    e.target.value;
                                                            })
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="Stripe"
                                                >
                                                    Stripe
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    {payment_gateway.is_sslcz_active && (
                                        <div>
                                            <div className="cs-checkbox">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="sslcmz"
                                                    value="sslcmz"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method =
                                                                    e.target.value;
                                                            })
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="sslcmz"
                                                >
                                                    Sslcommerz
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    {payment_gateway.is_flutterwave_active && (
                                        <div>
                                            <div className="cs-checkbox">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="flutterwave"
                                                    value="flutterwave"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method =
                                                                    e.target.value;
                                                            })
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flutterwave"
                                                >
                                                    Flutterwave
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    {payment_gateway.is_razorpay_active && (
                                        <div>
                                            <div className="cs-checkbox">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="razorpay"
                                                    value="razorpay"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method =
                                                                    e.target.value;
                                                            })
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="razorpay"
                                                >
                                                    Razorpay
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <Spacing lg="20" md="20" />
                                </div>
                                <Div className="col-sm-12">
                                    <button
                                        onClick={handlePay}
                                        className="cs-btn cs-style1"
                                    >
                                        <span>Pay Now</span>
                                        <Icon icon="bi:arrow-right" />
                                    </button>
                                </Div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: "25px",
                                }}
                            >
                                {flash.payment_status === "success" && (
                                    <>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "green",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-check"
                                                width={40}
                                                height={40}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M5 12l5 5l10 -10" />
                                            </svg>
                                        </div>
                                        <h3>Payment has been success</h3>
                                    </>
                                )}

                                {flash.payment_status === "failed" && (
                                    <>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "red",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-x"
                                                width={40}
                                                height={40}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M18 6l-12 12" />
                                                <path d="M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <h3>Payment has been failed!</h3>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="cs-height_150 cs-height_lg_80"></div>
                <hr />
            </div>
        </FrontendLayout>
    );
}
