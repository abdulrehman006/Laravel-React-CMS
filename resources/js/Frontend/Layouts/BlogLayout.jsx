import FrontendLayout from "@/Frontend/Layouts/FrontendLayout";
import PageHeading from "@/Frontend/Components/PageHeading";
import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div.jsx";
import Sidebar from "@/Frontend/Components/Sidebar.jsx/index.jsx";

export default function BlogLayout({ children, pageHeaderData }) {
    return (
        <FrontendLayout>
            <PageHeading
                bgSrc="/static/blog_hero_bg.jpeg"
                data={pageHeaderData}
            />
            <Spacing lg="150" md="80" />
            <Div className="container cs_blog_section">
                <Div className="row">
                    <Div className="col-lg-8">{children}</Div>
                    <Div className="col-xl-3 col-lg-4 offset-xl-1">
                        <Spacing lg="0" md="80" />
                        <Sidebar />
                    </Div>
                </Div>
            </Div>
        </FrontendLayout>
    );
}
