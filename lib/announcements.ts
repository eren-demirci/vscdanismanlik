import { promises as fs } from "fs";
import path from "path";
import { createHandle } from "@/utils/createHandle";
import { ArticleType } from "@/types/article";
import { db } from "@/lib/db";

type Frontmatter = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  created_at?: string;
};

const announcementsDir = path.join(process.cwd(), "content", "duyurular");

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function inlineMarkdownToHtml(input: string): string {
  return input
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      html += "</ul>";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>";
      inOl = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeLists();
      continue;
    }

    if (line.startsWith("### ")) {
      closeLists();
      html += `<h3>${inlineMarkdownToHtml(escapeHtml(line.slice(4)))}</h3>`;
      continue;
    }
    if (line.startsWith("## ")) {
      closeLists();
      html += `<h2>${inlineMarkdownToHtml(escapeHtml(line.slice(3)))}</h2>`;
      continue;
    }
    if (line.startsWith("# ")) {
      closeLists();
      html += `<h1>${inlineMarkdownToHtml(escapeHtml(line.slice(2)))}</h1>`;
      continue;
    }

    const ulMatch = line.match(/^- (.+)$/);
    if (ulMatch) {
      if (inOl) {
        html += "</ol>";
        inOl = false;
      }
      if (!inUl) {
        html += "<ul>";
        inUl = true;
      }
      html += `<li>${inlineMarkdownToHtml(escapeHtml(ulMatch[1]))}</li>`;
      continue;
    }

    const olMatch = line.match(/^\d+\. (.+)$/);
    if (olMatch) {
      if (inUl) {
        html += "</ul>";
        inUl = false;
      }
      if (!inOl) {
        html += "<ol>";
        inOl = true;
      }
      html += `<li>${inlineMarkdownToHtml(escapeHtml(olMatch[1]))}</li>`;
      continue;
    }

    closeLists();
    html += `<p>${inlineMarkdownToHtml(escapeHtml(line))}</p>`;
  }

  closeLists();
  return html;
}

function parseFrontmatterLineValue(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseTags(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return [trimmed];
  }

  const inner = trimmed.slice(1, -1);
  return inner
    .split(",")
    .map((item) => parseFrontmatterLineValue(item))
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseAnnouncementMarkdown(fileContent: string): ArticleType {
  const fmMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!fmMatch) {
    throw new Error("Invalid markdown: missing frontmatter");
  }

  const frontmatterText = fmMatch[1];
  const markdownBody = fmMatch[2] ?? "";
  const lines = frontmatterText.split(/\r?\n/);
  const frontmatter: Partial<Frontmatter> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex < 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key === "id") frontmatter.id = Number(parseFrontmatterLineValue(value));
    else if (key === "slug") frontmatter.slug = parseFrontmatterLineValue(value);
    else if (key === "title") frontmatter.title = parseFrontmatterLineValue(value);
    else if (key === "excerpt") frontmatter.excerpt = parseFrontmatterLineValue(value);
    else if (key === "image") frontmatter.image = parseFrontmatterLineValue(value);
    else if (key === "tags") frontmatter.tags = parseTags(value);
    else if (key === "created_at") frontmatter.created_at = parseFrontmatterLineValue(value);
  }

  if (!frontmatter.id || !frontmatter.title) {
    throw new Error("Invalid announcement markdown: id and title are required");
  }

  return {
    id: frontmatter.id,
    title: frontmatter.title,
    slug: frontmatter.slug ?? createHandle(frontmatter.title),
    excerpt: frontmatter.excerpt,
    content: markdownToHtml(markdownBody),
    category: "Duyurular",
    image: frontmatter.image ?? null,
    tags: frontmatter.tags ?? ["Duyurular"],
    comments: 0,
    authorId: null,
    created_at: frontmatter.created_at,
    video: null,
  };
}

const SOURCE_LABELS: Record<string, string> = {
  sgk: "SGK",
  gib: "GİB",
  ticaret: "Ticaret Bakanlığı",
};

type DbDuyuruRow = {
  id: string;
  title: string;
  link: string;
  excerpt: string | null;
  content_html: string | null;
  image_url: string | null;
  pub_date: Date | null;
  source: string;
  created_at: Date;
};

async function getDbDuyurular(): Promise<ArticleType[]> {
  try {
    const result = await db.query<DbDuyuruRow>(
      `SELECT id, title, link, excerpt, content_html, image_url, pub_date, source, created_at
       FROM duyurular
       ORDER BY COALESCE(pub_date, created_at) DESC
       LIMIT 200`,
    );
    return result.rows.map((row) => {
      const sourceLabel = SOURCE_LABELS[row.source] ?? row.source;
      const dbId = Number(row.id);
      const slug = `${createHandle(row.title)}-${dbId}`;
      return {
        id: dbId + 1_000_000, // offset to avoid clash with markdown file IDs
        title: row.title,
        slug,
        excerpt: row.excerpt ?? undefined,
        content: row.content_html ?? "",
        category: "Duyurular",
        image: row.image_url ?? null,
        tags: ["Duyurular", sourceLabel],
        comments: 0,
        authorId: null,
        created_at: (row.pub_date ?? row.created_at).toISOString(),
        video: null,
        sourceUrl: row.link,
      };
    });
  } catch {
    return [];
  }
}

export async function getAnnouncementArticles(): Promise<ArticleType[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(announcementsDir);
  } catch {
    files = [];
  }

  const markdownFiles = files.filter((name) => name.endsWith(".md"));
  const mdAnnouncements = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(announcementsDir, fileName);
      const fileContent = await fs.readFile(filePath, "utf8");
      return parseAnnouncementMarkdown(fileContent);
    })
  );

  const ids = new Set<number>();
  const slugs = new Set<string>();
  for (const item of mdAnnouncements) {
    if (ids.has(item.id)) {
      throw new Error(`Duplicate announcement id detected: ${item.id}`);
    }
    if (item.slug && slugs.has(item.slug)) {
      throw new Error(`Duplicate announcement slug detected: ${item.slug}`);
    }
    ids.add(item.id);
    if (item.slug) slugs.add(item.slug);
  }

  const dbAnnouncements = await getDbDuyurular();

  const allItems = [...mdAnnouncements, ...dbAnnouncements];

  return allItems.sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (aTime === bTime) return b.id - a.id;
    return bTime - aTime;
  });
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<ArticleType | null> {
  const items = await getAnnouncementArticles();
  return items.find((item) => item.slug === slug) ?? null;
}
