import React from 'react'
import Div from '../Div'
import NavigationLink from "@/Components/NavigationLink";

export default function Card({title, link, src, alt}) {
  return (
    <NavigationLink className="cs-card cs-style1" href={link}>
      <>
        <img src={src} alt={alt} loading="lazy"/>
        <Div className="cs-card_overlay" />
        <Div className="cs-card_info">
          <span className=" cs-hover_layer3 cs-accent_bg" />
          <h2 className="cs-card_title">{title}</h2>
        </Div>
      </>
    </NavigationLink>
  )
}
