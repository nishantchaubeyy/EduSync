import Link from "next/link";

const barHeights = ["h-[40%]", "h-[60%]", "h-[85%]", "h-[50%]", "h-[95%]", "h-[70%]", "h-[80%]"];
const barFills = ["h-[60%]", "h-[40%]", "h-[70%]", "h-[30%]", "h-[80%]", "h-[50%]", "h-[65%]"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const assignments = [
    { title: "Final Project: Editorial Layout", student: "Sarah Jenkins", due: "2h ago", priority: "Critical", priorityColor: "text-error" },
    { title: "Reflective Journal Week 4", student: "Michael Chen", due: "5h ago", priority: "Standard", priorityColor: "text-on-surface-variant" },
    { title: "Visual Hierarchy Case Study", student: "Emma Wilson", due: "yesterday", priority: "Standard", priorityColor: "text-on-surface-variant" },
];

export default function InstructorDashboardPage() {
    return (
        <div className="p-8 min-h-screen">
            {/* Hero Section */}
            <section className="mb-10">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">Instructor Dashboard</h1>
                        <p className="text-on-surface-variant max-w-2xl leading-relaxed">Welcome back, Professor. Here&apos;s the editorial overview of your academic workspace and student performance metrics.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-surface-container-highest text-on-surface font-semibold rounded-md flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                            <span className="material-symbols-outlined">download</span>Export Report
                        </button>
                        <Link href="/instructor/courses/new" className="px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-md flex items-center gap-2 hover:opacity-95 transition-opacity">
                            <span className="material-symbols-outlined">add</span>New Course
                        </Link>
                    </div>
                </div>

                {/* Bento Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon="menu_book" label="Active Courses" value="12" badge="+2 this month" badgeColor="text-secondary bg-secondary-container" />
                    <StatCard icon="group" label="Total Students" value="1,482" badge="8% growth" badgeColor="text-secondary bg-secondary-container" />
                    <StatCard icon="pending_actions" label="Pending Grading" value="48" badge="Priority" badgeColor="text-on-error-container bg-error-container" borderColor="border-l-4 border-error" />
                    <StatCard icon="grade" label="Avg. Grade" value="86%" badge="A- Stable" badgeColor="text-on-surface-variant bg-surface-container-high" />
                </div>
            </section>

            {/* Dynamic Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main (2/3) */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Enrollment Graph */}
                    <div className="bg-surface-container-lowest rounded-xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-xl font-bold font-headline">Student Enrollment Trends</h2>
                                <p className="text-sm text-on-surface-variant">Daily activity and new registrations</p>
                            </div>
                            <select className="bg-surface-container border-none text-sm font-medium rounded-md px-3 py-2 outline-none">
                                <option>Last 30 Days</option>
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-4 px-2">
                            {barHeights.map((h, i) => (
                                <div key={i} className={`w-full bg-secondary-container/20 rounded-t-lg relative group ${h}`}>
                                    <div className={`absolute bottom-0 w-full bg-secondary rounded-t-lg ${barFills[i]} transition-all group-hover:h-full`} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 px-1 uppercase tracking-wider">
                            {days.map((d) => <span key={d}>{d}</span>)}
                        </div>
                    </div>

                    {/* Active Courses */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-headline">Your Active Courses</h2>
                            <Link href="/instructor/courses" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">View All <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CourseCard
                                title="Advanced UI Design Systems"
                                desc="Master the editorial design language of modern web."
                                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAlk2tSnTh2kkzIeF25VHER7AhGYUQ8gAKdW6pY0t9UHcBu39Bgp_mDH75DcGxlbnxmZySFleyYKgKezr3U2TvMX2BQBhcda_9iHQT2kqj7r06OtuqWgiGucZXaUwi2xno5tr5-5wOY4dAOJEUM0yaguCRtHGTuEYh9GtW7PxIwDH2DZsu_IxFDQvsTF3LTZVlNT0S6LytrOtpM-hf7PQg5bio-ku19eT486ACty1CveuYAS2ubzjXm5mUHm7tOSRLtGY36EZxzi1Qa"
                                status="Published"
                                progress={82}
                                students={342}
                            />
                            <CourseCard
                                title="Modern Academic Writing"
                                desc="Curation strategies for research and high-end journals."
                                image="https://lh3.googleusercontent.com/aida-public/AB6AXuA2yZ6gNUb71NZ_RVHTN-jv-ahuDiTb7PJRc3mh3rnKdxzTVuf8hU3EapvMkhlcE3qw0wo9YXPzjjMpiQWLb57L8o476QwvVFIA7cQqLNIqwH_h6jnFrESTOjSYHR9nsJiWHxmwmXhl_xKzWx_KZeF8DxYyS9T50L1WNHqvmCuBtUyF1PcyHMgp-llgV_2xhrBnEQ0jGcpvwO025vd4P-web1oxPRXIkUlgxOHNrnnQMb-3DSbwA7MWJexOpCEhP2-MSlizID3sUI2D"
                                status="Draft"
                                progress={45}
                                isDraft
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar (1/3) */}
                <div className="space-y-8">
                    {/* To Grade */}
                    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg font-headline">To Grade</h3>
                            <span className="bg-error-container text-error px-2 py-0.5 rounded-full text-[10px] font-bold">48 Pending</span>
                        </div>
                        <div className="space-y-4">
                            {assignments.map((a) => (
                                <div key={a.title} className="flex gap-4 p-3 hover:bg-slate-50 transition-colors rounded-lg group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-bold truncate">{a.title}</h5>
                                        <p className="text-xs text-on-surface-variant truncate">Student: {a.student}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] font-bold text-slate-400">Due: {a.due}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span className={`text-[10px] font-bold ${a.priorityColor}`}>{a.priority}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors">Launch Grading Suite</button>
                    </div>

                    {/* Course Sentiment */}
                    <div className="bg-primary text-on-primary rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        <h3 className="font-bold text-lg font-headline mb-4 relative z-10">Course Sentiment</h3>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_very_satisfied</span>
                            </div>
                            <div>
                                <p className="text-sm opacity-80 font-medium">Student Satisfaction</p>
                                <h4 className="text-xl font-bold">94% Positive</h4>
                            </div>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Top Performing Topic</p>
                                <p className="text-sm font-semibold italic">&quot;The Asymmetry of Modern Typography&quot;</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Highest Interaction Rate</p>
                                <p className="text-sm font-semibold">Q&amp;A Module #4: Grid Systems</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold opacity-80">AI Instructor Insights</span>
                                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                            </div>
                            <p className="text-[11px] mt-2 leading-relaxed italic opacity-80">&quot;Students are spending 30% more time on visual examples than theoretical text. Consider adding more gallery modules.&quot;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, badge, badgeColor, borderColor }: { icon: string; label: string; value: string; badge: string; badgeColor: string; borderColor?: string }) {
    return (
        <div className={`bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group ${borderColor || ""}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">{icon}</span>
            </div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">{label}</p>
            <div className="flex items-end gap-2">
                <h3 className="text-4xl font-bold font-headline text-primary">{value}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded mb-1 ${badgeColor}`}>{badge}</span>
            </div>
        </div>
    );
}

function CourseCard({ title, desc, image, status, progress, students, isDraft }: { title: string; desc: string; image: string; status: string; progress: number; students?: number; isDraft?: boolean }) {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col group transition-all">
            <div className="h-40 w-full rounded-lg bg-slate-200 overflow-hidden relative mb-4">
                <img alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={image} />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-[10px] font-bold text-primary uppercase">{status}</div>
            </div>
            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-sm text-on-surface-variant mb-4">{desc}</p>
            <div className="mt-auto space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">{isDraft ? "Content Completion" : "Progress"}</span>
                    <span className="text-primary">{isDraft ? `${progress}%` : `${progress}% Full`}</span>
                </div>
                <div className="w-full bg-secondary-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between items-center pt-2">
                    {isDraft ? (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-tertiary">edit</span>
                                <span className="text-xs font-bold text-tertiary">Continue Editing</span>
                            </div>
                            <span className="text-xs font-bold text-on-surface-variant">Estimated 2 weeks</span>
                        </>
                    ) : (
                        <>
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">+{(students || 0) > 14 ? 14 : students}</div>
                            </div>
                            <span className="text-xs font-bold text-on-surface-variant">{students} Students</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
