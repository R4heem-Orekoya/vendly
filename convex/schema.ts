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
            v.literal("expired"),
         ),
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
});
