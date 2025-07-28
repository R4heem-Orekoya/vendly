import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { slugify } from "@/lib/utils";
import type { Id } from "./_generated/dataModel";

export const create = mutation({
   args: {
      name: v.string(),
      description: v.optional(v.any()),
      type: v.string(),
      collections: v.array(v.string()),
      price: v.number(),
      compareAtPrice: v.optional(v.number()),
      costPrice: v.optional(v.number()),
      stockQuantity: v.optional(v.number()),
      stockUnit: v.optional(v.string()),
      pageTitle: v.optional(v.string()),
      pageDescription: v.optional(v.string()),
   },
   handler: async (ctx, args) => {
      const currentUser = await ctx.runQuery(api.users.current);

      if (!currentUser) {
         throw new Error("Not authenticated!");
      }

      const storeId = currentUser.storeId;

      if (!storeId) {
         throw new Error("You don't have a store!");
      }

      const productId = (await ctx.db.insert("products", {
         name: args.name,
         handle: slugify(args.name),
         description: args.description,
         type: args.type,
         collections: args.collections,
         price: args.price,
         compareAtPrice: args.compareAtPrice,
         costPrice: args.costPrice,
         stockQuantity: args.stockQuantity,
         stockUnit: args.stockUnit,
         pageTitle: args.pageTitle,
         pageDescription: args.pageDescription,

         storeId,
      })) as Id<"products">;

      return productId;
   },
});

export const updateDigitalFile = mutation({
   args: {
      productId: v.id("products"),
      file: v.object({
         url: v.string(),
         name: v.string(),
         key: v.string(),
         size: v.number(),
      }),
   },
   handler: async (ctx, args) => {
      const currentUser = await ctx.runQuery(api.users.current);

      if (!currentUser) {
         throw new Error("Not authenticated!");
      }

      const product = await ctx.db
         .query("products")
         .filter(q => q.eq(q.field("_id"), args.productId))
         .first();

      if (!product) {
         throw new Error("Product with this id does not exist!");
      }
      
      if(product.type !== "digital_product") {
         throw new Error("This product does not accept digital files");
      }
      
      await ctx.db.patch(product._id, {
         productFile:{
            key: args.file.key,
            name: args.file.name,
            size: args.file.size,
            url: args.file.url
         }
      })
      
      return { oldKey: product.productFile?.key }
   },
});

export const addImage = mutation({
   args: {
      productId: v.id("products"),
      image: v.object({
         url: v.string(),
         name: v.string(),
         key: v.string(),
         size: v.number(),
         hash: v.string(),
      }),
   },
   handler: async (ctx, args) => {
      const currentUser = await ctx.runQuery(api.users.current);

      if (!currentUser) {
         throw new Error("Not authenticated!");
      }

      const product = await ctx.db
         .query("products")
         .filter(q => q.eq(q.field("_id"), args.productId))
         .first();

      if (!product) {
         throw new Error("Product with this id does not exist!");
      }

      await ctx.db.patch(product._id, {
         images: [...(product.images ?? []), args.image],
      });
   },
});
