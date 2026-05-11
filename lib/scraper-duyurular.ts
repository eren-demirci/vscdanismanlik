import https from "https";
import { parse } from "node-html-parser";
import { db } from "@/lib/db";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
};

const FETCH_TIMEOUT_MS = 30_000;

export type SyncDuyurularResult = {
  fetched: number;
  inserted: number;
  skipped: number;
  errors: number;
  siteResults: Record<string, { fetched: number; inserted: number; errors: number; errorMsg?: string }>;
};

type DuyuruItem = {
  title: string;
  link: string;
  excerpt: string | null;
  contentHtml: string | null;
  imageUrl: string | null;
  pubDate: Date | null;
  source: string;
};

async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { ...FETCH_HEADERS, "Cache-Control": "no-cache" },
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

// Turkish government sites use certs not in Node.js trust store.
// Use https module directly with rejectUnauthorized: false.
function fetchHtmlInsecure(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const timer = setTimeout(() => reject(new Error("Timeout")), FETCH_TIMEOUT_MS);

    const req = https.get(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: { ...FETCH_HEADERS, "Cache-Control": "no-cache" },
        rejectUnauthorized: false,
        timeout: FETCH_TIMEOUT_MS,
      },
      (res) => {
        // Follow redirects
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          clearTimeout(timer);
          req.destroy();
          fetchHtmlInsecure(
            res.headers.location.startsWith("http")
              ? res.headers.location
              : `https://${parsed.hostname}${res.headers.location}`,
          ).then(resolve, reject);
          return;
        }
        if (!res.statusCode || res.statusCode >= 400) {
          clearTimeout(timer);
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          clearTimeout(timer);
          resolve(Buffer.concat(chunks).toString("utf8"));
        });
        res.on("error", (err) => {
          clearTimeout(timer);
          reject(err);
        });
      },
    );
    req.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// ─── SGK ─────────────────────────────────────────────────────────────────────

const SGK_BASE = "https://www.sgk.gov.tr";
const SGK_LIST = `${SGK_BASE}/duyuru`;

async function fetchSgkList(): Promise<{ title: string; link: string }[]> {
  const html = await fetchHtml(SGK_LIST);
  const root = parse(html);
  const items: { title: string; link: string }[] = [];

  root.querySelectorAll("a.announcement-card").forEach((el) => {
    const href = el.getAttribute("href") ?? "";
    const title = cleanText(
      el.querySelector(".announcement-title")?.text ?? "",
    );
    if (!href || !title) return;
    const link = href.startsWith("http") ? href : `${SGK_BASE}${href}`;
    items.push({ title, link });
  });

  return items;
}

async function fetchSgkDetail(url: string, title: string): Promise<DuyuruItem> {
  const html = await fetchHtml(url);
  const root = parse(html);

  const detailTitle = cleanText(
    root.querySelector(".announcement-detail-title h1")?.text ?? title,
  );

  const dateText = cleanText(
    root.querySelector(".announcement-detail-date")?.text ?? "",
  );
  // "6 Mayıs 2026 Çarşamba" → try to parse
  const pubDate = dateText ? parseTurkishDate(dateText) : null;

  // node-html-parser doesn't support ~ combinator; find content div by class match
  const contentEl = root
    .querySelectorAll("div")
    .find((el) => {
      const cls = el.getAttribute("class") ?? "";
      return cls.includes("text-gray-800") && cls.includes("leading-relaxed");
    }) ?? null;

  let textHtml = contentEl?.innerHTML?.trim() ?? "";

  // Collect attached document names + download links
  const docItems = root.querySelectorAll(".document-item");
  let docsHtml = "";
  if (docItems.length > 0) {
    const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
    const docCards = docItems
      .map((doc) => {
        const name = cleanText(doc.querySelector("span.speak-area")?.text ?? "");
        const href = doc.querySelector("a.download-btn")?.getAttribute("href") ?? "";
        const fullHref = href
          ? href.startsWith("http") ? href : `${SGK_BASE}${href}`
          : null;
        if (!name) return "";
        const btn = fullHref
          ? `<a href="${fullHref}" target="_blank" rel="noopener" class="duyuru-indir-btn">${downloadIcon} İndir</a>`
          : "";
        return `<div class="duyuru-belge-item"><span class="duyuru-belge-ad">${name}</span>${btn}</div>`;
      })
      .filter(Boolean);
    if (docCards.length > 0) {
      docsHtml = `<div class="duyuru-belgeler"><p class="duyuru-belgeler-baslik">📎 Ekli Belgeler</p>${docCards.join("")}</div>`;
    }
  }

  const contentHtml = [textHtml, docsHtml].filter(Boolean).join("\n") || null;

  const imageUrl =
    root.querySelector('img[src*="/cdn/v3/img/"]')?.getAttribute("src") ?? null;

  return {
    title: detailTitle,
    link: url,
    excerpt: contentHtml ? cleanText(parse(contentHtml).text).slice(0, 300) : null,
    contentHtml,
    imageUrl: imageUrl?.startsWith("http") ? imageUrl : imageUrl ? `${SGK_BASE}${imageUrl}` : null,
    pubDate,
    source: "sgk",
  };
}

