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
            text: "Maslak, Bilim Sk., Sun Plaza, No:5A/40 Sarıyer/İstanbul",
        },
        {
            icon: <Icons.Phone />,
            title: "Telefon",
            text: (
                <>
                                        <a href="tel:+905369768157">+90 536 976 81 57</a><br />
                    <a href="tel:+905309119986">+90 530 911 99 86</a>
                </>
            ),
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
