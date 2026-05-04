interface NavMenuItem {
    title: string;
    path: string;
    dropdown?: NavMenuItem[];
    megamenu?: { heading: string; title?: string; path: string; dropdown?: NavMenuItem[] }[];
    megamenutwocolumn?: { title: string; path: string; dropdown?: { title: string; text?: string; path: string; imageUrl?: string; imageUrlMobile?: string; showbutton?: boolean }[] }[];
    bottommenu?: { title: string; path: string; icon?: React.ReactNode }[];
}

import React from "react";

const Menus: NavMenuItem[] = [
    {
        title: 'Hakkımızda',
        path: '/about-us'
    },
    {
        title: 'Hizmetlerimiz',
        path: '/services',
        dropdown: [
            {
                title: 'Sürdürülebilirlik',
                path: '/services/surdurulebilirlik'
            },
            {
                title: 'Kurumsal Finansman',
                path: '/services/kurumsal-finansman'
            },
            {
                title: 'Vergi Danışmanlığı',
                path: '/services/vergi-danismanligi'
            },
            {
                title: 'Bağımsız Denetim',
                path: '/services/bagimsiz-denetim'
            },
            {
                title: 'Muhasebe ve Mali Danışmanlık',
                path: '/services/muhasebe-ve-mali-danismanlik'
            },
            {
                title: 'İş Hukuku ve Sosyal Güvenlik Danışmanlığı',
                path: '/services/is-hukuku-ve-sosyal-guvenlik'
            },
            {
                title: 'Yönetim Danışmanlığı',
                path: '/services/yonetim-danismanligi'
            }
        ]
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
    }
]

export default Menus;
