"use client";

import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
   const session = useConvexAuth();

   return (
      <main className="p-4">
         <Authenticated>
            <UserButton />
         </Authenticated>
         <Unauthenticated>
            <SignInButton forceRedirectUrl="/store-setup" />
         </Unauthenticated>
      </main>
   );
}
