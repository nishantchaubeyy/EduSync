import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(), // Synchronized from Clerk
        name: v.string(),
        email: v.string(),
        role: v.union(v.literal("STUDENT"), v.literal("INSTRUCTOR"), v.literal("ADMIN")),
    }).index("by_clerkId", ["clerkId"]),

    courses: defineTable({
        title: v.string(),
        description: v.string(),
        slug: v.optional(v.string()), // URL-friendly identifier
        category: v.optional(v.string()), // e.g. "Technology", "Management"
        image: v.optional(v.string()), // Hero image URL
        thumbnail: v.optional(v.string()), // Card image URL
        rating: v.optional(v.number()), // 0-5 average rating
        status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
        duration: v.optional(v.number()), // Total hours
        tags: v.optional(v.array(v.string())),
        instructorId: v.id("users"), // Reference to the users table
        createdAt: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
    })
        .index("by_instructor", ["instructorId"])
        .index("by_status", ["status"]),

    lessons: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        videoUrl: v.string(), // URL from S3/Cloudinary or elsewhere
        duration: v.optional(v.number()), // minutes
        order: v.number(),
        courseId: v.id("courses"),
    }).index("by_course", ["courseId"]),

    quizzes: defineTable({
        title: v.string(),
        courseId: v.id("courses"),
    }).index("by_course", ["courseId"]),

    questions: defineTable({
        text: v.string(),
        options: v.array(v.string()), // Structured array instead of JSON string
        correct: v.string(), // Correct answer matching one of the options
        quizId: v.id("quizzes"),
    }).index("by_quiz", ["quizId"]),

    enrollments: defineTable({
        studentId: v.id("users"),
        courseId: v.id("courses"),
        enrolledAt: v.number(), // Date.now() timestamp
    })
        .index("by_student", ["studentId"])
        .index("by_course", ["courseId"])
        .index("by_student_course", ["studentId", "courseId"]),

    progress: defineTable({
        studentId: v.id("users"),
        lessonId: v.id("lessons"),
        completed: v.boolean(),
        percentage: v.optional(v.number()), // 0-100 completion for this lesson
        watchedDuration: v.optional(v.number()), // elapsed seconds
        lastAccessed: v.optional(v.number()),
        updatedAt: v.number(), // Date.now() timestamp
    })
        .index("by_student", ["studentId"])
        .index("by_lesson", ["lessonId"])
        .index("by_student_lesson", ["studentId", "lessonId"]),
});
