import Link from "next/link";

const inProgressCourses = [
    { id: "1", title: "Principles of Minimalist Space", category: "Architecture", progress: 72, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCokAHUhkkZBskDpUB1njCvJfwwdgYG2I8nJ1576JC7q_HKh1aGeld548QujGjFuB900biwaOqTD1mg5AwiQuhajiGzQT9GtIRZjNDuQD3tbfsqRfxbv-ql_IyoC2_l1co_gpH8T2GLCJ92LSEXS3C10wbhNNhqFZ5yrVrG5LxyyWG7-EOUiwiP6PB6i5TNHDAhp6cYjkxyfTYzSzwuTA2JMjWzEPWDXApatIVyWCsI2vT8OuT_DHHHtlLDqPHGoEKyr5B3BRf1kkRb" },
    { id: "2", title: "Data-Driven Growth Strategies", category: "Business", progress: 45, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_LHL4Tp0BmfOr8-m0wVzJC4DZF4pc1nzIe6kM8za8gBBBJapV_dgQqUKUWlWg02DM7YtVKtSxIRaNJfpucCLlwibjEoAii99oJMNUUcNX0JyjupvKgS0I1JiINal5JsaBeSD0MyndiR4gQrHHkGoOe2WP9ZN0OJYnaKwQIBQ_K_nQqjUo_t-gpDGlq7Xr4AJuL9luyz6tysoH1T5rUMbJMIS-JWJxI3L_78mQL7Izc2ndOdkyDhHPkBqrsyLZWxGMI9RyPepSN-y" },
];

const recommended = [
    { title: "Advanced Creative Writing", desc: "Master the art of narrative tension and character development.", price: "$49.00", time: "12h 45m", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzwakA28zfh6bzBeeXb-rgCaivdvwcSk11jT4bK3GhvGxcXZ_eUstLPtbaKofjI0QjdJbeOe4HPT5zhnPvob4s1blyrWVNGrvd0wqmq_n2UQQuTGYx4WP4H1aHPXW8hMaxVWGaKtTokzkpKv9EQ7uMgcB3dOz0gLiCewikXhZ-lUUGlqkMRTTH9GPOhfd3l2XgLU6KSJpJrrr9uHzlr-EPjPjdOr1-ASSkSc-YRo15NzvZxaQ0DfNQTCwlVgV14j8aiOdvM44lquQQ" },
    { title: "Human-Computer Interaction", desc: "Learn cognitive psychology principles for digital design.", price: "$64.00", time: "8h 20m", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBENlebFiHMxKJP_HWqqy7-R2XVNe9DSlKXjFt-OALnFxOV37kjafBcdygzfcov8IS9Ndodp-mMAlZg55_dfISGGE6pwVsgYdfV4cjWKAblr4PEIF-WuR-v11Kf419bYQrmUgoReB49yA5JbqNviEzeof_udcD8w50BC_teRbhNARVYewQ49QwYfnKHf94VAb9NdTIwIPeu40jZY4ufGI9fn2nBFcbjlhN6qknays80bl2hGvSQHViYNY3sx45WfuDewvE-ICDAWzQT" },
    { title: "Philosophy of Modernity", desc: "Tracing the roots of contemporary thought through history.", price: "$32.00", time: "15h 10m", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhstuusohPBWyN5lMg_xlrmWSjsQKp4Mf5ZQBneaAnU7BsU572JvgT5XQv4pUR1FeWGa0NSMf_2Lp9SD6sGqeiZ0wq1HzVyQ0USXReO6Twg1ed2e-N3Fq9AztLwUCObM40YwC4fDDE_JZXgX88UkL6XGzi2mgEoWYpEK6V_cu5JHJX38U0pv980SC-VgynPzTB3A8hsS2md-M6WeO1EtFJNI5k2rjtIjSoIpjcUJ6kXLPiaK3QrK3Ff7Sh_wl4GefWpnWkigfs4HuL" },
];

const deadlines = [
    { month: "Oct", day: "24", title: "Visual Identity Essay", course: "Graphic Design", icon: "priority_high", iconColor: "text-error" },
    { month: "Oct", day: "27", title: "Physics Lab Report", course: "Natural Sciences", icon: "check_circle", iconColor: "text-slate-300" },
    { month: "Nov", day: "02", title: "Marketing Pitch Deck", course: "Business", icon: "schedule", iconColor: "text-slate-300" },
];

const badges = [
    { icon: "military_tech", filled: true, title: "Fast Learner", desc: "Completed 5 lessons in 1 day", bg: "bg-secondary-container", text: "text-secondary", locked: false },
    { icon: "stars", filled: true, title: "Elite Scholar", desc: "Maintained 4.0 GPA for 3 months", bg: "bg-primary-fixed", text: "text-primary", locked: false },
    { icon: "local_fire_department", filled: false, title: "7-Day Streak", desc: "Almost there! (5/7)", bg: "bg-surface-container-highest", text: "text-outline", locked: true },
    { icon: "emoji_events", filled: true, title: "Quiz Master", desc: "100% score on 10 quizzes", bg: "bg-tertiary-fixed-dim/20", text: "text-tertiary", locked: false },
];

export default function StudentDashboardPage() {
    return (
        <div className="dashboard-page">
                {/* Hero Welcome */}
                <section className="mb-8 sm:mb-12">
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-primary to-primary-container text-white">
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-2xl sm:text-4xl font-extrabold font-headline mb-3 sm:mb-4 leading-tight">Welcome back, Curator.</h2>
                            <p className="text-sm sm:text-lg opacity-90 font-body mb-5 sm:mb-8">You have 3 assignments due this week and you&apos;ve completed 85% of your &apos;Art History&apos; module.</p>
                            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-secondary text-on-secondary font-semibold rounded-xl hover:bg-opacity-90 transition-all text-sm sm:text-base">Resume Last Lesson</button>
                                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 font-semibold rounded-xl hover:bg-white/20 transition-all text-sm sm:text-base">View Schedule</button>
                            </div>
                        </div>
                        <div className="absolute -right-20 -top-20 w-60 sm:w-80 h-60 sm:h-80 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute right-4 sm:right-10 bottom-4 sm:bottom-10 opacity-20 transform rotate-12">
                            <span className="material-symbols-outlined text-[60px] sm:text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                        </div>
                    </div>
                </section>

                {/* Main Grid */}
                <div className="content-grid content-grid--sidebar">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8 sm:space-y-12">
                        {/* In-Progress Courses */}
                        <section>
                            <div className="flex justify-between items-end mb-4 sm:mb-6">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold font-headline text-primary">In-Progress Courses</h3>
                                    <p className="text-xs sm:text-sm text-outline">Continue where you left off</p>
                                </div>
                                <Link href="/courses" className="text-xs sm:text-sm font-bold text-secondary hover:underline">View All</Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {inProgressCourses.map((course) => (
                                    <div key={course.id} className="group bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                                        <div className="relative mb-4 sm:mb-5 overflow-hidden rounded-xl aspect-video">
                                            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={course.image} alt={course.title} />
                                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/90 backdrop-blur px-2.5 sm:px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-widest">{course.category}</div>
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-primary mb-2 line-clamp-1">{course.title}</h4>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] sm:text-xs text-outline font-medium">Progress</span>
                                            <span className="text-[10px] sm:text-xs font-bold text-secondary">{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-secondary-container rounded-full overflow-hidden">
                                            <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recommended */}
                        <section>
                            <div className="flex justify-between items-end mb-4 sm:mb-6">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold font-headline text-primary">Recommended for You</h3>
                                    <p className="text-xs sm:text-sm text-outline">Based on your learning history</p>
                                </div>
                                <div className="hidden sm:flex gap-2">
                                    <button className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                                    <button className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                                </div>
                            </div>
                            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2 snap-x snap-mandatory">
                                {recommended.map((item) => (
                                    <div key={item.title} className="min-w-[240px] sm:min-w-[280px] bg-surface-container-low rounded-2xl overflow-hidden group border border-transparent hover:border-outline-variant/30 transition-all snap-start">
                                        <div className="relative h-32 sm:h-40">
                                            <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 sm:p-4">
                                                <span className="text-white text-[10px] sm:text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-xs">timer</span> {item.time}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 sm:p-4">
                                            <h5 className="font-bold text-primary mb-1 text-sm sm:text-base">{item.title}</h5>
                                            <p className="text-[10px] sm:text-xs text-on-surface-variant line-clamp-2 mb-3 sm:mb-4">{item.desc}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-primary">{item.price}</span>
                                                <button className="p-1.5 sm:p-2 bg-primary text-white rounded-lg hover:scale-105 duration-150 transition-transform">
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-8 sm:space-y-12">
                        {/* Deadlines */}
                        <section className="bg-surface-container-high rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-bold font-headline text-primary">Deadlines</h3>
                                <span className="bg-error/10 text-error text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Action Required</span>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {deadlines.map((d) => (
                                    <div key={d.title} className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 bg-white rounded-xl shadow-sm">
                                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/5 text-primary rounded-lg flex flex-col items-center justify-center shrink-0">
                                            <span className="text-[9px] sm:text-[10px] font-bold uppercase">{d.month}</span>
                                            <span className="text-base sm:text-lg font-bold">{d.day}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-xs sm:text-sm font-bold text-primary leading-tight truncate">{d.title}</h5>
                                            <p className="text-[9px] sm:text-[10px] text-outline mt-1 uppercase font-bold tracking-widest truncate">{d.course}</p>
                                        </div>
                                        <div className="flex items-center shrink-0">
                                            <span className={`material-symbols-outlined text-base sm:text-lg ${d.iconColor}`}>{d.icon}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 border border-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-white/50 transition-all">Open Calendar</button>
                        </section>

                        {/* Achievements */}
                        <section>
                            <h3 className="text-base sm:text-lg font-bold font-headline text-primary mb-4 sm:mb-6">Achievements</h3>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {badges.map((b) => (
                                    <div key={b.title} className={`flex flex-col items-center text-center p-3 sm:p-4 bg-surface-container-lowest rounded-2xl shadow-sm ${b.locked ? "opacity-50 grayscale" : ""}`}>
                                        <div className={`w-12 sm:w-14 h-12 sm:h-14 ${b.bg} ${b.text} rounded-full flex items-center justify-center mb-2 sm:mb-3`}>
                                            <span className="material-symbols-outlined text-xl sm:text-2xl" style={b.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}>{b.icon}</span>
                                        </div>
                                        <h6 className="text-[10px] sm:text-[11px] font-bold text-primary leading-tight">{b.title}</h6>
                                        <p className="text-[9px] sm:text-[10px] text-outline mt-0.5 sm:mt-1">{b.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
        </div>
    );
}
