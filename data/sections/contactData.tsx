import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";

export const ContactData: SectionProps = {
    wrapperCls: "section-padding",
    container: "container",
    subheading: "İletişim",
    heading: "Birlikte Güçlü Projeler İnşa Edelim",
    text: "Uzman danışmanlarımızla tanışmak ve işletmenize özel çözümler keşfetmek için bizimle iletişime geçin.",
    promotions: [
        {
            icon: <Icons.Location />,
            title: "Adres",
            text: "Sun Plaza, Bilim Sokak No:5 Kat:7, 34398 Maslak/İstanbul",
        },
        {
            icon: <Icons.Phone />,
            title: "Telefon",
            text: "+90 (212) 000 00 00",
        },
        {
            icon: <Icons.Email />,
            title: "E-posta",
            text: "info@vscdanismanlik.com",
        },
    ],
    block: {
        heading: "Randevu Alın",
        text: "Bizimle iletişime geçin, sorularınızı yanıtlayalım",
    },
}
