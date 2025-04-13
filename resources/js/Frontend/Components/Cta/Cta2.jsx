import React, { useState } from "react";
import axios from "axios";
import Spacing from "@/Frontend/Components/Spacing";
import Button from "@/Frontend/Components/Button";
import Div from "@/Frontend/Components/Div";

export default function Cta2({ title, btnText, btnLink, bgSrc, variant }) {
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

    return (
        <Div
            className={`cs-cta cs-style1 cs-bg text-center cs-shape_wrap_1 cs-position_1 ${variant ? variant : ""}`}
            style={{ backgroundImage: `url(${bgSrc})` }}
        >
            <Div className="cs-shape_1" />
            <Div className="cs-shape_1" />
            <Div className="cs-shape_1" />
            <Div className="cs-cta_in">
                <h2
                    className="cs-cta_title cs-semi_bold cs-m0"
                    dangerouslySetInnerHTML={{ __html: title }}
                ></h2>
                <Spacing lg="70" md="30" />

                {/* Vehicle Verification Form */}
                <form onSubmit={handleSubmit} className="cs-verification-form">
                    <Div className="cs-form-group">
                        <label htmlFor="regNo">Registration Number:</label>
                        <input
                            type="text"
                            id="regNo"
                            name="regNo"
                            value={formData.regNo}
                            onChange={handleChange}
                        />
                    </Div>
                    <Div className="cs-form-group">
                        <label htmlFor="chassisNo">Chassis Number:</label>
                        <input
                            type="text"
                            id="chassisNo"
                            name="chassisNo"
                            value={formData.chassisNo}
                            onChange={handleChange}
                        />
                    </Div>
                    <Div className="cs-form-group">
                        <label htmlFor="VIR">VIR:</label>
                        <input
                            type="text"
                            id="VIR"
                            name="VIR"
                            value={formData.VIR}
                            onChange={handleChange}
                        />
                    </Div>
                    <button type="submit" className="cs-submit-button">
                        Verify
                    </button>
                    {/* Reset Button */}
                    <button type="button" className="cs-reset-button" onClick={handleReset}>
                        Reset
                    </button>
                </form>
                <Spacing lg="45" md="30" />

                {/* Loading, Error, and Result */}
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                {/* Display Result Table or No Data Found Message */}
                {result && result.length > 0 ? (
                    <table className="cs-result-table">
                        <thead>
                            <tr>
                                <th>Owner Name</th>
                                <th>Inspection Result</th>
                                <th>Vehicle No</th>
                                <th>Vehicle Make</th>
                                <th>Chassis Number</th>
                                <th>Engine Number</th>
                                <th>Certificate Number</th>
                                <th>Inspection Date</th>
                                <th>Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ownerName}</td>
                                    <td>{item.inspectionResult}</td>
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
                ) : (
                    result && <p>No data found for the provided details.</p>
                )}

                {/* Call-to-action button */}
                {btnText && (
                    <>
                        <Spacing lg="30" md="15" />
                        <Button btnLink={btnLink} btnText={btnText} />
                    </>
                )}
            </Div>
        </Div>
    );
}
