import APIDocumentation from "@/Frontend/Components/API/APIDocumentation";

export default function APISection({ sections_data }) {
    // Default data if api_section doesn't exist
    const apiSection = sections_data?.api_section || {
        title: "Fee Calculator",
        sub_title: "Vehicle Inspection Fee",
        description: "Calculate vehicle inspection fees by Registration Number or Chassis Number",
        api_url: "http://52.58.102.77:22110/api/FeeStructure",
    };

    return <APIDocumentation data={apiSection} />;
}
