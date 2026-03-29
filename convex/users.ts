import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

export const syncUserInternal = internalMutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        role: v.optional(v.union(v.literal("STUDENT"), v.literal("INSTRUCTOR"), v.literal("ADMIN"))),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();

        const defaultRole = args.role || "STUDENT";

        if (existing) {
            return await ctx.db.patch(existing._id, {
                name: args.name,
                email: args.email,
                role: existing.role || defaultRole,
            });
        }

        return await ctx.db.insert("users", {
            clerkId: args.clerkId,
            name: args.name,
            email: args.email,
            role: defaultRole,
        });
    },
});

export const syncUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        role: v.optional(v.union(v.literal("STUDENT"), v.literal("INSTRUCTOR"), v.literal("ADMIN"))),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        // On first sync, default to STUDENT unless provided via args
        const defaultRole = args.role || "STUDENT";

        if (existing) {
            return await ctx.db.patch(existing._id, {
                name: args.name,
                email: args.email,
                // Don't downgrade role if it exists (protect INSTRUCTOR status)
                role: existing.role || defaultRole,
            });
        }

        return await ctx.db.insert("users", {
            clerkId: identity.subject,
            name: args.name,
            email: args.email,
            role: defaultRole,
        });
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