import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function HTMLContent({ data }) {
    return (
        <Div className="container">
            {/* Section Heading */}
            {(data.title || data.sub_title) && (
                <>
                    <Div className="text-center">
                        <SectionHeading
                            title={data.title || ""}
                            subtitle={data.sub_title || ""}
                            variant="cs-style1"
                        />
                    </Div>
                    <Div className="cs-height_50 cs-height_lg_30" />
                </>
            )}

            {/* Custom HTML Content */}
            {data.html_content && (
                <Div
                    className="custom-html-content"
                    dangerouslySetInnerHTML={{ __html: data.html_content }}
                />
            )}
        </Div>
    );
}
