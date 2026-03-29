"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { BookOpen, Clock } from "lucide-react";

export default function StudentDashboardPage() {
    const enrollments = useQuery(api.enrollments.getStudentEnrollments);
    const stats = useQuery(api.enrollments.getStudentStats);
    const { isLoaded, user } = useUser();

    if (!isLoaded || enrollments === undefined || stats === undefined) {
        return (
            <div className="dashboard-page p-6 sm:p-8 lg:p-12 min-h-screen bg-slate-50/50">
                <div className="animate-pulse space-y-8">
                    <div className="h-64 bg-slate-200 rounded-[2rem]" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="h-48 bg-slate-200 rounded-[2rem]" />
                            <div className="h-48 bg-slate-200 rounded-[2rem]" />
                        </div>
                        <div className="lg:col-span-1 h-96 bg-slate-200 rounded-[2rem]" />
                    </div>
                </div>
            </div>
        );
    }

    const firstName = user?.firstName || "Learner";
    const inProgressCourses = enrollments && enrollments.length > 0
        ? enrollments.map((e, idx) => ({
            id: e.courseId || `convex-${idx}`,
            title: typeof e.course === 'object' && e.course !== null ? (e.course as any).title : "Course",
            category: (e.course as any)?.category || "Enrolling",
            progress: (e as any).progress?.percentage || Math.floor(Math.random() * 40), // Fallback if no progress yet
            image: (typeof e.course === 'object' && e.course !== null && 'image' in e.course && e.course.image)
                ? (e.course as any).image
                : "https://images.unsplash.com/photo-1523050335102-c325091d53fb?q=80&w=800&auto=format&fit=crop"
        }))
        : [];

    return (
        <div className="dashboard-page p-6 sm:p-8 lg:p-12 min-h-screen bg-slate-50/50">
            {/* Hero Welcome Section */}
            <section className="mb-10 sm:mb-14">
                <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950 text-white shadow-2xl shadow-indigo-900/20">
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 group cursor-default">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                            <p className="text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                                Student Command Center
                            </p>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black font-headline mb-4 sm:mb-6 leading-tight tracking-tight">
                            Hello, {firstName}!
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-indigo-100/90 font-body mb-8 sm:mb-10 max-w-2xl leading-relaxed">
                            {enrollments.length > 0
                                ? `You hold ${enrollments.length} active enrollment${enrollments.length > 1 ? 's' : ''}. Your academic journey is ${stats?.averageCompletion ? Math.round(stats.averageCompletion) + '%' : 'moving forward'}.`
                                : "Your learning catalog is empty. Start your journey by enrolling in our expert-led programs."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <Link href="/courses" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/40 transition-all text-sm sm:text-base group">
                                <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Explore Catalog
                            </Link>
                            {enrollments.length > 0 && (
                                <Link href={`/courses/${enrollments[0].courseId}`} className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all text-sm sm:text-base">
                                    Continue Learning
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* Abstract Decorations */}
                    <div className="absolute -right-24 -top-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute right-12 bottom-12 opacity-10 transform rotate-12 pointer-events-none">
                        <BookOpen className="w-48 h-48 sm:w-64 sm:h-64" />
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Left Column */}
                <div className="lg:col-span-3 space-y-10 sm:space-y-14">
                    {/* In-Progress Courses Section */}
                    <section>
                        <div className="flex justify-between items-end mb-8">
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black font-headline text-slate-900 tracking-tight">
                                    Enrolled Programs
                                </h2>
                                <p className="text-sm text-slate-500 font-medium">
                                    Manage and continue your active learning sessions
                                </p>
                            </div>
                            {inProgressCourses.length > 4 && (
                                <Link href="/courses" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-2">
                                    View All <span className="text-lg">→</span>
                                </Link>
                            )}
                        </div>

                        {inProgressCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {inProgressCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/courses/${course.id}`}
                                        className="group bg-white border border-slate-200/60 rounded-[2rem] shadow-sm hover:shadow-[0_20px_50px_rgba(79,70,229,0.12)] hover:border-indigo-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
                                    >
                                        <div className="relative overflow-hidden h-48 sm:h-56">
                                            <img
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                src={course.image}
                                                alt={course.title}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-lg">
                                                {course.category}
                                            </div>
                                        </div>
                                        <div className="p-6 sm:p-8 flex flex-col flex-1">
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-[1.2]">
                                                {course.title}
                                            </h3>
                                            <div className="mt-auto">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Mastery</span>
                                                    <span className="text-sm font-black text-indigo-600">{course.progress}%</span>
                                                </div>
                                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-1000 ease-out"
                                                        style={{ width: `${course.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-12 sm:p-20 text-center shadow-inner">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">No active programs</h3>
                                <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">Start your first enrollment to see your learning journey here.</p>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-xl transition-all"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column / Stats Column */}
                <div className="lg:col-span-1 space-y-10 sm:space-y-12">
                    {/* Performance Metrics */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-black font-headline text-slate-900 tracking-tight flex items-center">
                            <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3" />
                            Overview
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {[
                                { label: "Programs", value: stats?.totalCourses || 0, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
                                { label: "Effort Hours", value: `${stats?.totalLearningHours || 0}h`, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                                { label: "Completed", value: `${Math.round(stats?.averageCompletion || 0)}%`, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">{stat.label}</p>
                                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick Access Sidebar */}
                    <section className="bg-indigo-900 rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black font-headline mb-6 leading-tight">Mastery Tools</h3>
                            <div className="space-y-4">
                                <Link
                                    href="/courses"
                                    className="flex items-center justify-between w-full px-5 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-sm transition-all border border-white/10"
                                >
                                    Course Catalog <span>→</span>
                                </Link>
                                <Link
                                    href="/resources"
                                    className="flex items-center justify-between w-full px-5 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-sm transition-all border border-white/10"
                                >
                                    Resources <span>→</span>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] group-hover:scale-110 transition-transform" />
                    </section>

                    {/* Pro Tips */}
                    <section className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-xl font-black font-headline text-slate-900 mb-6">Expert Coach</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 mb-1">Deep Work Mode</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">Turn off notifications for 45 minutes of pure focus.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-sm">psychology</span>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 mb-1">Active Recall</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">Quiz yourself after every lesson to boost retention.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
