import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { rootDomain } from "@/lib/server";
import { NextResponse, type NextRequest } from "next/server";

function extractSubdomain(request: NextRequest): string | null {
   const url = request.url;
   const host = request.headers.get("host") ?? "";
   const hostname = host.split(":")[0];

   if (url.includes("localhost") || url.includes("127.0.0.1")) {
      const fullUrlMatch = /http:\/\/([^.]+)\.localhost/.exec(url);
      if (fullUrlMatch && fullUrlMatch[1]) {
         return fullUrlMatch[1];
      }

      if (hostname && hostname.includes(".localhost")) {
         return hostname.split(".")[0] ?? null;
      }

      return null;
   }

   const rootDomainFormatted = rootDomain.split(":")[0];

   if (
      hostname &&
      hostname.includes("---") &&
      hostname.endsWith(".vercel.app")
   ) {
      const parts = hostname.split("---");
      return parts.length > 0 && parts[0] ? parts[0] : null;
   }

   const isSubdomain =
      hostname &&
      hostname !== rootDomainFormatted &&
      hostname !== `www.${rootDomainFormatted}` &&
      hostname.endsWith(`.${rootDomainFormatted}`);

   return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
   const { pathname } = req.nextUrl;
   const subdomain = extractSubdomain(req);

   const isDev = process.env.NODE_ENV !== "production";
   const isStaticAsset = !!/\.(ico|svg|png|jpg|jpeg|css|js|woff2?)$/.exec(
      pathname
   );

   if (!subdomain && !isDev && !isStaticAsset && pathname !== "/waitlist") {
      return NextResponse.redirect(new URL("/waitlist", req.url));
   }

   if (subdomain) {
      if (pathname.startsWith("/dashboard")) {
         return NextResponse.redirect(new URL("/", req.url));
      }

      if (pathname === "/") {
         return NextResponse.rewrite(new URL(`/s/${subdomain}`, req.url));
      }
   }

   if (isProtectedRoute(req)) {
      const protectResult = await auth.protect();

      if (protectResult instanceof NextResponse) {
         return protectResult;
      }
      return NextResponse.next();
   }

   return NextResponse.next();
});

export const config = {
   matcher: [
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      "/(api|trpc)(.*)",
   ],
};
