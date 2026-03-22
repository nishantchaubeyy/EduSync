"use client";

import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function ResourcesPage() {
    return (
        <div className="flex">
            <DashboardSidebar />
            <main className="lg:ml-64 flex-1 min-h-screen bg-surface p-8">
                <div className="max-w-4xl mx-auto py-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">folder_open</span>
                        </div>
                        <h1 className="text-4xl font-black text-primary font-headline tracking-tight">Academic Resources</h1>
                    </div>

                    <p className="text-lg text-slate-500 font-medium mb-12 max-w-2xl leading-relaxed">
                        Access our curated library of study materials, research papers, and institutional archives. This section is being updated with real-time academic feeds.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">library_books</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Library</h3>
                            <p className="text-slate-500 font-medium mb-4">Over 50,000+ research papers and journals available for download.</p>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                        </div>
                        <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">archive</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Institutional Archives</h3>
                            <p className="text-slate-500 font-medium mb-4">Access past project reports and heritage documentation.</p>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">Browse <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
