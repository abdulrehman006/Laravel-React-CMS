import React from 'react';
import Div from '../Div';
import VerticalLinks from '../VerticalLinks';

export default function Hero4({
  scrollDownId, data
}) {
  return (
      <Div
          className="cs-hero cs-style1 cs-type1 text-center cs-fixed_bg"
          style={{ backgroundImage: `url(${data.background_image_url})` }}
      >
      <Div className="container">
        <Div className="cs-hero_text">
          <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: data.title}}></h1>
          <Div className="cs-hero_info justify-content-center">
            <Div className="cs-hero_subtitle">{data.sub_title}</Div>
          </Div>
        </Div>
      </Div>
      <VerticalLinks data={data.social_links.links} title={data.social_links.title} />
      {(data.phone_number || data.email_address) && (
        <Div className="cs-hero_social_wrap cs-left_side cs-primary_font cs-primary_color">
          <ul className="cs-hero_social_links">
            {data.email_address && (
              <li>
                <span>{data.email_address}</span>
              </li>
            )}
            {data.phone_number && (
              <li>
                <span>{data.phone_number}</span>
              </li>
            )}
          </ul>
        </Div>
      )}
      <a href={scrollDownId} className="cs-down_btn">
        .
      </a>
    </Div>
  );
}
