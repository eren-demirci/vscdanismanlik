import FooterTop4 from "./FooterTop4";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyle4 = ({ container }: FooterProps) => {
    return (
        <div className="footer-main footer-2 mt-100">
            <FooterTop4 container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyle4;
