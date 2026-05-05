export interface ServiceListProps {
    title: string;
}

export interface ServiceFaqProps {
    title: string;
    text: string;
}

export interface ServiceProps {
    id: number;
    slug?: string;
    image?: string;
    icon?: string;
    title?: string;
    description?: string;
    content?: string;
    brochure_url?: string;
    brochure_label?: string;
    list?: ServiceListProps[];
    faqs?: ServiceFaqProps[];
    created_at?: string;
}

export interface ServiceDataType {
    data: ServiceProps;
}
