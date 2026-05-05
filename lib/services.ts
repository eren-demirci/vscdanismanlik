import { promises as fs } from "fs";
import path from "path";
import type { ServiceProps } from "@/types/service";

type Frontmatter = {
  id: number;
  slug: string;
  title: string;
  icon?: string;
  image?: string;
  description?: string;
  list?: { title: string }[];
  created_at?: string;
};

const servicesDir = path.join(process.cwd(), "content", "services");

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function inlineMarkdownToHtml(input: string): string {
  return input.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
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

function parseServiceMarkdown(fileContent: string): ServiceProps {
  const fmMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!fmMatch) {
    throw new Error("Invalid markdown: missing frontmatter");
  }

  const frontmatterText = fmMatch[1];
  const markdownBody = fmMatch[2] ?? "";
  const lines = frontmatterText.split(/\r?\n/);

  const frontmatter: Partial<Frontmatter> = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();
    if (!line || line.startsWith("#")) {
      i += 1;
      continue;
    }

    if (line.startsWith("list:")) {
      const list: { title: string }[] = [];
      i += 1;
      while (i < lines.length && lines[i].trimStart().startsWith("- title:")) {
        const titleRaw = lines[i].split("- title:")[1] ?? "";
        list.push({ title: parseFrontmatterLineValue(titleRaw) });
        i += 1;
      }
      frontmatter.list = list;
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex > -1) {
      const key = line.slice(0, separatorIndex).trim();
      const value = parseFrontmatterLineValue(line.slice(separatorIndex + 1));
      if (key === "id") frontmatter.id = Number(value);
      else if (key === "slug") frontmatter.slug = value;
      else if (key === "title") frontmatter.title = value;
      else if (key === "icon") frontmatter.icon = value;
      else if (key === "image") frontmatter.image = value;
      else if (key === "description") frontmatter.description = value;
      else if (key === "created_at") frontmatter.created_at = value;
    }
    i += 1;
  }

  if (!frontmatter.id || !frontmatter.slug || !frontmatter.title) {
    throw new Error("Invalid markdown: id, slug, title are required");
  }

  return {
    id: frontmatter.id,
    slug: frontmatter.slug,
    title: frontmatter.title,
    icon: frontmatter.icon,
    image: frontmatter.image,
    description: frontmatter.description,
    list: frontmatter.list ?? [],
    created_at: frontmatter.created_at,
    content: markdownToHtml(markdownBody),
  };
}

export async function getAllServices(): Promise<ServiceProps[]> {
  const files = await fs.readdir(servicesDir);
  const markdownFiles = files.filter((name) => name.endsWith(".md"));

  const services = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(servicesDir, fileName);
      const fileContent = await fs.readFile(filePath, "utf8");
      return parseServiceMarkdown(fileContent);
    })
  );

  const ids = new Set<number>();
  const slugs = new Set<string>();
  for (const service of services) {
    if (ids.has(service.id)) {
      throw new Error(`Duplicate service id detected: ${service.id}`);
    }
    if (service.slug && slugs.has(service.slug)) {
      throw new Error(`Duplicate service slug detected: ${service.slug}`);
    }
    ids.add(service.id);
    if (service.slug) slugs.add(service.slug);
  }

  return services.sort((a, b) => a.id - b.id);
}

export async function getServiceBySlug(slug: string): Promise<ServiceProps | undefined> {
  const services = await getAllServices();
  return services.find((service) => service.slug === slug);
}
