import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const add = mutation({
   args: {
      email: v.string(),
   },
   handler: async (ctx, args) => {
      const existing = await ctx.db
         .query("waitlist")
         .filter(q => q.eq(q.field("email"), args.email))
         .first();

      if (existing) {
         throw new ConvexError("You already signed up for the waitlist!");
      }

      await ctx.db.insert("waitlist", {
         email: args.email,
      });
   },
});
