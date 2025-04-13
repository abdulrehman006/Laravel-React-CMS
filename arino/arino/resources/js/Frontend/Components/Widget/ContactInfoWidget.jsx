import React from 'react'
import { Icon } from '@iconify/react';
import {useSelector} from "react-redux";

export default function ContactInfoWidget({withIcon, title, data}) {
    const contact = useSelector((state) => state.customize.contact)
  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <ul className="cs-menu_widget cs-style1 cs-mp0">
          {contact.contact_phone_number && (
              <li>
                  {withIcon?<span className='cs-accent_color'><Icon icon="material-symbols:add-call-rounded" /></span>:''}
                  {contact.contact_phone_number}
              </li>
          )}
          {contact.contact_email && (
              <li>
                  {withIcon?<span className='cs-accent_color'><Icon icon="mdi:envelope" /></span>:''}
                  {contact.contact_email}
              </li>
          )}
          {contact.contact_address && (
              <li>
                  {withIcon?<span className='cs-accent_color'><Icon icon="mdi:map-marker" /></span>:''}
                  {contact.contact_address}
              </li>
          )}
      </ul>
    </>
  )
}
