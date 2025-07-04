import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
   users: defineTable({
      name: v.string(),
      email: v.optional(v.string()),
      picture: v.string(),
      updatedAt: v.number(),
      createdAt: v.number(),
      emailVerifiedStatus: v.optional(v.union(
         v.literal("unverified"), 
         v.literal("verified"), 
         v.literal("transferable"),
         v.literal("failed"),
         v.literal("expired")
      )),
      externalId: v.string(),
   }).index("byExternalId", ["externalId"])
})