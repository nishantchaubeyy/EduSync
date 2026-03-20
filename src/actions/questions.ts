"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function addQuestion(quizId: string, formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "INSTRUCTOR") throw new Error("Unauthorized");

    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: { course: true }
    });

    if (!quiz || quiz.course.instructorId !== session.user.id) throw new Error("Unauthorized");

    const text = formData.get("text") as string;
    const opt1 = formData.get("opt1") as string;
    const opt2 = formData.get("opt2") as string;
    const opt3 = formData.get("opt3") as string;
    const opt4 = formData.get("opt4") as string;
    const correct = formData.get("correct") as string; // index or value

    if (!text || !opt1 || !opt2 || !correct) throw new Error("Missing required fields");

    const optionsArray = [opt1, opt2, opt3, opt4].filter(Boolean);
    const options = JSON.stringify(optionsArray);

    await prisma.question.create({
        data: {
            text,
            options,
            correct,
            quizId
        }
    });

    revalidatePath(`/instructor/courses/${quiz.courseId}/quizzes/${quizId}`);
}
