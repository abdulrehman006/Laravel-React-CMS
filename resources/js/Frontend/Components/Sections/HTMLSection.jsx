import HTMLContent from "@/Frontend/Components/HTML/HTMLContent";

export default function HTMLSection({ sections_data }) {
    const htmlSection = sections_data?.html_section || {
        title: "",
        sub_title: "",
        html_content: "<p>Add your custom HTML content here</p>",
    };

    return <HTMLContent data={htmlSection} />;
}
