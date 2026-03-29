"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import Link from "next/link";
import { BookOpen, Users, Star, ArrowRight, Loader2, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function CourseCatalogPage() {
    const courses = useQuery(api.courses.getCourses);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = courses?.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-12 animate-in fade-in duration-700">
            {/* Hero & Search Hybrid */}
            <div className="relative rounded-[3rem] bg-slate-900 p-12 lg:p-20 overflow-hidden border-[1px] border-white/5 shadow-2xl shadow-indigo-500/10 group">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[30%] h-full bg-purple-600/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 max-w-4xl space-y-8">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-inner">
                        <Star className="w-3.5 h-3.5 fill-indigo-400" />
                        <span>Curated Academic Intelligence</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
                            Navigate the <br />
                            <span className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.2)]">Future of Higher Learning</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-bold max-w-2xl leading-relaxed">
                            Discover high-impact courses curated for the modern professional.
                            Master rigorous content through unified digital modules.
                        </p>
                    </div>

                    {/* Integrated Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by discipline, instructor, or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 text-white pl-14 pr-6 py-5 rounded-2xl font-bold focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-600 outline-none shadow-xl"
                            />
                        </div>
                        <button className="bg-white text-slate-900 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg">
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Catalog Grid */}
            <div className="space-y-10">
                <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Programs</h2>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-none">Showing {filteredCourses?.length || 0} Unified Curricula</p>
                    </div>
                </div>

                {courses === undefined ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[500px] rounded-[2.5rem] bg-slate-50 animate-pulse border-2 border-slate-200/50" />
                        ))}
                    </div>
                ) : filteredCourses?.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 space-y-6">
                        <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                            <BookOpen className="w-10 h-10 text-slate-300" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900">Program Not Found</h3>
                            <p className="text-slate-500 font-bold max-w-md mx-auto leading-relaxed">Try refining your search parameters or check back later for newly published modules.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses?.map((course) => (
                            <Link href={`/courses/${course._id}`} key={course._id} className="group relative flex flex-col bg-white border border-slate-200 hover:border-indigo-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500">
                                {/* Course Status Badge */}
                                <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-[0.15em] text-indigo-600 shadow-sm border border-indigo-100">
                                    {course.category || "Professional"} Core
                                </div>

                                <div className="h-64 bg-slate-100 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                                    <img
                                        src={course.thumbnail || `https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800&auto=format&fit=crop`}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:rotate-2 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="p-8 sm:p-10 flex-1 flex flex-col items-start gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
                                            <Star className="w-5 h-5 fill-indigo-600" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Program Lead</span>
                                            <span className="text-sm font-bold text-slate-900">{course.instructorName}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium line-clamp-3 leading-relaxed mb-6">
                                        {course.description}
                                    </p>

                                    <div className="mt-auto w-full pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Enrolled</span>
                                                <span className="text-sm font-black text-slate-900">{course._count.enrollments}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Modules</span>
                                                <span className="text-sm font-black text-slate-900">{course._count.lessons}</span>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md group-hover:shadow-indigo-500/30">
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination/Load More Mock */}
            <div className="flex items-center justify-center pt-10">
                <button className="px-12 py-5 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-600 transition-all shadow-sm">
                    Access Complete Catalog
                </button>
            </div>
        </div>
    );
}
