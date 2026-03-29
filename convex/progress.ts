import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCourseProgress = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) return null;

        const lessons = await ctx.db
            .query("lessons")
            .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
            .collect();

        const progress = await Promise.all(
            lessons.map(async (lesson) => {
                const stepProgress = await ctx.db
                    .query("progress")
                    .withIndex("by_student_lesson", (q) =>
                        q.eq("studentId", user._id).eq("lessonId", lesson._id)
                    )
                    .first();
                return {
                    lessonId: lesson._id,
                    lessonTitle: lesson.title,
                    completed: stepProgress?.completed || false,
                    percentage: stepProgress?.percentage || 0,
                };
            })
        );

        const totalLessons = lessons.length;
        const completedLessons = progress.filter((p) => p.completed).length;
        const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

        return {
            courseId: args.courseId,
            completionPercentage,
            completedLessons,
            totalLessons,
            lessonsProgress: progress,
        };
    },
});

export const markLessonComplete = mutation({
    args: { lessonId: v.id("lessons") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        const existing = await ctx.db
            .query("progress")
            .withIndex("by_student_lesson", (q) =>
                q.eq("studentId", user._id).eq("lessonId", args.lessonId)
            )
            .first();

        if (existing) {
            return await ctx.db.patch(existing._id, {
                completed: true,
                percentage: 100,
                updatedAt: Date.now(),
            });
        }

        return await ctx.db.insert("progress", {
            studentId: user._id,
            lessonId: args.lessonId,
            completed: true,
            percentage: 100,
            updatedAt: Date.now(),
        });
    },
});

export const getLessonDetail = query({
    args: { lessonId: v.id("lessons"), courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) return null;

        const lesson = await ctx.db.get(args.lessonId);
        if (!lesson) return null;

        const course = await ctx.db.get(args.courseId);
        if (!course) return null;

        // Verify enrollment or instructor status
        const enrollment = await ctx.db
            .query("enrollments")
            .withIndex("by_student_course", (q) =>
                q.eq("studentId", user._id).eq("courseId", args.courseId)
            )
            .first();

        const isInstructor = course.instructorId === user._id;
        if (!enrollment && !isInstructor) return null;

        const progress = await ctx.db
            .query("progress")
            .withIndex("by_student_lesson", (q) =>
                q.eq("studentId", user._id).eq("lessonId", args.lessonId)
            )
            .first();

        const allLessons = await ctx.db
            .query("lessons")
            .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
            .collect();

        const sortedLessons = allLessons.sort((a, b) => a.order - b.order);
        const currentIndex = sortedLessons.findIndex((l) => l._id === args.lessonId);
        const nextLesson = sortedLessons[currentIndex + 1] || null;
        const prevLesson = sortedLessons[currentIndex - 1] || null;

        const quizzes = await ctx.db
            .query("quizzes")
            .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
            .collect();

        return {
            lesson,
            courseTitle: course.title,
            isCompleted: progress?.completed || false,
            nextLessonId: nextLesson?._id,
            prevLessonId: prevLesson?._id,
            allLessons: sortedLessons,
            quizzes,
        };
    },
});
