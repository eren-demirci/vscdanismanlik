import FooterTop2 from "./FooterTop2";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyle2 = ({ container }: FooterProps) => {
    return (
        <div className="footer-main">
            <FooterTop2 container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyle2;
