import { SectionProps } from "@/types/sectionProps";
export const ImageTextData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Hakkımızda",
    heading: "Farklı Uzmanlıkları Tek Çatı Altında Buluşturuyoruz",
    text: "VSC Danışmanlık A.Ş., farklı sektörlerde derin uzmanlık ve deneyime sahip ortaklarının bir araya gelmesiyle kurulmuştur. Amacımız; şirketlerin bugünkü performanslarını güçlendirirken, geleceğe daha dirençli, şeffaf ve sürdürülebilir bir yapıyla ilerlemelerine rehberlik etmektir.",
    button: {
        label: "İletişime Geçin",
        href: "/contact-us",
        type: "primary"
    },
    image: {
        src: "/img/vsc/about-meeting-room.jpg",
        width: 992,
        height: 863,
        alt: 'VSC Danışmanlık',
        loading: 'lazy',
        objectFit: 'cover',
        objectPosition: 'center center'
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
