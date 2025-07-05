"use client"

import { SidebarFooter } from "./ui/sidebar"
import { UserDropdown } from "./user-dropdown"
import { useUser } from "@clerk/nextjs"

export default function DashboardSidebarFooter() {
  const { user } = useUser();

  console.log("Current user state:", user)

  if (user === undefined) {
    return <SidebarFooter className="bg-secondary animate-pulse h-11 w-full rounded-md">
    </SidebarFooter>
  }

  if (user === null) {
    return null
  }

  return (
    <SidebarFooter className="mt-6">
      <UserDropdown user={{
        avatar: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: user.fullName ?? ""
      }} />
    </SidebarFooter>
  )
}