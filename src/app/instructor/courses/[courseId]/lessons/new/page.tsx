"use client";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowLeft, Send, Loader2, Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { Id } from "@convex/_generated/dataModel";

export default function NewLessonPage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
    const params = use(paramsPromise);
    const router = useRouter();
    const createLesson = useMutation(api.lessons.createLesson);

    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await createLesson({
                courseId: params.courseId as Id<"courses">,
                title,
                videoUrl,
                order: Date.now(), // Simplified ordering for now
            });
            router.push(`/instructor/courses/${params.courseId}`);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to add lesson. Integrity check failed.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="app-shell app-shell--narrow page-stack py-6 sm:py-10 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center space-x-5 mb-8">
                <Link href={`/instructor/courses/${params.courseId}`} className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 hover:rotate-[-5deg] shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Append Lesson</h1>
                    <p className="text-slate-500 mt-1 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Expanding the Digital Curriculum</p>
                </div>
            </div>

            <div className="panel-card p-10 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    {error && (
                        <div className="p-4 bg-error/10 border border-error/20 text-error rounded-2xl text-sm font-bold flex items-center gap-3">
                            <span className="material-symbols-outlined">report</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label htmlFor="title" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Lesson Nomenclature</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. Fundamental Principles of Modernism"
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-bold text-lg"
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="videoUrl" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Video Resource URL</label>
                        <div className="relative group">
                            <Video className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="url"
                                id="videoUrl"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                required
                                placeholder="https://cdn.edusync.com/resources/01.mp4"
                                className="w-full pl-16 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">info</span>
                            Reference a direct video stream or protected CDN link.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center space-x-3 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-400 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 active:translate-y-0"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Append to Curriculum</span>
                                    <Send className="w-4 h-4 ml-1" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

