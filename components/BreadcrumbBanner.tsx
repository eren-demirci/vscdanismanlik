import Link from "next/link";
import '@/styles/page-banner.css';
import Icons from "./Icons";
import { BreadcrumbType } from "@/types/breadcrumb";

const BreadcrumbBanner = ({
    title,
    breadcrumbTitle,
    variant = "premium",
}: BreadcrumbType) => {
    return (
        <div className={`page-banner overlay ${variant === "premium" ? "page-banner-premium" : ""}`}>            
            
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
