import { ConvexHttpClient } from "convex/browser";
import { auth } from "@clerk/nextjs/server";

export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getConvexHttpClient() {
   const { getToken } = await auth();
   const token = await getToken({ template: "convex" });

   if (!token) throw new Error("Missing Clerk token");

   convex.setAuth(token);

   return convex;
}
