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
                                    <button
                                        type="button"
                                        className={`btn ${searchType === "VIR" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setSearchType("VIR")}
                                        style={{
                                            backgroundColor: searchType === "VIR" ? "#DAA520" : "transparent",
                                            borderColor: "#DAA520",
                                            color: searchType === "VIR" ? "#fff" : "#DAA520"
                                        }}
                                    >
                                        VIR
                                    </button>
                                </Div>
                            </Div>

                            {/* Search Input */}
                            <Div className="mb-3">
                                <label style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>
                                    {searchType === "regNo" ? "Registration Number:" : searchType === "VIR" ? "VIR Number:" : "Chassis Number:"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={searchType === "regNo" ? "e.g., LET-15-8676" : searchType === "VIR" ? "e.g., 88725120100026880" : "e.g., SR308PK291991"}
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
                                        {Array.isArray(response) && response.length > 0 && response[0].totalFee !== null ? (
                                            // Display first item from array
                                            <table className="table table-striped table-bordered" style={{ fontSize: "14px" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Fee Type</td>
                                                        <td>{response[0].feeType}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Test Fee</td>
                                                        <td>{response[0].testFee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>GST</td>
                                                        <td>{response[0].gst}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Late Fee</td>
                                                        <td>{response[0].lateFee}</td>
                                                    </tr>
                                                    <tr style={{ backgroundColor: "#d4edda" }}>
                                                        <td style={{ fontWeight: "700", fontSize: "16px" }}>Total Fee Payable</td>
                                                        <td style={{ fontWeight: "700", fontSize: "16px", color: "#155724" }}>{response[0].totalFee}</td>
                                                    </tr>
                                                    {response[0].expiryDate && (
                                                        <tr>
                                                            <td style={{ fontWeight: "600", backgroundColor: "#f8f9fa" }}>Expiry Date</td>
                                                            <td>{new Date(response[0].expiryDate).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: '2-digit'
                                                            })}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : Array.isArray(response) && response.length > 0 && response[0].totalFee === null ? (
                                            // NOT MATCHED: Display general fee structure tables
                                            <Div>
                                                {/* First Time VICS Inspection Fee Table */}
                                                <Div className="mb-4">
                                                    <h6 style={{ fontWeight: "600", marginBottom: "15px", color: "#333" }}>First Time VICS Inspection Fee</h6>
                                                    <table className="table table-bordered" style={{ fontSize: "14px", backgroundColor: "#f8f9fa" }}>
                                                        <thead>
                                                            <tr style={{ backgroundColor: "#c0c0c0" }}>
                                                                <th style={{ fontWeight: "600", padding: "10px" }}>Vehicle Category</th>
                                                                <th style={{ fontWeight: "600", padding: "10px" }}>Fee Type</th>
                                                                <th style={{ fontWeight: "600", padding: "10px", textAlign: "right" }}>Fee</th>
                                                                <th style={{ fontWeight: "600", padding: "10px", textAlign: "right" }}>FeeWithGST</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {response
                                                                .filter(item => item.feeType === "First Time VICS Inspection Fee")
                                                                .map((item, index) => (
                                                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa" }}>
                                                                        <td style={{ padding: "10px" }}>{item.vehicleCategory}</td>
                                                                        <td style={{ padding: "10px" }}>{item.feeType}</td>
                                                                        <td style={{ padding: "10px", textAlign: "right" }}>{item.fee}</td>
                                                                        <td style={{ padding: "10px", textAlign: "right" }}>{item.feeWithGST}</td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </Div>

                                                {/* Renewal Fee Table */}
                                                <Div>
                                                    <h6 style={{ fontWeight: "600", marginBottom: "15px", color: "#333" }}>Renewal Fee (Every 06 Month)</h6>
                                                    <table className="table table-bordered" style={{ fontSize: "14px", backgroundColor: "#ffffff" }}>
                                                        <tbody>
                                                            <tr style={{ backgroundColor: "#f8f9fa" }}>
                                                                <td style={{ fontWeight: "600", padding: "10px", width: "50%" }}>Fee Type</td>
                                                                <td style={{ fontWeight: "600", padding: "10px", textAlign: "right" }}>Renewal Fee (Every 06 Month)</td>
                                                            </tr>
                                                            {(() => {
                                                                const renewalItem = response.find(item => item.feeType === "Renewal Fee (Every 06 Month)");
                                                                if (!renewalItem) return null;

                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td style={{ padding: "10px" }}>Test Fee</td>
                                                                            <td style={{ padding: "10px", textAlign: "right" }}>{renewalItem.fee}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ padding: "10px" }}>Late Fee</td>
                                                                            <td style={{ padding: "10px", textAlign: "right" }}>0</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ padding: "10px" }}>GST</td>
                                                                            <td style={{ padding: "10px", textAlign: "right" }}>{renewalItem.feeWithGST - renewalItem.fee}</td>
                                                                        </tr>
                                                                        <tr style={{ backgroundColor: "#d4edda" }}>
                                                                            <td style={{ fontWeight: "700", padding: "10px" }}>Total Fee Payable</td>
                                                                            <td style={{ fontWeight: "700", padding: "10px", textAlign: "right" }}>{renewalItem.feeWithGST}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ padding: "10px" }}>Expiry Date</td>
                                                                            <td style={{ padding: "10px", textAlign: "right" }}>05-Dec-25</td>
                                                                        </tr>
                                                                    </>
                                                                );
                                                            })()}
                                                        </tbody>
                                                    </table>
                                                </Div>
                                            </Div>
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
