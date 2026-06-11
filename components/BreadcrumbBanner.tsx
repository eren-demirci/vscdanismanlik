import Link from "next/link";
import Image from "next/image";
import '@/styles/page-banner.css';
import Icons from "./Icons";
import { BreadcrumbType } from "@/types/breadcrumb";

const BreadcrumbBanner = ({
    title,
    breadcrumbTitle,
    image,
    variant = "premium",
}: BreadcrumbType) => {
    return (
        <div className={`page-banner overlay ${variant === "premium" ? "page-banner-premium" : ""}`}>
            {image && (
                <picture className="page-banner-media">
                    {image.srcMobile && <source media="(max-width: 575px)" srcSet={image.srcMobile} />}
                    {image.srcTablet && <source media="(max-width: 991px)" srcSet={image.srcTablet} />}
                    <Image
                        src={image.src}
                        width={image.width ?? 1920}
                        height={image.height ?? 520}
                        loading={image.loading ?? "eager"}
                        alt={image.alt ?? title}
                        style={{
                            objectFit: image.objectFit ?? "cover",
                            objectPosition: image.objectPosition,
                        }}
                    />
                </picture>
            )}
            <div className="page-banner-content">
                <div className="container text-center">
                    <h1 
                        className="heading text-80 fw-700" 
                        data-aos="fade-up"
                    >
                        {title}
                    </h1>
                    <ul
                        className="breadcrumb list-unstyled"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <li>
                            <Link
                                href="/"
                                className="text text-18"
                                aria-label="Home Page"
                            >
                                Ana Sayfa
                            </Link>
                        </li>
                        <li><Icons.ChevronRight /></li>
                        <li>
                            <a role="link" aria-disabled="true" className="text text-18 active">
                                {breadcrumbTitle ?? title}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
    )
}

export default BreadcrumbBanner;
