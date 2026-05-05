import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import { createHandle } from '@/utils/createHandle';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BlogCategory from '@/components/sections/BlogCategory';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ q?: string; tags?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const handle = createHandle(slug);

  return {
    title: handle === "haberler" ? "Haberler" : handle === "duyurular" ? "Duyurular" : "Category",
  };
}

const Page = async ({ params, searchParams }: CategoryPageProps) => {
    const { slug } = await params;
    const { q, tags } = searchParams ? await searchParams : { q: "", tags: "" };
    const handle = createHandle(slug);
    const pageTitle = handle === "haberler" ? "Haberler" : handle === "duyurular" ? "Duyurular" : "Category";

    return (
        <>
            <BreadcrumbBanner 
                title={pageTitle}
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
            <BlogCategory slug={handle} query={q} tagsQuery={tags} />
        </>
    )
}

export default Page;
