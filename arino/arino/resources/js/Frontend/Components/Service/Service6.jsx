import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import IconBoxStyle2 from "@/Frontend/Components/IconBox/IconBoxStyle2";

export default function Service6({service_data}){
    const services = service_data.services;
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
                        <div className="cs-iconbox_4_wrap">
                            {services.map((item, index) => (
                                <IconBoxStyle2
                                    key={index}
                                    title={item.title}
                                    subTitle={item.description}
                                    iconUrl={item.thumbnail_image}
                                    btnLink={item.action_url}
                                    btnText={item.action_text}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
