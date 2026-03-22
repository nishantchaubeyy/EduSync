"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/* ─── Real DYPIU course data scraped from dypiu.ac.in ─── */
export interface DYPIUCourse {
    name: string;
    school: string;
    category: Category;
    degree: string;
    duration: string;
    description: string;
    link: string;
    icon: string;
}

type Category = "Sciences" | "Humanities" | "Technology" | "Design" | "Management" | "General";

const ALL_CATEGORIES: Category[] = ["Sciences", "Technology", "Management", "Humanities", "Design", "General"];

const COURSES: DYPIUCourse[] = [
    // ── School of Computer Science Engineering & Applications (SoCSEA) ──
    {
        name: "B.Tech (CSE)",
        school: "School of Computer Science Engineering & Applications",
        category: "Technology",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Core computer science engineering program covering algorithms, data structures, software engineering, and systems design.",
        link: "https://www.dypiu.ac.in/b-tech-cse",
        icon: "computer",
    },
    {
        name: "B.Tech (CSE) – AI & ML (IBM)",
        school: "School of Computer Science Engineering & Applications",
        category: "Technology",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Specialization in Artificial Intelligence and Machine Learning in association with IBM, blending theory with industry practice.",
        link: "https://www.dypiu.ac.in/b-tech-aiml-ibm",
        icon: "psychology",
    },
    {
        name: "B.Tech (CSE) – Cyber Security & Forensics (IBM)",
        school: "School of Computer Science Engineering & Applications",
        category: "Technology",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Focused on cybersecurity principles, digital forensics, and ethical hacking in partnership with IBM.",
        link: "https://www.dypiu.ac.in/b-tech-cyber&forensic-ibm",
        icon: "shield_lock",
    },
    {
        name: "BCA (Hons.)",
        school: "School of Computer Science Engineering & Applications",
        category: "Technology",
        degree: "BCA",
        duration: "3 Years",
        description: "Bachelor of Computer Applications with specializations in Mobile App, Web Technology, and Cloud Systems.",
        link: "https://www.dypiu.ac.in/bca-mobile-application-web-technology-cloud-system",
        icon: "phone_android",
    },
    {
        name: "MCA",
        school: "School of Computer Science Engineering & Applications",
        category: "Technology",
        degree: "MCA",
        duration: "2 Years",
        description: "Master of Computer Applications for advanced software development, system design, and IT management skills.",
        link: "https://www.dypiu.ac.in/m-c-a-masters-of-computer-applications",
        icon: "terminal",
    },
    {
        name: "M.Tech (CSE) – Quantum Computing",
        school: "School of Computer Science Engineering & Applications",
        category: "Technology",
        degree: "M.Tech",
        duration: "2 Years",
        description: "Cutting-edge postgraduate program exploring quantum algorithms, quantum information theory, and quantum hardware.",
        link: "https://www.dypiu.ac.in/socsea-m-tech-quantum-computing",
        icon: "blur_on",
    },
    {
        name: "M.Sc. – Computational Mathematics",
        school: "School of Computer Science Engineering & Applications",
        category: "Sciences",
        degree: "M.Sc.",
        duration: "2 Years",
        description: "Advanced mathematical modeling, numerical analysis, and computational methods for scientific problem-solving.",
        link: "https://www.dypiu.ac.in/socsea-msc-computational-mathematics",
        icon: "functions",
    },

    // ── School of Engineering, Management and Research (SoEMR) ──
    {
        name: "B.Tech – Chemical Engineering",
        school: "School of Engineering, Management & Research",
        category: "Sciences",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Study of chemical processes, material science, and industrial production methods for sustainable engineering.",
        link: "https://www.dypiu.ac.in/b-tech-chemical",
        icon: "science",
    },
    {
        name: "B.Tech – Civil Engineering",
        school: "School of Engineering, Management & Research",
        category: "Sciences",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Structural design, construction management, geotechnical engineering, and sustainable infrastructure development.",
        link: "https://www.dypiu.ac.in/b-tech-civil",
        icon: "apartment",
    },
    {
        name: "B.Tech – Mechanical Engineering",
        school: "School of Engineering, Management & Research",
        category: "Sciences",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Thermodynamics, manufacturing systems, robotics, and mechanical system design for modern industry.",
        link: "https://www.dypiu.ac.in/b-tech-mechanical",
        icon: "precision_manufacturing",
    },
    {
        name: "B.Tech – Semiconductor Engineering",
        school: "School of Engineering, Management & Research",
        category: "Technology",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Specialized program in VLSI design, chip fabrication, and semiconductor device physics for the booming chip industry.",
        link: "https://www.dypiu.ac.in/b-tech-semiconductors",
        icon: "memory",
    },

    // ── School of Biosciences and Bioengineering (SoBB) ──
    {
        name: "B.Tech – Bioengineering",
        school: "School of Biosciences & Bioengineering",
        category: "Sciences",
        degree: "B.Tech",
        duration: "4 Years",
        description: "Interdisciplinary program merging biology with engineering to develop medical devices, biomaterials, and bio-processing.",
        link: "https://www.dypiu.ac.in/btech-bio-engineering",
        icon: "biotech",
    },
    {
        name: "B.Sc. – Forensic Sciences (Hons.)",
        school: "School of Biosciences & Bioengineering",
        category: "Sciences",
        degree: "B.Sc.",
        duration: "3 Years",
        description: "Scientific investigation methods including DNA analysis, toxicology, digital forensics, and crime scene analysis.",
        link: "https://www.dypiu.ac.in/b-sc-forensic-science",
        icon: "fingerprint",
    },
    {
        name: "M.Sc. – Medical Biotechnology",
        school: "School of Biosciences & Bioengineering",
        category: "Sciences",
        degree: "M.Sc.",
        duration: "2 Years",
        description: "Advanced research in genetic engineering, immunology, pharmaceutical biotechnology, and clinical diagnostics.",
        link: "https://www.dypiu.ac.in/msc-medical-biotechnology",
        icon: "vaccines",
    },
    {
        name: "M.Sc. – Medicinal Chemistry",
        school: "School of Biosciences & Bioengineering",
        category: "Sciences",
        degree: "M.Sc.",
        duration: "2 Years",
        description: "Drug design, synthesis, and pharmaceutical chemistry for careers in pharma research and healthcare innovation.",
        link: "https://www.dypiu.ac.in/m-sc-medicinal-chemistry",
        icon: "medication",
    },

    // ── School of Commerce and Management (SoCM) ──
    {
        name: "BBA (Hons.)",
        school: "School of Commerce & Management",
        category: "Management",
        degree: "BBA",
        duration: "3 Years",
        description: "Comprehensive business administration with specializations in International Business, Logistics, and Retail Management.",
        link: "https://www.dypiu.ac.in/bba-international-business-ligistics-retail-management",
        icon: "business_center",
    },
    {
        name: "MBA – Digital Business",
        school: "School of Commerce & Management",
        category: "Management",
        degree: "MBA",
        duration: "2 Years",
        description: "Future-ready MBA focusing on digital transformation, e-commerce strategy, and technology-driven business models.",
        link: "https://www.dypiu.ac.in/mba-digital-business",
        icon: "trending_up",
    },
    {
        name: "MBA – Executive",
        school: "School of Commerce & Management",
        category: "Management",
        degree: "MBA",
        duration: "2 Years",
        description: "Executive MBA designed for working professionals seeking advanced leadership and strategic management skills.",
        link: "https://www.dypiu.ac.in/mba-executive",
        icon: "groups",
    },

    // ── School of Design (SoD) ──
    {
        name: "B. Design",
        school: "School of Design",
        category: "Design",
        degree: "B.Des",
        duration: "4 Years",
        description: "Creative design program covering UX/UI design, graphic design, product design, and design thinking methodologies.",
        link: "https://www.dypiu.ac.in/b-design-school-of-design",
        icon: "palette",
    },

    // ── School of Media and Journalism (SoMJ) ──
    {
        name: "B.A. – Journalism & Mass Communication (Hons.)",
        school: "School of Media & Journalism",
        category: "Humanities",
        degree: "B.A.",
        duration: "3 Years",
        description: "Multimedia journalism, broadcast production, digital storytelling, and media ethics for the modern news landscape.",
        link: "https://www.dypiu.ac.in/ba-journalism-mass-communication",
        icon: "campaign",
    },
    {
        name: "M.A. – Journalism & Mass Communication",
        school: "School of Media & Journalism",
        category: "Humanities",
        degree: "M.A.",
        duration: "2 Years",
        description: "Advanced media studies, investigative journalism, and strategic communication for media professionals.",
        link: "https://www.dypiu.ac.in/ma-journalism-mass-communication",
        icon: "newspaper",
    },

    // ── School of Applied Arts & Crafts (SoAAC) ──
    {
        name: "Bachelor of Fine Arts (BFA)",
        school: "School of Applied Arts & Crafts",
        category: "Design",
        degree: "BFA",
        duration: "4 Years",
        description: "Applied arts program with focus on painting, sculpture, printmaking, and visual communication design.",
        link: "https://www.dypiu.ac.in/bfa",
        icon: "brush",
    },

    // ── School of Humanities and Social Sciences (SHSS) ──
    {
        name: "B.A. – Liberal Arts (Hons.)",
        school: "School of Humanities & Social Sciences",
        category: "Humanities",
        degree: "B.A.",
        duration: "3 Years",
        description: "Interdisciplinary liberal arts education spanning literature, philosophy, political science, and cultural studies.",
        link: "https://www.dypiu.ac.in/ba-liberal-arts-honours",
        icon: "menu_book",
    },
    {
        name: "B.Sc. – Economics (Hons.)",
        school: "School of Humanities & Social Sciences",
        category: "Humanities",
        degree: "B.Sc.",
        duration: "3 Years",
        description: "Rigorous economics program covering microeconomics, macroeconomics, econometrics, and financial analysis.",
        link: "https://www.dypiu.ac.in/bsc-economics-honours",
        icon: "monitoring",
    },
];

