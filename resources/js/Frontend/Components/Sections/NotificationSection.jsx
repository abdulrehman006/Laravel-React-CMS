import Div from "@/Frontend/Components/Div";
import Spacing from "@/Frontend/Components/Spacing";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function NotificationSection({ sections_data }) {
    const notification_data = sections_data.notification
    const notifications = window.notifications;

    return (
        <>
            <Div className="cs-shape_wrap_4">
                <Div className="cs-shape_4"></Div>
                <Div className="cs-shape_4"></Div>
                <Div className="container">
                    <Div className="row">
                        <Div className="col-xl-4">
                            <SectionHeading
                                title={notification_data?.title}
                                subtitle={notification_data?.sub_title}
                                btnText={notification_data?.action_text}
                                btnLink="/blog"
                            />
                            <Spacing lg="90" md="45" />
                        </Div>
                        <Div className="col-xl-7 offset-xl-1">
                            <Div className="cs-half_of_full_width">
                                <Div className="marquee-container bg-white p-3">
                                    <Div className="marquee-content">
                                        {notifications.map((item, index) => (
                                            <Div key={index}>
                                                <span className="text-success">{item.title}</span>
                                                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                            </Div>
                                        ))}
                                    </Div>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>
        </>
    )
}
