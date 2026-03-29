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
        description: v.optional(v.string()),
        videoUrl: v.string(),
        duration: v.optional(v.number()),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || (user.role !== "INSTRUCTOR" && user.role !== "ADMIN")) {
            throw new Error("Unauthorized");
        }

        const course = await ctx.db.get(args.courseId);
        if (!course || course.instructorId !== user._id) {
            throw new Error("Unauthorized to add lessons to this course");
        }

        return await ctx.db.insert("lessons", {
            ...args
        });
    },
});

export const updateLesson = mutation({
    args: {
        lessonId: v.id("lessons"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        videoUrl: v.optional(v.string()),
        duration: v.optional(v.number()),
        order: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || (user.role !== "INSTRUCTOR" && user.role !== "ADMIN")) {
            throw new Error("Unauthorized");
        }

        const { lessonId, ...updates } = args;
        const lesson = await ctx.db.get(lessonId);
        if (!lesson) throw new Error("Lesson not found");

        const course = await ctx.db.get(lesson.courseId);
        if (!course || course.instructorId !== user._id) {
            throw new Error("Unauthorized to edit this lesson");
        }

        return await ctx.db.patch(lessonId, {
            ...updates
        });
    },
});

export const deleteLesson = mutation({
    args: { lessonId: v.id("lessons") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || user.role !== "INSTRUCTOR" && user.role !== "ADMIN") {
            throw new Error("Unauthorized");
        }

        const lesson = await ctx.db.get(args.lessonId);
        if (!lesson) throw new Error("Lesson not found");

        const course = await ctx.db.get(lesson.courseId);
        if (!course || course.instructorId !== user._id) {
            throw new Error("Unauthorized to delete this lesson");
        }

        await ctx.db.delete(args.lessonId);

        // Also delete associated progress
        const progress = await ctx.db
            .query("progress")
            .withIndex("by_lesson", (q) => q.eq("lessonId", args.lessonId))
            .collect();

        for (const p of progress) {
            await ctx.db.delete(p._id);
        }
    },
});
