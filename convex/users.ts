import { internalMutation, query, type QueryCtx } from "./_generated/server";
import type { UserJSON } from "@clerk/backend";
import { v, type Validator } from "convex/values";

export const current = query({
   args: {},
   handler: async (ctx) => {
      return await getCurrentUser(ctx);
   },
});

export const upsertFromClerk = internalMutation({
   args: { data: v.any() as Validator<UserJSON> },
   async handler(ctx, { data }) {
      const userAttributes = {
         name: `${data.first_name} ${data.last_name}`,
         email: data.email_addresses[0]?.email_address,
         picture: data.image_url,
         createdAt: data.created_at,
         updatedAt: data.updated_at,
         externalId: data.id,
         emailVerifiedStatus: data.email_addresses[0]?.verification?.status,
      };

      const user = await userByExternalId(ctx, data.id);
      if (user === null) {
         await ctx.db.insert("users", userAttributes);
      } else {
         await ctx.db.patch(user._id, userAttributes);
      }
   },
});

export const deleteFromClerk = internalMutation({
   args: { clerkUserId: v.string() },
   async handler(ctx, { clerkUserId }) {
      const user = await userByExternalId(ctx, clerkUserId);

      if (user !== null) {
         await ctx.db.delete(user._id);
      } else {
         console.warn(
            `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
         );
      }
   },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
   const userRecord = await getCurrentUser(ctx);
   if (!userRecord) throw new Error("Can't get current user");
   return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
   const identity = await ctx.auth.getUserIdentity();
   if (identity === null) {
      return null;
   }
   return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
   return await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
      .unique();
}
