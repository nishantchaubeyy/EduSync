import { createLesson } from "@/actions/lessons";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "../../../new/SubmitButton";

export default function NewLessonPage({ params }: { params: { courseId: string } }) {
    const createLessonWithCourseId = createLesson.bind(null, params.courseId);

    return (
        <div className="app-shell app-shell--narrow page-stack py-6 sm:py-10 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4">
                <Link href={`/instructor/courses/${params.courseId}`} className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-500">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add a New Lesson</h1>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Upload video content for your students.</p>
                </div>
            </div>

            <div className="panel-card p-8">
                <form action={createLessonWithCourseId} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-bold text-slate-700">Lesson Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            placeholder="e.g. Introduction to React Server Components"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="videoUrl" className="block text-sm font-bold text-slate-700">Video URL (S3 / CDN)</label>
                        <input
                            type="url"
                            name="videoUrl"
                            id="videoUrl"
                            required
                            placeholder="https://your-s3-bucket.amazonaws.com/video.mp4"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                        <p className="text-xs text-slate-500 font-medium mt-1">For this MVP version, provide a direct URL to your hosted video or a Vimeo link.</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
