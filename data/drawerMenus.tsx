import Icons from "../components/Icons";
import { ServiceMenuList } from "./serviceMenuList";

export const MenuService = {
    title: "Hizmetlerimiz",
    menus: ServiceMenuList
}

export const MenuContact = {
    title: "Hızlı İletişim",
    menus: [
        {
            title: "Maslak, Bilim Sk., Sun Plaza, No:5A/40 Sarıyer/İstanbul",
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
