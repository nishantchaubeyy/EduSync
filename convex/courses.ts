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
export const instructorGetCourses = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || user.role !== "INSTRUCTOR") return [];

        const courses = await ctx.db
            .query("courses")
            .withIndex("by_instructor", (q) => q.eq("instructorId", user._id))
            .collect();

        // Enforce the data structure expected by the UI
        return await Promise.all(
            courses.map(async (course) => {
                const lessons = await ctx.db
                    .query("lessons")
                    .withIndex("by_course", (q) => q.eq("courseId", course._id))
                    .collect();

                const enrollments = await ctx.db
                    .query("enrollments")
                    .withIndex("by_course", (q) => q.eq("courseId", course._id))
                    .collect();

                return {
                    ...course,
                    _count: {
                        lessons: lessons.length,
                        enrollments: enrollments.length,
                    },
                };
            })
        );
    },
});
export const getInstructorCourseDetail = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || user.role !== "INSTRUCTOR") return null;

        const course = await ctx.db.get(args.courseId);
        if (!course || course.instructorId !== user._id) return null;

        const lessons = await ctx.db
            .query("lessons")
            .withIndex("by_course", (q) => q.eq("courseId", course._id))
            .collect();

        const quizzes = await ctx.db
            .query("quizzes")
            .withIndex("by_course", (q) => q.eq("courseId", course._id))
            .collect();

        const enrollments = await ctx.db
            .query("enrollments")
            .withIndex("by_course", (q) => q.eq("courseId", course._id))
            .collect();

        return {
            ...course,
            lessons: lessons.sort((a, b) => a.order - b.order),
            quizzes,
            _count: {
                lessons: lessons.length,
                enrollments: enrollments.length,
            },
        };
    },
});
