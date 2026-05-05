import Icons from "./Icons";
import SidebarSearch from "./SidebarSearch";
import SidebarCategories from "./SidebarCategories";
import RecentPost from "./RecentPost";
import SidebarTags from "./SidebarTags";
import Posts from "@/data/posts.json";
import DrawerOpener from "./DrawerOpener";
import { getAllServices } from "@/lib/services";
import { getNewsArticles, getNewsSourceLabels } from "@/lib/news";
import { createHandle } from "@/utils/createHandle";
import { getAnnouncementArticles } from "@/lib/announcements";

interface BlogSidebarType {
    slug?: string;
    searchQuery?: string;
    searchAction?: string;
    isNewsPage?: boolean;
    selectedNewsTags?: string[];
    hideTagsSection?: boolean;
}

const BlogSidebar = async ({
    slug,
    searchQuery,
    searchAction,
    isNewsPage,
    selectedNewsTags = [],
    hideTagsSection = false,
}: BlogSidebarType) => {
    const posts = Posts;
    const defaultTags: string[] = Array.from(new Set(posts.flatMap(post => post.tags)));
    const services = await getAllServices();
    const newsSources = isNewsPage ? await getNewsSourceLabels() : [];
    const recentNews = !isNewsPage ? await getNewsArticles(3) : [];
    const recentAnnouncements = isNewsPage ? await getAnnouncementArticles() : [];
    const crossPosts = isNewsPage ? recentAnnouncements.slice(0, 3) : recentNews;
    const tags = isNewsPage && newsSources.length > 0 ? newsSources : defaultTags;
    const serviceCategories = services
        .filter((service) => Boolean(service.title && service.slug))
        .map((service) => ({
            label: service.title as string,
            slug: service.slug as string,
        }));

    const buildNewsTagHref = (tag: string) => {
        const handle = createHandle(tag);
        const selected = new Set(selectedNewsTags);
        if (selected.has(handle)) {
            selected.delete(handle);
        } else {
            selected.add(handle);
        }

        const joined = Array.from(selected).join(",");
        const params = new URLSearchParams();
        if (searchQuery?.trim()) params.set("q", searchQuery.trim());
        if (joined) params.set("tags", joined);
        const qs = params.toString();
        return qs ? `/blogs/category/haberler?${qs}` : "/blogs/category/haberler";
    };

    return(
        <div className="sidebar-filter drawer-blog-sidebar">
            <div className="drawer-headings lg:!hidden" data-aos="fade-up">
                <div className="heading text-24">Filter</div>
                <DrawerOpener
                    cls="svg-wrapper menu-close"
                    data-drawer=".drawer-blog-sidebar"
                >
                    <Icons.CloseCircle />
                </DrawerOpener>
            </div>
            <aside className="blog-sidebar">
                <SidebarSearch 
                    id="blog-search-input"
                    title="Burada Ara"
                    label="Haberlerde ara"
                    placeholder="Haberlerde ara"
                    name="q"
                    action={searchAction}
                    defaultValue={searchQuery}
                />

                {serviceCategories.length > 0 &&
                    <SidebarCategories 
                        title="Hizmetlerimiz"
                        categories={serviceCategories}
                        rootUrl="/services"
                    />
                }

                {!hideTagsSection && tags.length > 0 &&
                    <SidebarTags
                        title={isNewsPage ? "Kaynaklar" : "Etiketler"} 
                        tags={tags}
                        rootUrl={isNewsPage ? "/blogs/category/haberler" : "/blogs/tags"}
                        getHref={isNewsPage ? buildNewsTagHref : undefined}
                    />
                }

                <RecentPost
                    title={isNewsPage ? "Güncel Duyurular" : "Son Haberler"}
                    slug={slug}
                    posts={crossPosts}
                />
            </aside>
        </div>
    )
}

export default BlogSidebar;
