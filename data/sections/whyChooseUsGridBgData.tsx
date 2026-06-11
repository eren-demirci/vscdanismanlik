import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsBg from "@/public/img/image-text/img1.png";
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
        src: "/img/vsc/about-workspace-wide.jpg",
        srcMobile: "/img/vsc/about-workspace-wide.jpg",
        width: 1000,
        height: 742,
        loading: "lazy",
        alt: "VSC Danışmanlık çalışma alanı",
        objectFit: "cover",
        objectPosition: "center center"
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
        src: "/img/vsc/about-workspace-document.jpg",
        width: 800,
        height: 834,
        loading: "lazy",
        alt: "VSC Danışmanlık doküman inceleme",
        objectFit: "cover",
        objectPosition: "center center"
    },
}
