import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Users } from "lucide-react";

export default async function CourseCatalogPage() {
    let courses: Awaited<ReturnType<typeof fetchCourses>> = [];
    try {
        courses = await fetchCourses();
    } catch {
        // Database not available — show empty state gracefully
    }

    return (
        <div className="app-shell app-shell--wide page-stack py-12 sm:py-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Explore the <span className="text-indigo-600">Premium Catalog</span>
                </h1>
                <p className="text-lg text-slate-600 font-medium">Discover courses taught by industry experts. Master new skills through high-quality video lessons and auto-graded assessments.</p>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm">
                    <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">No courses available yet</h2>
                    <p className="text-slate-500 font-medium">Our expert instructors are working hard to bring you new content!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course: any) => (
                        <Link href={`/courses/${course.id}`} key={course.id} className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
                            <div className="h-56 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                <BookOpen className="w-16 h-16 text-white/50 group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">
                                    <span>{course._count.lessons} Lessons</span>
                                    <span>&bull;</span>
                                    <span>{course.instructor.name || "Expert"}</span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">{course.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-8 flex-1 font-medium leading-relaxed">{course.description}</p>

                                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                                    <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-500">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        <span>{course._count.enrollments} Enrolled</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-sm font-bold text-indigo-600 group-hover:text-indigo-700">
                                        <span>View Secrets &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

async function fetchCourses() {
    return prisma.course.findMany({
        include: {
            instructor: { select: { name: true } },
            _count: { select: { lessons: true, enrollments: true } }
        },
        orderBy: { enrollments: { _count: "desc" } }
    });
}
