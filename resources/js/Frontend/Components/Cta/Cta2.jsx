import React, { useState, useEffect } from "react";
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

    // Perform the verification request for the given values
    const runVerification = async ({ regNo, chassisNo, VIR }) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.get("/proxy/vehicle-verification", {
                params: { regNo, chassisNo, VIR },
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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        runVerification(formData);
    };

    // On mount, read query params from the URL, prefill the form and auto-verify.
    // Accepts common aliases, e.g. /report-verification?chassisnumber=NZE1402118579
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Build a case-insensitive lookup of the URL params
        const lower = {};
        params.forEach((value, key) => {
            lower[key.toLowerCase()] = value;
        });

        const aliases = {
            chassisNo: ["chassisnumber", "chassisno", "chassis"],
            regNo: ["registrationnumber", "regno", "reg"],
            VIR: ["vir"],
        };

        const next = { regNo: "", chassisNo: "", VIR: "" };
        let found = false;
        for (const [field, keys] of Object.entries(aliases)) {
            const hit = keys.find((k) => lower[k] != null);
            if (hit) {
                next[field] = lower[hit].trim();
                found = true;
            }
        }

        if (found) {
            setFormData(next);
            runVerification(next);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                        {result.map((item, index) => (
                                            <Div key={index} className="mb-4">
                                                {/* Inspection Result Banner */}
                                                <Div className="mb-3 text-center" style={{
                                                    padding: "12px",
                                                    borderRadius: "6px",
                                                    backgroundColor: item.inspectionResult?.toUpperCase() === "PASS" ? "#d4edda" : "#f8d7da",
                                                    border: `1px solid ${item.inspectionResult?.toUpperCase() === "PASS" ? "#c3e6cb" : "#f5c6cb"}`
                                                }}>
                                                    <strong style={{
                                                        fontSize: "18px",
                                                        color: item.inspectionResult?.toUpperCase() === "PASS" ? "#155724" : "#721c24"
                                                    }}>
                                                        Inspection Result: {item.inspectionResult}
                                                    </strong>
                                                </Div>

                                                {/* Vehicle Details Table */}
                                                <table className="table table-bordered" style={{ fontSize: "14px", backgroundColor: "#fff" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px", width: "40%" }}>Owner Name</td>
                                                            <td style={{ padding: "10px" }}>{item.ownerName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px" }}>Vehicle No</td>
                                                            <td style={{ padding: "10px", fontWeight: "700" }}>{item.vehicleNo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px" }}>Vehicle Make</td>
                                                            <td style={{ padding: "10px" }}>{item.vehicleMake}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px" }}>Chassis Number</td>
                                                            <td style={{ padding: "10px" }}>{item.chassisNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px" }}>Engine Number</td>
                                                            <td style={{ padding: "10px" }}>{item.engineNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px" }}>Certificate Number</td>
                                                            <td style={{ padding: "10px" }}>{item.certificateNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", padding: "10px" }}>Inspection Date</td>
                                                            <td style={{ padding: "10px" }}>{item.inspectionDate ? new Date(item.inspectionDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>
                                                        </tr>
                                                        <tr style={{ backgroundColor: "#d4edda" }}>
                                                            <td style={{ fontWeight: "700", padding: "10px", fontSize: "15px" }}>Expiry Date</td>
                                                            <td style={{ fontWeight: "700", padding: "10px", fontSize: "15px", color: "#155724" }}>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Div>
                                        ))}
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
