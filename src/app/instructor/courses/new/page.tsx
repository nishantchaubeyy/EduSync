"use client";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCoursePage() {
    const router = useRouter();
    const createCourse = useMutation(api.courses.createCourse);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            setError("Title is required");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const courseId = await createCourse({
                title,
                description,
            });
            router.push(`/instructor/courses/${courseId}`);
        } catch (err) {
            console.error(err);
            setError("Failed to create course. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="app-shell app-shell--narrow page-stack py-6 sm:py-10 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center space-x-5 mb-8">
                <Link href="/instructor/courses" className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 hover:rotate-[-5deg] shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Initiate New Curriculum</h1>
                    <p className="text-slate-500 mt-1 text-sm font-bold uppercase tracking-widest opacity-70">The Curated Journal of Knowledge</p>
                </div>
            </div>

            <div className="panel-card p-10 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[3rem]">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="p-4 bg-error/10 border border-error/20 text-error rounded-2xl text-sm font-bold flex items-center gap-3">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label htmlFor="title" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Course Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. The Architecture of Modernity"
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-bold text-lg"
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="description" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Executive Summary</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            placeholder="Synthesize the essence of this course..."
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 resize-none font-medium leading-relaxed"
                        />
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
                                    <span>Establish Course</span>
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

