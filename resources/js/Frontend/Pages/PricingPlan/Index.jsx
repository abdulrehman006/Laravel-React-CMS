import PageHeading from "@/Frontend/Components/PageHeading";
import PricingTable from "@/Frontend/Components/PricingTable";
import Spacing from "@/Frontend/Components/Spacing";
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout";
import { Head } from "@inertiajs/react";

export default function Index({pricing_plans}) {
    return (
        <FrontendLayout>
            <Head title="Pricing Plans" />
            <PageHeading
            data={{
                    title: "Pricing Plans",
                    breadcrumb: [
                        { label: "Home", url: "/" }
                    ],
                }}
                bgSrc="/static/blog_hero_bg.jpeg"
            />
            <Spacing lg="150" md="80" />
            <div className="container">
                <div className="row">
                    {pricing_plans.map((item, index) => (
                        <div className="col-lg-4" key={index}>
                            <PricingTable
                            title={item.name}
                                price={item.price}
                                currency={item.currency.symbol}
                                timeline={item.plan}
                                features={item.plan_details}
                                btnText="Purchase now"
                                btnLink={route('pricing.plan', item)}
                                tab={item.plan}
                                />
                            <Spacing lg="25" md="25" />
                        </div>
                    ))}
                </div>
                <div className="cs-height_150 cs-height_lg_80"></div>
                <hr />
            </div>
        </FrontendLayout>
    )
}
