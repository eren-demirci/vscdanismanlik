import { db } from "@/lib/db";
import { createHandle } from "@/utils/createHandle";
import { ArticleType } from "@/types/article";

type NewsRow = {
  id: number;
  title: string;
  link: string;
  description: string | null;
  content_html: string | null;
  image_url: string | null;
  pub_date: Date | null;
  source: string;
};

function toNewsSlug(title: string, id: number) {
  return `${createHandle(title)}-${id}`;
}

function sourceToLabel(source: string) {
  const normalized = source.trim().toLocaleLowerCase("tr-TR");

  if (normalized.includes("ntv")) return "NTV";
  if (normalized.includes("haberturk") || normalized.includes("habertürk")) {
    return "Habertürk";
  }
  if (normalized.includes("hurriyet") || normalized.includes("hürriyet")) {
    return "Hürriyet";
  }

  return source;
}

function mapNewsRowToArticle(row: NewsRow): ArticleType {
  const sourceLabel = sourceToLabel(row.source);
  return {
    id: row.id,
    title: row.title,
    slug: toNewsSlug(row.title, row.id),
    content: row.content_html ?? row.description ?? "",
    excerpt: row.description ?? undefined,
    category: "Haberler",
    image: row.image_url,
    video: null,
    tags: ["Haberler", sourceLabel],
    comments: 0,
    authorId: null,
    created_at: row.pub_date ? row.pub_date.toISOString() : undefined,
    sourceUrl: row.link,
  };
}

export async function getNewsArticles(limit = 50): Promise<ArticleType[]> {
  const result = await db.query<NewsRow>(
    `
      SELECT id, title, link, description, content_html, image_url, pub_date, source
      FROM news
      ORDER BY pub_date DESC NULLS LAST, created_at DESC
      LIMIT $1
    `,
    [limit],
  );

  return result.rows.map(mapNewsRowToArticle);
}

export async function getNewsArticleBySlug(
  slug: string,
): Promise<ArticleType | null> {
  const match = slug.match(/-(\d+)$/);
  if (!match) return null;

  const id = Number(match[1]);
  if (!Number.isFinite(id)) return null;

  const result = await db.query<NewsRow>(
    `
      SELECT id, title, link, description, content_html, image_url, pub_date, source
      FROM news
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  if (result.rowCount !== 1) return null;
  return mapNewsRowToArticle(result.rows[0]);
}

type SourceRow = {
  source: string;
};

export async function getNewsSourceLabels(): Promise<string[]> {
  const result = await db.query<SourceRow>(
    `
      SELECT DISTINCT source
      FROM news
      WHERE source IS NOT NULL AND TRIM(source) <> ''
      ORDER BY source ASC
    `,
  );

  const labels = Array.from(
    new Set(result.rows.map((row) => sourceToLabel(row.source))),
  );

  return labels;
}
