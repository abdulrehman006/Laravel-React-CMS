import React, { useState } from "react";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import Spacing from "@/Frontend/Components/Spacing";
import Button from "@/Frontend/Components/Button";
import Div from "@/Frontend/Components/Div";

export default function Cta2({ title, btnText, btnLink, bgSrc, bgColor, bgType, variant }) {
    // State management for the form and API
    const [formData, setFormData] = useState({
        regNo: "",
        chassisNo: "",
        VIR: "",
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.get("/proxy/vehicle-verification", {
                params: {
                    regNo: formData.regNo,
                    chassisNo: formData.chassisNo,
                    VIR: formData.VIR,
                },
            });
            // Check if response contains valid data
            if (Array.isArray(response.data) && response.data.length > 0) {
                setResult(response.data); // Expecting an array of objects
            } else {
                setResult([]); // If no data is found, set an empty array
            }
        } catch (err) {
            if (err.response) {
                const { status, data } = err.response;
    
                // Handle known error cases with specific messages
                if (status === 400) {
                    setError(data.message || "Please enter Vehicle Reg. No, Chassis No, or VIR.");
                } else if (status === 404) {
                    setError(data.message || "Data is not found.");
                } else {
                    setError(`Error: ${status} - ${err.response.statusText || "Unknown error"}`);
                }
            } else if (err.request) {
                // Handle network or server unavailability errors
                setError("Network Error: Unable to reach the server.");
            } else {
                // Handle unexpected errors
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false); // End loading state
        }
    };

    // Reset form data
    const handleReset = () => {
        setFormData({
            regNo: "",
            chassisNo: "",
            VIR: "",
        });
        setResult(null);
        setError(null);
    };

    const backgroundStyle = bgType === 'color' && bgColor
        ? { backgroundColor: bgColor, padding: '40px 15px' }
        : { padding: '40px 15px' };

    return (
        <Div className="container" style={backgroundStyle}>
            <Div className="text-center mb-4">
                <h2
                    className="cs-cta_title cs-semi_bold cs-m0"
                    dangerouslySetInnerHTML={{ __html: title }}
                ></h2>
            </Div>

            <Spacing lg="50" md="30" />

            <Div className="row justify-content-center">
                {/* Vehicle Verification Widget */}
                <Div className="col-lg-8 col-md-10 mb-4">
                    <Div className="card shadow-sm" style={{ border: "1px solid #e0e0e0" }}>
                        <Div className="card-body p-4">
                            {/* Vehicle Verification Form */}
                            <form onSubmit={handleSubmit}>
                                <Div className="mb-3">
                                    <label htmlFor="regNo" style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>
                                        Registration Number:
                                    </label>
                                    <input
                                        type="text"
                                        id="regNo"
                                        name="regNo"
                                        className="form-control"
                                        placeholder="e.g., LET-15-8676"
                                        value={formData.regNo}
                                        onChange={handleChange}
                                        style={{
                                            padding: "12px",
                                            borderRadius: "5px",
                                            border: "1px solid #e0e0e0"
                                        }}
                                    />
                                </Div>

                                <Div className="mb-3">
                                    <label htmlFor="chassisNo" style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>
                                        Chassis Number:
                                    </label>
                                    <input
                                        type="text"
                                        id="chassisNo"
                                        name="chassisNo"
                                        className="form-control"
                                        placeholder="e.g., SR308PK291991"
                                        value={formData.chassisNo}
                                        onChange={handleChange}
                                        style={{
                                            padding: "12px",
                                            borderRadius: "5px",
                                            border: "1px solid #e0e0e0"
                                        }}
                                    />
                                </Div>

                                <Div className="mb-3">
                                    <label htmlFor="VIR" style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>
                                        VIR:
                                    </label>
                                    <input
                                        type="text"
                                        id="VIR"
                                        name="VIR"
                                        className="form-control"
                                        placeholder="Enter VIR"
                                        value={formData.VIR}
                                        onChange={handleChange}
                                        style={{
                                            padding: "12px",
                                            borderRadius: "5px",
                                            border: "1px solid #e0e0e0"
                                        }}
                                    />
                                </Div>

                                <Div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-fill"
                                        disabled={loading}
                                        style={{
                                            backgroundColor: "#DAA520",
                                            border: "none",
                                            padding: "12px",
                                            fontWeight: "500",
                                            fontSize: "16px"
                                        }}
                                    >
                                        {loading ? "Verifying..." : "Verify"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleReset}
                                        style={{
                                            padding: "12px 24px",
                                            fontWeight: "500",
                                            fontSize: "16px"
                                        }}
                                    >
                                        Reset
                                    </button>
                                </Div>
                            </form>

                            {/* Error Message */}
                            {error && (
                                <Div className="mt-3 p-3" style={{
                                    backgroundColor: "#fff3cd",
                                    border: "1px solid #ffc107",
                                    borderRadius: "5px"
                                }}>
                                    <IonIcon icon={closeCircle} style={{ color: "#856404", marginRight: "8px" }} />
                                    <strong style={{ color: "#856404" }}>Error: </strong>
                                    <span style={{ color: "#856404" }}>{error}</span>
                                </Div>
                            )}

                            {/* Success Result */}
                            {result && result.length > 0 && (
                                <Div className="mt-4">
                                    <Div className="d-flex align-items-center mb-3">
                                        <IonIcon icon={checkmarkCircle} style={{ color: "#28a745", fontSize: "24px", marginRight: "8px" }} />
                                        <strong style={{ color: "#28a745", fontSize: "16px" }}>Verification Results</strong>
                                    </Div>

                                    <Div style={{ overflowX: "auto" }}>
                                        <table className="table table-striped table-bordered" style={{ fontSize: "14px" }}>
                                            <thead style={{ backgroundColor: "#f8f9fa" }}>
                                                <tr>
                                                    <th style={{ fontWeight: "600" }}>Owner Name</th>
                                                    <th style={{ fontWeight: "600" }}>Inspection Result</th>
                                                    <th style={{ fontWeight: "600" }}>Vehicle No</th>
                                                    <th style={{ fontWeight: "600" }}>Vehicle Make</th>
                                                    <th style={{ fontWeight: "600" }}>Chassis Number</th>
                                                    <th style={{ fontWeight: "600" }}>Engine Number</th>
                                                    <th style={{ fontWeight: "600" }}>Certificate Number</th>
                                                    <th style={{ fontWeight: "600" }}>Inspection Date</th>
                                                    <th style={{ fontWeight: "600" }}>Expiry Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.ownerName}</td>
                                                        <td>
                                                            <span style={{
                                                                padding: "4px 8px",
                                                                borderRadius: "4px",
                                                                backgroundColor: item.inspectionResult === "Pass" ? "#d4edda" : "#f8d7da",
                                                                color: item.inspectionResult === "Pass" ? "#155724" : "#721c24",
                                                                fontWeight: "500"
                                                            }}>
                                                                {item.inspectionResult}
                                                            </span>
                                                        </td>
                                                        <td>{item.vehicleNo}</td>
                                                        <td>{item.vehicleMake}</td>
                                                        <td>{item.chassisNumber}</td>
                                                        <td>{item.engineNumber}</td>
                                                        <td>{item.certificateNumber}</td>
                                                        <td>{item.inspectionDate}</td>
                                                        <td>{item.expiryDate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Div>
                                </Div>
                            )}

                            {/* No Data Found */}
                            {result && result.length === 0 && (
                                <Div className="mt-3 p-3" style={{
                                    backgroundColor: "#e7f3ff",
                                    border: "1px solid #b3d9ff",
                                    borderRadius: "5px",
                                    textAlign: "center"
                                }}>
                                    <span style={{ color: "#004085" }}>No data found for the provided details.</span>
                                </Div>
                            )}
                        </Div>
                    </Div>
                </Div>
            </Div>

            {/* Call-to-action button */}
            {btnText && (
                <Div className="text-center">
                    <Spacing lg="30" md="15" />
                    <Button btnLink={btnLink} btnText={btnText} />
                </Div>
            )}
        </Div>
    );
}
