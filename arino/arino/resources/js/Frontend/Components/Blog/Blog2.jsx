import Div from "@/Frontend/Components/Div";
import Spacing from "@/Frontend/Components/Spacing";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import PostList from "@/Frontend/Components/Post/PostList";

export default function Blog2({ blog_data }) {
    return (
        <>
            <Div className="cs-shape_wrap_4">
                <Div className="cs-shape_4"></Div>
                <Div className="cs-shape_4"></Div>
                <Spacing lg="145" md="80" />
                <Div className="container">
                    <Div className="row">
                        <Div className="col-lg-5 col-xl-4">
                            <SectionHeading
                                title={blog_data.title}
                                subtitle={blog_data.sub_title}
                                btnText={blog_data.action_text}
                                btnLink="/blog"
                            />
                            <Spacing lg="45" md="45" />
                        </Div>
                        <Div className="col-lg-7 offset-xl-1">
                            <PostList />
                        </Div>
                    </Div>
                </Div>
            </Div>
        </>
    );
}
