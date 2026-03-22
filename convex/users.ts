import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const syncUserInternal = internalMutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        role: v.union(v.literal("STUDENT"), v.literal("INSTRUCTOR"), v.literal("ADMIN")),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (user) {
            await ctx.db.patch(user._id, {
                name: args.name,
                email: args.email,
                role: args.role,
            });
        } else {
            await ctx.db.insert("users", {
                clerkId: args.clerkId,
                name: args.name,
                email: args.email,
                role: args.role,
            });
        }
    },
});

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();
    },
});