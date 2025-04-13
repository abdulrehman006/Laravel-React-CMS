import React from 'react'
import Div from '../Div'
import {Link} from "@inertiajs/react";
import moment from "moment";

export default function RecentPost({title, data}) {
  return (
    <>
      <h4 className="cs-sidebar_widget_title">{title}</h4>
      <ul className="cs-recent_posts">
        {data?.map((item, index)=> (
          <li key={index}>
            <Div className="cs-recent_post">
              <Link href={route('blog.show', {slug: item?.slug})} className="cs-recent_post_thumb">
                <Div className="cs-recent_post_thumb_in cs-bg" style={{backgroundImage: `url(${item?.thumbnail_image_url})`}} />
              </Link>
              <Div className="cs-recent_post_info">
                <h3 className="cs-recent_post_title"><Link href={route('blog.show', {slug: item?.slug})}>{item?.title}</Link></h3>
                <Div className="cs-recent_post_date cs-primary_40_color">{moment(item?.created_at).format('ll')}</Div>
              </Div>
            </Div>
          </li>
        ))}
      </ul>
    </>
  )
}
