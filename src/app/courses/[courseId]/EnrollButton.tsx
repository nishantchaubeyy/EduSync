"use client";

import { useFormStatus } from "react-dom";
import { enrollInCourse } from "@/actions/enrollments";
import { Loader2 } from "lucide-react";

export function EnrollButton({ courseId }: { courseId: string }) {
    const enroll = enrollInCourse.bind(null, courseId);

    return (
        <form action={enroll}>
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
            className="flex items-center justify-center w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        >
            {pending ? <Loader2 className="w-6 h-6 animate-spin" /> : "Enroll Now"}
        </button>
    );
}
