import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

export const create = mutation({
   args: {
      name: v.string(),
      description: v.optional(v.string()),
      image: v.optional(v.string()),
      imageKey: v.optional(v.string()),
   },
   handler: async (ctx, args) => {
      const currentUser = await ctx.runQuery(api.users.current);

      if (!currentUser) {
         return { error: true, message: "Unauthorized!" };
      }

      const storeId = currentUser.storeId;

      if (!storeId) {
         return { error: true, message: "You don't have a store!" };
      }

      const existing = await ctx.db
         .query("collections")
         .withIndex("byName", q => q.eq("name", args.name))
         .first();

      if (existing) {
         return { error: true, message: "Collection name already exists!" };
      }

      const collectionId = (await ctx.db.insert("collections", {
         ...args,
         storeId,
      })) as Id<"collections">;

      return {
         success: true,
         message: "Collection created successfully!",
         collectionId,
      };
   },
});

export const list = query({
   args: {
      storeId: v.id("stores"),
   },
   handler: async (ctx, args) => {
      const currentUser = await ctx.runQuery(api.users.current);

      if (!currentUser) {
         throw new Error("Not authenticated!");
      }

      return await ctx.db
         .query("collections")
         .filter(q => q.eq(q.field("storeId"), args.storeId))
         .collect();
   },
});

export const updateImage = mutation({
   args: {
      url: v.string(),
      key: v.string(),
      collectionId: v.id("collections"),
   },
   handler: async (ctx, args) => {
      const { collectionId, url, key } = args;

      const collection = await ctx.db
         .query("collections")
         .filter(q => q.eq(q.field("_id"), collectionId))
         .first();

      if (!collection) return { error: true, oldKey: null };

      await ctx.db.patch(collectionId, { image: url, imageKey: key });

      return { success: true, oldKey: collection.imageKey };
   },
});
