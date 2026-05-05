import { SectionProps } from "@/types/sectionProps";
import Image1 from '@/public/img/why-choose-us/bg.jpg';

export const ImageTextData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Hakkımızda",
    heading: "Farklı Uzmanlıkları Tek Çatı Altında Buluşturuyoruz",
    text: "VSC Danışmanlık A.Ş., farklı sektörlerde derin uzmanlık ve deneyime sahip ortaklarının bir araya gelmesiyle 2026 yılında kurulmuştur. Amacımız; şirketlerin bugünkü performanslarını güçlendirirken, geleceğe daha dirençli, şeffaf ve sürdürülebilir bir yapıyla ilerlemelerine rehberlik etmektir.",
    button: {
        label: "İletişime Geçin",
        href: "/contact-us",
        type: "primary"
    },
    image: {
        src: Image1.src,
        width: 992,
        height: 863,
        alt: 'VSC Danışmanlık',
        loading: 'lazy'
    },
    textList: [
        {
            text: "Sürdürülebilirlik, kurumsal finans ve vergi alanlarında bütüncül hizmet"
        },
        {
            text: "Değer odaklı yaklaşım ve analitik bakış açısı"
        },
        {
            text: "Güvenilir iş ortaklığı anlayışıyla uzun vadeli çözümler"
        }
    ]
}
