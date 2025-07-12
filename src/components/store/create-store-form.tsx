"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/icons";
import { storeTypes, type StoreType } from "@/lib/consts";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "~/convex/_generated/api";
import {
   createStoreFormSchema,
   type createStoreFormType,
} from "@/validators/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { DomainInput } from "./domain-input";

export default function CreateStoreForm() {
   const submit = useMutation(api.stores.create);
   const {
      register,
      setValue,
      watch,
      setFocus,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<createStoreFormType>({
      resolver: zodResolver(createStoreFormSchema),
   });
   const [domainStatus, setDomainStatus] = useState<
      "checking" | "available" | "taken" | null
   >(null);
   const router = useRouter();

   async function onSubmit(data: createStoreFormType) {
      if (domainStatus === "taken") {
         toast.error("Domain is already taken");
         return;
      }

      try {
         const res = await submit(data);

         if (res.error) {
            toast.error(res.message);
            return;
         }

         router.push("/dashboard/store-info");
         toast.success("Store created successfully!");
      } catch (error) {
         console.log(error);
         toast.error("Something went wrong!");
      }
   }

   useEffect(() => {
      router.prefetch("/dashboard/store-info");
   }, []);

   return (
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-center lg:col-span-4">
         <div className="mx-auto max-w-[450px]">
            <div className="space-y-2">
               <h1 className="text-2xl font-semibold md:text-3xl">
                  Setup your store!
               </h1>
               <p className="text-muted-foreground text-sm">
                  Tell us a little bit about your business.
               </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6">
               <div className="grid gap-3">
                  <Label htmlFor="business-name">
                     Business Name
                     <span className="text-destructive">*</span>
                  </Label>
                  <Input
                     id="business-name"
                     type="text"
                     placeholder="Enter business name"
                     className="h-10"
                     {...register("name")}
                  />
                  {errors.name && (
                     <p className="text-destructive text-xs">{errors.name.message}</p>
                  )}
               </div>
               <DomainInput
                  value={watch("domain") || ""}
                  onChange={(val) => setValue("domain", val)}
                  onStatusChange={setDomainStatus}
                  error={errors.domain?.message}
               />
               <div className="grid gap-3">
                  <Label htmlFor="business-name">
                     Business Type
                     <span className="text-destructive">*</span>
                  </Label>
                  <Select
                     onValueChange={(value) => setValue("type", value as StoreType)}
                  >
                     <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select business type" />
                     </SelectTrigger>
                     <SelectContent>
                        {storeTypes.map((item) => (
                           <SelectItem key={item.value} value={item.value}>
                              {item.icon}
                              <span>{item.title}</span>
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  {errors.type && (
                     <p className="text-destructive text-xs">{errors.type.message}</p>
                  )}
               </div>
               <Button disabled={isSubmitting} size="lg">
                  Continue
                  {isSubmitting && <Spinner />}
               </Button>
            </form>
         </div>
      </div>
   );
}
