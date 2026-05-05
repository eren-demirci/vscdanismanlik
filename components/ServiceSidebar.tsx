import Icons from "./Icons";
import SidebarPhoneImage from "@/public/img/service/secvice-contact.jpg";
import { getAllServices } from "@/lib/services";

import SidebarCategories from "./SidebarCategories";
import SidebarPhone from "./SidebarPhone";
import SidebarPdfDownload from "./SidebarPdfDownload";
import DrawerOpener from "./DrawerOpener";
import type { SidebarCategoryItem } from "@/types/categories";


const ServiceSidebar = async ({ slug }: {slug?: string;}) => {
    const services = await getAllServices();
    const filteredServices = services.filter(item => item.slug != slug);
    const currentService = services.find((item) => item.slug === slug);
    const brochureUrl = currentService?.brochure_url?.trim();
    const categories: SidebarCategoryItem[] = filteredServices
        .filter((service): service is typeof service & { title: string; slug: string } => Boolean(service.title && service.slug))
        .map((service) => ({
            label: service.title,
            slug: service.slug,
        }));

    return (
        <div className="sidebar-filter drawer-service-sidebar">
            <div className="drawer-headings lg:!hidden" data-aos="fade-up">
                <div className="heading text-24">Filter</div>
                <DrawerOpener
                    cls="svg-wrapper menu-close"
                    data-drawer=".drawer-service-sidebar"
                >
                    <Icons.CloseCircle />
                </DrawerOpener>
            </div>

            <aside className="service-sidebar">
                {categories.length > 0 &&
                    <SidebarCategories 
                        title="Hizmet Listesi"
                        categories={categories}
                        rootUrl="/services"
                    />
                }

                <SidebarPhone
                    heading="Danışmanlık için <br/> bize ulaşın"
                    text="Uzman desteği için hemen arayın"
                    phone="0555 555 55 55"
                    image={{
                        src: SidebarPhoneImage.src,                      
                        width: 1000,
                        height: 929,
                        loading: "lazy",
                        alt: "image"
                    }}
                />
                
                {brochureUrl ? (
                    <SidebarPdfDownload
                        heading="Download Our Brochures"
                        text="Business is a marketing discipline focused on growing visibility organ (non-paid) technic required."
                        href={brochureUrl}
                        buttonLabel={currentService?.brochure_label}
                    />
                ) : null}
            </aside>
        </div>
    )
}

export default ServiceSidebar;
