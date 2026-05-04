import { BannerSliderType } from "@/types/bannerSlider";
import { BannerSlides } from '@/data/sections/heroSliderData';
import BannerSliderImage from "@/public/img/slider/slider-bg.jpg";

export const BannerWithSliderData: BannerSliderType = {
    wrapperCls: "with-floating-header",
    backgroundImage: BannerSliderImage.src,
    subheading: "VSC Danışmanlık A.Ş.",
    heading: "Geleceğe Güçlü, Şeffaf ve Sürdürülebilir Adımlarla",
    styledText: "Sürdürülebilir",
    text: "Sürdürülebilirlik, kurumsal finans, vergi, denetim ve yönetim danışmanlığında bütüncül çözümler. Stratejik bakış açısı, güvenilir iş ortaklığı.",
    phone: "0555 555 55 55",
    button: {
        label: "Hizmetlerimiz",
        href: "/services",
        type: "primary"
    },
    logoIconName: "LogoRotate",
    slides: BannerSlides,
    navigation: true,
}
