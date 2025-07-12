import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(req: Request) {
   try {
      const { searchParams } = new URL(req.url);
      const domain = searchParams.get("domain");

      if (!domain || typeof domain !== "string") {
         return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
      }

      const cleanDomain = domain.trim().toLowerCase();

      if (cleanDomain.includes(".") || cleanDomain.length < 3) {
         return NextResponse.json({ error: "Malformed domain" }, { status: 400 });
      }

      const exists = await redis.sismember("taken-domains", cleanDomain);

      return NextResponse.json({
         taken: Boolean(exists),
         domain: cleanDomain,
      });
   } catch (err) {
      console.error("[DOMAIN_CHECK_ERROR]", err);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 },
      );
   }
}
