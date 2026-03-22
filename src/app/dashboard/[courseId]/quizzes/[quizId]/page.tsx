import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizClient } from "./QuizClient";

export default async function StudentQuizPage({ params }: { params: { courseId: string, quizId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const quiz = await prisma.quiz.findUnique({
        where: { id: params.quizId, courseId: params.courseId },
        include: {
            questions: { select: { id: true, text: true, options: true } }, // Security: omitting correct answers from payload sent to client
            course: { select: { title: true } }
        }
    });

    if (!quiz) return notFound();

    return (
        <div className="min-h-screen bg-slate-50 py-12 animate-in fade-in duration-500">
            <div className="app-shell app-shell--content page-stack">
                <Link href="/dashboard" className="inline-flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> <span>Back to Dashboard</span>
                </Link>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{quiz.title}</h1>
                <p className="text-slate-500 font-medium mt-2 uppercase tracking-wide text-xs">{quiz.course.title}</p>
                <QuizClient quiz={quiz} courseId={params.courseId} />
            </div>
        </div>
    );
}
