"use client";

import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { InformationIconDuo } from "@/icons";
import { Controller, useFormContext } from "react-hook-form";
import type { ProductSchemaType } from "@/validators/product";
import { PriceInput } from "../price-input";
import { getCurrencySign } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";

export default function ProductPricing() {
   const {
      control,
      formState: { errors },
   } = useFormContext<ProductSchemaType>();
   
   const store = useStore()
   
   return (
      <div className="rounded-lg border p-4 space-y-4">
         <h2 className="font-medium">Pricing</h2>

         <div className="grid gap-1">
            <Label htmlFor="price" className="text-xs text-muted-foreground">
               <div>
                  Product Price <span className="text-destructive">*</span>
               </div>
               <Tooltip>
                  <TooltipTrigger>
                     <InformationIconDuo className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-40">
                     <p>The current selling price of this product</p>
                  </TooltipContent>
               </Tooltip>
            </Label>

            <Controller
               name="price"
               control={control}
               render={({ field }) => (
                  <PriceInput
                     id="price"
                     value={field.value}
                     onChange={field.onChange}
                     min={0}
                     placeholder="0.00"
                     className="text-xs placeholder:text-xs"
                     currencyCode={getCurrencySign(store?.currency ?? "NGN")}
                  />
               )}
            />
            {errors.price && (
               <p className="text-xs text-destructive ">
                  {errors.price.message}
               </p>
            )}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-1">
               <Label
                  htmlFor="compare-at-price"
                  className="text-xs text-muted-foreground"
               >
                  <div>Compare at Price</div>
                  <Tooltip>
                     <TooltipTrigger>
                        <InformationIconDuo className="size-4" />
                     </TooltipTrigger>
                     <TooltipContent className="max-w-56">
                        <p>
                           Original price before discount. Used to show
                           discounts like ₦10,000 → ₦7,500
                        </p>
                     </TooltipContent>
                  </Tooltip>
               </Label>

               <Controller
                  name="compareAtPrice"
                  control={control}
                  render={({ field }) => (
                     <PriceInput
                        id="compare-at-price"
                        value={field.value}
                        onChange={field.onChange}
                        min={0}
                        placeholder="0.00"
                        className="placeholder:text-xs text-xs"
                        currencyCode={getCurrencySign(store?.currency ?? "NGN")}
                     />
                  )}
               />
               {errors.compareAtPrice && (
                  <p className="text-xs text-destructive">
                     {errors.compareAtPrice.message}
                  </p>
               )}
            </div>

            <div className="grid gap-1">
               <Label
                  htmlFor="cost-price"
                  className="text-xs text-muted-foreground"
               >
                  <div>Cost Price</div>
                  <Tooltip>
                     <TooltipTrigger>
                        <InformationIconDuo className="size-4" />
                     </TooltipTrigger>
                     <TooltipContent className="max-w-56">
                        <p>
                           Used to calculate profit in your dashboard. Not shown
                           to buyers. Should be less than product price
                        </p>
                     </TooltipContent>
                  </Tooltip>
               </Label>

               <Controller
                  name="costPrice"
                  control={control}
                  render={({ field }) => (
                     <PriceInput
                        id="cost-price"
                        value={field.value}
                        onChange={field.onChange}
                        min={0}
                        placeholder="0.00"
                        className="placeholder:text-xs text-xs"
                        currencyCode={getCurrencySign(store?.currency ?? "NGN")}
                     />
                  )}
               />
               {errors.costPrice && (
                  <p className="text-xs text-destructive">
                     {errors.costPrice.message}
                  </p>
               )}
            </div>
         </div>
      </div>
   );
}
