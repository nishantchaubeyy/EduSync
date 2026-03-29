"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import Link from "next/link";
import { Plus, BookOpen, Clock, Users, PlayCircle, Edit, Loader2 } from "lucide-react";

export default function CoursesPage() {
    const courses = useQuery(api.courses.instructorGetCourses);

    if (courses === undefined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-medium">Loading your academic catalog...</p>
            </div>
        );
    }

    if (courses === null) return null;

    return (
        <div className="dashboard-page animate-in fade-in duration-500">
            <div className="page-header border-b border-slate-100 pb-6">
                <div className="page-header-copy">
                    <h1 className="text-3xl font-extra-bold text-slate-900 tracking-tight">My Scholarly Courses</h1>
                    <p className="text-slate-500 mt-2 font-medium">Manage and curate your curriculum effortlessly.</p>
                </div>
                <Link href="/instructor/courses/new" className="hidden sm:flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-indigo-200">
                    <Plus className="w-5 h-5" />
                    <span>Create Course</span>
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 px-6 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50 mt-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <BookOpen className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">No Courses Found</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">You haven't initiated any courses yet. Begin your digital legacy today.</p>
                    <Link href="/instructor/courses/new" className="inline-flex items-center space-x-3 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all">
                        <Plus className="w-5 h-5" />
                        <span>Create Your First Course</span>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 mt-8">
                    {courses.map((course: any) => (
                        <div key={course._id} className="flex flex-col sm:flex-row items-center border border-slate-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
                            <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mr-6 shrink-0 group-hover:bg-indigo-600 group-hover:rotate-3 transition-all">
                                <BookOpen className="w-10 h-10 text-indigo-500 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex-1 w-full sm:w-auto">
                                <h3 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight group-hover:text-indigo-900 transition-colors">{course.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-1 font-medium italic mb-4">"{course.description || "No description provided."}"</p>
                                <div className="flex flex-wrap items-center gap-6 text-[12px] text-slate-500 font-bold uppercase tracking-widest">
                                    <span className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg"><Users className="w-3.5 h-3.5" /> <span>{course._count.enrollments} Students</span></span>
                                    <span className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg"><PlayCircle className="w-3.5 h-3.5" /> <span>{course._count.lessons} Lessons</span></span>
                                    <span className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg"><Clock className="w-3.5 h-3.5" /> <span>{new Date(course._creationTime).toLocaleDateString()}</span></span>
                                </div>
                            </div>
                            <div className="mt-6 sm:mt-0 w-full sm:w-auto">
                                <Link href={`/instructor/courses/${course._id}`} className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-3 transition-all font-bold hover:bg-indigo-600 group-hover:shadow-lg">
                                    <Edit className="w-4 h-4" />
                                    <span>Manage Curriculum</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

