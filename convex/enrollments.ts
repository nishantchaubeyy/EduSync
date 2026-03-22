import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getStudentEnrollments = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) return [];

        const enrollments = await ctx.db
            .query("enrollments")
            .withIndex("by_student", (q) => q.eq("studentId", user._id))
            .collect();

        // Fetch the actual course details for each enrollment
        const enrollmentDetails = await Promise.all(
            enrollments.map(async (e) => {
                const course = await ctx.db.get(e.courseId);
                return {
                    ...e,
                    course,
                };
            })
        );

        return enrollmentDetails.filter((e) => e.course !== null);
    },
});

export const enrollInCourse = mutation({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        // Check if already enrolled
        const existing = await ctx.db
            .query("enrollments")
            .withIndex("by_student_course", (q) =>
                q.eq("studentId", user._id).eq("courseId", args.courseId)
            )
            .first();

        if (existing) return existing._id;

        return await ctx.db.insert("enrollments", {
            studentId: user._id,
            courseId: args.courseId,
            enrolledAt: Date.now(),
        });
    },
});
