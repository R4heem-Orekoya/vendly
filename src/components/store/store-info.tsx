"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "~/convex/_generated/api";

export default function StoreInfo() {
   const store = useQuery(api.stores.get);

   if (store === undefined) {
      return <StoreInfoSkeleton />;
   }

   if (store === null) {
      return null;
   }

   return (
      <div className="mx-auto mt-6 max-w-2xl space-y-4 p-4">
         <div className="rounded-lg border">
            <div className="flex items-center gap-4 p-4">
               <div className="relative size-16 overflow-hidden rounded-full">
                  <img
                     src={
                        store.image ??
                        `https://api.dicebear.com/9.x/glass/svg?seed=${store.name}`
                     }
                     alt="Store avatar"
                     className="bg-secondary size-full object-cover"
                  />
               </div>
               <span className="text-xl font-semibold">{store.name}</span>
            </div>
            <Separator />
            <div className="space-y-4 p-4">
               <div>
                  <h3 className="font-medium">Business Name</h3>
                  <p className="text-muted-foreground text-sm">{store.name}</p>
               </div>
               <div>
                  <h3 className="font-medium">Store URL</h3>
                  <Link
                     href={`https://${store.domain}.vendly.com`}
                     className="text-primary text-sm"
                     target="_blank"
                  >
                     {`https://${store.domain}.vendly.com`}
                  </Link>
               </div>
               <div>
                  <h3 className="font-medium">Store Description</h3>
                  <p className="text-muted-foreground text-sm">
                     {store.description ?? "No description..."}
                  </p>
               </div>
            </div>
         </div>

         <div className="rounded-lg border">
            <div className="p-4">
               <h3 className="text-lg font-medium">Store Info</h3>
            </div>
            <Separator />
            <div className="divide-y">
               <InfoRow label="Contact Phone" value={store.number ?? "..."} />
               <InfoRow label="Store Address" value={store.address ?? "..."} />
               <InfoRow
                  label="Store Currency"
                  value={store.currency ?? "NGN"}
               />
            </div>
         </div>
      </div>
   );
}

function InfoRow({ label, value }: { label: string; value: string }) {
   return (
      <div className="flex items-center justify-between p-4">
         <h4 className="text-muted-foreground text-sm">{label}</h4>
         <p className="text-sm font-medium">{value}</p>
      </div>
   );
}

function StoreInfoSkeleton() {
   return (
      <div className="mx-auto mt-6 max-w-2xl space-y-6 p-4">
         <div className="border-border/50 space-y-6 rounded-lg border p-6">
            <div className="flex items-center gap-4">
               <Skeleton className="size-16 rounded-full" />
               <Skeleton className="h-6 w-48 rounded" />
            </div>
            <div className="space-y-4">
               <div className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
               </div>
               <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
               </div>
               <div className="space-y-2">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
               </div>
            </div>
         </div>

         <div className="border-border/50 space-y-6 rounded-lg border p-6">
            <Skeleton className="h-6 w-40 rounded" />
            <div className="space-y-4">
               {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <Skeleton className="h-4 w-32 rounded" />
                     <Skeleton className="h-4 w-24 rounded" />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
