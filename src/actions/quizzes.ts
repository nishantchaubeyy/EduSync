"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createQuiz(courseId: string, formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "INSTRUCTOR") {
        throw new Error("Unauthorized");
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId, instructorId: session.user.id }
    });

    if (!course) throw new Error("Course not found or unauthorized");

    const title = formData.get("title") as string;

    if (!title) {
        throw new Error("Title is required");
    }

    await prisma.quiz.create({
        data: {
            title,
            courseId
        }
    });

    revalidatePath(`/instructor/courses/${courseId}`);
    redirect(`/instructor/courses/${courseId}`);
}
