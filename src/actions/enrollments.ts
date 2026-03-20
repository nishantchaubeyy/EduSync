"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollInCourse(courseId: string) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Check if they are already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
        where: { courseId, studentId: session.user.id }
    });

    if (existingEnrollment) {
        redirect("/dashboard");
    }

    await prisma.enrollment.create({
        data: {
            courseId,
            studentId: session.user.id
        }
    });

    revalidatePath("/courses");
    revalidatePath(`/courses/${courseId}`);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}
