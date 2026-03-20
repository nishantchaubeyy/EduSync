"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLesson(courseId: string, formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "INSTRUCTOR") {
        throw new Error("Unauthorized");
    }

    // Verify instructor owns the course
    const course = await prisma.course.findUnique({
        where: { id: courseId, instructorId: session.user.id }
    });

    if (!course) throw new Error("Course not found or unauthorized");

    const title = formData.get("title") as string;
    const videoUrl = formData.get("videoUrl") as string;

    if (!title || !videoUrl) {
        throw new Error("Missing required fields");
    }

    // Determine lesson order by counting existing lessons
    const existingLessons = await prisma.lesson.count({ where: { courseId } });

    await prisma.lesson.create({
        data: {
            title,
            videoUrl,
            order: existingLessons + 1,
            courseId
        }
    });

    revalidatePath(`/instructor/courses/${courseId}`);
    redirect(`/instructor/courses/${courseId}`);
}
