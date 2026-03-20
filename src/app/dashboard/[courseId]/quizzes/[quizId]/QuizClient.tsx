"use client";

import { useState } from "react";
import { submitQuiz } from "@/actions/quizEval";
import { CheckCircle, XCircle, Award, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

type Question = {
    id: string;
    text: string;
    options: string;
};

export function QuizClient({ quiz, courseId }: { quiz: any, courseId: string }) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<{ score: number, total: number, percentage: number } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelect = (questionId: string, option: string) => {
        if (result) return;
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await submitQuiz(quiz.id, answers);
            setResult(res);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        const passed = result.percentage >= 70;
        return (
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 text-center space-y-6 max-w-2xl mx-auto">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
                    {passed ? <Award className="w-12 h-12 text-emerald-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
                </div>
                <h2 className="text-3xl font-black text-slate-900">{passed ? "Congratulations!" : "Keep Trying!"}</h2>
                <p className="text-slate-600 font-medium">You scored {result.score} out of {result.total} ({result.percentage}%).</p>

                <div className="pt-6 border-t border-slate-100">
                    <Link href={`/dashboard`} className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
                        <span>Return to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {quiz.questions.map((q: Question, index: number) => {
                const optionsList = JSON.parse(q.options);
                const selected = answers[q.id];

                return (
                    <div key={q.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                        <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-start gap-4">
                            <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm shrink-0">Q{index + 1}</span>
                            <span className="pt-1">{q.text}</span>
                        </h3>
                        <div className="space-y-3 pl-0 md:pl-12 mt-6">
                            {optionsList.map((opt: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(q.id, opt)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex items-center justify-between ${selected === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm' : 'border-slate-100 hover:border-indigo-200 bg-slate-50 text-slate-700'}`}
                                >
                                    <span>{opt}</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === opt ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                                        {selected === opt && <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}

            <div className="pt-4 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={loading || Object.keys(answers).length !== quiz.questions.length}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 transition-all shadow-md flex items-center space-x-2 active:scale-95"
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    <span>{loading ? "Grading..." : "Submit Quiz"}</span>
                </button>
            </div>
        </div>
    );
}
