import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";

export const ImageText2Data: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Hakkımızda",
    heading: "Farklı Uzmanlıkları Tek Çatı Altında Buluşturuyoruz",
    text: "VSC Danışmanlık A.Ş., farklı sektörlerde derin uzmanlık ve deneyime sahip ortaklarının bir araya gelmesiyle kurulmuştur. Değer odaklı yaklaşımımız ve güvenilir iş ortaklığı anlayışımızla müşterilerimizin uzun vadeli hedeflerine ulaşmalarını destekliyoruz.",
    textList: [
        {
            icon: <Icons.Ambition />,
            title: "Misyonumuz",
            text: "Şirketlerin bugünkü performansını güçlendirirken geleceğe daha dirençli ve şeffaf bir yapıyla ilerlemelerine rehberlik etmek."
        },
        {
            icon: <Icons.Purpose />,
            title: "Vizyonumuz",
            text: "Değer odaklı yaklaşım ve analitik bakış açısıyla müşterilerimizin kalıcı değer yaratmasına katkı sağlamak."
        }
    ],
    button: {
        label: "Daha Fazla Bilgi",
        href: "/about-us",
        type: "primary"
    },
    imageList: [
        {
            src: "/img/vsc/home-about-document-review.jpg",
            width: 992,
            height: 863,
            alt: 'VSC Danışmanlık',
            loading: 'lazy',
            objectFit: 'cover',
            objectPosition: 'center center'
        },
        {
            src: "/img/vsc/home-about-signature-detail.jpg",
            width: 195,
            height: 202,
            alt: 'VSC Danışmanlık',
            loading: 'lazy',
            objectFit: 'cover',
            objectPosition: 'center center'
        }
    ]
}
