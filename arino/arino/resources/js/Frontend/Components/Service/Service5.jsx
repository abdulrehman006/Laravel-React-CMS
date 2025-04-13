import Div from "@/Frontend/Components/Div";
import Spacing from "@/Frontend/Components/Spacing";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import {Link} from "@inertiajs/react";
import {useState} from "react";

export default function Service5({ service_data }){
    const services = service_data.services;
    const [active, setActive] = useState(0);
    const handelActive = (index) => {
        setActive(index);
    };
    return(
        <section className="cs-shape_wrap_4 cs-parallax">
            <div className="cs-shape_4 cs-to_up" />
            <div className="cs-shape_4 cs-to_right" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-xl-4">
                        <SectionHeading
                            title={service_data.title}
                            subtitle={service_data.sub_title}
                            btnText={service_data.action_text}
                            btnLink={service_data.action_url}
                        />
                        <Spacing lg="45" md="45" />
                    </div>
                    <div className="col-lg-7 offset-xl-1">
                        <Div className="cs-iconbox_3_list cs-style1">
                            {services.map((item, index) => (
                                <Div
                                    className={`cs-hover_tab ${active === index ? 'active' : ''}`}
                                    key={index}
                                    onMouseEnter={() => handelActive(index)}
                                >
                                    <Link href={item.action_url} className="cs-iconbox cs-style3">
                                    <>
                                          <span className="cs-iconbox_icon cs-center">
                                            <svg
                                                width={30}
                                                height={29}
                                                viewBox="0 0 30 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                  d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z"
                                                  fill="currentColor"
                                              />
                                            </svg>
                                          </span>
                                        <Div className="cs-iconbox_in">
                                            <h2 className="cs-iconbox_title">{item.title}</h2>
                                            <Div className="cs-iconbox_subtitle">{item.description}</Div>
                                        </Div>
                                    </>
                                    </Link>
                                </Div>
                            ))}
                        </Div>
                    </div>
                </div>
            </div>
        </section>
    )
}
