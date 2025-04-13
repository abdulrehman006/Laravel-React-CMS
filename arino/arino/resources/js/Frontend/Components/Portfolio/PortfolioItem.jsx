import React from 'react';
import Div from '../Div';
import NavigationLink from "@/Components/NavigationLink";

export default function PortfolioItem({ href, src, title, subtitle, variant }) {
  return (
    <NavigationLink
      href={href}
      className={`cs-portfolio cs-bg ${variant ? variant : 'cs-style1'}`}
    >
      <>
        <Div className="cs-portfolio_hover" />
        <Div
          className="cs-portfolio_bg cs-bg"
          style={{ backgroundImage: `url("${src}")` }}
        />
        <Div className="cs-portfolio_info">
          <Div className="cs-portfolio_info_bg cs-accent_bg" />
          <h2 className="cs-portfolio_title">{title}</h2>
          <Div className="cs-portfolio_subtitle">{subtitle}</Div>
        </Div>
      </>
    </NavigationLink>
  );
}
