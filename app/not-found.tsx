import '@/styles/error.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import Icons from '@/components/Icons';

const PAGE_TITLE: string = 'Sayfa Bulunamadı';

export const metadata: Metadata = {
  title: PAGE_TITLE,
}

export default function NotFound() {
    return (
        <>
            <BreadcrumbBanner
                title={PAGE_TITLE}
                image={{
                    src: BreadcrumbBannerImage.src,
                    srcMobile: BreadcrumbBannerImageTablet.src,
                    srcTablet: BreadcrumbBannerImageMobile.src,
                    width: 1920,
                    height: 520,
                    cls: "media media-bg",
                    alt: "Banner Görseli",
                    loading: "eager"
                }}
            />

            <div className="section-error section-padding">
              <div className="container">
                <div className="section-headings text-center">
                  <p className="text text-18" data-aos="fade-up">
                    Aradığınız sayfa bulunamadı. Ana sayfaya dönerek devam edebilir ya da{' '}
                    <a href="mailto:info@vscdanismanlik.com">info@vscdanismanlik.com</a>{' '}
                    adresinden bize ulaşabilirsiniz.
                  </p>

                  <div className="buttons" data-aos="fade-up">
                    <Link
                      href="/"
                      className="button button--primary"
                      aria-label="Ana Sayfaya Dön"
                    >
                      Ana Sayfaya Dön
                      <span className="svg-wrapper">
                        <Icons.ArrowCircle />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </>
    )
}