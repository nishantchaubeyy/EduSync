import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLessonsByCourse = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("lessons")
            .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
            .collect();
    },
});

export const createLesson = mutation({
    args: {
        courseId: v.id("courses"),
        title: v.string(),
        videoUrl: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        // Auth checks omitted for brevity but should verify INSTRUCTOR Role
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        return await ctx.db.insert("lessons", {
            courseId: args.courseId,
            title: args.title,
            videoUrl: args.videoUrl,
            order: args.order,
        });
    },
});
