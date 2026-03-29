"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, PlayCircle, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useState } from "react";

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as Id<"courses">;
    const lessonId = params.lessonId as Id<"lessons">;

    const data = useQuery(api.progress.getLessonDetail, { courseId, lessonId });
    const markComplete = useMutation(api.progress.markLessonComplete);
    const [isPending, setIsPending] = useState(false);

    if (data === undefined) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (data === null) {
        return (
            <div className="flex flex-col h-[70vh] items-center justify-center space-y-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center gap-3 border border-red-100 uppercase tracking-widest text-xs">
                    Access Revoked
                </div>
                <h1 className="text-2xl font-black text-slate-900">Protected Module</h1>
                <p className="text-slate-500 font-medium">Please enroll in this program to access the syllabus.</p>
                <Link href="/courses" className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95">
                    Browse All Courses
                </Link>
            </div>
        );
    }

    const { lesson, courseTitle, isCompleted, nextLessonId, prevLessonId, allLessons, quizzes } = data;

    const handleMarkComplete = async () => {
        setIsPending(true);
        try {
            await markComplete({ lessonId });
            if (nextLessonId) {
                router.push(`/dashboard/${courseId}/lessons/${nextLessonId}`);
            }
        } catch (error) {
            console.error("Failed to mark complete:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto page-stack py-8 px-4 sm:px-6 lg:px-10 animate-in fade-in duration-500">
            {/* Header Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 group">
                <div className="flex flex-col gap-1">
                    <Link href={`/dashboard`} className="inline-flex items-center space-x-2 text-slate-400 hover:text-indigo-600 font-bold transition-all text-sm uppercase tracking-widest mb-2">
                        <ArrowLeft className="w-4 h-4" /> <span>Unified Command</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none group-hover:translate-x-1 transition-transform">{lesson.title}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-indigo-100/50">{courseTitle}</span>
                        <span className="text-slate-400 text-xs font-bold">•</span>
                        <span className="text-slate-400 text-xs font-bold">Module {lesson.order}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {prevLessonId && (
                        <button
                            onClick={() => router.push(`/dashboard/${courseId}/lessons/${prevLessonId}`)}
                            className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm active:scale-95"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}
                    {nextLessonId && (
                        <button
                            onClick={() => router.push(`/dashboard/${courseId}/lessons/${nextLessonId}`)}
                            className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm active:scale-95 flex items-center gap-2"
                        >
                            <span className="font-extrabold text-sm ml-2">Next Module</span>
                            <ChevronRight className="w-6 h-6 mr-1" />
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Main Content Video Area */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Video Player Container */}
                    <div className="relative group/player shadow-2xl shadow-indigo-500/10 rounded-[2.5rem] overflow-hidden bg-slate-900 border-[12px] border-white ring-1 ring-slate-200">
                        <div className="aspect-video relative">
                            {/* In a real app, this would be a player like YouTube/Vimeo/Mux */}
                            <iframe
                                className="w-full h-full object-cover"
                                src={lesson.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                                title="Lesson Video Player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Lesson Description & Actions */}
                    <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
                            <PlayCircle className="w-32 h-32 text-indigo-600" />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Instructor Notes</h3>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                                    {lesson.description || "In this module, we explore the core principles of the subject. Focus on the practical implementation techniques discussed in the second half of the video."}
                                </p>
                            </div>

                            <div className="shrink-0 w-full sm:w-auto">
                                {isCompleted ? (
                                    <div className="flex items-center space-x-3 bg-emerald-50 text-emerald-700 px-8 py-5 rounded-2xl font-black border-2 border-emerald-100 uppercase tracking-widest text-xs shadow-sm shadow-emerald-500/10 animate-in zoom-in-95 duration-300">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Mastery Achieved</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleMarkComplete}
                                        disabled={isPending}
                                        className="relative group w-full bg-slate-900 overflow-hidden px-10 py-5 rounded-2xl border border-slate-900 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(79,70,229,0.15)] active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span className="text-white font-black uppercase tracking-[0.1em] text-xs">
                                                        Mark as Complete
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation Context */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-slate-900 text-xl tracking-tight">Curriculum Path</h3>
                            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">{allLessons.length} Modules</span>
                        </div>

                        <div className="space-y-3">
                            {allLessons.map((l: any, i: number) => {
                                const isCurrent = l._id === lesson._id;
                                return (
                                    <Link
                                        key={l._id}
                                        href={`/dashboard/${courseId}/lessons/${l._id}`}
                                        className={`group block p-5 rounded-2xl transition-all font-bold text-sm border-2 ${isCurrent
                                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200'
                                                : 'bg-slate-50 border-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isCurrent ? 'bg-white/20' : 'bg-white border border-slate-200'} transition-all`}>
                                                <span className="text-[11px] font-black">{i + 1}</span>
                                            </div>
                                            <span className="truncate leading-tight">{l.title}</span>
                                        </div>
                                    </Link>
                                );
                            })}

                            {(quizzes && quizzes.length > 0) && (
                                <>
                                    <div className="h-px bg-slate-100 my-6" />
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Assessment Matrix</h4>
                                    {quizzes.map((q: any) => (
                                        <Link key={q._id} href={`/dashboard/${courseId}/quizzes/${q._id}`} className="flex items-center gap-4 p-5 rounded-2xl transition-all font-black text-xs bg-purple-50 text-purple-700 border-2 border-purple-50 hover:bg-white hover:border-purple-200 uppercase tracking-[0.05em]">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-purple-100 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-4 h-4" />
                                            </div>
                                            <span>Quiz: {q.title}</span>
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20 group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                        <h4 className="text-lg font-black tracking-tight relative z-10">Stuck on a concept?</h4>
                        <p className="text-white/70 text-sm font-medium mt-2 mb-6 relative z-10 leading-relaxed">Join the live office hours every Tuesday at 4 PM to discuss this specific module with the instructor.</p>
                        <button className="w-full bg-white text-indigo-600 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-lg active:shadow-none">
                            Request Assistance
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
    );
}
