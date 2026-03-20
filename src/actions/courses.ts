"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "INSTRUCTOR") {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
        throw new Error("Title is required");
    }

    const course = await prisma.course.create({
        data: {
            title,
            description,
            instructorId: session.user.id
        }
    });

    revalidatePath("/instructor/courses");
    revalidatePath("/instructor");
    redirect(`/instructor/courses/${course.id}`);
}
