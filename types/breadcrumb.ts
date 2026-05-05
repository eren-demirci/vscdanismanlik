import { ImageProps } from "./image";

export interface BreadcrumbType {
    title: string;
    breadcrumbTitle?: string;
    image?: ImageProps;
    variant?: "default" | "premium";
}
