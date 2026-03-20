"use client";

import { useFormStatus } from "react-dom";
import { markLessonComplete } from "@/actions/progress";
import { Loader2, CheckCircle } from "lucide-react";

export function MarkCompleteButton({ lessonId, courseId, nextLessonId }: { lessonId: string, courseId: string, nextLessonId?: string }) {
    const markComplete = markLessonComplete.bind(null, lessonId, courseId, nextLessonId);

    return (
        <form action={markComplete} className="shrink-0 w-full sm:w-auto">
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center w-full bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-indigo-400 transition-all shadow-md active:scale-95 space-x-2"
        >
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Mark as Complete</span>
                </>
            )}
        </button>
    );
}
