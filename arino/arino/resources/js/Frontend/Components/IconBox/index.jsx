import React from 'react'
import Div from '../Div';

export default function IconBox({title, subtitle, icon}) {
  return (
    <Div className="cs-iconbox cs-style1 text-center">
      <Div className="cs-iconbox_icon">
          {icon && <img src={icon} alt="Icon" />}
      </Div>
      <h2 className="cs-iconbox_title" dangerouslySetInnerHTML={{__html: title}}></h2>
      <Div className="cs-iconbox_subtitle" dangerouslySetInnerHTML={{__html: subtitle}}></Div>
    </Div>
  )
}
