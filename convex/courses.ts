import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";

export const getCourses = query({
    args: {},
    handler: async (ctx) => {
        const courses = await ctx.db.query("courses").collect();
        return await Promise.all(
            courses.map(async (course) => {
                const instructor = await ctx.db.get(course.instructorId);
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
                    instructorName: instructor?.name || "Expert",
                    _count: {
                        lessons: lessons.length,
                        enrollments: enrollments.length,
                    },
                };
            })
        );
    },
});

export const getCourseById = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.courseId);
    },
});

export const createCourseV3 = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        category: v.optional(v.string()),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
        thumbnail: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) {
            throw new Error("Handshake Failure: Identity not found in central registry.");
        }

        return await ctx.db.insert("courses", {
            ...args,
            instructorId: user._id,
            status: "draft",
            updatedAt: Date.now(),
        });
    },
});

export const createCourseV2 = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        category: v.optional(v.string()),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
        thumbnail: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        // In development mode, we allow all registered users to establish curricula
        if (!user) {
            throw new Error("Handshake Failure: Identity not found in central registry.");
        }

        return await ctx.db.insert("courses", {
            ...args,
            instructorId: user._id,
            status: "draft",
            updatedAt: Date.now(),
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

        if (!user) return [];

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

        if (!user) return null;

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
export const updateCourse = mutation({
    args: {
        courseId: v.id("courses"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
        thumbnail: v.optional(v.string()),
        category: v.optional(v.string()),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
        duration: v.optional(v.number()),
        tags: v.optional(v.array(v.string())),
        status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    },
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

        const { courseId, ...updates } = args;
        const course = await ctx.db.get(courseId);
        if (!course || course.instructorId !== user._id) {
            throw new Error("Course not found or unauthorized");
        }

        await ctx.db.patch(courseId, {
            ...updates,
            updatedAt: Date.now(),
        });
    },
});

export const publishCourse = mutation({
    args: { courseId: v.id("courses") },
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

        const course = await ctx.db.get(args.courseId);
        if (!course || course.instructorId !== user._id) {
            throw new Error("Course not found or unauthorized");
        }

        await ctx.db.patch(args.courseId, {
            status: "published",
            updatedAt: Date.now(),
        });
    },
});

export const getStudentCourseDetail = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) return null;

        const enrollment = await ctx.db
            .query("enrollments")
            .withIndex("by_student_course", (q) =>
                q.eq("studentId", user._id).eq("courseId", args.courseId)
            )
            .first();

        // Allow both the student and the instructor to see details
        const isInstructor = (await ctx.db.get(args.courseId))?.instructorId === user._id;

        if (!enrollment && !isInstructor) return null;

        const course = await ctx.db.get(args.courseId);
        if (!course) return null;

        const lessons = await ctx.db
            .query("lessons")
            .withIndex("by_course", (q) => q.eq("courseId", course._id))
            .collect();

        const quizzes = await ctx.db
            .query("quizzes")
            .withIndex("by_course", (q) => q.eq("courseId", course._id))
            .collect();

        return {
            ...course,
            lessons: lessons.sort((a, b) => a.order - b.order),
            quizzes,
        };
    },
});

export const fetchCourseMetadata = action({
    args: { url: v.string() },
    handler: async (ctx, args) => {
        try {
            const response = await fetch(args.url);
            const html = await response.text();

            // Extract title from <title> or <h1>
            const titleMatch = html.match(/<title>(.*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1].split('|')[0].trim() : "Imported Curriculum";

            // Extract description from meta tags
            const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i)
                || html.match(/<meta\s+property="og:description"\s+content="(.*?)"/i);
            const description = descMatch ? descMatch[1].trim() : "Self-sourced content from institutional repository.";

            // Extract thumbnail from og:image
            const thumbMatch = html.match(/<meta\s+property="og:image"\s+content="(.*?)"/i);
            const thumbnail = thumbMatch ? thumbMatch[1] : "";

            return { title, description, thumbnail };
        } catch (error) {
            console.error("External Fetch Error:", error);
            throw new Error("Failed to authenticate with external curriculum provider.");
        }
    },
});
