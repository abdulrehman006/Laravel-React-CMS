import React from 'react'
import Button from "@/Frontend/Components/Button";
import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";

export default function Cta({title, btnText, btnLink, bgSrc, bgColor, bgType, variant}) {
  const backgroundStyle = bgType === 'color' && bgColor
    ? { backgroundColor: bgColor }
    : { backgroundImage: `url(${bgSrc})` };

  return (
    <Div className={`cs-cta cs-style1 cs-bg text-center cs-shape_wrap_1 cs-position_1 ${variant?variant:''}`} style={backgroundStyle}>
    
      <Div className="cs-cta_in">
        <h2 className="cs-cta_title cs-semi_bold cs-m0" dangerouslySetInnerHTML={{__html: title}}></h2>
        {btnText && (
          <>
            <Spacing lg='70' md='30' />
            <Button
              btnLink={btnLink}
              btnText={btnText}
            />
          </>
        )}
      </Div>
    </Div>
  )
}
