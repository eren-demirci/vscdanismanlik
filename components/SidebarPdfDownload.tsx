import Icons from "./Icons";
import Link from "next/link";
import { PDFDownloadType } from "@/types/pdfDownload";

const SidebarPdfDownload = ({
    heading,
    text,
    href,
    buttonLabel,
}: PDFDownloadType) => {
    return (
        <div className="sidebar-widget radius18" data-aos="fade-up">
            <div className="service-download">
                {heading && <h2 className="heading text-24">{heading}</h2>}

                <div className="service-download">
                    <span className="svg-wrapper icon-50">
                        <Icons.Pdf />
                    </span>

                    <div className="download-text">
                        {text && <div className="text text-16">{text}</div>}
                        
                        <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-button text text-14 fw-600"
                            aria-label="download"
                        >
                            {buttonLabel || "Click here to download"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarPdfDownload;
