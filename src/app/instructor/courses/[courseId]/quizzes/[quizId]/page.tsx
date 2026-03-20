import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, HelpCircle } from "lucide-react";
import { addQuestion } from "@/actions/questions";
import { SubmitButton } from "@/app/instructor/courses/new/SubmitButton";

export default async function QuizManagerPage({ params }: { params: { courseId: string, quizId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "INSTRUCTOR") return null;

    const quiz = await prisma.quiz.findUnique({
        where: { id: params.quizId, courseId: params.courseId },
        include: { questions: true }
    });

    if (!quiz) return notFound();

    const addQuestionWithQuizId = addQuestion.bind(null, quiz.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                <Link href={`/instructor/courses/${params.courseId}`} className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-500">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{quiz.title}</h1>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Manage questions for this assessment.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Added Questions List */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">Existing Questions ({quiz.questions.length})</h2>

                    {quiz.questions.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50">
                            <p className="text-slate-500 font-medium">No questions added yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {quiz.questions.map((q: any, i: number) => (
                                <div key={q.id} className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm">
                                    <h3 className="font-bold text-slate-800 flex items-start gap-3">
                                        <span className="text-indigo-600">Q{i + 1}.</span> {q.text}
                                    </h3>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                        {JSON.parse(q.options).map((opt: string, idx: number) => (
                                            <div key={idx} className={`px-4 py-2 rounded-lg border ${opt === q.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>
                                                {opt} {opt === q.correct && <CheckCircle className="w-4 h-4 inline-block ml-1" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Add Question Form */}
                <section className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 h-fit">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-500" />
                        Add New Question
                    </h2>

                    <form action={addQuestionWithQuizId} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Question Text</label>
                            <textarea name="text" required placeholder="What is Next.js?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium resize-none text-sm" rows={3}></textarea>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-700">Options</label>
                            <input type="text" name="opt1" required placeholder="Option 1" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm" />
                            <input type="text" name="opt2" required placeholder="Option 2" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm" />
                            <input type="text" name="opt3" placeholder="Option 3 (Optional)" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm" />
                            <input type="text" name="opt4" placeholder="Option 4 (Optional)" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm" />
                        </div>

                        <div className="space-y-2 pb-4 border-b border-slate-100">
                            <label className="block text-sm font-bold text-slate-700">Exact Correct Answer</label>
                            <input type="text" name="correct" required placeholder="Must exactly match one option above" className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium text-sm" />
                        </div>

                        <div className="pt-2 flex justify-end">
                            <SubmitButton />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
