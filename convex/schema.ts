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
        image: v.optional(v.string()), // Hero image for the course
        instructorId: v.id("users"), // Reference to the users table
    }).index("by_instructor", ["instructorId"]),

    lessons: defineTable({
        title: v.string(),
        videoUrl: v.string(), // URL from S3/Cloudinary or elsewhere
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
        updatedAt: v.number(), // Date.now() timestamp
    })
        .index("by_student", ["studentId"])
        .index("by_lesson", ["lessonId"])
        .index("by_student_lesson", ["studentId", "lessonId"]),
});
