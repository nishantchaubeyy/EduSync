import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, BookOpen, Clock, Users, PlayCircle, Edit } from "lucide-react";

export default async function CoursesPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "INSTRUCTOR") return null;

    const courses = await prisma.course.findMany({
        where: { instructorId: session.user.id },
        include: { _count: { select: { lessons: true, enrollments: true } } },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 sm:p-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
                    <p className="text-slate-500 mt-2">Manage all the courses you have created.</p>
                </div>
                <Link href="/instructor/courses/new" className="hidden sm:flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    <span>Create Course</span>
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 px-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No Courses Found</h3>
                    <p className="text-slate-500 mb-6">You haven't created any courses yet. Start your journey below.</p>
                    <Link href="/instructor/courses/new" className="inline-flex items-center space-x-2 bg-indigo-600 outline-none text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg transition-all shadow-sm shadow-indigo-200">
                        <Plus className="w-4 h-4" />
                        <span>Create Course</span>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {courses.map((course: any) => (
                        <div key={course.id} className="flex flex-col sm:flex-row items-center border border-slate-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mr-6 shrink-0 group-hover:bg-indigo-100 transition-colors">
                                <BookOpen className="w-8 h-8 text-indigo-500" />
                            </div>
                            <div className="flex-1 w-full sm:w-auto">
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{course.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-1">{course.description || "No description provided."}</p>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mt-3 font-medium">
                                    <span className="flex items-center space-x-1.5"><Users className="w-4 h-4" /> <span>{course._count.enrollments} Students</span></span>
                                    <span className="flex items-center space-x-1.5"><PlayCircle className="w-4 h-4" /> <span>{course._count.lessons} Lessons</span></span>
                                    <span className="flex items-center space-x-1.5"><Clock className="w-4 h-4" /> <span>{new Date(course.createdAt).toLocaleDateString()}</span></span>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:opacity-0 group-hover:opacity-100 transition-opacity w-full sm:w-auto">
                                <Link href={`/instructor/courses/${course.id}`} className="bg-white border-2 border-indigo-100 hover:border-indigo-500 text-indigo-600 px-5 py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-colors font-medium">
                                    <Edit className="w-4 h-4" />
                                    <span>Manage</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
