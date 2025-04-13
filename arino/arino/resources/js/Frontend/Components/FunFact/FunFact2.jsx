import React from 'react'
import Div from '../Div'

export default function FunFact2({funFact_data, bgUrl}) {
  return (
    <Div className="cs-funfact_wrap_2 cs-no_shadow">
      {bgUrl && <div className="cs-funfact_shape" style={{backgroundImage:`url(/static/funfact_shape_bg.svg)`}}></div>}
      <Div className="cs-funfacts">
        {funFact_data.fun_facts.map((item, index) => (
          <Div key={index}>
            <Div className="cs-funfact cs-style2">
              <Div className="cs-funfact_number cs-primary_font cs-semi_bold cs-primary_color"><span className="odometer" />{item.value}<span className="cs-plus">+</span></Div>
              <h3 className="cs-funfact_title">{item.title}</h3>
            </Div>
          </Div>
        ))}
      </Div>
    </Div>
  )
}
