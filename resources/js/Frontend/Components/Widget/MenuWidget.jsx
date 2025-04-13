import React from "react";
import MenuItem from "@/Frontend/Components/Widget/MenuItem";

export default function MenuWidget({ menus, menuHeading, variant }) {
    return (
        <>
            {menuHeading && <h2 className="cs-widget_title">{menuHeading}</h2>}
            <ul
                className={`${
                    variant
                        ? `cs-menu_widget ${variant}`
                        : "cs-menu_widget cs-style1"
                } cs-mp0`}
            >
                {menus.map((menu, index) => (
                    <MenuItem key={index} menu={menu} />
                ))}
            </ul>
        </>
    );
}
