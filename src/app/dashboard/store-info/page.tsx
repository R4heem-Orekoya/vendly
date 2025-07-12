import StoreInfo from "@/components/store/store-info";
import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
   return (
      <>
         <header className="flex h-15 w-full items-center justify-between border-b p-4">
            <div className="flex items-center gap-2 text-xs">
               <SidebarTrigger />
               <ChevronRight className="text-muted-foreground size-3" />
               <span>Store</span>
               <ChevronRight className="text-muted-foreground size-3" />
               <div className="bg-secondary rounded px-2 py-1">
                  <span>Store Information</span>
               </div>
            </div>

            <Link
               href="/dashboard/store-info/edit"
               className={buttonVariants({
                  size: "sm",
               })}
            >
               Edit
            </Link>
         </header>

         <StoreInfo />
      </>
   );
}
