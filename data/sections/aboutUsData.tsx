import { SectionProps } from "@/types/sectionProps";
import ImageDesktop from "@/public/img/slider/hero-2.jpg";
import ImageTablet from "@/public/img/slider/hero2-991.jpg";
import ImageMobile from "@/public/img/slider/hero2-575.jpg";

export const AboutData: SectionProps = {
    container: "container-fluid",
    subheading: "Hakkımızda",
    heading: "Farklı Uzmanlıkları Tek Çatı Altında Buluşturuyoruz",
    text: "VSC Danışmanlık A.Ş., farklı sektörlerde derin uzmanlık ve deneyime sahip ortaklarının bir araya gelmesiyle 2026 yılında kurulmuştur. Sürdürülebilirlik, kurumsal finans, mali müşavirlik, muhasebe ve vergi alanlarında bütüncül ve katma değer yaratan hizmetler sunmayı amaçlayan şirketimiz; değişen iş dünyasının dinamiklerine uyum sağlayan, stratejik bakış açısına sahip çözümler geliştirmektedir.",
    button: {
        label: "Daha Fazla Bilgi",
        href: "/about-us",
        type: "primary"
    },
    image: {
        src: ImageDesktop.src,
        srcTablet: ImageTablet.src,
        srcMobile: ImageMobile.src,
        width: 1920,
        height: 1000,
        alt: "VSC Danışmanlık",
        loading: "lazy",
    }
}
