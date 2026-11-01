import { ServiceMenuList } from "./serviceMenuList";

interface MenuType {
    title: string;
    path: string;
}

export const QuickLink: MenuType[] = [
    {
        title: 'Hakkımızda',
        path: '/about-us'
    },
    {
        title: 'Hizmetlerimiz',
        path: '/services'
    },
    {
        title: 'Ekibimiz',
        path: '/teams'
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
];

export const Services: MenuType[] = ServiceMenuList;

export const Information: MenuType[] = [
    {
        title: 'Gizlilik Politikası',
        path: '/privacy-policy'
    },
    {
        title: 'Kullanım Koşulları',
        path: '/terms-condition'
    },
    {
        title: 'SSS',
        path: '/faq'
    }
];

export const MenuContact: MenuType[] = [
    {
        title: 'info@vscdanismanlik.com',
        path: 'mailto:info@vscdanismanlik.com'
    },
    {
        title: '+90 536 976 81 57',
        path: 'tel:+905369768157'
    },
    {
        title: 'Maslak, Bilim Sk., Sun Plaza, No:5A/40 Sarıyer/İstanbul',
        path: '#'
    }
];

export const MenuPolicies: MenuType[] = [
    {
        title: 'Gizlilik Politikası',
        path: '/privacy-policy'
    },
    {
        title: 'SSS',
        path: '/faq'
    },
    {
        title: 'İletişim',
        path: '/contact-us'
    }
];
