"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import Link from "next/link";
import {
    Plus,
    BookOpen,
    Users,
    BarChart3,
    TrendingUp,
    ArrowUpRight,
    GraduationCap
} from "lucide-react";

export default function InstructorDashboardPage() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const courses = useQuery(api.courses.instructorGetCourses);

    if (courses === undefined || !isUserLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 text-slate-400 gap-6 animate-pulse p-12">
                <div className="w-16 h-16 bg-slate-200 rounded-2xl animate-spin-slow" />
                <div className="space-y-3 text-center">
                    <p className="font-black text-xs tracking-[0.3em] uppercase opacity-50">Syncing Engine</p>
                    <p className="text-xl font-headline font-black text-slate-900">Preparing your academy...</p>
                </div>
            </div>
        );
    }

    const totalStudents = courses?.reduce((acc, c) => acc + (c._count?.enrollments || 0), 0) || 0;
    const activeCourses = courses?.length || 0;

    return (
        <div className="dashboard-page p-6 sm:p-8 lg:p-12 min-h-screen bg-slate-50/50">
            {/* Header Section */}
            <section className="mb-10 sm:mb-16">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10 sm:mb-14 bg-white border border-slate-200/60 p-8 sm:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full mb-6 border border-indigo-100">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse" />
                            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                                Instructor Hub
                            </p>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                            Welcome, {user?.firstName || "Professor"}
                        </h1>
                        <p className="text-base sm:text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
                            Empower your learners with expert-led content. Manage your curriculum and track academic performance from one central command.
                        </p>
                    </div>
                    <Link
                        href="/instructor/courses/new"
                        className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all text-sm sm:text-base shadow-xl group"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        Create New Program
                    </Link>
                    {/* Abstract Ornament */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 opacity-50" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <StatCard
                        icon={<BookOpen className="w-7 h-7" />}
                        label="Active Programs"
                        value={activeCourses.toString()}
                        trend="Live Curriculum"
                        color="blue"
                    />
                    <StatCard
                        icon={<Users className="w-7 h-7" />}
                        label="Total Learners"
                        value={totalStudents.toLocaleString()}
                        trend={`Across ${activeCourses} active rooms`}
                        color="green"
                    />
                    <StatCard
                        icon={<BarChart3 className="w-7 h-7" />}
                        label="Avg. Retention"
                        value="74%"
                        trend="Engagement Metric"
                        color="orange"
                    />
                    <StatCard
                        icon={<TrendingUp className="w-7 h-7" />}
                        label="Est. Revenue"
                        value="$4.2k"
                        trend="Monthly Growth"
                        color="purple"
                    />
                </div>
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-10 sm:space-y-14">
                    {/* Courses Section */}
                    <section>
                        <div className="flex justify-between items-end mb-8">
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black font-headline text-slate-900 tracking-tight">Your Curriculum</h2>
                                <p className="text-sm font-medium text-slate-500">
                                    Browse and manage your active educational content
                                </p>
                            </div>
                            <Link
                                href="/instructor/courses"
                                className="text-xs sm:text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 uppercase tracking-widest"
                            >
                                Inventory <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {courses && courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {courses.slice(0, 4).map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-white border border-slate-200/60 rounded-[3rem] shadow-sm">
                                <GraduationCap className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                                <h3 className="text-2xl font-black text-slate-900 mb-3">Your program library is empty</h3>
                                <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">Click "Create New Program" above to start your journey as an instructor.</p>
                                <Link
                                    href="/instructor/courses/new"
                                    className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all"
                                >
                                    Build Your First Course
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Performance Analytics (Recent Activity) */}
                    <section className="bg-white border border-slate-200/60 rounded-[3rem] shadow-sm p-8 sm:p-12">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Activity Feed</h2>
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100 animate-pulse">
                                Live Tracking
                            </div>
                        </div>
                        <div className="space-y-6">
                            {[
                                { action: "New Enrollment", student: "A. Sharma", course: "Advanced System Design", time: "Just now", type: "enrollment" },
                                { action: "Assignment Posted", course: "Web Architecture", time: "2h ago", type: "update" },
                                { action: "Quiz Attempt", student: "R. Verma", course: "Python Masterclass", time: "5h ago", type: "assessment" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6 p-6 border border-slate-100 rounded-[2rem] hover:bg-slate-50/50 transition-all group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'enrollment' ? 'bg-indigo-50 text-indigo-600' :
                                        item.type === 'assessment' ? 'bg-amber-50 text-amber-600' :
                                            'bg-slate-50 text-slate-600'
                                        } group-hover:scale-110 transition-transform`}>
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-base font-black text-slate-900">{item.action}</p>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">{item.student ? `${item.student} in ` : ''}{item.course}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-10 sm:space-y-12">
                    {/* Mastery Growth Card */}
                    <section className="bg-indigo-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <span className="absolute top-6 right-6 text-white/20"><TrendingUp size={60} /></span>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black font-headline mb-4 leading-tight">Academic Reach</h3>
                            <p className="text-sm text-indigo-100/70 font-medium mb-10 leading-relaxed">Your content is currently reaching 1,200 unique learners across 4 content categories.</p>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-black uppercase mb-3 text-indigo-200">
                                        <span>Course Completion</span>
                                        <span>82%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-400 rounded-full w-[82%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-black uppercase mb-3 text-indigo-200">
                                        <span>Student Engagement</span>
                                        <span>94%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Access Sidebar */}
                    <section className="bg-white border border-slate-200/60 rounded-[3rem] p-10 shadow-sm">
                        <h3 className="text-xl font-black font-headline text-slate-900 mb-8 tracking-tight">Teacher Resources</h3>
                        <div className="space-y-4">
                            {[
                                { title: "Pedagogy Best Practices", icon: "school" },
                                { title: "Video Production Guide", icon: "videocam" },
                                { title: "Assessment Optimization", icon: "fact_check" },
                                { title: "Student Retention AI", icon: "auto_graph" }
                            ].map((res, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                                >
                                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                        <span className="material-symbols-outlined text-sm">{res.icon}</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{res.title}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    trend: string;
    color: string;
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
    const colorMap = {
        blue: "bg-indigo-50 text-indigo-600",
        green: "bg-emerald-50 text-emerald-600",
        orange: "bg-amber-50 text-amber-600",
        purple: "bg-purple-50 text-purple-600"
    };

    return (
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all group overflow-hidden relative">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colorMap[color as keyof typeof colorMap]}`}>
                {icon}
            </div>
            <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
            <div className="flex items-end gap-2 mb-2">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">{value}</h3>
            </div>
            <p className="text-xs font-bold text-slate-500 tracking-tight">{trend}</p>
            <div className="absolute -bottom-4 -right-4 text-slate-50/50 pointer-events-none group-hover:text-indigo-50 transition-colors">
                {icon}
            </div>
        </div>
    );
}

interface CourseCardProps {
    course: any;
}

function CourseCard({ course }: CourseCardProps) {
    return (
        <Link
            href={`/instructor/courses/${course._id}`}
            className="group p-8 bg-white border border-slate-200/60 rounded-[2.5rem] hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col h-full relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <BookOpen className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-indigo-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                        {course.status || "Published"}
                    </span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        {course.level || "Beginner"}
                    </span>
                </div>
            </div>

            <h4 className="font-black text-slate-900 text-xl sm:text-2xl leading-[1.2] mb-4 group-hover:text-indigo-600 transition-colors">
                {course.title}
            </h4>
            <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-10 flex-1 leading-relaxed">
                {course.description || "The curriculum map and description for this educational module are still in draft state."}
            </p>

            <div className="pt-8 border-t border-slate-50 flex items-center justify-between text-xs font-black text-slate-400">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-400" />
                        <span className="text-slate-900">{course._count?.enrollments || 0}</span> Learners
                    </span>
                    <span className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-amber-400" />
                        <span className="text-slate-900">{course._count?.lessons || 0}</span> Modules
                    </span>
                </div>
                <span className="text-indigo-600 group-hover:translate-x-2 transition-transform font-black uppercase tracking-widest flex items-center gap-2"> Manage <span>→</span></span>
            </div>
            {/* Hover Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );
}

