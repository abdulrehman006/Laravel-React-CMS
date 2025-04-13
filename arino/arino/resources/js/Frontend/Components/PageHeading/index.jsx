import React from 'react';
import Div from '../Div';
import {Link} from "@inertiajs/react";
import {useSelector} from "react-redux";

export default function PageHeading({ data, bgSrc }) {
    const general = useSelector((state) => state.customize.general)
  return general.is_page_breadcrumbs === "1" ? (
    <Div
      className="cs-page_heading cs-style1 cs-center text-center cs-bg"
      style={{ backgroundImage: `url(${bgSrc})` }}
    >
      <Div className="container">
        <Div className="cs-page_heading_in">
          <h1 className="cs-page_title cs-font_50 cs-white_color">{data.title}</h1>
          <ol className="breadcrumb text-uppercase">
              {data.breadcrumb.map((item) => (
                  <li className="breadcrumb-item">
                      {item.url ? (
                          <Link href={item.url}>{item.label}</Link>
                      ) : (
                          <span className="search current-item">{item.label}</span>
                      )}
                  </li>
              ))}
          </ol>
        </Div>
      </Div>
    </Div>
  ) : null;
}
