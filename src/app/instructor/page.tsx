"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Plus, Users, BookOpen, GraduationCap, ArrowUpRight, BarChart3, TrendingUp, Award } from "lucide-react";

export default function InstructorDashboardPage() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const courses = useQuery(api.courses.instructorGetCourses);

    if (courses === undefined || !isUserLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-slate-400 gap-4 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse" />
                <p className="font-bold text-sm tracking-widest">Loading dashboard...</p>
            </div>
        );
    }

    const totalStudents = courses?.reduce((acc, c) => acc + (c._count?.enrollments || 0), 0) || 0;
    const activeCourses = courses?.length || 0;

    return (
        <div className="dashboard-page p-6 sm:p-8 lg:p-12">
            {/* Header Section */}
            <section className="mb-10 sm:mb-14">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 sm:mb-10">
                    <div>
                        <p className="text-xs sm:text-sm font-black text-secondary uppercase tracking-widest mb-2 sm:mb-3">
                            Instructor Dashboard
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                            Welcome, {user?.firstName || "Professor"}
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                            Manage your courses, track student progress, and create engaging learning experiences.
                        </p>
                    </div>
                    <Link 
                        href="/instructor/courses/new" 
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all text-sm sm:text-base shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Create Course
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard
                        icon={<BookOpen className="w-6 h-6" />}
                        label="Active Courses"
                        value={activeCourses.toString()}
                        trend="Managing your curriculum"
                        color="blue"
                    />
                    <StatCard
                        icon={<Users className="w-6 h-6" />}
                        label="Total Students"
                        value={totalStudents.toLocaleString()}
                        trend={`Across ${activeCourses} course${activeCourses !== 1 ? 's' : ''}`}
                        color="green"
                    />
                    <StatCard
                        icon={<TrendingUp className="w-6 h-6" />}
                        label="Avg. Completion"
                        value="68%"
                        trend="Student progress"
                        color="orange"
                    />
                    <StatCard
                        icon={<Award className="w-6 h-6" />}
                        label="Course Rating"
                        value="4.8"
                        trend="Based on reviews"
                        color="purple"
                    />
                </div>
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    {/* Courses Section */}
                    <section className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                        <div className="px-6 sm:px-8 py-6 sm:py-8 border-b border-slate-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Courses</h2>
                                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                        {activeCourses} course{activeCourses !== 1 ? 's' : ''} published
                                    </p>
                                </div>
                                <Link 
                                    href="/instructor/courses" 
                                    className="text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                                >
                                    View All <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {courses && courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8">
                                {courses.slice(0, 4).map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 sm:p-12 text-center">
                                <BookOpen className="w-12 sm:w-16 h-12 sm:h-16 text-slate-200 mx-auto mb-4" />
                                <p className="text-sm sm:text-base font-bold text-slate-600 mb-1">No courses yet</p>
                                <p className="text-xs sm:text-sm text-slate-400 mb-6">Create your first course to get started</p>
                                <Link 
                                    href="/instructor/courses/new"
                                    className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm sm:text-base"
                                >
                                    Create Course
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Recent Activity */}
                    <section className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { action: "New enrollment", course: "Web Development 101", time: "2 hours ago" },
                                { action: "Quiz submitted", course: "Python Basics", time: "5 hours ago" },
                                { action: "Course created", course: "Advanced React", time: "1 day ago" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-900">{item.action}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.course}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Quick Stats */}
                    <section className="bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                        <h3 className="text-lg font-bold mb-6">This Month</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs opacity-80 uppercase tracking-widest font-bold">New Students</p>
                                    <p className="text-3xl font-black mt-1">24</p>
                                </div>
                                <TrendingUp className="w-8 h-8 opacity-50" />
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Activity</p>
                                <p className="text-sm mt-2 opacity-90">High engagement across all courses</p>
                            </div>
                        </div>
                    </section>

                    {/* Helpful Resources */}
                    <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Resources</h3>
                        <div className="space-y-3">
                            <Link 
                                href="#"
                                className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-bold text-primary"
                            >
                                Teaching Best Practices →
                            </Link>
                            <Link 
                                href="#"
                                className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-bold text-primary"
                            >
                                Create Engaging Content →
                            </Link>
                            <Link 
                                href="#"
                                className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-bold text-primary"
                            >
                                Student Analytics Guide →
                            </Link>
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

function StatCard({ icon,label, value, trend, color }: StatCardProps) {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600"
    };

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[color as keyof typeof colorMap]}`}>
                {icon}
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
            <div className="flex items-end gap-2 mb-3">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{value}</h3>
            </div>
            <p className="text-xs text-slate-400">{trend}</p>
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
            className="group p-5 sm:p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <BookOpen className="w-5 h-5" />
                </div>
                <span className="bg-secondary/10 text-secondary text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                    Published
                </span>
            </div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {course.title}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">{course.description || "No description"}</p>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course._count?.enrollments || 0} students
                </span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">View →</span>
            </div>
        </Link>
    );
}

