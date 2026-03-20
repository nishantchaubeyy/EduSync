"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function submitQuiz(quizId: string, answers: Record<string, string>) {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: { questions: true }
    });

    if (!quiz) throw new Error("Quiz not found");

    let score = 0;
    const total = quiz.questions.length;

    for (const q of quiz.questions) {
        if (answers[q.id] === q.correct) {
            score++;
        }
    }

    const percentage = Math.round((score / total) * 100);

    // In a full application we'd save this attempt, but for MVP returning grades instantly is perfectly functional
    return { score, total, percentage };
}
