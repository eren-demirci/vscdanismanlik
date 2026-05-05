import { XMLParser } from "fast-xml-parser";
import { db } from "@/lib/db";

const RSS_FEEDS = [
  {
    url: "https://www.ntv.com.tr/ekonomi.rss",
    source: "ntv-ekonomi",
  },
  {
    url: "http://www.hurriyet.com.tr/rss/ekonomi",
    source: "hurriyet-ekonomi",
  },
];

type RssItem = {
  title?: string | { "#text"?: string };
  link?:
    | string
    | { "@_href"?: string; "@_rel"?: string }
    | Array<{ "@_href"?: string; "@_rel"?: string }>;
  description?: string | { "#text"?: string };
  content?: string | { "#text"?: string };
  text?: string | { "#text"?: string };
  enclosure?: { "@_url"?: string } | Array<{ "@_url"?: string }>;
  "media:thumbnail"?: { "@_url"?: string } | Array<{ "@_url"?: string }>;
  pubDate?: string;
  guid?: string | { "#text"?: string };
};

type AtomEntry = {
  id?: string;
  title?: string | { "#text"?: string };
  summary?: string | { "#text"?: string };
  content?: string | { "#text"?: string };
  enclosure?: { "@_url"?: string } | Array<{ "@_url"?: string }>;
  published?: string;
  updated?: string;
  link?:
    | string
    | { "@_href"?: string; "@_rel"?: string }
    | Array<{ "@_href"?: string; "@_rel"?: string }>;
};

type ParsedFeed = {
  rss?: {
    channel?: {
      item?: RssItem[] | RssItem;
    };
  };
  feed?: {
    entry?: AtomEntry[] | AtomEntry;
  };
};

export type SyncNewsResult = {
  fetched: number;
  inserted: number;
  skipped: number;
  errors: number;
};

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getText(value?: string | { "#text"?: string }) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return value["#text"]?.trim() ?? "";
}

function getLink(
  value?:
    | string
    | { "@_href"?: string; "@_rel"?: string }
    | Array<{ "@_href"?: string; "@_rel"?: string }>,
) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();

  const links = Array.isArray(value) ? value : [value];
  const alternate = links.find((entry) => entry?.["@_rel"] === "alternate");
  const selected = alternate ?? links[0];
  return selected?.["@_href"]?.trim() ?? "";
}

function getEnclosureUrl(
  value?: { "@_url"?: string } | Array<{ "@_url"?: string }>,
) {
  if (!value) return "";
  const list = Array.isArray(value) ? value : [value];
  return list[0]?.["@_url"]?.trim() ?? "";
}

function getMediaThumbnailUrl(
  value?: { "@_url"?: string } | Array<{ "@_url"?: string }>,
) {
  if (!value) return "";
  const list = Array.isArray(value) ? value : [value];
  return list[0]?.["@_url"]?.trim() ?? "";
}

function getFirstImageFromHtml(html?: string | null) {
  if (!html) return "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1]?.trim() ?? "";
}

function normalizeContentHtmlWhitespace(value?: string | null) {
  if (!value) return null;

  const cleaned = value
    .replace(/\r\n/g, "\n")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/>\s+</g, "><")
    .trim();

  return cleaned || null;
}

function normalizeRssItem(item: RssItem, source: string) {
  const title = getText(item.title);
  const link = getLink(item.link);
  const description = getText(item.description) || null;
  const contentHtml = normalizeContentHtmlWhitespace(
    getText(item.content) || getText(item.text) || null,
  );
  const enclosureUrl = getEnclosureUrl(item.enclosure);
  const mediaThumbnailUrl = getMediaThumbnailUrl(item["media:thumbnail"]);
  const imageUrl =
    enclosureUrl ||
    mediaThumbnailUrl ||
    getFirstImageFromHtml(contentHtml) ||
    null;
  const guid = getText(item.guid) || null;
  const pubDateRaw = item.pubDate?.trim();
  const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

  if (!title || !link) return null;
  if (pubDate && Number.isNaN(pubDate.getTime())) return null;

  return {
    title,
    link,
    description,
    contentHtml,
    imageUrl,
    guid,
    pubDate,
    source,
  };
}

function normalizeAtomEntry(entry: AtomEntry, source: string) {
  const title = getText(entry.title);
  const link = getLink(entry.link);
  const description = getText(entry.summary) || null;
  const contentHtml = normalizeContentHtmlWhitespace(
    getText(entry.content) || null,
  );
  const enclosureUrl = getEnclosureUrl(entry.enclosure);
  const imageUrl = enclosureUrl || getFirstImageFromHtml(contentHtml) || null;
  const guid = entry.id?.trim() || null;
  const pubDateRaw = entry.published?.trim() || entry.updated?.trim();
  const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

  if (!title || !link) return null;
  if (pubDate && Number.isNaN(pubDate.getTime())) return null;

  return {
    title,
    link,
    description,
    contentHtml,
    imageUrl,
    guid,
    pubDate,
    source,
  };
}

async function fetchFeedItems(url: string, source: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed with status ${response.status}`);
  }

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  });

  const parsed = parser.parse(xml) as ParsedFeed;
  const rssItems = toArray(parsed?.rss?.channel?.item).map((item) =>
    normalizeRssItem(item, source),
  );
  const atomItems = toArray(parsed?.feed?.entry).map((entry) =>
    normalizeAtomEntry(entry, source),
  );

  return (rssItems.length > 0 ? rssItems : atomItems).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );
}

export async function syncNtvEconomyNews(): Promise<SyncNewsResult> {
  let fetched = 0;
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const feed of RSS_FEEDS) {
    let normalizedItems: Awaited<ReturnType<typeof fetchFeedItems>> = [];

    try {
      normalizedItems = await fetchFeedItems(feed.url, feed.source);
    } catch {
      errors += 1;
      continue;
    }

    fetched += normalizedItems.length;

    for (const normalized of normalizedItems) {
      try {
        const result = await db.query<{ inserted: boolean }>(
          `
            INSERT INTO news (title, link, description, content_html, image_url, pub_date, guid, source)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (link) DO UPDATE
            SET
              title = EXCLUDED.title,
              description = EXCLUDED.description,
              content_html = EXCLUDED.content_html,
              image_url = EXCLUDED.image_url,
              pub_date = EXCLUDED.pub_date,
              guid = EXCLUDED.guid,
              source = EXCLUDED.source
            RETURNING (xmax = 0) AS inserted
          `,
          [
            normalized.title,
            normalized.link,
            normalized.description,
            normalized.contentHtml,
            normalized.imageUrl,
            normalized.pubDate,
            normalized.guid,
            normalized.source,
          ],
        );

        if (result.rows[0]?.inserted) {
          inserted += 1;
        } else {
          skipped += 1;
        }
      } catch {
        errors += 1;
      }
    }
  }

  return {
    fetched,
    inserted,
    skipped,
    errors,
  };
}
