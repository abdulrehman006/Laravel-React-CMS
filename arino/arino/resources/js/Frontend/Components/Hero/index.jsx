import React from 'react';
import Button from '../Button';
import Div from '../Div';
import VerticalLinks from '../VerticalLinks';

export default function Hero({
  scrollDownId, data
}) {

    return (
    <Div
      className="cs-hero cs-style1 cs-bg cs-fixed_bg cs-shape_wrap_1"
      style={{ backgroundImage: `url(${data.background_image_url})` }}
    >
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />
      <Div className="container">
        <Div className="cs-hero_text">
          <h1 className="cs-hero_title">{data.title}</h1>
          <Div className="cs-hero_info">
            <Div>
              <Button btnLink={data.action_url} btnText={data.action_text} />
            </Div>
            <Div>
              <Div className="cs-hero_subtitle">{data.sub_title}</Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <VerticalLinks data={data.social_links.links} title={data.social_links.title} />
      <a href={scrollDownId} className="cs-down_btn">
        .
      </a>
    </Div>
  );
}
