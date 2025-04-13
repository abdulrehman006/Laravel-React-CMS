import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import MovingText2 from "@/Frontend/Components/MovingText/MovingText2";

export default function Service3({service_data}){
    const services = service_data.services;

    const serviceData1 =  services.filter((item, index) => index % 2 === 1).map(item => ({ title: item.title, href: item.action_url }));
    const serviceData2 = services.filter((item, index) =>  index % 2 !== 1).map(item => ({ title: item.title, href:  item.action_url }));

    return(
        <>
            {/* Start Services Section */}
            <Div className="container">
                <SectionHeading
                    title={service_data.title}
                    subtitle={service_data.sub_title}
                    variant="cs-style1 text-center"
                />
                <Spacing lg="65" md="45" />
            </Div>
            {/* End Services Section */}

            {/* Start Moving Text Section */}
            <MovingText2 data={serviceData1} />
            <Spacing lg="20" md="10" />
            <MovingText2 reverseDirection data={serviceData2} />
            {/* End Moving Text Section */}
        </>
    )
}
