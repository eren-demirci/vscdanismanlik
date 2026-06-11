import Icons from "../components/Icons";

export const MenuService = {
    title: "Hizmetlerimiz",
    menus: [
        {
            title: "Sürdürülebilirlik",
            path: "/services/surdurulebilirlik"
        },
        {
            title: "Kurumsal Finansman",
            path: "/services/kurumsal-finansman"
        },
        {
            title: "Vergi Danışmanlığı",
            path: "/services/vergi-danismanligi"
        },
        {
            title: "Bağımsız Denetim",
            path: "/services/bagimsiz-denetim"
        },
        {
            title: "Muhasebe ve Mali Danışmanlık",
            path: "/services/muhasebe-ve-mali-danismanlik"
        },
        {
            title: "İş Hukuku ve Sosyal Güvenlik",
            path: "/services/is-hukuku-ve-sosyal-guvenlik"
        },
        {
            title: "Yönetim Danışmanlığı",
            path: "/services/yonetim-danismanligi"
        }
    ]
}

export const MenuContact = {
    title: "Hızlı İletişim",
    menus: [
        {
            title: "Maslak Mah. Bilim Sk. Sun Plaza No:5A İç Kapı No:40 Sarıyer / İstanbul",
            path: null,
            icon: <Icons.Location />
        },
        {
            title: "+90 (536) 976 81 57",
            path: "tel:+905369768157",
            icon: <Icons.Phone />
        },
        {
            title: "info@vscdanismanlik.com",
            path: "mailto:info@vscdanismanlik.com",
            icon: <Icons.Envelope />
        }
    ]
}
