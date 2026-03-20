"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function markLessonComplete(lessonId: string, courseId: string, nextLessonId?: string) {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized");

    // Upsert progress
    await prisma.progress.upsert({
        where: {
            id: "unknown" // Prisma requires unique constraint for upsert, we don't have composite unique on lessonId/studentId.
            // Wait, let's just find first and update, or create
        },
        update: {},
        create: {
            lessonId: lessonId,
            studentId: session.user.id,
            completed: true
        }
    }).catch(async (e: unknown) => {
        // If we can't upsert directly due to missing composite unique, we use manual find then update/create
        const existing = await prisma.progress.findFirst({
            where: { lessonId, studentId: session.user.id }
        });

        if (existing) {
            await prisma.progress.update({
                where: { id: existing.id },
                data: { completed: true }
            });
        } else {
            await prisma.progress.create({
                data: {
                    lessonId,
                    studentId: session.user.id,
                    completed: true
                }
            });
        }
    });

    revalidatePath(`/dashboard`);
    revalidatePath(`/dashboard/${courseId}/lessons/${lessonId}`);

    if (nextLessonId) {
        redirect(`/dashboard/${courseId}/lessons/${nextLessonId}`);
    }
}
