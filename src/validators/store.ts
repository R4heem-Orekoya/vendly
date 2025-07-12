import { currencies, storeTypes } from "@/lib/consts";
import z from "zod";

export const storeSchema = z.object({
   name: z.string().min(3, "Store name must be at least 3 characters"),
   domain: z
      .string()
      .min(3, "Domain must be at least 3 characters")
      .regex(
         /^[a-z0-9-]+$/,
         "Domain can only contain lowercase letters, numbers, and hyphens",
      ),
   type: z.enum(storeTypes.map((type) => type.value) as [string, ...string[]]),
   description: z.union([ z
      .string()
      .min(20, "Description must be at least 20 characters")
      .nullish(), z.literal("")]),
   currency: z.enum(
      currencies.map((currency) => currency.value) as [string, ...string[]],
   ),
   number: z
      .string()
      .min(13, "Phone number must be 10 digits long after the country code"),
   address: z.union([z.string().min(5, "Address must be atleast 5 characters").nullish(), z.literal("")]),
});

export const createStoreFormSchema = storeSchema.pick({
   name: true,
   domain: true,
   type: true,
});

export const updateStoreSchema = storeSchema.omit({ domain: true });

export type createStoreFormType = z.infer<typeof createStoreFormSchema>;

export type StoreSchemaType = z.infer<typeof updateStoreSchema>;