/* ─── Gradient backgrounds per category ─── */
const CATEGORY_GRADIENTS: Record<Category, string> = {
    Sciences: "from-emerald-700 to-teal-600",
    Technology: "from-indigo-800 to-blue-600",
    Management: "from-amber-600 to-orange-500",
    Humanities: "from-rose-700 to-pink-500",
    Design: "from-violet-700 to-purple-500",
    General: "from-slate-700 to-slate-500",
};

const CATEGORY_COLORS: Record<Category, string> = {
    Sciences: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Technology: "text-indigo-700 bg-indigo-50 border-indigo-200",
    Management: "text-amber-700 bg-amber-50 border-amber-200",
    Humanities: "text-rose-700 bg-rose-50 border-rose-200",
    Design: "text-violet-700 bg-violet-50 border-violet-200",
    General: "text-slate-700 bg-slate-50 border-slate-200",
};

export default function DYPIUCourseCatalog() {
    const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
    const [searchQuery, setSearchQuery] = useState("");

    const convexCoursesData = useQuery(api.courses.getCourses);

    const ALL_DYNAMIC_COURSES = useMemo(() => {
        let merged = [...COURSES];
        if (convexCoursesData && convexCoursesData.length > 0) {
            const dynamicCourses: DYPIUCourse[] = convexCoursesData.map(c => ({
                name: c.title,
                school: "EduSync Platform",
                category: "General",
                degree: "Online Course",
                duration: "Self-Paced",
                description: c.description,
                link: `/courses/${c._id}`,
                icon: "menu_book",
            }));
            merged = [...dynamicCourses, ...merged];
        }
        return merged;
    }, [convexCoursesData]);

    const filteredCourses = useMemo(() => {
        return ALL_DYNAMIC_COURSES.filter((course) => {
            const matchesCategory = activeCategory === "All" || course.category === activeCategory;
            const matchesSearch =
                searchQuery === "" ||
                course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery, ALL_DYNAMIC_COURSES]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: ALL_DYNAMIC_COURSES.length };
        ALL_CATEGORIES.forEach((cat) => {
            counts[cat] = ALL_DYNAMIC_COURSES.filter((c) => c.category === cat).length;
        });
        return counts;
    }, [ALL_DYNAMIC_COURSES]);

    return (
        <section className="py-12 sm:py-24">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="font-headline text-3xl sm:text-5xl text-primary font-bold mb-3 sm:mb-4">Curated Programs</h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto text-sm sm:text-lg">
                        Explore {ALL_DYNAMIC_COURSES.length} programs across {ALL_CATEGORIES.length} disciplines — scraped live from{" "}
                        <a href="https://www.dypiu.ac.in" target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:underline">
                            dypiu.ac.in
                        </a>
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-6 sm:mb-10">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg sm:text-xl pointer-events-none z-10 transition-colors group-focus-within:text-primary">search</span>
                        <input
                            type="text"
                            placeholder="Search courses, schools, or degrees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-body placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm sm:text-base relative z-0 shadow-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary z-10 p-1 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Tabs — horizontally scrollable on mobile */}
                <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-label text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer transition-all whitespace-nowrap shrink-0 ${activeCategory === "All"
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "border border-outline-variant text-on-surface-variant hover:bg-primary hover:text-white"
                            }`}
                    >
                        All ({categoryCounts.All})
                    </button>
                    {ALL_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-label text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer transition-all whitespace-nowrap shrink-0 ${activeCategory === cat
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "border border-outline-variant text-on-surface-variant hover:bg-primary hover:text-white"
                                }`}
                        >
                            {cat} ({categoryCounts[cat]})
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 sm:mb-6 font-medium">
                    Showing <span className="font-bold text-primary">{filteredCourses.length}</span> program{filteredCourses.length !== 1 ? "s" : ""}
                    {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
                </p>

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 bg-surface-container-low rounded-xl">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                        <h3 className="text-xl font-bold text-slate-600 mb-2">No programs found</h3>
                        <p className="text-slate-400">Try a different search term or category filter.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredCourses.map((course, idx) => (
                            <a
                                key={`${course.name}-${idx}`}
                                href={course.link}
                                target={course.link.startsWith("http") ? "_blank" : "_self"}
                                rel={course.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                            >
                                {/* Card Header Gradient */}
                                <div className={`h-24 sm:h-32 bg-gradient-to-br ${CATEGORY_GRADIENTS[course.category]} relative flex items-center justify-center overflow-hidden`}>
                                    <span
                                        className="material-symbols-outlined text-white/15 text-[60px] sm:text-[100px] absolute group-hover:scale-110 transition-transform duration-500"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        {course.icon}
                                    </span>
                                    <div className="relative z-10 text-center">
                                        <span className="text-white/90 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{course.degree}</span>
                                        <div className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-widest mt-0.5 sm:mt-1">{course.duration}</div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${CATEGORY_COLORS[course.category]}`}>
                                            {course.category}
                                        </span>
                                    </div>
                                    <h3 className="font-headline text-base sm:text-lg text-primary font-bold mb-1.5 sm:mb-2 group-hover:text-primary-container transition-colors leading-snug">
                                        {course.name}
                                    </h3>
                                    <p className="text-on-surface-variant text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 flex-1">{course.description}</p>
                                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-outline-variant/20">
                                        <span className="text-[10px] sm:text-[11px] text-on-surface-variant font-medium truncate max-w-[160px] sm:max-w-[200px]">{course.school}</span>
                                        <span className="text-secondary font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
                                            View <span className="material-symbols-outlined text-xs sm:text-sm">north_east</span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
