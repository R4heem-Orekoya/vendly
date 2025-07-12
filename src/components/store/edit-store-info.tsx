"use client";

import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditStoreLogo from "@/components/store/edit-store-logo";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import { Textarea } from "@/components/ui/textarea";
import { currencies, storeTypes } from "@/lib/consts";
import { Skeleton } from "../ui/skeleton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeSchema, updateStoreSchema, type StoreSchemaType } from "@/validators/store";
import { useEffect, useImperativeHandle } from "react";
import type { EditStoreFormRef } from "@/types";

interface EditStoreInfoWrapperProps {
   onSubmit?: (data: StoreSchemaType) => Promise<void>;
   ref: React.Ref<EditStoreFormRef>;
   onStateChange?: (state: { isDirty: boolean; isSubmitting: boolean }) => void;
}

export default function EditStoreInfoWrapper(props: EditStoreInfoWrapperProps) {
   const store = useQuery(api.stores.get);

   if (store === undefined) return <EditStoreInfoSkeleton />;
   if (store === null) {
      return (
         <div className="text-muted-foreground p-4 text-sm">Store not found.</div>
      );
   }

   return <EditStoreInfo {...props} store={store} />;
}

interface EditStoreInfoProps extends EditStoreInfoWrapperProps {
   store: NonNullable<ReturnType<typeof useQuery>>;
}

function EditStoreInfo({
   store,
   ref,
   onStateChange,
   onSubmit,
}: EditStoreInfoProps) {
   const {
      register,
      reset,
      handleSubmit,
      control,
      formState: { isDirty, errors, isSubmitting },
   } = useForm<StoreSchemaType>({
      defaultValues: {
         address: store.address ?? "",
         currency: store.currency ?? "NGN",
         description: store.description ?? "",
         name: store.name,
         number: store.number ?? "+234",
         type: store.type,
      },
      resolver: zodResolver(updateStoreSchema),
   });

   useImperativeHandle(ref, () => {
      return {
         submitForm() {
            handleSubmit(async (data) => {
               await onSubmit?.(data);
            })();
         },
         isDirty,
         isSubmitting,
      };
   }, []);

   useEffect(() => {
      if (store) {
         reset(
            {
               address: store.address ?? "",
               currency: store.currency ?? "NGN",
               description: store.description ?? "",
               name: store.name,
               number: store.number ?? "+234",
               type: store.type,
            },
            { keepDirty: true },
         );
      }
   }, [store, reset]);

   useEffect(() => {
      onStateChange?.({ isDirty, isSubmitting });
   }, [isDirty, isSubmitting]);

   if (store === undefined) return <EditStoreInfoSkeleton />;

   if (store === null) {
      return (
         <div className="text-muted-foreground p-4 text-sm">Store not found.</div>
      );
   }

   return (
      <form className="p-4">
         <div className="mx-auto mt-6 max-w-2xl">
            <div className="border-b border-dashed py-4">
               <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                  Store Information
               </h2>
               <p className="text-muted-foreground mt-0.5 text-sm">
                  Edit your store info.
               </p>
            </div>

            <EditStoreLogo storeImage={store.image} />

            <div className="grid grid-cols-1 gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Label className="text-muted-foreground text-xs">
                  Store Name <span className="text-destructive">*</span>
               </Label>
               <Input
                  aria-invalid={!!errors.name}
                  type="text"
                  className="col-span-2 md:text-xs"
                  {...register("name")}
               />
               {errors.name && (
                  <p className="text-destructive text-xs font-medium">
                     {errors.name.message}
                  </p>
               )}
            </div>
            <div className="grid grid-cols-1 gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Label className="text-muted-foreground text-xs">
                  Business Type <span className="text-destructive">*</span>
               </Label>
               <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                           aria-invalid={!!errors.type}
                           className="col-span-2 w-full md:text-xs"
                        >
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
                  )}
               />
               {errors.type && (
                  <p className="text-destructive text-xs font-medium">
                     {errors.type.message}
                  </p>
               )}
            </div>
            <div className="grid grid-cols-1 gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Label className="text-muted-foreground text-xs">
                  Store Description
               </Label>
               <Textarea
                  aria-invalid={!!errors.description}
                  className="col-span-2 md:text-xs"
                  {...register("description")}
               />
               {errors.description && (
                  <p className="text-destructive text-xs font-medium">
                     {errors.description.message}
                  </p>
               )}
            </div>
            <div className="grid grid-cols-1 gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Label className="text-muted-foreground text-xs">
                  Store Currency <span className="text-destructive">*</span>
               </Label>
               <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                           aria-invalid={!!errors.currency}
                           className="col-span-2 w-full md:text-xs"
                        >
                           <SelectValue placeholder="Select currency..." />
                        </SelectTrigger>
                        <SelectContent>
                           {currencies.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                 <span>{currency.label}</span>
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  )}
               />
               {errors.currency && (
                  <p className="text-destructive text-xs font-medium">
                     {errors.currency.message}
                  </p>
               )}
            </div>
            <div className="grid grid-cols-1 gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Label className="text-muted-foreground text-xs">
                  Contact Number <span className="text-destructive">*</span>
               </Label>
               <div className="relative col-span-2">
                  <Input
                     aria-invalid={!!errors.number}
                     className="peer ps-9 md:text-xs"
                     placeholder="+234"
                     type="text"
                     {...register("number")}
                  />
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                     <img src="https://flagsapi.com/NG/flat/16.png" />
                  </span>
               </div>
               {errors.number && (
                  <p className="text-destructive text-xs font-medium">
                     {errors.number.message}
                  </p>
               )}
            </div>
            <div className="grid grid-cols-1 gap-2 py-4 md:grid-cols-3">
               <Label className="text-muted-foreground text-xs">Store Address</Label>
               <Textarea
                  aria-invalid={!!store?.address}
                  className="col-span-2 md:text-xs"
                  {...register("address")}
               />
               {errors.address && (
                  <p className="text-destructive text-xs font-medium">
                     {errors.address.message}
                  </p>
               )}
            </div>
         </div>
      </form>
   );
}

function EditStoreInfoSkeleton() {
   return (
      <div className="p-4">
         <div className="mx-auto mt-6 max-w-2xl space-y-6">
            {/* Header */}
            <div className="space-y-1.5 border-b border-dashed py-4">
               <Skeleton className="h-6 w-2/5" />
               <Skeleton className="h-4 w-3/5" />
            </div>

            {/* Logo Upload Section */}
            <div className="grid grid-cols-1 items-center gap-4 border-b border-dashed py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <div className="col-span-2 flex items-center justify-between">
                  <Skeleton className="size-16 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-md" />
               </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="col-span-2 h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 items-start gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="col-span-2 h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 items-start gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="col-span-2 h-20 w-full" />
            </div>

            <div className="grid grid-cols-1 items-start gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="col-span-2 h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 items-start gap-2 border-b border-dashed py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="col-span-2 h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 items-start gap-2 py-4 md:grid-cols-3">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="col-span-2 h-20 w-full" />
            </div>
         </div>
      </div>
   );
}
