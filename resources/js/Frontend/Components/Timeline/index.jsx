import React from 'react'
import Div from '../Div'

export default function Timeline({data}) {
  return (
      <>
          {data.map((item, index) => (
              <Div key={`s-${index}`} className="cs-time_line cs-style1">
                  <h3 className="cs-accent_color">{item.year}</h3>
                  <h2>{item.title}</h2>
                  {item.list_item.map((l, index) => (
                      <p key={`item-${index}`}>{l}</p>
                  ))}
              </Div>
          ))}
      </>
  )
}
