import React from 'react';
import Button from '../Button';
import Div from '../Div';
import VerticalLinks from '../VerticalLinks';

export default function Hero5({data}) {
  return (
    <Div
      className="cs-hero cs-style3 cs-bg cs-fixed_bg cs-shape_wrap_1"
      id="home"
    >
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />
      <Div className="cs-circle_1" />
      <Div className="cs-circle_2" />
      <Div className="container">
        <Div className="cs-hero_text">
          <h1 className="cs-hero_title text-end" dangerouslySetInnerHTML={{__html: data.title}}></h1>
          <Div className="cs-hero_subtitle text-end">{data.sub_title}</Div>
          <Button btnLink={data.action_url} btnText={data.action_text} />
        </Div>
      </Div>
      <VerticalLinks
        data={data.social_links.links}
        title={data.social_links.title}
        variant="cs-left_side"
      />
    </Div>
  );
}
