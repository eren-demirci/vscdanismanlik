import { SectionProps } from "@/types/sectionProps";
import BackgroundImage from '@/public/img/contact/contact-bg.jpg';

export const OurServicesData: SectionProps = {
    wrapperCls: "mt-100 section-padding",
    container: "container",
    backgroundImage: {
        src: BackgroundImage.src,
        width: 1920,
        height: 883,
        alt: "Hizmetler arka plan görseli",
        loading: "lazy"
    },
    subheading: "Hizmetlerimiz",
    heading: "Bütüncül ve Katma Değer Yaratan Danışmanlık Hizmetleri",
    button: {
        label: "Tüm Hizmetler",
        href: "/services",
        type: "primary"
    },
}
