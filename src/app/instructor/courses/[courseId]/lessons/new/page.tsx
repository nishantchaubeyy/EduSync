"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { ArrowLeft, Send, Loader2, Video, FileText, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default function NewLessonPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as Id<"courses">;
    const createLesson = useMutation(api.lessons.createLesson);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        duration: 10,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await createLesson({
                courseId,
                ...formData,
                order: Date.now(), // Auto-ordering logic
            });
            router.push(`/instructor/courses/${courseId}`);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Protocol Failure: Could not append unit to curriculum.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header Identity */}
            <div className="flex items-center gap-6 mb-12">
                <Link href={`/instructor/courses/${courseId}`} className="p-4 bg-white border border-slate-200 rounded-[1.5rem] hover:bg-slate-50 transition-all text-slate-400 hover:text-indigo-600 hover:-translate-x-1 shadow-sm group">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:scale-110" />
                </Link>
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-indigo-100">
                        <Sparkles className="w-3 h-3" />
                        <span>Module Construction</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Append Curriculum Unit</h1>
                </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/20 relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    {error && (
                        <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-4 animate-in shake duration-500">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-red-100">!</div>
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Title & Description Column */}
                        <div className="space-y-8 md:col-span-2">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Unit Designation</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter descriptive module name..."
                                    className="w-full px-8 py-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-12 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300 font-black text-xl tracking-tight"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <span>Learning Objectives</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    placeholder="Synthesize what students will master in this module..."
                                    className="w-full px-8 py-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-12 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300 font-medium leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Media & Metadata Column */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Video className="w-3.5 h-3.5" />
                                    <span>Video Stream Path</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.videoUrl}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                    required
                                    placeholder="https://content.edusync.io/v1/..."
                                    className="w-full px-8 py-5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-400 outline-none transition-all font-bold text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Temporal Depth (Min)</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                    required
                                    className="w-full px-8 py-5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-400 outline-none transition-all font-bold text-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-50 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative group w-full sm:w-auto px-12 py-5 bg-slate-900 overflow-hidden rounded-[1.5rem] transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 disabled:bg-slate-300"
                        >
                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (
                                    <>
                                        <span className="text-white font-black uppercase tracking-[0.2em] text-xs">Append Unit</span>
                                        <Send className="w-4 h-4 text-white" />
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </form>

                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 pointer-events-none opacity-50" />
            </div>
        </div>
    );
}
