export interface SidebarCategoryItem {
    label: string;
    slug: string;
}

export interface CategoriesType {
    title?: string;
    categories: Array<string | SidebarCategoryItem>;
    rootUrl: string;
}
