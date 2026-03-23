"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Loader2, Plus, Users, BookOpen, GraduationCap, ArrowUpRight, LayoutDashboard, FileText } from "lucide-react";

export default function InstructorDashboardPage() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const courses = useQuery(api.courses.instructorGetCourses);

    if (courses === undefined || !isUserLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-slate-400 gap-4 animate-pulse">
                <Loader2 className="w-10 h-10 animate-spin text-slate-900" />
                <p className="font-black text-[10px] uppercase tracking-[0.3em]">Synching Academic Node...</p>
            </div>
        );
    }

    const totalStudents = courses?.reduce((acc, c) => acc + (c._count.enrollments || 0), 0) || 0;
    const activeCourses = courses?.length || 0;

    return (
        <div className="dashboard-page min-h-screen p-8 lg:p-12 animate-in fade-in duration-1000 slide-in-from-bottom-2">
            {/* Hero Section */}
            <section className="mb-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">Curator Node Active</span>
                            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">• Verified Instructor</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-3 leading-[0.9]">
                            Salutations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">{user?.firstName || "Professor"}</span>.
                        </h1>
                        <p className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed">
                            Welcome to your curatorial dashboard. Your academic ecosystem is performing at optimal capacity.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/instructor/courses/new" className="px-8 py-5 bg-slate-900 text-white font-black rounded-[2rem] flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:scale-95">
                            <Plus className="w-5 h-5" />
                            <span>Establish New Course</span>
                        </Link>
                    </div>
                </div>

                {/* Bento Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<BookOpen className="w-6 h-6" />}
                        label="Active Curriculums"
                        value={activeCourses.toString()}
                        trend="+2 Month-over-Month"
                    />
                    <StatCard
                        icon={<Users className="w-6 h-6" />}
                        label="Total Learners"
                        value={totalStudents.toLocaleString()}
                        trend="Growing at 12%"
                    />
                    <StatCard
                        icon={<FileText className="w-6 h-6" />}
                        label="Pending Grading"
                        value="24"
                        trend="4 Critical"
                        isAlert
                    />
                    <StatCard
                        icon={<GraduationCap className="w-6 h-6" />}
                        label="Knowledge Index"
                        value="8.4"
                        trend="Top 5% Tier"
                    />
                </div>
            </section>

            {/* Dynamic Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Course Overview */}
                    <div className="panel-card p-10 bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Primary Curriculum Repo</h2>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Managing {activeCourses} Live Assets</p>
                            </div>
                            <Link href="/instructor/courses" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-slate-900 transition-colors flex items-center gap-2">
                                Expand Inventory <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {courses && courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {courses.slice(0, 4).map((course) => (
                                    <CourseCardSmall key={course._id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                                <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Curriculum Database Empty</p>
                                <p className="text-slate-300 text-sm font-medium mt-2">Initialize your first scholarly sequence above.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Engagement Card */}
                    <div className="panel-card p-10 bg-indigo-600 text-white rounded-[3rem] shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
                        <LayoutDashboard className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-indigo-200">Session Insight</h3>
                        <p className="text-xl font-bold leading-snug italic mb-10">
                            "Optimal learner engagement observed in the 'Abstract Design' modules. Consider replicating this structure across all curriculums."
                        </p>
                        <div className="pt-8 border-t border-white/20">
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">AI Curator Intelligence</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, trend, isAlert }: { icon: any; label: string; value: string; trend: string; isAlert?: boolean }) {
    return (
        <div className={`p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/30 group hover:-translate-y-1 transition-all`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-colors overflow-hidden relative ${isAlert ? 'bg-error/10 text-error shadow-error/10' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:rotate-6 shadow-slate-100 group-hover:shadow-slate-200'}`}>
                {icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
            <div className="flex items-end gap-3 translate-y-1">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
                <span className={`text-[9px] font-bold mb-1.5 ${isAlert ? 'text-error' : 'text-indigo-500'}`}>{trend}</span>
            </div>
        </div>
    );
}

function CourseCardSmall({ course }: { course: any }) {
    return (
        <Link href={`/instructor/courses/${course._id}`} className="group p-6 bg-slate-50/50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-6">
                    <BookOpen className="w-5 h-5" />
                </div>
                <div className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">Active</div>
            </div>
            <h4 className="font-black text-slate-900 text-lg leading-tight mb-2 truncate group-hover:text-indigo-600 transition-colors">{course.title}</h4>
            <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>{course._count.enrollments || 0} Learners</span>
                <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">View →</span>
            </div>
        </Link>
    );
}
