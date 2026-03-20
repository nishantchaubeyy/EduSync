import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Clock, PlayCircle, ShieldCheck, Users, CheckCircle2 } from "lucide-react";
import { EnrollButton } from "./EnrollButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function PublicCoursePage({ params }: { params: { courseId: string } }) {
    const course = await prisma.course.findUnique({
        where: { id: params.courseId },
        include: {
            instructor: { select: { name: true } },
            lessons: { orderBy: { order: "asc" }, select: { id: true, title: true } },
            quizzes: { select: { id: true, title: true } },
            _count: { select: { enrollments: true } }
        }
    });

    if (!course) return notFound();

    const session = await getServerSession(authOptions);
    let isEnrolled = false;

    if (session) {
        const existing = await prisma.enrollment.findFirst({
            where: { courseId: course.id, studentId: session.user.id }
        });
        isEnrolled = !!existing;
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-b-8 border-indigo-600">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                        <span>By {course.instructor.name || "Expert Instructor"}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-lg">{course.title}</h1>
                    <p className="text-xl text-slate-300 max-w-3xl leading-relaxed font-medium">{course.description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold pt-6 text-slate-400">
                        <span className="flex items-center space-x-2"><Users className="w-5 h-5 text-indigo-400" /> <span className="text-white">{course._count.enrollments} Enrolled</span></span>
                        <span className="flex items-center space-x-2"><PlayCircle className="w-5 h-5 text-purple-400" /> <span className="text-white">{course.lessons.length} Video Lessons</span></span>
                        <span className="flex items-center space-x-2"><ShieldCheck className="w-5 h-5 text-emerald-400" /> <span className="text-white">Premium Certificate</span></span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 relative z-10">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Course Syllabus</h2>

                            <div className="space-y-4">
                                <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-4">Video Lessons</h3>
                                {course.lessons.length === 0 ? <p className="text-slate-500 italic font-medium">No lessons available yet.</p> : (
                                    <ul className="space-y-3">
                                        {course.lessons.map((lesson: { id: string; title: string }, idx: number) => (
                                            <li key={lesson.id} className="flex items-center space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm shrink-0">{idx + 1}</div>
                                                <span className="font-bold text-slate-700">{lesson.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="space-y-4 mt-12">
                                <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-4">Assessments</h3>
                                {course.quizzes.length === 0 ? <p className="text-slate-500 italic font-medium">No quizzes available.</p> : (
                                    <ul className="space-y-3">
                                        {course.quizzes.map((quiz: { id: string; title: string }) => (
                                            <li key={quiz.id} className="flex items-center space-x-4 p-5 rounded-2xl bg-purple-50 border border-purple-100 hover:border-purple-200 transition-all">
                                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <span className="font-bold text-purple-900">{quiz.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar Action Card */}
                    <div className="lg:col-span-1 relative">
                        <div className="sticky top-24 bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 border border-slate-100 max-lg:hidden">
                            <div className="aspect-video bg-slate-900 overflow-hidden rounded-2xl mb-8 flex items-center justify-center border-4 border-white shadow-lg relative -mt-16 group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <PlayCircle className="w-16 h-16 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            <h3 className="text-4xl font-black text-slate-900 mb-2">Free</h3>
                            <p className="text-slate-500 font-medium text-sm mb-8">Full lifetime access to this course material.</p>

                            {isEnrolled ? (
                                <Link href={`/dashboard`} className="flex items-center justify-center w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <EnrollButton courseId={course.id} />
                            )}

                            <ul className="mt-8 space-y-4 text-sm text-slate-600 font-medium border-t border-slate-100 pt-8">
                                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span>Full HD Videos</span></li>
                                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span>Interactive Quizzes</span></li>
                                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span>Certificate of Completion</span></li>
                            </ul>
                        </div>

                        {/* Mobile Enrollment CTA Container (visible only on small screens) */}
                        <div className="lg:hidden mt-8">
                            {isEnrolled ? (
                                <Link href={`/dashboard`} className="flex items-center justify-center w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <EnrollButton courseId={course.id} />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
