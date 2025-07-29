"use client"

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import React from "react";

export default function Home() {
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