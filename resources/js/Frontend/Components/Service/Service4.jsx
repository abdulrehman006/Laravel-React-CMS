import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import Spacing from "@/Frontend/Components/Spacing";
import Card from "@/Frontend/Components/Card";

export default function Service4({service_data}){
    const services = service_data.services;
    return (
        <Div className='cs-shape_wrap_4'>
            <Div className="cs-shape_4"></Div>
            <Div className="cs-shape_4"></Div>
            <Div className="container">
                <Div className="row">
                    <Div className="col-xl-4">
                        <SectionHeading
                            title={service_data.title}
                            subtitle={service_data.sub_title}
                        />
                        <Spacing lg='90' md='45' />
                    </Div>
                    <Div className='col-xl-8'>
                        <Div className='row'>
                            {services.map((item, index) => (
                                <>
                                    {index === 0 && (
                                        <Div className='col-lg-3 col-sm-6 cs-hidden_mobile'></Div>
                                    )}
                                    {index % 2 !== 0 && (
                                        <Div className='col-lg-3 col-sm-6 cs-hidden_mobile'></Div>
                                    )}
                                    {index % 4 === 0 && index !== 0 && (
                                        <>
                                            <Div className='col-lg-3 col-sm-6 cs-hidden_mobile'></Div>

                                            <Div className='col-lg-3 col-sm-6 cs-hidden_mobile'></Div>
                                        </>
                                    )}
                                    <Div key={`card_${index}`} className='col-lg-3 col-sm-6'>
                                        <Card
                                            title={item.title}
                                            link={item.action_url}
                                            src={item.thumbnail_image}
                                            alt="Service"
                                        />
                                        <Spacing lg='0' md='30' />
                                    </Div>
                                </>
                            ))}
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
}
