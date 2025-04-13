import React from 'react';
import Div from '../Div';
import NavigationLink from "@/Components/NavigationLink";

export default function CaseStudy({ title, bgUrl, variant, href }) {
  return (
    <Div className={variant ? `cs-case_study ${variant}` : `cs-case_study`}>
      <Div className="cs-case_study_bg">
        <Div className="cs-accent_bg" />
        <Div className="cs-bg" style={{ backgroundImage: `url(${bgUrl})` }} />
      </Div>
      <h2 className="cs-case_study_title">
        <NavigationLink href={href} dangerouslySetInnerHTML={{__html: title}}></NavigationLink>
      </h2>
    </Div>
  );
}
