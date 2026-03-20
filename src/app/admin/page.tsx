import Link from "next/link";

const registrations = [
    { name: "Elena Vance", email: "elena.v@university.edu", date: "Oct 24, 2023", enrollment: "UX Design Professional", status: "Active", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZsjps1CgbVF8RD25np3-BeW0akLJLsVeyuDZzOAJG7WxTWzpqw1jf8Zj2BKx0ehEyJ9NgcjCjvlymxk64xJ4CjgBC8VgJKO0QvrpO96OG_9tNceZF7ZatFMv0bM5bNMIpZc-iCkrso5QpGZk9cWRg3f0A-6b1P0ArvLOf1CSD0c4SA_G-gG4lPddtVe3pAhKuQ4REZ_dQ09FTotc26AY3z-1Y67d_sBLMrcU7dZSf4PgIQ_yIAzs2R238q6aAY0161vZkq8AYqGbL" },
    { name: "Marcus Thorne", email: "m.thorne@academy.com", date: "Oct 23, 2023", enrollment: "Advanced Calculus", status: "Active", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqNi3QQ8Z70HXD6Ir3Y7VyR28eFQqcMkNXmp2-VGniHUyRJSp4PC78jABAczBqh25mapjdL2zi1EJJ74dOc7tPDuXskbNtmrEn-E-OSlmbtwy1qeL5vsKGLd5TwHBcf-E6pLG68aEJPFDQhipHyNASvo_-fQWReLP3oyujvM3Cre7Uc-UixXmMOHquCs7xxaIP7w2-WmdP5P2cgw-r3wHUZAvQARxHty1InGuTMDUAeES_-dvnDlzLpU3pBjEiy17Qd65z83uwfdJN" },
    { name: "Sarah Jenkins", email: "sarah.j@edu.org", date: "Oct 23, 2023", enrollment: "Art History Fundamentals", status: "Pending", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_sKX7BLbuLftiCwuggVozDvWUCK6Oyslum6Fmw9UWGzXkd573_LEQlSyIVj6M59ibjzF8fo5FVeJ4ppz93BDFkkqPSztRKT7NJiWhxTqtaO2idbzEw1XhMHW0A3IyIoLfqefvHdFJ3NpPDbWfkD0b1TBVwc6ySqjRax88cO8IIICnPI98O6uBWc-4Tek80eu20ZHj5B2HZbVGgqE3-iusWedv0jx56FCjrstfnHGtgKfIesaGz3c2-xcdsmQG5lmPiIL4T94xyDmp" },
];

const approvals = [
    { title: "Introduction to Quantum Computing", instructor: "Dr. Aris Thorne", tag: "New", tagColor: "text-secondary bg-secondary-container", borderColor: "border-secondary" },
    { title: "Digital Ethics in AI", instructor: "Prof. Linda Zhao", tag: "Update", tagColor: "text-primary bg-primary-fixed", borderColor: "border-primary" },
];

export default function AdminDashboardPage() {
    return (
        <div className="p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">Institutional Overview</h1>
                        <p className="text-on-surface-variant text-lg max-w-2xl">Manage the Academic Atelier&apos;s ecosystem and monitor curriculum health.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-surface-container-lowest text-primary font-bold rounded-md shadow-sm border border-outline-variant/10 hover:bg-white transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">verified_user</span>Course Approvals
                        </button>
                        <button className="px-6 py-3 bg-primary text-on-primary font-bold rounded-md shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">group</span>User Management
                        </button>
                    </div>
                </div>

                {/* Bento Grid Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    {/* Large Stats Widget */}
                    <div className="md:col-span-2 bg-white rounded-xl p-8 flex flex-col justify-between editorial-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                        <div>
                            <span className="text-primary font-semibold uppercase tracking-widest text-xs mb-2 block">Growth Momentum</span>
                            <h3 className="text-sm font-medium text-on-surface-variant mb-4">Total Users</h3>
                            <div className="flex items-baseline gap-4">
                                <span className="text-6xl font-extrabold text-on-surface font-headline">24,892</span>
                                <span className="text-secondary font-bold flex items-center bg-secondary-container/30 px-2 py-1 rounded text-sm">
                                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>+12%
                                </span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="h-2 w-full bg-secondary-container rounded-full">
                                <div className="h-2 w-[72%] bg-secondary rounded-full" />
                            </div>
                            <p className="text-xs text-on-surface-variant mt-2">72% of target annual enrollment reached.</p>
                        </div>
                    </div>

                    {/* Active Courses */}
                    <div className="bg-surface-container-lowest rounded-xl p-6 editorial-shadow flex flex-col justify-center border-l-4 border-primary">
                        <span className="material-symbols-outlined text-primary-container text-4xl mb-4">school</span>
                        <h3 className="text-sm font-medium text-on-surface-variant">Active Courses</h3>
                        <p className="text-4xl font-bold text-on-surface mt-1 font-headline">1,402</p>
                        <p className="text-xs text-secondary mt-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">add</span> 24 this week
                        </p>
                    </div>

                    {/* System Alerts */}
                    <div className="bg-surface-container-high rounded-xl p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">System Alerts</h3>
                            <span className="flex h-2 w-2 rounded-full bg-error" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-error text-lg">error</span>
                                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Storage usage exceeding 85% on Server B.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-primary text-lg">info</span>
                                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">System update scheduled for 02:00 AM.</p>
                            </div>
                            <button className="mt-2 text-primary text-xs font-bold hover:underline text-left">View All Logs</button>
                        </div>
                    </div>
                </div>

                {/* Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Recent Registrations */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-on-surface font-headline">Recent Registrations</h2>
                            <button className="text-primary font-semibold text-sm hover:underline">Download CSV</button>
                        </div>
                        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low border-none">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Student</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Date Joined</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Enrollment</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/10">
                                    {registrations.map((r) => (
                                        <tr key={r.email} className="hover:bg-surface-container-low transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold overflow-hidden">
                                                        <img alt={r.name} className="w-full h-full object-cover" src={r.image} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-on-surface">{r.name}</div>
                                                        <div className="text-xs text-on-surface-variant">{r.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-on-surface-variant">{r.date}</td>
                                            <td className="px-6 py-4 text-sm text-on-surface">{r.enrollment}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${r.status === "Active" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-highest text-on-surface-variant"}`}>{r.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-6 text-center">
                                <button className="text-sm font-bold text-primary px-8 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">Load More Registrations</button>
                            </div>
                        </div>
                    </div>

                    {/* Course Approvals Queue */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-on-surface font-headline">Course Approvals</h2>
                        <div className="space-y-4">
                            {approvals.map((a) => (
                                <div key={a.title} className={`bg-surface-container-low p-5 rounded-xl border-l-4 ${a.borderColor} shadow-sm`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-on-surface text-sm">{a.title}</h4>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${a.tagColor}`}>{a.tag}</span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant mb-4">Instructor: {a.instructor}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 bg-secondary text-on-secondary text-xs font-bold rounded hover:opacity-90">Approve</button>
                                        <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant text-xs font-bold rounded hover:bg-outline-variant/30">Review</button>
                                    </div>
                                </div>
                            ))}
                            <Link href="#" className="block text-center p-4 border-2 border-dashed border-outline-variant/50 rounded-xl text-sm font-bold text-outline hover:border-primary hover:text-primary transition-all">
                                View all 12 pending approvals
                            </Link>
                        </div>

                        {/* Curator Insight */}
                        <div className="bg-primary-container rounded-xl p-6 text-on-primary-container relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2 font-headline">Curator Insight</h3>
                                <p className="text-sm opacity-80 leading-relaxed mb-4">Course engagement is up 15% following the new asymmetric UI rollout. Consider expanding editorial headers to all sub-modules.</p>
                                <button className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Read Full Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-10 rotate-12">auto_awesome</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