// ─── Ticaret ─────────────────────────────────────────────────────────────────

const TICARET_BASE = "https://ticaret.gov.tr";
const TICARET_LIST = `${TICARET_BASE}/duyurular`;

async function fetchTicaretList(): Promise<{ title: string; link: string }[]> {
  const html = await fetchHtmlInsecure(TICARET_LIST);
  const root = parse(html);
  const seen = new Set<string>();
  const items: { title: string; link: string }[] = [];

  root.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href") ?? "";
    if (!href.startsWith("/duyurular/")) return;
    const link = `${TICARET_BASE}${href}`;
    if (seen.has(link)) return;
    seen.add(link);
    const title = cleanText(el.text);
    if (!title) return;
    items.push({ title, link });
  });

  return items;
}

async function fetchTicaretDetail(url: string, fallbackTitle: string): Promise<DuyuruItem> {
  const html = await fetchHtmlInsecure(url);
  const root = parse(html);

  const zone = root.querySelector(".__zone");
  const title = cleanText(zone?.querySelector("h2")?.text ?? fallbackTitle);

  const dateText = cleanText(zone?.querySelector(".__header span")?.text ?? "");
  const pubDate = dateText ? parseTurkishDate(dateText) : null;

  const contentEl = zone?.querySelector(".__content");
  const contentHtml = contentEl?.innerHTML?.trim() ?? null;

  const imageUrl =
    root.querySelector('img[src*="ticaret.gov.tr"]')?.getAttribute("src") ?? null;

  return {
    title,
    link: url,
    excerpt: contentHtml ? cleanText(parse(contentHtml).text).slice(0, 300) : null,
    contentHtml,
    imageUrl,
    pubDate,
    source: "ticaret",
  };
}

// ─── GİB ─────────────────────────────────────────────────────────────────────

const GIB_BASE = "https://dijital.gib.gov.tr";
const GIB_API_BASE = `${GIB_BASE}/apigateway`;
const GIB_LIST_API = `${GIB_API_BASE}/notice/duyuru/duyurular`;
const GIB_DETAIL_API = `${GIB_API_BASE}/notice/duyuru/duyuru-detay-getir`;
const GIB_EXPORT_API = `${GIB_API_BASE}/notice/duyuru/export`;

type GibListItem = {
  id?: number | string;
  duyuruBaslik?: string;
  duyuruOzet?: string;
  eklenmeTarihi?: string;
  [key: string]: unknown;
};

type GibEk = {
  dosyaAdi?: string;
  dosyaKey?: string;
  dosyaUzantisi?: string;
  [key: string]: unknown;
};

type GibDetailResponse = {
  duyuruBaslik?: string;
  duyuruIcerik?: string;
  duyuruOzet?: string;
  eklenmeTarihi?: string;
  ekler?: GibEk[];
  [key: string]: unknown;
};

async function gibApiPost<T>(url: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: GIB_BASE,
        Referer: `${GIB_BASE}/duyurular`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`GIB API HTTP ${res.status}`);
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("json")) throw new Error("GIB API returned non-JSON");
    return res.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function gibApiGet<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Accept: "application/json",
        "Accept-Language": "tr-TR",
        Origin: GIB_BASE,
        Referer: `${GIB_BASE}/duyurular`,
      },
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`GIB API HTTP ${res.status}`);
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("json")) throw new Error("GIB detail returned non-JSON");
    return res.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

