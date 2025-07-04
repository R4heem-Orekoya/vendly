"use client"

import type { ReactNode } from "react"
import ConvexProviderWithClerk from "./convex"
import { ClerkProvider } from "@clerk/nextjs"

interface ProvidersProps {
   children: ReactNode
}

export default function Providers({ children } : ProvidersProps) {
   return (
      <ClerkProvider dynamic afterSignOutUrl="/">
         <ConvexProviderWithClerk>
            {children}
         </ConvexProviderWithClerk>
      </ClerkProvider>
   )
}