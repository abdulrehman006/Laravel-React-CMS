import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import { useForm, Head } from "@inertiajs/react";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import FromValidationError from "@/Admin/Components/Validation/FromValidationError";

export default function Create({ edited_pricingPlan, currencies }) {
    const { data, setData, errors, put, processing } = useForm({
        name: edited_pricingPlan.name,
        price: edited_pricingPlan.price,
        select_currency: edited_pricingPlan.currency_id,
        plan: edited_pricingPlan.plan,
        plan_details: edited_pricingPlan.plan_details,
    });

    // handle add new feature
    const addNewFeature = () => {
        const currentFeature = [...data.plan_details, ""];
        setData("plan_details", currentFeature);
    }

    // remove feature
    const removeFeature = (index) => {
        const deletedFeature = [...data.plan_details];
        deletedFeature.splice(index, 1);
        setData("plan_details", deletedFeature);
    }

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault();
        put(route("admin.pricing.plans.update", edited_pricingPlan));
    };

    return (
        <AdminLayouts>
            <Head title="Update Pricing Plan" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Update Pricing Plan</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Pricing Plan Details
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Name *"
                                        type="text"
                                        id="name"
                                        error={errors?.name}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    <div className="row">
                                        <div className="col-md-4">
                                            <TextInput
                                                title="Price *"
                                                type="number"
                                                id="price"
                                                error={errors?.price}
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData("price", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group form-group-md">
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        value={data.select_currency}
                                                        onChange={(e) =>
                                                            setData(
                                                                "select_currency",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">Select Currency</option>
                                                        {currencies.map((currency, index) => (
                                                            <option key={index} value={currency.id}>{currency.name}{" "}({" "}{currency.code}{" "})</option>
                                                        ))}
                                                    </select>
                                                    <FromValidationError
                                                        message={errors?.select_currency}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group form-group-md">
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        onChange={(e) =>
                                                            setData(
                                                                "plan",
                                                                e.target.value
                                                            )
                                                        }
                                                        value={data.plan}
                                                    >
                                                        <option value="">Select plan</option>
                                                        <option value="monthly">Monthly</option>
                                                        <option value="yearly">Yearly</option>
                                                    </select>
                                                    <FromValidationError
                                                        message={errors?.plan}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="form-group plan-wrap">
                                        <label>Plan details: </label>
                                        {data.plan_details.map((item, fIndex) => (
                                            <div key={fIndex} className="feature-list-wrap d-flex">
                                                <input type="text" className="form-control mb-3" onChange={(e) => {
                                                    let currentFeature = [...data.plan_details];
                                                    currentFeature[fIndex] = e.target.value;
                                                    setData("plan_details", currentFeature);
                                                }} value={item}/>
                                                <button
                                                type="button"
                                                style={{
                                                    marginTop: "10PX",
                                                    background: "transparent",
                                                    height: "40px",
                                                    border: "none",
                                                    color: "red",
                                                    fontSize: "20px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    outline: "none",
                                                    outlineColor: "initial",
                                                    outlineStyle: "none",
                                                    outlineWidth: "initial"
                                                }}
                                                onClick={() => removeFeature(fIndex)}>
                                                    <IonIcon
                                                    icon={closeOutline}
                                                    style={{
                                                        width: "28px",
                                                        height: "28px",
                                                        marginBottom: "14px"
                                                    }}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="text-start">
                                            <a href="#" className="btn btn-sm btn-outline-primary" onClick={addNewFeature}>
                                                Add new{" "}
                                                <span className="yoo-add">
                                                    +
                                                </span>
                                            </a>
                                        </div>
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Update
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
