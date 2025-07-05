"use client"

import Image from "next/image"
import { SidebarHeader, useSidebar } from "./ui/sidebar"
import AppLogo from "~/public/logo.svg"

export default function DashboardSidebarHeader() {
   const { open } = useSidebar()
   return (
      <SidebarHeader data-open={open} className="flex flex-row items-center justify-start md:[&[data-open=false]]:justify-center transition-all duration-300 gap-2 p-0 py-4 md:py-1 px-4 md:px-2 overflow-hidden">
         <div data-open={open} className="relative size-8 bgred">
            <Image
               src={AppLogo}
               alt="app logo"
               className="w-full h-full object-cover"
            />
         </div>
         <p data-open={open} className="text-xl font-semibold tracking-tight md:[&[data-open=false]]:hidden">Vendly</p>
      </SidebarHeader>
   )
}