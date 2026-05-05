import { NextResponse } from "next/server";
import { syncNtvEconomyNews } from "@/lib/rss-news";

export const runtime = "nodejs";

export async function POST() {
  try {
    const result = await syncNtvEconomyNews();

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected sync error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}

