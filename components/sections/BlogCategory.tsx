import '@/styles/blog.css';
import { AuthorType } from '@/types/author';
import Posts from '@/data/posts.json';
import Authors from '@/data/author.json';
import CardBlog from "../CardBlog";
import { notFound } from 'next/navigation';
import Icons from '../Icons';
import BlogSidebar from '../BlogSidebar';
import { createHandle } from '@/utils/createHandle';
import DrawerOpener from '../DrawerOpener';
import { getNewsArticles } from '@/lib/news';
import { getAnnouncementArticles } from '@/lib/announcements';

const BlogCategory = async ({
    slug,
    query,
    tagsQuery,
}: {
    slug: string;
    query?: string;
    tagsQuery?: string;
}) => {
    const searchTerm = (query ?? "").trim().toLocaleLowerCase("tr-TR");
    const selectedNewsTags = (tagsQuery ?? "")
        .split(",")
        .map((item) => createHandle(item))
        .filter(Boolean);
    const posts = slug === "haberler"
        ? await getNewsArticles(100)
        : slug === "duyurular"
            ? await getAnnouncementArticles()
            : Posts.filter(post => createHandle(post.category) === slug);
    const sourceFilteredPosts = slug === "haberler" && selectedNewsTags.length > 0
        ? posts.filter((article) => {
            const sourceTag = createHandle(article.tags?.[1] ?? "");
            return selectedNewsTags.includes(sourceTag);
        })
        : posts;
    const filteredPosts = searchTerm.length > 0
        ? sourceFilteredPosts.filter((article) => {
            const haystack = [article.title, article.excerpt, article.content]
                .filter(Boolean)
                .join(" ")
                .toLocaleLowerCase("tr-TR");
            return haystack.includes(searchTerm);
        })
        : sourceFilteredPosts;

    const emptyMessage =
        slug === "duyurular"
            ? "Henüz duyuru bulunamadı."
            : slug === "haberler"
                ? "Henüz haber bulunamadı."
                : null;

    return (
        <div className={`page-blog mt-100 mb-100`}>
            <div className="container">
                {filteredPosts.length > 0 ? (
                    <>
                        <DrawerOpener
                            cls="open-sidebar svg-wrapper text text-20 fw-500 lg:!hidden"
                            data-drawer=".drawer-blog-sidebar"
                        >
                            <Icons.Filter />
                            Filter
                        </DrawerOpener>
                        <div className="grid grid-cols-12 lg:gap-1">
                            <div className="col-span-12 lg:col-span-7">
                                <div className="grid grid-cols-12 md:gap-1 product-grid">
                                    {filteredPosts.map((article) => {
                                        const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);

                                        return(
                                            <div
                                                className="col-span-12 md:col-span-12 lg:col-span-12"
                                                data-aos="fade-up"
                                                data-aos-delay="100"
                                                key={`article-${article.id}`}
                                            >
                                                <CardBlog
                                                    article={article}
                                                    width={1000}
                                                    height={707}
                                                    alt="Article image"
                                                    author={author}
                                                    showDate={true}
                                                />
                                            </div>
                                    )})}
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-5">
                                <BlogSidebar
                                    searchQuery={query}
                                    searchAction={`/blogs/category/${slug}`}
                                    isNewsPage={slug === "haberler"}
                                    selectedNewsTags={selectedNewsTags}
                                    hideTagsSection={slug === "duyurular"}
                                />
                            </div>
                        </div>
                    </>
                ) : emptyMessage ? (
                    <p className="text-center text-20 py-20">{emptyMessage}</p>
                ) : (
                    notFound()
                )}
            </div>
        </div>
    )
}

export default BlogCategory;
