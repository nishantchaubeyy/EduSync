"use client";

import { useFormStatus } from "react-dom";
import { Send, Loader2 } from "lucide-react";

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
        >
            {pending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    <span>Publish Draft</span>
                    <Send className="w-4 h-4 ml-2" />
                </>
            )}
        </button>
    );
}
