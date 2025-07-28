import { v } from "convex/values";
import { internalAction, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { getCurrentUser } from "./users";
import { redis } from "@/lib/redis";
import { retrier } from ".";

export const create = mutation({
   args: {
      name: v.string(),
      domain: v.string(),
      type: v.string(),
   },
   handler: async (ctx, args) => {
      const { name, domain, type } = args;
      const currentUser = await ctx.runQuery(api.users.current);
      
      if (!currentUser) {
         return { error: true, message: "Unauthorized!" };
      }

      const cleanDomain = domain.trim().toLowerCase();

      const existing = await ctx.db
         .query("stores")
         .withIndex("byDomain", (q) => q.eq("domain", cleanDomain))
         .unique();

      if (existing) {
         return { error: true, message: "Domain already taken" };
      }

      const timestamp = Date.now();

      const storeId = await ctx.db.insert("stores", {
         name,
         domain: cleanDomain,
         type,
         userId: currentUser._id,
         createdAt: timestamp,
         updatedAt: timestamp,
      });

      await ctx.db.patch(currentUser._id, {
         storeId,
      });

      await retrier.run(ctx, internal.stores.markDomainTaken, {
         domain: cleanDomain,
      });

      return { success: true, message: "Store created successfully!" };
   },
});

export const get = query({
   args: {},
   handler: async (ctx) => {
      const currentUser = await getCurrentUser(ctx);

      if (!currentUser) return null;

      const store = await ctx.db
         .query("stores")
         .filter((q) => q.eq(q.field("userId"), currentUser._id))
         .first();

      return store;
   },
});

export const updateStoreInfo = mutation({
   args: {
      name: v.string(),
      type: v.string(),
      description: v.optional(v.string()),
      currency: v.string(),
      number: v.string(),
      address: v.optional(v.string()),
   },
   handler: async (ctx, args) => {
      const currentUser = await getCurrentUser(ctx);

      if (!currentUser) return { error: true, message: "Unauthorized!" };

      const storeId = currentUser.storeId;

      if (!storeId) return { error: true, message: "Store does not exist!" };

      await ctx.db.patch(storeId, args);

      return { success: true, message: "Store updated successfully" }
   },
});

export const updateImage = mutation({
   args: {
      url: v.string(),
      key: v.string(),
      storeId: v.id("stores"),
   },
   handler: async (ctx, args) => {
      const { storeId, url, key } = args;
      const store = await ctx.db
         .query("stores")
         .filter((q) => q.eq(q.field("_id"), storeId))
         .first();

      if (!store) return { success: true, oldKey: undefined };

      await ctx.db.patch(storeId, { image: url, imageKey: key });

      return { success: true, oldKey: store.imageKey };
   },
});

export const markDomainTaken = internalAction({
   args: {
      domain: v.string(),
   },
   handler: async (_, args) => {
      const cleanDomain = args.domain.trim().toLowerCase();
      await redis.sadd("taken-domains", cleanDomain);
   },
});
