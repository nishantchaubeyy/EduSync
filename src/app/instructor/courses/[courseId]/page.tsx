"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Settings, CheckCircle, Loader2 } from "lucide-react";
import { use } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function CourseDetailPage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
    const params = use(paramsPromise);
    const course = useQuery(api.courses.getInstructorCourseDetail, {
        courseId: params.courseId as Id<"courses">
    });

    if (course === undefined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-medium font-headline tracking-widest uppercase text-xs">Accessing Course Repository...</p>
            </div>
        );
    }

    if (!course) return notFound();

    return (
        <div className="dashboard-page animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="page-header border-b border-slate-100 pb-8">
                <div className="page-header-copy flex items-center space-x-6">
                    <Link href="/instructor/courses" className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 hover:rotate-[-8deg] shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{course.title}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 italic">Curriculum Active</span>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{course._count.enrollments} Students Enrolled</p>
                        </div>
                    </div>
                </div>
                <div className="page-actions flex gap-3">
                    <Link href={`/instructor/courses/${course._id}/settings`} className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl hover:bg-slate-50 transition-all font-bold flex items-center space-x-2 shadow-sm">
                        <Settings className="w-5 h-5 text-slate-400" />
                        <span>Course Settings</span>
                    </Link>
                </div>
            </div>

            <div className="content-grid content-grid--feature mt-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Lessons Section */}
                    <section className="panel-card text-left p-10 bg-white border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Curriculum Lessons</h2>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">The chronological learning journey</p>
                            </div>
                            <Link href={`/instructor/courses/${course._id}/lessons/new`} className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl text-sm font-black flex items-center space-x-2 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                                <Plus className="w-5 h-5" />
                                <span>Add Lesson</span>
                            </Link>
                        </div>

                        {course.lessons.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No entries in the curriculum yet.</p>
                                <p className="text-slate-300 text-sm mt-2">Static learning is history. Add your first lesson.</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {course.lessons.map((lesson: any, index: number) => (
                                    <li key={lesson._id} className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                                        <div className="flex items-center space-x-5">
                                            <div className="w-12 h-12 rounded-xl bg-white text-slate-400 flex items-center justify-center font-black text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:rotate-6">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </div>
                                            <div>
                                                <span className="font-black text-slate-800 group-hover:text-indigo-900 transition-colors text-lg tracking-tight">{lesson.title}</span>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Video Component</p>
                                            </div>
                                        </div>
                                        <Link href={`/instructor/courses/${course._id}/lessons/${lesson._id}`} className="text-slate-400 hover:text-indigo-600 font-black text-xs bg-white border border-slate-100 px-5 py-2.5 rounded-xl group-hover:border-indigo-200 transition-all shadow-sm">
                                            EDIT
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Quizzes Section */}
                    <section className="panel-card text-left p-10 bg-white border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Scholarly Assessments</h2>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Verify knowledge retention</p>
                            </div>
                            <Link href={`/instructor/courses/${course._id}/quizzes/new`} className="text-white bg-slate-900 hover:bg-indigo-600 px-6 py-3 rounded-2xl text-sm font-black flex items-center space-x-2 transition-all shadow-lg active:scale-95">
                                <Plus className="w-5 h-5" />
                                <span>New Quiz</span>
                            </Link>
                        </div>

                        {course.quizzes.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No assessments defined.</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {course.quizzes.map((quiz: any) => (
                                    <li key={quiz._id} className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-slate-300 hover:shadow-lg transition-all group">
                                        <div className="flex items-center space-x-5">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover:rotate-[-6deg] transition-all">
                                                <CheckCircle className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <span className="font-black text-slate-800 group-hover:text-slate-900 transition-colors text-lg tracking-tight">{quiz.title}</span>
                                        </div>
                                        <Link href={`/instructor/courses/${course._id}/quizzes/${quiz._id}`} className="text-slate-400 hover:text-slate-900 font-black text-xs bg-white border border-slate-100 px-5 py-2.5 rounded-xl transition-all shadow-sm">
                                            EDIT
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <div className="panel-card p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-indigo-950/20 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
                        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            Abstract Summary
                        </h3>
                        <p className="text-slate-300 text-base font-medium leading-relaxed italic mb-10">"{course.description || "No description given."}"</p>
                        <div className="h-px w-full bg-white/10 mb-8" />
                        <div className="space-y-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Inauguration Date</span>
                                <span className="text-white text-lg font-bold">{new Date(course._creationTime).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Knowledge Capacity</span>
                                <span className="text-indigo-400 text-lg font-bold">{course._count.lessons} Curriculum Units</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

