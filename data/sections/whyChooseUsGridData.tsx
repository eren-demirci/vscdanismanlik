import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";

export const WhyChooseUsGridData: SectionProps = {
    wrapperCls: "mt-100 section-padding",
    container: "container",
    image: {
        src: "/ai-generated/modern-istanbul-consulting-firm-office-i_9_bo4yCvTYualLYYC2c2UQ_GXKWuC9nToqbLA7UBntobg_cover_sd.jpeg",
        srcMobile: "/ai-generated/modern-istanbul-consulting-firm-office-i_9_bo4yCvTYualLYYC2c2UQ_GXKWuC9nToqbLA7UBntobg_cover_sd.jpeg",
        width: 1000,
        height: 742,
        loading: "lazy",
        alt: "VSC Danışmanlık ofis"
    },
    subheading: "Neden VSC?",
    heading: "Stratejik Danışmanlıkta Güvenilir İş Ortağınız",
    text: "VSC Danışmanlık Grubu olarak, ortaklarımızın farklı kurumsal yapılarda edindiği bilgi birikimini ve saha deneyimini tek bir çatı altında birleştiriyoruz.",
    button: {
        label: "Daha Fazla Bilgi",
        href: "/about-us",
        type: "primary"
    },
    rotatingLogo: {
        logo: <Icons.ChooseRotatingLogo />,
        text: "7+",
    },
    promotions: [
        {
            icon: <Icons.Mission />,
            title: "Misyonumuz",
            text: "Şirketlerin bugünkü performansını güçlendirirken geleceğe daha dirençli ve şeffaf yapıyla ilerlemelerine rehberlik etmek.",
        },
        {
            icon: <Icons.Vision />,
            title: "Vizyonumuz",
            text: "Değer odaklı yaklaşım ve analitik bakış açısıyla müşterilerimizin kalıcı değer yaratmasına katkı sağlamak.",
        },
        {
            icon: <Icons.Awards />,
            title: "Uzmanlığımız",
            text: "Sürdürülebilirlik'ten kurumsal finansa, vergi danışmanlığından yönetim danışmanlığına geniş uzmanlık yelpazesi.",
        },
    ],
    promoImage: {
        src: "/ai-generated/professional-business-meeting-in-modern-_cdKaNB6PRVCN38XuyqFKdw_aocR0YSfRTCW7dMk6XScWw_sd.jpeg",
        width: 800,
        height: 834,
        loading: "lazy",
        alt: "VSC Danışmanlık ekip toplantısı"
    },
}