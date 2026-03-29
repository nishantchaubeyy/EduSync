"use client";

import { useMutation, useAction } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowLeft, Send, Loader2, Sparkles, Image as ImageIcon, BookOpen, Layers, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCoursePage() {
    const router = useRouter();
    const createCourse = useMutation(api.courses.createCourseV3);
    const fetchMetadata = useAction(api.courses.fetchCourseMetadata);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Technology",
        level: "beginner" as "beginner" | "intermediate" | "advanced",
        thumbnail: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [courseraUrl, setCourseraUrl] = useState("");

    const handleFetchMetadata = async () => {
        if (!courseraUrl) return;
        setIsFetching(true);
        setError(null);
        try {
            const data = await fetchMetadata({ url: courseraUrl });
            setFormData({
                ...formData,
                title: data.title,
                description: data.description,
                thumbnail: data.thumbnail
            });
        } catch (err) {
            console.error(err);
            setError("Authentication with external repository failed. Ensure the URL is public.");
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) {
            setError("Program title is mandatory for registry.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const courseId = await createCourse({
                ...formData
            });
            router.push(`/instructor/courses/${courseId}`);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Handshake failure: Could not establish new curriculum in the database.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header Identity */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 px-4">
                <div className="flex items-center gap-6">
                    <Link href="/instructor" className="p-4 bg-white border border-slate-200 rounded-[1.5rem] hover:bg-slate-50 transition-all text-slate-400 hover:text-indigo-600 hover:-translate-x-1 shadow-sm group">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </Link>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-indigo-100">
                            <Sparkles className="w-3 h-3" />
                            <span>Curriculum Genesis</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Initiate New Program</h1>
                    </div>
                </div>

                <div className="text-right hidden md:block">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Protocol status</p>
                    <p className="text-sm font-bold text-slate-900">Awaiting Core Meta-Data</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Entry Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border border-slate-200/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/20 relative overflow-hidden">
                        <div className="mb-10 p-8 bg-indigo-50/30 border border-indigo-100/50 rounded-[2.5rem] space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">
                                <Globe className="w-4 h-4" />
                                <span>Import from External Repository (Coursera)</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="url"
                                    value={courseraUrl}
                                    onChange={(e) => setCourseraUrl(e.target.value)}
                                    placeholder="Paste Coursera course URL here..."
                                    className="flex-1 px-6 py-4 rounded-2xl border border-indigo-100 bg-white focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleFetchMetadata}
                                    disabled={isFetching || !courseraUrl}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:bg-slate-300 transition-all flex items-center justify-center min-w-[160px]"
                                >
                                    {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Fetch Meta-data"}
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                            {error && (
                                <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-4 animate-in shake duration-500">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-red-100">!</div>
                                    {error}
                                </div>
                            )}

                            {/* Title Field */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>Program Nomenclature</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter descriptive course name..."
                                    className="w-full px-8 py-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-12 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300 font-black text-xl tracking-tight"
                                />
                            </div>

                            {/* Description Field */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Layers className="w-3.5 h-3.5" />
                                    <span>Curriculum Summary</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={5}
                                    placeholder="Briefly describe the core objectives and learning outcomes..."
                                    className="w-full px-8 py-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-12 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300 font-medium leading-relaxed"
                                />
                            </div>

                            {/* Dual Config Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discipline Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-6 py-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-400 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Technology</option>
                                        <option>Business</option>
                                        <option>Creative Arts</option>
                                        <option>Social Sciences</option>
                                        <option>Mathematics</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Intellectual Level</label>
                                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                        {(['beginner', 'intermediate', 'advanced'] as const).map((l) => (
                                            <button
                                                key={l}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, level: l })}
                                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.level === l ? 'bg-white text-indigo-600 shadow-sm border border-slate-100 opacity-100' : 'text-slate-400 opacity-50 hover:opacity-100'}`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <p className="text-xs text-slate-400 font-medium italic">All programs start as "Draft" for internal review.</p>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative group w-full sm:w-auto px-12 py-5 bg-slate-900 overflow-hidden rounded-[1.5rem] transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 disabled:bg-slate-300"
                                >
                                    <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (
                                            <>
                                                <span className="text-white font-black uppercase tracking-[0.2em] text-xs">Establish Program</span>
                                                <Send className="w-4 h-4 text-white" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </form>

                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 pointer-events-none" />
                    </div>
                </div>

                {/* Aesthetic Visual Sidecar */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                alt="abstract"
                            />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <ImageIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight leading-tight">Visual Identity</h3>
                            <p className="text-indigo-100/70 text-sm font-medium leading-relaxed">
                                A premium thumbnail increases learner engagement by up to 45%. Provide a direct link to your program's cover art.
                            </p>
                            <input
                                type="url"
                                placeholder="Paste image URL..."
                                value={formData.thumbnail}
                                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder:text-white/30 focus:bg-white/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 space-y-6 shadow-sm">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Standard Requirements</h4>
                        <ul className="space-y-4">
                            {[
                                "Minimum 5 modules per curriculum",
                                "Clear learning outcome definitions",
                                "High-fidelity assessment matrix",
                                "Instructor biography presence"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-500">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
