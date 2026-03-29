"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { BookOpen, Clock } from "lucide-react";

export default function StudentDashboardPage() {
    const enrollments = useQuery(api.enrollments.getStudentEnrollments);
    const { isLoaded, user } = useUser();

    if (!isLoaded || enrollments === undefined) {
        return (
            <div className="dashboard-page p-6 sm:p-8 lg:p-12">
                <div className="animate-pulse space-y-6 sm:space-y-8">
                    <div className="h-48 sm:h-64 bg-slate-200 rounded-3xl" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                            <div className="h-40 sm:h-48 bg-slate-200 rounded-3xl" />
                            <div className="h-40 sm:h-48 bg-slate-200 rounded-3xl" />
                        </div>
                        <div className="lg:col-span-1 h-80 sm:h-96 bg-slate-200 rounded-3xl" />
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
            category: "Enrolling",
            progress: Math.floor(Math.random() * 80) + 10,
            image: (typeof e.course === 'object' && e.course !== null && 'image' in e.course && e.course.image)
                ? (e.course as any).image
                : "https://images.unsplash.com/photo-1523050335102-c325091d53fb?q=80&w=800&auto=format&fit=crop"
        }))
        : [];

    return (
        <div className="dashboard-page p-6 sm:p-8 lg:p-12">
            {/* Hero Welcome Section */}
            <section className="mb-8 sm:mb-12">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-primary via-primary-container to-primary-fixed text-white">
                    <div className="relative z-10 max-w-3xl">
                        <p className="text-white/80 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 sm:mb-3">
                            Welcome back
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline mb-2 sm:mb-4 leading-tight">
                            Hello, {firstName}!
                        </h1>
                        <p className="text-sm sm:text-base opacity-90 font-body mb-6 sm:mb-8 max-w-2xl">
                            {enrollments.length > 0
                                ? `You're enrolled in ${enrollments.length} course${enrollments.length > 1 ? 's' : ''}. Keep up the great work!`
                                : "Ready to start learning? Explore courses and enroll in ones that interest you."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link href="/courses" className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-on-secondary font-bold rounded-2xl hover:opacity-90 transition-all text-sm sm:text-base">
                                Explore Courses
                            </Link>
                            {enrollments.length > 0 && (
                                <Link href={`/dashboard/${enrollments[0].courseId}/lessons`} className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all text-sm sm:text-base">
                                    Continue Learning
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="absolute -right-20 -top-20 w-60 sm:w-80 h-60 sm:h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute right-4 sm:right-10 bottom-4 sm:bottom-10 opacity-20 transform rotate-12 pointer-events-none">
                        <BookOpen className="w-24 sm:w-32 h-24 sm:h-32" />
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    {/* In-Progress Courses Section */}
                    <section>
                        <div className="flex justify-between items-end mb-4 sm:mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold font-headline text-primary">
                                    Your Courses
                                </h2>
                                <p className="text-xs sm:text-sm text-outline mt-1">
                                    {inProgressCourses.length} course{inProgressCourses.length !== 1 ? 's' : ''} enrolled
                                </p>
                            </div>
                            {inProgressCourses.length > 0 && (
                                <Link href="/courses" className="text-xs sm:text-sm font-bold text-secondary hover:text-primary transition-colors">
                                    View All →
                                </Link>
                            )}
                        </div>

                        {inProgressCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {inProgressCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/courses/${course.id}`}
                                        className="group bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
                                    >
                                        <div className="relative overflow-hidden rounded-t-3xl h-40 sm:h-48">
                                            <img
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src={course.image}
                                                alt={course.title}
                                            />
                                            <div className="absolute top-3 left-3 bg-white text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md">
                                                {course.category}
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-5 flex flex-col flex-1">
                                            <h3 className="text-base sm:text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-primary/80 transition-colors">
                                                {course.title}
                                            </h3>
                                            <div className="mt-auto pt-3 border-t border-slate-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] sm:text-xs text-outline font-medium">Progress</span>
                                                    <span className="text-[10px] sm:text-xs font-bold text-secondary">{course.progress}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-secondary to-secondary/70 rounded-full transition-all duration-1000"
                                                        style={{ width: `${course.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 sm:p-12 text-center">
                                <BookOpen className="w-12 sm:w-16 h-12 sm:h-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-sm sm:text-base font-bold text-slate-600 mb-1">No courses yet</p>
                                <p className="text-xs sm:text-sm text-slate-400 mb-4">Start exploring courses to enhance your learning</p>
                                <Link
                                    href="/courses"
                                    className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm sm:text-base"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Learning Statistics */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold font-headline text-primary mb-4 sm:mb-6">
                            Your Progress
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            {[
                                { label: "Courses Enrolled", value: enrollments.length, icon: BookOpen },
                                { label: "Total Hours", value: "24h", icon: Clock },
                                { label: "Completion Rate", value: "42%", icon: BookOpen }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary/60" />
                                        <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-black text-primary">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                    {/* Quick Actions */}
                    <section className="bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold font-headline mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/courses"
                                className="block w-full px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl font-bold text-sm transition-all text-center border border-white/10 hover:border-white/30"
                            >
                                Browse All Courses
                            </Link>
                            <Link
                                href="/resources"
                                className="block w-full px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl font-bold text-sm transition-all text-center border border-white/10 hover:border-white/30"
                            >
                                Learning Resources
                            </Link>
                        </div>
                    </section>

                    {/* Notifications/Tips */}
                    <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg sm:text-xl font-bold font-headline text-primary mb-4">Tips</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="p-2 bg-secondary/10 rounded-lg shrink-0">
                                    <span className="material-symbols-outlined text-secondary text-sm">lightbulb</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-primary">Set daily learning goals</p>
                                    <p className="text-xs text-outline mt-1">Consistent learning helps retention</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-2 bg-tertiary/10 rounded-lg shrink-0">
                                    <span className="material-symbols-outlined text-tertiary text-sm">calendar_month</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-primary">Schedule review sessions</p>
                                    <p className="text-xs text-outline mt-1">Regular review improves performance</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
