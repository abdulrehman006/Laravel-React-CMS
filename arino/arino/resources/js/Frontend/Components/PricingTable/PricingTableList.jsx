import React, { useState } from 'react';
import PricingTable from '.';
import Section from '../Div';
import Spacing from '../Spacing';

export default function PricingTableList({pricing_data}) {
    const [tab, setTab] = useState('monthly');
    const handleTabChange = (selectedTab) => {
        setTab(selectedTab);
    };

    return (
        <Section className="position-relative">
            <ul className="cs-tab_links cs-style1 cs-mp0 cs-primary_font">
                <li className={tab === 'monthly' ? 'active' : ''} onClick={() => handleTabChange('monthly')}>
                    Monthly
                </li>
                <li className={tab === 'yearly' ? 'active' : ''} onClick={() => handleTabChange('yearly')}>
                    Yearly
                </li>
            </ul>
            <Section className="row">
                {pricing_data.plans.map((item, index) => (
                    <Section className="col-lg-4" key={index}>
                        {tab === 'monthly' ? (
                            <PricingTable
                                title={item.name}
                                price={item.price.monthly}
                                currency={pricing_data.currency_symbol}
                                timeline="monthly"
                                features={item.features}
                                btnText={item.action_text}
                                btnLink={item.action_url}
                                tab={tab}
                            />
                        ) : (
                            <PricingTable
                                title={item.name}
                                price={item.price.yearly}
                                currency={pricing_data.currency_symbol}
                                timeline="yearly"
                                features={item.features}
                                btnText={item.action_text}
                                btnLink={item.action_url}
                                tab={tab}
                            />
                        )}
                        <Spacing lg="25" md="25" />
                    </Section>
                ))}
            </Section>
        </Section>
    );
}
