import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsBg from "@/public/img/image-text/img1.png";
import WhyChooseUsImage from "@/public/img/why-choose-us/1.jpg";
import WhyChooseUsImageMobile from "@/public/img/why-choose-us/575.jpg";
import PromoImage from "@/public/img/why-choose-us/2.jpg";
import Icons from "@/components/Icons";

export const WhyChooseUsGridBgData: SectionProps = {
    wrapperCls: "!bg-transparent mt-100 section-padding",
    container: "container",
    backgroundImage: {
        src: WhyChooseUsBg.src,
        width: 1920,
        height: 887,
        loading: "lazy",
        alt: "Background image"
    },
    image: {
        src: WhyChooseUsImage.src,
        srcMobile: WhyChooseUsImageMobile.src,
        width: 1000,
        height: 742,
        loading: "lazy",
        alt: "Choose us image"
    },
    subheading: "Neden Biz?",
    heading: "Stratejik Ortaklık, Kalıcı Değer",
    text: "Müşterilerimizin yalnızca mevcut ihtiyaçlarına yanıt vermekle kalmıyor, uzun vadeli hedeflerine ulaşmalarını destekleyecek güçlü ve sürdürülebilir iş modelleri oluşturmalarına katkı sağlıyoruz.",
    button: {
        label: "İletişime Geçin",
        href: "/contact-us",
        type: "primary"
    },
    rotatingLogo: {
        logo: <Icons.ChooseRotatingLogo />,
        text: "∞",
    },
    promotions: [
        {
            icon: <Icons.Mission />,
            title: "Misyonumuz",
            text: "Değer odaklı yaklaşım ve analitik bakış açısıyla müşterilerimize kalıcı değer yaratmak.",
        },
        {
            icon: <Icons.Vision />,
            title: "Vizyonumuz",
            text: "Türkiye'nin lider çok disiplinli danışmanlık grubu olmak; şeffaflık ve sürdürülebilirlik ilkeleriyle büyümek.",
        },
        {
            icon: <Icons.Awards />,
            title: "Değerlerimiz",
            text: "Güvenilirlik, bağımsızlık ve uzman iş ortaklığı anlayışıyla her müşteriye özel çözümler.",
        },
    ],
    promoImage: {
        src: PromoImage.src,
        width: 800,
        height: 834,
        loading: "lazy",
        alt: "Choose us image"
    },
}