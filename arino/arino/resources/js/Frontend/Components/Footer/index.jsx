import React from 'react'
import Div from '../Div'
import ContactInfoWidget from '../Widget/ContactInfoWidget'
import MenuWidget from '../Widget/MenuWidget'
import Newsletter from '../Widget/Newsletter'
import SocialWidget from '../Widget/SocialWidget'
import TextWidget from '../Widget/TextWidget'
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy";
import {useSelector} from "react-redux";
export default function Footer({copyrightText, logoSrc, logoAlt, text}) {
    const services_menu = window.menus ? organizeMenusIntoHierarchy(window.menus.services_menu) : [];
    const footer_menu = window.menus ? organizeMenusIntoHierarchy(window.menus.footer_menu) : [];
    const customize = useSelector((state) => state.customize)


  return (
    <footer className="cs-fooer">
      <Div className="cs-fooer_main">
        <Div className="container">
          <Div className="row">
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <TextWidget
                  logoSrc={customize.general.site_logo}
                  logoAlt='Logo'
                  text ={customize.footer.footer_description}
                />
                  {customize.footer.footer_is_show_social_media === "1" && (
                      <SocialWidget/>
                  )}
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <MenuWidget menus={services_menu} menuHeading='Services'/>
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <ContactInfoWidget title={customize.footer.contact_us_title}/>
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <Newsletter
                  placeholder='example@gmail.com'
                />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Div className="container">
        <Div className="cs-bottom_footer">
          <Div className="cs-bottom_footer_left">
            <Div className="cs-copyright">{customize.footer.copyright_text}</Div>
          </Div>
          <Div className="cs-bottom_footer_right">
            <MenuWidget menus={footer_menu} variant=' cs-style2'/>
          </Div>
        </Div>
      </Div>
    </footer>
  )
}
