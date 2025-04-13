import React from 'react'
import Div from '../Div'

export default function LogoList({partner_data}) {
    const logos = partner_data.logos
  return (
    <Div className="cs-partner_logo_wrap">
      {logos.map((partnerLogo, index)=><div className="cs-partner_logo" key={index}><img src={partnerLogo} alt="Partner" /></div>)}
    </Div>
  )
}
