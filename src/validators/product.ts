import { productTypes, Units } from "@/lib/consts";
import z from "zod";
import { type JSONContent } from "@tiptap/react";

export const productSchema = z
   .object({
      name: z.string().min(1, "Name is required"),

      description: z
         .custom<JSONContent>(val => {
            if (!val || typeof val !== "object") return false;
            return (
               (val as JSONContent).type === "doc" &&
               Array.isArray((val as JSONContent).content)
            );
         }, "Invalid TipTap JSON")
         .optional(),

      type: z.enum(
         productTypes.map(type => type.value) as [string, ...string[]]
      ),

      collections: z.array(z.string()),

      price: z.number().min(0, "Price must be 0 or more"),

      compareAtPrice: z
         .number()
         .min(0, "Compare price must be 0 or more")
         .optional()
         .nullable(),

      costPrice: z
         .number()
         .min(0, "Compare price must be 0 or more")
         .optional()
         .nullable(),

      stockQuantity: z.number().optional(),

      stockUnit: z
         .enum(Units.map(type => type.value) as [string, ...string[]])
         .optional(),

      pageTitle: z
         .union([z.string().min(5).max(70), z.literal("")])
         .transform(val => (val === "" ? undefined : val))
         .optional(),

      pageDescription: z
         .union([z.string().min(10).max(160), z.literal("")])
         .transform(val => (val === "" ? undefined : val))
         .optional(),
   })
   .refine(
      data => {
         if (data.costPrice === null || data.costPrice === undefined)
            return true;
         return data.costPrice <= data.price;
      },
      {
         message:
            "Cost price cannot be greater than the selling price, you will make a loss if it is",
         path: ["costPrice"],
      }
   )
   .superRefine((data, ctx) => {
      if (data.type === "physical_product") {
         if (!data.stockQuantity) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: "Stock quantity is required for physical products.",
               path: ["stockQuantity"],
            });
         }

         if (!data.stockUnit) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: "Stock unit is required for physical products.",
               path: ["stockUnit"],
            });
         }
      }
   });

export type ProductSchemaType = z.infer<typeof productSchema>;

export const collectionSchema = z.object({
   name: z.string().min(1, "Name is required"),
   description: z.string().max(120).optional(),
});

export type CollectionSchemaType = z.infer<typeof collectionSchema>;
