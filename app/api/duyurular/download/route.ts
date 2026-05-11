import { NextRequest, NextResponse } from "next/server";
import https from "https";

export const runtime = "nodejs";

function fetchGibExport(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = `https://dijital.gib.gov.tr/apigateway/notice/duyuru/export?key=${encodeURIComponent(key)}`;
    const agent = new https.Agent({ rejectUnauthorized: false });
    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
        "Accept-Language": "tr-TR,tr;q=0.9",
        Origin: "https://dijital.gib.gov.tr",
        Referer: "https://dijital.gib.gov.tr/",
      },
      agent,
    };

    const req = https.get(url, options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf8");
        resolve(body);
      });
    });
    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error("GIB export request timed out"));
    });
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const key = searchParams.get("key");
  const filename = searchParams.get("filename") ?? "dosya";
  const ext = searchParams.get("ext") ?? "pdf";

  if (!key) {
    return NextResponse.json({ error: "key param required" }, { status: 400 });
  }

  try {
    const body = await fetchGibExport(key);
    const json = JSON.parse(body) as { file?: string; data?: string };
    const base64 = json.file ?? json.data ?? "";

    if (!base64) {
      return NextResponse.json({ error: "No file data in GIB response" }, { status: 502 });
    }

    const binary = Buffer.from(base64, "base64");
    const safeName = filename.replace(/[^a-zA-Z0-9_\-À-ɏ]/g, "_");
    const disposition = `attachment; filename="${safeName}.${ext}"`;

    return new Response(binary, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": disposition,
        "Content-Length": String(binary.length),
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
