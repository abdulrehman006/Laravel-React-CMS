import React from 'react';
import WaterWave from 'react-water-wave';
import Div from '../Div';
import Button from '../Button';
import VerticalLinks from '../VerticalLinks';

export default function Hero3({data}) {
  return (
    <Div className="cs-hero cs-style1 cs-type2" id="home">
      <WaterWave
        className="cs-hero_bg cs-bg cs-ripple_version cs-center"
        imageUrl={data.background_image_url}
      >
        {() => (
          <Div className="container">
            <Div className="cs-hero_text text-center">
              <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: data.title}}></h1>
              <Button btnLink={data.action_url} btnText={data.action_text} />
            </Div>
          </Div>
        )}
      </WaterWave>
      <VerticalLinks
        data={data.social_links.links}
        title={data.social_links.title}
        variant="cs-left_side"
      />
    </Div>
  );
}