function buildGibContentHtml(detail: GibDetailResponse): string | null {
  const parts: string[] = [];

  if (detail.duyuruIcerik) {
    parts.push(detail.duyuruIcerik);
  }

  if (detail.ekler && detail.ekler.length > 0) {
    const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

    const cards = detail.ekler
      .filter((ek) => ek.dosyaAdi)
      .map((ek) => {
        const name = cleanText(ek.dosyaAdi ?? "");
        const dosyaKey = ek.dosyaKey ?? "";
        const ext = ek.dosyaUzantisi ?? "";
        const dlUrl = dosyaKey
          ? `/api/duyurular/download?key=${encodeURIComponent(dosyaKey)}&filename=${encodeURIComponent(name)}&ext=${encodeURIComponent(ext)}`
          : null;
        const btn = dlUrl
          ? `<a href="${dlUrl}" class="duyuru-indir-btn">${downloadIcon} İndir</a>`
          : "";
        return `<div class="duyuru-belge-item"><span class="duyuru-belge-ad">${name}</span>${btn}</div>`;
      });

    if (cards.length > 0) {
      parts.push(
        `<div class="duyuru-belgeler"><p class="duyuru-belgeler-baslik">📎 Ekli Belgeler</p>${cards.join("")}</div>`,
      );
    }
  }

  return parts.length > 0 ? parts.join("\n") : null;
}

