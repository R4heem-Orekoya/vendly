import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
   users: defineTable({
      name: v.string(),
      email: v.optional(v.string()),
      picture: v.string(),
      updatedAt: v.number(),
      createdAt: v.number(),
      emailVerifiedStatus: v.optional(
         v.union(
            v.literal("unverified"),
            v.literal("verified"),
            v.literal("transferable"),
            v.literal("failed"),
            v.literal("expired")
         )
      ),
      externalId: v.string(),
      storeId: v.optional(v.id("stores")),
   }).index("byExternalId", ["externalId"]),
   stores: defineTable({
      name: v.string(),
      domain: v.string(),
      type: v.string(),
      description: v.optional(v.string()),
      currency: v.optional(v.string()),
      number: v.optional(v.string()),
      address: v.optional(v.string()),
      image: v.optional(v.string()),
      imageKey: v.optional(v.string()),
      updatedAt: v.number(),
      createdAt: v.number(),
      userId: v.id("users"),
   })
      .index("byUserId", ["userId"])
      .index("byDomain", ["domain"]),
   collections: defineTable({
      name: v.string(),
      description: v.optional(v.string()),
      image: v.optional(v.string()),
      imageKey: v.optional(v.string()),
      storeId: v.id("stores"),
   }).index("byName", ["name"]),
   products: defineTable({
      name: v.string(),
      handle: v.string(),
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

      images: v.optional(
         v.array(
            v.object({
               url: v.string(),
               key: v.string(),
               name: v.string(),
               hash: v.string(),
               size: v.number(),
            })
         )
      ),

      productFile: v.optional(
         v.object({
            name: v.string(),
            url: v.string(),
            key: v.string(),
            size: v.number(),
         })
      ),

      storeId: v.id("stores"),
   }).index("byHandle", ["handle"]),
});
