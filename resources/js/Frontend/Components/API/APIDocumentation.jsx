import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function APIDocumentation({ data }) {
    const [searchType, setSearchType] = useState("regNo");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            setError("Please enter a value to search");
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            // Get CSRF token from meta tag
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            // Use Laravel proxy endpoint instead of calling external API directly
            const res = await fetch('/api/fee-calculator', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken })
                },
                body: JSON.stringify({
                    searchType: searchType,
                    searchValue: searchValue.trim()
                }),
                credentials: 'same-origin' // Include cookies for session
            });

            const jsonData = await res.json();

            if (!res.ok) {
                // Extract error message from response
                const errorMsg = jsonData.message || jsonData.error || 'Failed to fetch fee data';
                setError(errorMsg);
                setLoading(false);
                console.error('API Response Error:', jsonData);
                return;
            }

            // Check if response is empty
            if (!jsonData || (Array.isArray(jsonData) && jsonData.length === 0)) {
                setError('No fee data found for the provided information.');
                setLoading(false);
                return;
            }

            setResponse(jsonData);
        } catch (err) {
            console.error('API Error:', err);
            setError(`Network error: ${err.message}. Please check your connection and try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Div className="container" style={{ backgroundColor: data.background_color || 'transparent', padding: data.background_color ? '40px 15px' : '0' }}>
            <Div className="text-center">
                <SectionHeading
                    title={data.title || "Fee Calculator"}
                    subtitle={data.sub_title || "Vehicle Inspection Fee"}
                    variant="cs-style1"
                />
                {data.description && (
                    <>
                        <Div className="cs-height_20 cs-height_lg_20" />
                        <p className="mb-4">{data.description}</p>
                    </>
                )}
            </Div>

            <Div className="cs-height_50 cs-height_lg_30" />

            <Div className="row justify-content-center">
                {/* Fee Calculator Widget */}
                <Div className="col-lg-8 col-md-10 mb-4">
                    <Div className="card shadow-sm" style={{ border: "1px solid #e0e0e0" }}>
                        <Div className="card-body p-4">
                            {/* Search Type Selection */}
                            <Div className="mb-3">
                                <label style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>
                                    Search By:
                                </label>
                                <Div className="btn-group w-100" role="group">
                                    <button
                                        type="button"
                                        className={`btn ${searchType === "regNo" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setSearchType("regNo")}
                                        style={{
                                            backgroundColor: searchType === "regNo" ? "#DAA520" : "transparent",
                                            borderColor: "#DAA520",
                                            color: searchType === "regNo" ? "#fff" : "#DAA520"
                                        }}
                                    >
                                        Registration Number
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${searchType === "chassisNo" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setSearchType("chassisNo")}
                                        style={{
                                            backgroundColor: searchType === "chassisNo" ? "#DAA520" : "transparent",
                                            borderColor: "#DAA520",
                                            color: searchType === "chassisNo" ? "#fff" : "#DAA520"
                                        }}
                                    >
                                        Chassis Number
                                    </button>
                                </Div>
                            </Div>

                            {/* Search Input */}
                            <Div className="mb-3">
                                <label style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>
                                    {searchType === "regNo" ? "Registration Number:" : "Chassis Number:"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={searchType === "regNo" ? "e.g., LET-15-8676" : "e.g., SR308PK291991"}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    style={{
                                        padding: "12px",
                                        borderRadius: "5px",
                                        border: "1px solid #e0e0e0"
                                    }}
                                />
                            </Div>

                            {/* Search Button */}
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleSearch}
                                disabled={loading}
                                style={{
                                    backgroundColor: "#DAA520",
                                    border: "none",
                                    padding: "12px",
                                    fontWeight: "500",
                                    fontSize: "16px"
                                }}
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>

                            {/* Response Display */}
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

                            {response && (
                                <Div className="mt-4">
                                    <Div className="d-flex align-items-center mb-3">
                                        <IonIcon icon={checkmarkCircle} style={{ color: "#28a745", fontSize: "24px", marginRight: "8px" }} />
                                        <strong style={{ color: "#28a745", fontSize: "16px" }}>Fee Details</strong>
                                    </Div>

                                    <Div style={{ overflowX: "auto" }}>
                                        {Array.isArray(response) && response.length > 0 ? (
                                            // Display first item from array
                                            <table className="table table-striped table-bordered" style={{ fontSize: "14px" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa", width: "40%" }}>Vehicle Category</td>
                                                        <td>{response[0].vehicleCategory}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Fee Type</td>
                                                        <td>{response[0].feeType}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Base Fee</td>
                                                        <td>Rs. {response[0].fee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>GST Amount</td>
                                                        <td>Rs. {response[0].gst}</td>
                                                    </tr>
                                                    <tr style={{ backgroundColor: "#fff3cd" }}>
                                                        <td style={{ fontWeight: "600" }}>Fee with GST</td>
                                                        <td style={{ fontWeight: "600" }}>Rs. {response[0].feeWithGST}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>1st Retest</td>
                                                        <td>{response[0].firstRetest}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>2nd Retest</td>
                                                        <td>Rs. {response[0].secondRetest} (Rs. {response[0].secondRetestWithGST} with GST)</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>3rd Retest</td>
                                                        <td>Rs. {response[0].thirdRetest} (Rs. {response[0].thirdRetestWithGST} with GST)</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Off-Road Inspection</td>
                                                        <td>Rs. {response[0].offRoadInspection} (Rs. {response[0].offRoadInspectionWithGST} with GST)</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Late Fee</td>
                                                        <td>Rs. {response[0].lateFee}</td>
                                                    </tr>
                                                    <tr style={{ backgroundColor: "#d4edda" }}>
                                                        <td style={{ fontWeight: "700", fontSize: "16px" }}>Total Fee</td>
                                                        <td style={{ fontWeight: "700", fontSize: "16px", color: "#155724" }}>Rs. {response[0].totalFee}</td>
                                                    </tr>
                                                    {response[0].expiryDate && (
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Expiry Date</td>
                                                            <td>{new Date(response[0].expiryDate).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : null}
                                    </Div>
                                </Div>
                            )}
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
}
