import FooterTop3 from "./FooterTop3";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyle3 = ({ container }: FooterProps) => {
    return (
        <div className="footer-main footer-2">
            <FooterTop3 container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyle3;