async function syncGib(): Promise<{ fetched: number; inserted: number; errors: number; errorMsg?: string }> {
  let fetched = 0;
  let inserted = 0;
  let errors = 0;

  // Step 1: Fetch list
  let listItems: GibListItem[] = [];
  try {
    const listResponse = await gibApiPost<{ duyurular?: GibListItem[] }>(GIB_LIST_API, {
      meta: { pagination: { pageNo: 1, pageSize: 50 } },
      data: { body: { kategoriId: "0", baslangicTarihi: "", bitisTarihi: "" } },
    });
    listItems = listResponse?.duyurular ?? [];
  } catch (err) {
    return { fetched: 0, inserted: 0, errors: 1, errorMsg: String(err) };
  }

  fetched = listItems.length;

  // Step 2: Fetch detail for each new item
  for (const item of listItems) {
    const id = item.id;
    if (!id) continue;

    const link = `${GIB_BASE}/duyurular#${id}`;
    const title = cleanText(item.duyuruBaslik ?? "");
    if (!title) continue;

    try {
      const exists = await db.query(
        "SELECT 1 FROM duyurular WHERE link = $1 LIMIT 1",
        [link],
      );
      if ((exists.rowCount ?? 0) > 0) continue;

      // Fetch detail
      const detail = await gibApiGet<GibDetailResponse>(
        `${GIB_DETAIL_API}?duyuruId=${id}`,
      );

      const contentHtml = buildGibContentHtml(detail);
      const excerpt = item.duyuruOzet
        ? cleanText(item.duyuruOzet).slice(0, 300)
        : contentHtml
          ? cleanText(parse(contentHtml).text).slice(0, 300)
          : null;

      const pubDateRaw = detail.eklenmeTarihi ?? item.eklenmeTarihi;
      const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

      const duyuru: DuyuruItem = {
        title: cleanText(detail.duyuruBaslik ?? title),
        link,
        excerpt,
        contentHtml,
        imageUrl: "/img/banner/gib.jpg",
        pubDate: pubDate && !isNaN(pubDate.getTime()) ? pubDate : null,
        source: "gib",
      };

      const wasInserted = await upsertDuyuru(duyuru);
      if (wasInserted) inserted++;
    } catch {
      errors++;
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  return { fetched, inserted, errors };
}

// ─── Date parsing ─────────────────────────────────────────────────────────────

const TURKISH_MONTHS: Record<string, number> = {
  ocak: 0,
  şubat: 1,
  mart: 2,
  nisan: 3,
  mayıs: 4,
  haziran: 5,
  temmuz: 6,
  ağustos: 7,
  eylül: 8,
  ekim: 9,
  kasım: 10,
  aralık: 11,
};

function parseTurkishDate(text: string): Date | null {
  const lower = text.toLowerCase();
  const match = lower.match(/(\d{1,2})\s+([a-zğüşıöç]+)\s+(\d{4})/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = TURKISH_MONTHS[match[2]];
  const year = parseInt(match[3], 10);
  if (month === undefined) return null;
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d;
}

// ─── DB upsert ────────────────────────────────────────────────────────────────

async function upsertDuyuru(item: DuyuruItem): Promise<boolean> {
  const result = await db.query<{ inserted: boolean }>(
    `
      INSERT INTO duyurular (title, link, excerpt, content_html, image_url, pub_date, source)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (link) DO UPDATE
        SET
          title        = EXCLUDED.title,
          excerpt      = EXCLUDED.excerpt,
          content_html = EXCLUDED.content_html,
          image_url    = EXCLUDED.image_url,
          pub_date     = EXCLUDED.pub_date,
          source       = EXCLUDED.source
      RETURNING (xmax = 0) AS inserted
    `,
    [
      item.title,
      item.link,
      item.excerpt,
      item.contentHtml,
      item.imageUrl,
      item.pubDate,
      item.source,
    ],
  );
  return result.rows[0]?.inserted ?? false;
}

// ─── Per-site sync helpers ────────────────────────────────────────────────────

async function syncSgk(): Promise<{ fetched: number; inserted: number; errors: number }> {
  let fetched = 0;
  let inserted = 0;
  let errors = 0;

  const listItems = await fetchSgkList();
  fetched = listItems.length;

  // Fetch details for items not yet in DB
  for (const { title, link } of listItems) {
    try {
      // Quick upsert check: if link exists, skip detail fetch
      const exists = await db.query(
        "SELECT 1 FROM duyurular WHERE link = $1 LIMIT 1",
        [link],
      );
      if ((exists.rowCount ?? 0) > 0) continue;

      const detail = await fetchSgkDetail(link, title);
      const wasInserted = await upsertDuyuru(detail);
      if (wasInserted) inserted++;
    } catch {
      errors++;
    }
    // Small delay between detail fetches
    await new Promise((r) => setTimeout(r, 300));
  }

  return { fetched, inserted, errors };
}

async function syncTicaret(): Promise<{ fetched: number; inserted: number; errors: number; errorMsg?: string }> {
  let fetched = 0;
  let inserted = 0;
  let errors = 0;

  let listItems: { title: string; link: string }[] = [];
  try {
    listItems = await fetchTicaretList();
  } catch (err) {
    return { fetched: 0, inserted: 0, errors: 1, errorMsg: String(err) };
  }
  fetched = listItems.length;

  for (const { title, link } of listItems) {
    try {
      const exists = await db.query(
        "SELECT 1 FROM duyurular WHERE link = $1 LIMIT 1",
        [link],
      );
      if ((exists.rowCount ?? 0) > 0) continue;

      const detail = await fetchTicaretDetail(link, title);
      const wasInserted = await upsertDuyuru(detail);
      if (wasInserted) inserted++;
    } catch {
      errors++;
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  return { fetched, inserted, errors };
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function syncDuyurular(): Promise<SyncDuyurularResult> {
  const [sgkResult, ticaretResult, gibResult] = await Promise.allSettled([
    syncSgk(),
    syncTicaret(),
    syncGib(),
  ]);

  const get = (r: PromiseSettledResult<{ fetched: number; inserted: number; errors: number; errorMsg?: string }>) =>
    r.status === "fulfilled"
      ? r.value
      : { fetched: 0, inserted: 0, errors: 1, errorMsg: String(r.reason) };

  const sgk = get(sgkResult);
  const ticaret = get(ticaretResult);
  const gib = get(gibResult);

  return {
    fetched: sgk.fetched + ticaret.fetched + gib.fetched,
    inserted: sgk.inserted + ticaret.inserted + gib.inserted,
    skipped:
      Math.max(0, sgk.fetched - sgk.inserted - sgk.errors) +
      Math.max(0, ticaret.fetched - ticaret.inserted - ticaret.errors) +
      Math.max(0, gib.fetched - gib.inserted - gib.errors),
    errors: sgk.errors + ticaret.errors + gib.errors,
    siteResults: {
      sgk,
      ticaret,
      gib,
    },
  };
}
