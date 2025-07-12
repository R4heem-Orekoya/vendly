import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();

    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
    }

    const cleanDomain = domain.trim().toLowerCase();

    if (cleanDomain.includes(".") || cleanDomain.length < 3) {
      return NextResponse.json({ error: "Malformed domain" }, { status: 400 });
    }

    const alreadyExists = await redis.sismember("taken-domains", cleanDomain);
    if (alreadyExists) {
      return NextResponse.json(
        { error: "Domain already taken" },
        { status: 409 },
      );
    }

    await redis.sadd("taken-domains", cleanDomain);

    return NextResponse.json(
      { success: true, domain: cleanDomain },
      { status: 201 },
    );
  } catch (err) {
    console.error("[DOMAIN_REGISTER_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
