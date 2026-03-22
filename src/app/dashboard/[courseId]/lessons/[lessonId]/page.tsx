import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { MarkCompleteButton } from "./MarkCompleteButton";

export default async function LessonPage({ params }: { params: { courseId: string, lessonId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const enrollment = await prisma.enrollment.findFirst({
        where: { courseId: params.courseId, studentId: session.user.id }
    });

    if (!enrollment) redirect("/courses");

    const course = await prisma.course.findUnique({
        where: { id: params.courseId },
        include: {
            lessons: { orderBy: { order: "asc" } },
            quizzes: true,
        }
    });

    if (!course) return notFound();

    const lesson = course.lessons.find((l: any) => l.id === params.lessonId);
    if (!lesson) return notFound();

    const progress = await prisma.progress.findFirst({
        where: { studentId: session.user.id, lessonId: lesson.id }
    });

    const isCompleted = progress?.completed || false;

    const currentIndex = course.lessons.findIndex((l: any) => l.id === lesson.id);
    const nextLesson = course.lessons[currentIndex + 1];

    return (
        <div className="app-shell app-shell--wide page-stack py-8 animate-in fade-in duration-500">
            <div className="content-grid content-grid--lesson">

                {/* Main Content Video Area */}
                <div className="lg:col-span-3 lg:flex-1 space-y-6">
                    <Link href="/dashboard" className="inline-flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> <span>Back to Dashboard</span>
                    </Link>

                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border-4 border-slate-900 ring-1 ring-slate-200">
                        <video
                            controls
                            className="w-full h-full object-cover"
                            src={lesson.videoUrl}
                            poster={`https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=1200&auto=format&fit=crop`}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className="panel-card p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{lesson.title}</h1>
                            <p className="text-slate-500 font-medium mt-1 uppercase tracking-wider text-xs">{course.title}</p>
                        </div>

                        {isCompleted ? (
                            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-6 py-3.5 rounded-xl font-bold border border-emerald-200 shrink-0">
                                <CheckCircle className="w-5 h-5" />
                                <span>Completed</span>
                            </div>
                        ) : (
                            <MarkCompleteButton lessonId={lesson.id} courseId={course.id} nextLessonId={nextLesson?.id} />
                        )}
                    </div>
                </div>

                {/* Sidebar Navigation Context */}
                <div className="lg:w-80 shrink-0 space-y-6">
                    <div className="panel-card p-6 sticky-panel">
                        <h3 className="font-black text-slate-900 text-lg mb-6">Course Material</h3>
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Video Lessons</h4>
                            {course.lessons.map((l: any, i: number) => (
                                <Link key={l.id} href={`/dashboard/${course.id}/lessons/${l.id}`} className={`block p-4 rounded-xl transition-all font-bold text-sm ${l.id === lesson.id ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 'bg-slate-50 border border-slate-100 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'}`}>
                                    {i + 1}. {l.title}
                                </Link>
                            ))}

                            {course.quizzes.length > 0 && (
                                <>
                                    <div className="h-px bg-slate-100 my-4" />
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assessments</h4>
                                    {course.quizzes.map((q: any, i: number) => (
                                        <Link key={q.id} href={`/dashboard/${course.id}/quizzes/${q.id}`} className="block p-4 rounded-xl transition-all font-bold text-sm bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 hover:border-purple-300">
                                            Quiz: {q.title}
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
