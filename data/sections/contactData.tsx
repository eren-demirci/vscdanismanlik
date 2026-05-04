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
            icon: <Icons.ThumbsUp />,
            title: "7 Hizmet Alanı",
            text: "Sürdürülebilirlik'ten yönetim danışmanlığına geniş bir uzmanlık yelpazesi",
        },
        {
            icon: <Icons.Support />,
            title: "2026'dan Beri Aktif",
            text: "Deneyimli ortaklardan oluşan güçlü bir danışmanlık grubu",
        },
    ],
    block: {
        heading: "Randevu Alın",
        text: "Bizimle iletişime geçin, sorularınızı yanıtlayalım",
    },
}
