import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.png";
import Social from "./Social";

const FooterBrand = () => {
    return (
        <div
            className="footer-widget footer-widget-brand"
            data-aos="fade-up"
            data-aos-anchor=".footer-top"
        >
            <Logo
                src={"/logo.svg"}
                width={189}
                height={32}
                url="/"
                cls="footer-logo"
                alt="VSC Danışmanlık logo"
                ariaLabel="VSC Danışmanlık logo"
                loading="lazy"
            />
            <p className="text text-16">
                Sürdürülebilirlik, kurumsal finansman, vergi, denetim ve yönetim danışmanlığında güvenilir iş ortağınız.
            </p>
            <Social 
                wrapperCls="social-icons"
                aos="fade-up"
                aosAnchor=".footer-top"
            />
        </div>
    )
}

export default FooterBrand;