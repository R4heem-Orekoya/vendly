"use client";

import EditStoreInfoWrapper from "@/components/store/edit-store-info";
import { Button, buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/icons";
import type { EditStoreFormRef } from "@/types";
import { useMutation } from "convex/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { api } from "~/convex/_generated/api";

export default function Page() {
   const updateStore = useMutation(api.stores.updateStoreInfo)
   const formRef = useRef<EditStoreFormRef>(null);
   const [isDirty, setIsDirty] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   const router = useRouter()

   const handleSubmit = async (data: any) => {
      try {
         console.log("Form data:", data);
         const res = await updateStore(data)
         
         if(res.error) {
            toast.error(res.message)
            return
         }
         
         router.replace("/dashboard/store-info")
         toast.success("Saved changes successfully!")
      } catch (error) {
         toast.error("Something went wrong!")
      }
   };
   
   useEffect(() => {
      router.prefetch("/dashboard/store-info")
   }, [])

   return (
      <>
         <header className="flex h-15 w-full items-center justify-between border-b p-4">
            <div className="flex items-center gap-2 text-xs">
               <SidebarTrigger />
               <ChevronRight className="text-muted-foreground size-3" />
               <span>Store</span>
               <ChevronRight className="text-muted-foreground size-3" />
               <span>Store Information</span>
               <ChevronRight className="text-muted-foreground size-3" />
               <div className="bg-secondary rounded px-2 py-1">
                  <span>Edit</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <Button
                  disabled={!isDirty || isSubmitting}
                  onClick={() => formRef.current?.submitForm()}
               >
                  {isSubmitting ? (
                     <>
                        Saving changes...
                        <Spinner className="size-3.5" />
                     </>
                  ) : (
                     "Save Changes"
                  )}
               </Button>
               <Link
                  href="/dashboard/store-info"
                  className={buttonVariants({
                     variant: "secondary",
                  })}
               >
                  Cancel
               </Link>
            </div>
         </header>
         <EditStoreInfoWrapper
            ref={formRef}
            onSubmit={handleSubmit}
            onStateChange={(state) => {
               setIsDirty(state.isDirty);
               setIsSubmitting(state.isSubmitting);
            }}
         />
      </>
   );
}
