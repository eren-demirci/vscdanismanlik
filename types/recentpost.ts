import { ArticleType } from "./article";

export interface RecentPostType {
  title: string;
  slug?: string;
  posts?: ArticleType[];
}
