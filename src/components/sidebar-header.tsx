"use client";

import Image from "next/image";
import { SidebarHeader, useSidebar } from "./ui/sidebar";
import AppLogo from "~/public/logo.svg";

export default function DashboardSidebarHeader() {
   const { open } = useSidebar();
   return (
      <SidebarHeader
         data-open={open}
         className="flex flex-row items-center justify-start gap-2 overflow-hidden p-0 px-4 py-4 transition-all duration-300 md:py-4 md:[&[data-open=false]]:justify-center"
      >
         <div data-open={open} className="relative size-8">
            <Image
               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
               src={AppLogo}
               alt="app logo"
               className="h-full w-full object-cover"
            />
         </div>
         <p
            data-open={open}
            className="text-xl font-semibold tracking-tight md:[&[data-open=false]]:hidden"
         >
            Vendly
         </p>
      </SidebarHeader>
   );
}
