import FooterContact from "./FooterContact";
import FooterContactImage from "@/public/img/contact/contact.jpg";
import FooterContactBgImage from "@/public/img/contact/contact-bg.jpg";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyle1 = ({ container }: FooterProps) => {
    return (
        <>
            <div
                className="footer-main"
            >
                <FooterTop container={container} />
                <FooterBottom container={container} />
            </div></>
    )
}

export default FooterStyle1;