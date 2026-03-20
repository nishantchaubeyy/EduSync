import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Settings, CheckCircle } from "lucide-react";

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "INSTRUCTOR") return null;

    const course = await prisma.course.findUnique({
        where: { id: params.courseId, instructorId: session.user.id },
        include: {
            lessons: { orderBy: { order: "asc" } },
            quizzes: true,
            _count: { select: { enrollments: true } }
        }
    });

    if (!course) return notFound();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center space-x-4">
                    <Link href="/instructor/courses" className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{course.title}</h1>
                        <p className="text-slate-500 mt-1 text-sm font-medium">{course._count.enrollments} Students Enrolled</p>
                    </div>
                </div>
                <div className="flex space-x-3 w-full sm:w-auto">
                    <Link href={`/instructor/courses/${course.id}/settings`} className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold flex items-center justify-center space-x-2 shadow-sm">
                        <Settings className="w-4 h-4" />
                        <span>Course Settings</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Lessons Section */}
                    <section className="bg-white border text-left border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Curriculum Lessons</h2>
                            <Link href={`/instructor/courses/${course.id}/lessons/new`} className="text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>Add Lesson</span>
                            </Link>
                        </div>

                        {course.lessons.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                <p className="text-slate-500 font-medium">No lessons added yet. Start building your curriculum!</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {course.lessons.map((lesson: any, index: number) => (
                                    <li key={lesson.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all group">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                {index + 1}
                                            </div>
                                            <span className="font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">{lesson.title}</span>
                                        </div>
                                        <Link href={`/instructor/courses/${course.id}/lessons/${lesson.id}`} className="text-slate-400 hover:text-indigo-600 font-semibold text-sm bg-slate-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-50 transition-colors">
                                            Edit
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Quizzes Section */}
                    <section className="bg-white border text-left border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Quizzes & Assessments</h2>
                            <Link href={`/instructor/courses/${course.id}/quizzes/new`} className="text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>Add Quiz</span>
                            </Link>
                        </div>

                        {course.quizzes.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                <p className="text-slate-500 font-medium">No quizzes added yet.</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {course.quizzes.map((quiz: any) => (
                                    <li key={quiz.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-purple-200 hover:shadow-sm transition-all group">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <span className="font-bold text-slate-700 group-hover:text-purple-700 transition-colors">{quiz.title}</span>
                                        </div>
                                        <Link href={`/instructor/courses/${course.id}/quizzes/${quiz.id}`} className="text-slate-400 hover:text-purple-600 font-semibold text-sm bg-slate-50 px-3 py-1.5 rounded-lg group-hover:bg-purple-50 transition-colors">
                                            Edit
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-6">
                    <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Course Details</h3>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">{course.description || "No description given."}</p>
                        <div className="h-px w-full bg-slate-100 mb-6" />
                        <div className="space-y-4 text-sm font-bold">
                            <div className="flex justify-between items-center text-slate-500">
                                <span>Created Date</span>
                                <span className="text-slate-900 bg-slate-50 px-3 py-1 rounded-md">{new Date(course.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500">
                                <span>Active Enrollments</span>
                                <span className="text-slate-900 bg-indigo-50 px-3 py-1 rounded-md text-indigo-700">{course._count.enrollments}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
