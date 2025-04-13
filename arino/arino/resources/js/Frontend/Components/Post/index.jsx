import React from 'react'
import {Link} from "@inertiajs/react";
import Div from '../Div'

export default function Post({url, src, alt, date, title}) {
  return (
    <Div className="cs-post cs-style1">
      <Link href={url} className="cs-post_thumb">
        <img src={src} alt={alt} />
        <Div className="cs-post_overlay" />
      </Link>
      <Div className="cs-post_info">
        <Div className="cs-posted_by">{date}</Div>
        <h2 className="cs-post_title"><Link href={url}>{title}</Link></h2>
      </Div>
    </Div>
  )
}
