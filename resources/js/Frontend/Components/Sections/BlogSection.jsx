import Blog1 from "@/Frontend/Components/Blog/Blog1";
import Blog2 from "@/Frontend/Components/Blog/Blog2";
import Div from "@/Frontend/Components/Div";

export default function BlogSection({sections_data}){
    const blogSection = sections_data.our_blog
    // conditional rendering
    let section = "";
    if (blogSection.layout === "1"){
        section = <Blog1 blog_data={blogSection} />
    } else if(blogSection.layout === "2"){
        section = <Blog2 blog_data={blogSection} />
    }

    const notifications = window.notifications;

    return(
        <>
            <Div className="container-fluid">
                <Div className="row">
                    <Div className="col-12">
                        {section}
                    </Div>
                </Div>
            </Div>
        </>
    )
}
