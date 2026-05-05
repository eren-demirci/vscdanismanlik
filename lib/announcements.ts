import { promises as fs } from "fs";
import path from "path";
import { createHandle } from "@/utils/createHandle";
import { ArticleType } from "@/types/article";

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

export async function getAnnouncementArticles(): Promise<ArticleType[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(announcementsDir);
  } catch {
    return [];
  }

  const markdownFiles = files.filter((name) => name.endsWith(".md"));
  const announcements = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(announcementsDir, fileName);
      const fileContent = await fs.readFile(filePath, "utf8");
      return parseAnnouncementMarkdown(fileContent);
    })
  );

  const ids = new Set<number>();
  const slugs = new Set<string>();
  for (const item of announcements) {
    if (ids.has(item.id)) {
      throw new Error(`Duplicate announcement id detected: ${item.id}`);
    }
    if (item.slug && slugs.has(item.slug)) {
      throw new Error(`Duplicate announcement slug detected: ${item.slug}`);
    }
    ids.add(item.id);
    if (item.slug) slugs.add(item.slug);
  }

  return announcements.sort((a, b) => {
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
