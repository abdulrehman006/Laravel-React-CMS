import React from 'react';
import Div from '../Div';
import {Link} from "@inertiajs/react";
import {useSelector} from "react-redux";

export default function PageHeading({ data, bgSrc }) {
    const general = useSelector((state) => state.customize.general)

    // Get page data from all possible Redux stores
    const pages = useSelector((state) => state.pages)
    const aboutPage = useSelector((state) => state.aboutPage)
    const contactPage = useSelector((state) => state.contactPage)
    const faqPage = useSelector((state) => state.faqPage)

    // Determine which page store has data - check if breadcrumb is explicitly shown
    const page = aboutPage?.is_show_breadcrumb === true || aboutPage?.is_show_breadcrumb === "1" ? aboutPage
        : contactPage?.is_show_breadcrumb === true || contactPage?.is_show_breadcrumb === "1" ? contactPage
        : faqPage?.is_show_breadcrumb === true || faqPage?.is_show_breadcrumb === "1" ? faqPage
        : pages?.is_show_breadcrumb === true || pages?.is_show_breadcrumb === "1" ? pages
        : pages

    // Determine background style based on page settings
    const getBackgroundStyle = () => {
        const bgType = page?.breadcrumb_bg_type || 'image';
        const bgImage = page?.breadcrumb_bg_image || bgSrc;
        const bgColor = page?.breadcrumb_bg_color || '#000000';

        if (bgType === 'color') {
            return {
                background: bgColor,
                backgroundImage: 'none'
            };
        } else {
            return {
                background: `url(${bgImage}) center/cover no-repeat`
            };
        }
    };

  return general.is_page_breadcrumbs === "1" ? (
    <Div
      className="cs-page_heading cs-style1 cs-center text-center"
      style={getBackgroundStyle()}
    >
      <Div className="container">
        <Div className="cs-page_heading_in">
          <h1 className="cs-page_title cs-font_50 cs-white_color">{data.title}</h1>
          {data.breadcrumb && (
            <ol className="breadcrumb text-uppercase">
              {data.breadcrumb.map((item, index) => (
                <li key={index} className={`breadcrumb-item ${index === data.breadcrumb.length - 1 ? 'active' : ''}`}>
                  {index === data.breadcrumb.length - 1 ? (
                    item.label
                  ) : (
                    <Link href={item.url}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          )}
        </Div>
      </Div>
    </Div>
  ) : null;
}
