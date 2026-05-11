import { NextRequest, NextResponse } from "next/server";
import { syncDuyurular } from "@/lib/scraper-duyurular";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization") ?? "";
    const vercelCron = req.headers.get("x-vercel-cron") ?? "";
    const validBearer = auth === `Bearer ${secret}`;
    const validVercel = vercelCron === "1";
    if (!validBearer && !validVercel) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await syncDuyurular();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected sync error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
