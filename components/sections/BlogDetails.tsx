import '@/styles/blog.css';
import '@/styles/blog-details.css';
import { ArticleType } from '@/types/article';
import Article from "../Article";
import BlogSidebar from "../BlogSidebar";
import Share from '../Share';
import Icons from '../Icons';
import Link from 'next/link';
import { createHandle } from '@/utils/createHandle';
import DrawerOpener from '../DrawerOpener';

interface BlogDetailsType {
    container: string;
    article: ArticleType;
}

const BlogDetails = ({
    container,
    article
}: BlogDetailsType) => {
    const { tags }: { tags: string[] } = article;
    const tagItems = tags.map((rawTag) => {
        const handle = createHandle(rawTag);
        const label = handle === "haberler" ? "Haber" : handle === "duyurular" ? "Duyuru" : rawTag;
        return { rawTag, label, handle };
    });

    const buildTagHref = (rawTag: string, handle: string) => {
        if (article.category === "Haberler") {
            if (handle === "haberler") return "/blogs/category/haberler";
            return `/blogs/category/haberler?tags=${handle}`;
        }
        if (article.category === "Duyurular") {
            return `/blogs/category/duyurular?q=${encodeURIComponent(rawTag)}`;
        }
        return `/blogs/tags/${handle}`;
    };

    return (
        <div className="page-blog-details mt-100 mb-100">
            <div className={container}>
                <DrawerOpener
                    cls="open-sidebar svg-wrapper text text-20 fw-500 lg:!hidden"
                    data-drawer=".drawer-blog-sidebar"
                    data-aos="fade-up"
                >
                    <Icons.Filter />
                    Filter
                </DrawerOpener>
                <div className="grid grid-cols-12 lg:gap-1">
                    <div className="col-span-12 lg:col-span-7">
                        <Article article={article} />

                        <div className="blog-share" data-aos="fade-up">
                            {tags.length > 0 && 
                                <div className="blog-share-item">
                                    <h2 className="label heading text-16 fw-500">Etiketler:</h2>
                                    <ul className="sidebar-tags list-unstyled">
                                        {tagItems.map((item, index) => (
                                            <li key={`tag-${index}`}>
                                                <Link
                                                    className="subheading subheading-bg text-18"
                                                    href={buildTagHref(item.rawTag, item.handle)}
                                                    aria-label={item.label}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}                                            
                                    </ul>
                                </div>
                            }

                            <div className="blog-share-item">
                                <h2 className="label heading text-16 fw-500">Paylaş:</h2>
                                <Share title={article.title} />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5">
                        <BlogSidebar
                            slug={article.slug}
                            isNewsPage={article.category === "Haberler"}
                            hideTagsSection={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;
