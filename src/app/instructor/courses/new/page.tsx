import { createCourse } from "@/actions/courses";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton"; // We'll create this to handle pending state

export default function NewCoursePage() {
    return (
        <div className="app-shell app-shell--narrow page-stack py-6 sm:py-10 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4">
                <Link href="/instructor/courses" className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-500">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create a New Course</h1>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Build your curriculum and share your knowledge.</p>
                </div>
            </div>

            <div className="panel-card p-8">
                <form action={createCourse} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-bold text-slate-700">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            placeholder="e.g. Master Next.js 14 in 2024"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-bold text-slate-700">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            placeholder="Give a brief summary of what students will learn..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 resize-none font-medium"
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
