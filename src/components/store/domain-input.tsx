"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InformationIconDuo } from "@/icons";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

interface DomainInputProps {
   value: string;
   onChange: (val: string) => void;
   onStatusChange?: (status: "checking" | "available" | "taken" | null) => void;
   error?: string;
   suffix?: string;
}

export function DomainInput({
   value,
   onChange,
   onStatusChange,
   error,
   suffix = ".vendly.com",
}: DomainInputProps) {
   const [status, setStatus] = useState<
      "checking" | "available" | "taken" | null
   >(null);

   const checkAvailability = debounce(async (domain: string) => {
      if (!domain || domain.trim().length < 3) {
         setStatus(null);
         onStatusChange?.(null);
         return;
      }

      setStatus("checking");
      onStatusChange?.("checking");

      try {
         const res = await fetch(
            `/api/domain/check?domain=${domain.trim().toLowerCase()}`
         );

         const data = (await res.json()) as { taken: boolean; domain: string };
         const newStatus = data.taken ? "taken" : "available";
         setStatus(newStatus);
         onStatusChange?.(newStatus);
      } catch {
         setStatus(null);
         onStatusChange?.(null);
      }
   }, 400);

   useEffect(() => {
         void checkAvailability(value);
      return () => checkAvailability.cancel();
   }, [value]);

   return (
      <div className="grid gap-2">
         <div className="grid gap-3">
            <Label htmlFor="business-domain">
               Store URL <span className="text-destructive">*</span>
            </Label>
            <div className="flex rounded-md shadow-xs">
               <Input
                  id="business-domain"
                  className="-me-px h-10 rounded-e-none shadow-none"
                  placeholder="Enter business domain"
                  type="text"
                  value={value}
                  onChange={e => onChange(e.target.value)}
               />
               <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-e-md border px-3 text-sm">
                  {suffix}
               </span>
            </div>
         </div>

         <div className="grid gap-1">
            {status === "checking" && (
               <p className="text-muted-foreground text-xs">
                  Checking availability...
               </p>
            )}
            {status === "available" && (
               <p className="text-xs text-green-600">Domain is available</p>
            )}
            {status === "taken" && (
               <p className="text-xs text-red-500">Domain is already taken</p>
            )}
            {error && <p className="text-destructive text-xs">{error}</p>}

            <div className="flex items-start gap-2 [&_svg]:mt-1 [&_svg]:size-5">
               <InformationIconDuo />
               <p className="text-muted-foreground text-sm">
                  You can upgrade your business domain to{" "}
                  <span className="text-primary font-medium">.com</span>,{" "}
                  <span className="text-primary font-medium">.com.ng</span>,{" "}
                  <span className="text-primary font-medium">.shop</span> or any
                  domain of your choice later.
               </p>
            </div>
         </div>
      </div>
   );
}
