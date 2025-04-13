import React from "react";
import { Icon } from "@iconify/react";
import NavigationLink from "@/Components/NavigationLink";

export default function Button({ btnLink, btnText, variant, icon }) {
    return (
        <NavigationLink
            href={btnLink}
            className={variant ? `cs-text_btn ${variant}` : "cs-text_btn"}
        >
            <>
                <span>{btnText}</span>
                {icon ? icon : <Icon icon="bi:arrow-right" />}
            </>
        </NavigationLink>
    );
}
