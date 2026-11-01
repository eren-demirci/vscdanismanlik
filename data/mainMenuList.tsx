interface NavMenuItem {
    title: string;
    path: string;
    isModal?: boolean;
    modalTarget?: string;
    dropdown?: NavMenuItem[];
    megamenu?: { heading: string; title?: string; path: string; dropdown?: NavMenuItem[] }[];
    megamenutwocolumn?: { title: string; path: string; dropdown?: { title: string; text?: string; path: string; imageUrl?: string; imageUrlMobile?: string; showbutton?: boolean }[] }[];
    bottommenu?: { title: string; path: string; icon?: React.ReactNode }[];
}

import React from "react";
import { ServiceMenuList } from "./serviceMenuList";

const Menus: NavMenuItem[] = [
    {
        title: 'Hakkımızda',
        path: '/about-us',
        dropdown: [
            {
                title: 'Biz Kimiz',
                path: '/about-us'
            },
            {
                title: 'Değerlerimiz ve Politikamız',
                path: '/about-us#degerlerimiz'
            },
            {
                title: 'Ekibimiz',
                path: '/teams'
            }
        ]
    },
    {
        title: 'Hizmetlerimiz',
        path: '/services',
        dropdown: ServiceMenuList
    },
    {
        title: 'Duyurular',
        path: '/blogs/category/duyurular'
    },
    {
        title: 'Haberler',
        path: '/blogs/category/haberler'
    },
    {
        title: 'İletişim',
        path: '/contact-us'
    },
    {
        title: 'Kariyer',
        path: '#',
        isModal: true,
        modalTarget: '.modal-kariyer'
    }
]

export default Menus;
