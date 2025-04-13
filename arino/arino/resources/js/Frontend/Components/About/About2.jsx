import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";

export default function About2({about_data}){
    return(
        <>
            <Div className="container">
                <Div className="row">
                    <Div className="col-xl-5 col-lg-7">
                        <SectionHeading
                            title={about_data.title}
                            subtitle={about_data.sub_title}
                        >
                            <Spacing lg="30" md="20" />
                            <p className="cs-m0">
                                {about_data.description}
                            </p>
                            <Spacing lg="30" md="30" />
                            <Div className="cs-separator cs-accent_bg"></Div>
                            <Spacing lg="25" md="40" />
                        </SectionHeading>
                    </Div>
                    {about_data.photos?.slice(0, 1).map((img, index) => (
                        <Div key={`op-${index}`} className="col-lg-5 offset-xl-2">
                            {img ? (
                                <img
                                    src={img}
                                    alt="About"
                                    className="w-100 cs-radius_15"
                                />
                            ) : null}
                            <Spacing lg="25" md="25" />
                        </Div>
                    ))}
                    {about_data.photos?.slice(1).map((img, index) => (
                        <Div key={`op1-${index}`} className={index % 2 === 0  ? "col-lg-7" : "col-lg-5"}>
                            {img ? (
                                <img
                                    src={img}
                                    alt="About"
                                    className="w-100 cs-radius_15"
                                />
                            ) : null}
                            <Spacing lg="25" md="25" />
                        </Div>
                    ))}
                </Div>
            </Div>
        </>
    )
}
