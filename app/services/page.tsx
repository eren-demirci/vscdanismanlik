import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import { ContactData } from '@/data/sections/contactData';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import Services from '@/components/sections/Services';
import ContactSection from '@/components/sections/Contact';

const PAGE_TITLE: string = 'Hizmetlerimiz';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const PageServices = () => {
    return(
        <>
            {/* Breadcrumb Banner */}
            <BreadcrumbBanner
                title={PAGE_TITLE}
                image={{
                    src: BreadcrumbBannerImage.src,
                    srcMobile: BreadcrumbBannerImageTablet.src,
                    srcTablet: BreadcrumbBannerImageMobile.src,
                    width: 1920,
                    height: 520,
                    cls: "media media-bg",
                    alt: "Banner Image",
                    loading: "eager"
                }}
            />

            {/* Service Cards */}
            <Services
                wrapperCls="mt-100"
                container="container"
            />

            {/* Contact */}
            <ContactSection data={ContactData} />
        </>
    )
}

export default PageServices;
