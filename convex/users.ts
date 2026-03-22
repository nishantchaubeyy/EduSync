import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

export const syncUserInternal = internalMutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        role: v.union(v.literal("STUDENT"), v.literal("INSTRUCTOR"), v.literal("ADMIN")),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existingUser) {
            // Update existing user
            return await ctx.db.patch(existingUser._id, {
                name: args.name,
                email: args.email,
                role: args.role, // role might be updated from clerk metadata if applicable
            });
        }

        // Insert new user
        return await ctx.db.insert("users", {
            clerkId: args.clerkId,
            name: args.name,
            email: args.email,
            role: args.role,
        });
    },
});

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        // Identify user in db
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        return user;
    },
});
