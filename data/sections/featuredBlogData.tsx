import { SectionProps } from "@/types/sectionProps";

export const FeaturedDuyurularData: SectionProps = {
    wrapperCls: "mt-100 section-padding",
    container: "container",
    subheading: "Resmi Duyurular",
    heading: "Son Duyurular",
    button: {
        label: "Tüm Duyurular",
        href: "/blogs/category/duyurular",
        type: "primary"
    },
}

export const FeaturedHaberlerData: SectionProps = {
    wrapperCls: "mt-0 section-padding",
    container: "container",
    subheading: "Güncel Haberler",
    heading: "Son Haberler",
    button: {
        label: "Tüm Haberler",
        href: "/blogs/category/haberler",
        type: "primary"
    },
}

// Legacy export kept for compatibility
export const FeaturedBlogData: SectionProps = FeaturedDuyurularData;
