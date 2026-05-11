import "@/styles/blog.css";
import "@/styles/featured-blog.css";
import { SectionProps } from "@/types/sectionProps";
import { AuthorType } from "@/types/author";
import { ArticleType } from "@/types/article";

import Authors from "@/data/author.json";
import CardBlog from "../CardBlog";

import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { getNewsArticles } from "@/lib/news";
import { getAnnouncementArticles } from "@/lib/announcements";

type FeaturedBlogMode = "duyurular" | "haberler" | "both";

function sortByDateDesc(posts: ArticleType[]): ArticleType[] {
  return [...posts].sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (aTime === bTime) return b.id - a.id;
    return bTime - aTime;
  });
}

const FeaturedBlog = async ({ data, mode = "both" }: { data: SectionProps; mode?: FeaturedBlogMode }) => {
  let posts: ArticleType[] = [];

  if (mode === "duyurular") {
    const result = await Promise.allSettled([getAnnouncementArticles()]);
    const announcements = result[0].status === "fulfilled" ? result[0].value : [];
    posts = sortByDateDesc(announcements).slice(0, 3);
  } else if (mode === "haberler") {
    const result = await Promise.allSettled([getNewsArticles(6)]);
    const news = result[0].status === "fulfilled" ? result[0].value : [];
    posts = sortByDateDesc(news).slice(0, 3);
  } else {
    const [newsResult, announcementsResult] = await Promise.allSettled([
      getNewsArticles(6),
      getAnnouncementArticles(),
    ]);
    const news = newsResult.status === "fulfilled" ? newsResult.value : [];
    const announcements = announcementsResult.status === "fulfilled" ? announcementsResult.value : [];
    posts = sortByDateDesc([...announcements, ...news]).slice(0, 3);
  }

  if (posts.length === 0) return null;

  const { wrapperCls, container, subheading, heading, button } = data || {};

  return (
    <div className={`featured-blog ${wrapperCls}`}>
      <div className={container}>
        <div className="section-headings text-center">
          {subheading && <Subheading title={subheading} cls="text-20" aos="fade-up" />}
          {heading && <Heading title={heading} cls="text-50" aos="fade-up" />}
        </div>

        <div className="section-content">
          <div className="grid grid-cols-12 md:gap-1 product-grid justify-center">
            {posts.map((article) => {
              const author: AuthorType | undefined = Authors.find(
                (item: AuthorType) => item.id === article.authorId,
              );

              return (
                <div
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                  data-aos="fade-up"
                  key={`article-${article.id}-${article.slug ?? article.title}`}
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
              );
            })}
          </div>

          {button && (
            <div className="buttons buttons-discover" data-aos="fade-up">
              {button.type == "primary" && (
                <PrimaryButton label={button.label} href={button.href} ariaLabel={button.label} />
              )}

              {button.type == "secondary" && (
                <SecondaryButton label={button.label} href={button.href} ariaLabel={button.label} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
