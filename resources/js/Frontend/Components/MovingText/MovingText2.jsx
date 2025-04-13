import React, {Fragment} from 'react';
import Div from '../Div';
import {Link} from "@inertiajs/react";
import NavigationLink from "@/Components/NavigationLink";

export default function MovingText2({ data, reverseDirection }) {
  return (
    <Div className="cs-moving_text_wrap cs-type1 cs-bold cs-primary_font">
      <Div className="cs-moving_text_in">
        <Div
          className={
            reverseDirection
              ? 'cs-moving_text cs-reverse_animation'
              : 'cs-moving_text'
          }
        >
          {data.map((item, index) => (
            <Fragment key={`text-${index}`}>
              <NavigationLink key={index} href={item.href}>
                {item.title}
              </NavigationLink>
              -
            </Fragment>
          ))}
        </Div>
        <Div
          className={
            reverseDirection
              ? 'cs-moving_text cs-reverse_animation'
              : 'cs-moving_text'
          }
        >
          {data.map((item, index) => (
            <Fragment key={`text1-${index}`}>
              <Link key={index} href={item.href}>
                {item.title}
              </Link>
              -
            </Fragment>
          ))}
        </Div>
      </Div>
    </Div>
  );
}
