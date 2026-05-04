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

export const Services: MenuType[] = [
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
        title: 'İş Hukuku ve Sosyal Güvenlik',
        path: '/services/is-hukuku-ve-sosyal-guvenlik'
    },
    {
        title: 'Yönetim Danışmanlığı',
        path: '/services/yonetim-danismanligi'
    }
];

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
        title: '0555 555 55 55',
        path: 'tel:+905555555555'
    },
    {
        title: 'Maslak Mah. Bilim Sk. Sun Plaza No:5A İç Kapı No:40 Sarıyer / İstanbul',
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
