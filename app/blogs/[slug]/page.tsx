import type { Metadata } from 'next';
import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import BlogDetails from '@/components/sections/BlogDetails';
import { ArticleType } from '@/types/article';
import { notFound } from 'next/navigation';
import { getNewsArticleBySlug } from '@/lib/news';
import { getAnnouncementBySlug } from '@/lib/announcements';

async function getArticleBySlug(slug: string): Promise<ArticleType | undefined> {
    const newsArticle = await getNewsArticleBySlug(slug);
    const announcementArticle = newsArticle ? null : await getAnnouncementBySlug(slug);
    return newsArticle ?? announcementArticle ?? undefined;
}

function getDetailTitleByCategory(category?: string) {
    if (category === "Haberler") return "Haber Detayları";
    if (category === "Duyurular") return "Duyuru Detayları";
    return "Blog Detayları";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article ? getDetailTitleByCategory(article.category) : "Blog Detayları",
  };
}

const Page = async ({ params }: {params: Promise<{slug: string}>}) => {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
      return notFound();
    }

    const pageTitle = getDetailTitleByCategory(article.category);

    return (
        <>
            <BreadcrumbBanner 
                title={pageTitle}
                breadcrumbTitle={article.title}
                image={{
                    src: BreadcrumbBannerImage.src,
                    srcMobile: BreadcrumbBannerImageTablet.src,
                    srcTablet: BreadcrumbBannerImageMobile.src,
                    width: 1920,
                    height: 520,
                    cls: "media media-bg",
                    alt: "Banner Image",
                    loading: "eager"
                }}
            />
            <BlogDetails container="container" article={article} />
        </>
    )
}

export default Page;
