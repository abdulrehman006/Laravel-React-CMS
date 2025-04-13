import { Icon } from '@iconify/react';
import React from 'react';
import {Link} from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <ul className="cs-pagination_box cs-center cs-white_color cs-mp0 cs-semi_bold">
            {links.map((link, index) => (
                <li key={index}>
                    {link.url && (
                        <Link
                            className={`cs-pagination_item cs-center ${
                                link.active ? 'active' : ''
                            }`}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        >
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
}
