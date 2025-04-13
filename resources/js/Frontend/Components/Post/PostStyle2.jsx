import React from 'react'
import Button from '../Button'
import Div from '../Div'
import {Link} from "@inertiajs/react";

export default function PostStyle2({thumb, title, subtitle, date, author, authorUrl, href, commentCount, commentHref}) {
  return (
    <Div className="cs-post cs-style2">
      <Link href={href} className="cs-post_thumb cs-radius_15">
        <img src={thumb} alt="Post" className="w-100 cs-radius_15" />
      </Link>
      <Div className="cs-post_info">
        <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
            <Link href={authorUrl} className="cs-post_avatar">{author}</Link>
            <span className="cs-posted_by">{date}</span>
            <Link href={commentHref}>{commentCount}</Link>
        </Div>
        <h2 className="cs-post_title"><Link href={href}>{title}</Link></h2>
        <Div className="cs-post_sub_title">{subtitle}</Div>
        <Button btnLink={href} btnText='See More' />
      </Div>
    </Div>
  )
}
