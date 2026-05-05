import { 
    QuickLink,
    Services,
    Information
} from "@/data/footerMenuList";

import FooterBrand from "./FooterBrand";
import FooterMenu from "./FooterMenu";

interface FooterTopProps {
    container: string;
}

const FooterTop = ({
    container,
}: FooterTopProps) => {
    return (
        <div className="footer-top">
          <div className={container}>
            <div className="grid max-lg:grid-cols-12 md:max-lg:gap-x-3 footer-custom-row">
              <div className="max-md:col-span-12 max-lg:col-span-6">
                <FooterBrand />
              </div>
              <div className="max-md:col-span-12 max-lg:col-span-6">
                <FooterMenu
                    heading="Hızlı Bağlantılar"
                    menus={QuickLink}
                />
              </div>
              <div className="max-md:col-span-12 max-lg:col-span-6">
                <div
                  className="footer-widget footer-widget-menu"
                  data-aos="fade-up"
                  data-aos-anchor=".footer-top"
                >
                    <FooterMenu
                        heading="Hizmetlerimiz"
                        menus={Services}
                    />
                </div>
              </div>
              <div className="max-md:col-span-12 max-lg:col-span-6">
                <div
                  className="footer-widget footer-widget-menu"
                  data-aos="fade-up"
                  data-aos-anchor=".footer-top"
                >
                    <FooterMenu
                        heading="Kurumsal"
                        menus={Information}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default FooterTop;