import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCourses = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("courses").collect();
    },
});

export const getCourseById = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.courseId);
    },
});

export const createCourse = mutation({
    args: {
        title: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || (user.role !== "INSTRUCTOR" && user.role !== "ADMIN")) {
            throw new Error("Unauthorized to create courses");
        }

        return await ctx.db.insert("courses", {
            title: args.title,
            description: args.description,
            instructorId: user._id,
        });
    },
});
