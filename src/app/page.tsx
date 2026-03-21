import Link from "next/link";
import DYPIUCourseCatalog from "@/components/DYPIUCourseCatalog";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[500px] lg:min-h-[800px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 py-8 lg:py-0">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              Excellence in Education
            </div>
            <h1 className="font-headline text-primary text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[1.1] mb-5 sm:mb-8 font-extrabold">
              The Digital <br /> <span className="text-tertiary">Curator</span> of Higher Learning.
            </h1>
            <p className="font-body text-on-surface-variant text-base sm:text-lg max-w-xl mb-6 sm:mb-10 leading-relaxed">
              Navigate the future of academia with EduSync. We curate the intellectual journey of tomorrow&apos;s leaders through intentional, industry-aligned learning pathways.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="#programs" className="bg-primary hover:bg-primary-container text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm sm:text-base">
                Explore Curriculum
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/login" className="px-6 sm:px-10 py-3 sm:py-4 font-bold text-primary hover:bg-surface-container-low rounded-xl transition-all text-center text-sm sm:text-base">
                Institutional Access
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative group mt-4 lg:mt-0">
            <div className="absolute -inset-4 bg-tertiary-fixed opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity" />
            <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-700 aspect-video bg-white flex items-center justify-center">
              <img alt="EduSync Campus" className="w-full h-full object-cover" src="/campus.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Quote Overlay — hidden on small screens */}
            <div className="hidden sm:block absolute bottom-6 -left-6 max-w-xs bg-surface-container-highest p-4 sm:p-6 rounded-xl shadow-xl border-l-4 border-secondary backdrop-blur-sm">
              <span className="material-symbols-outlined text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              <p className="font-headline font-bold text-base sm:text-lg text-primary leading-tight">&ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;</p>
              <p className="mt-3 sm:mt-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">&mdash; EduSync Academic Insight</p>
            </div>
          </div>
        </div>
      </section>

      {/* University Highlights */}
      <section className="py-12 sm:py-24 bg-[#f4f6f9]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Section Header + About */}
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#1F7A3E] rounded-full" />
              <span className="text-[12px] text-[#1F7A3E] uppercase tracking-[0.2em] font-bold">About Our University</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-[#0B3C6F] font-bold leading-tight mb-4 sm:mb-6">
              University Highlights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <p className="text-[#4a5568] text-[14px] sm:text-[15px] leading-[1.8]">
                D Y Patil International University (DYPIU), Akurdi, Pune, has swiftly emerged as one of India&apos;s leading centers for academic excellence and innovation. Established in 2018 and recognized by the UGC and Government of Maharashtra, DYPIU is known for its world-class academic offerings across engineering, management, design, biotechnology, media, and liberal arts.
              </p>
              <p className="text-[#4a5568] text-[14px] sm:text-[15px] leading-[1.8]">
                At DYPIU, learners benefit from state-of-the-art infrastructure, inspiring mentorship, and opportunities for hands-on training and real-world problem-solving right from their first year. Widely recognized for its experiential learning model, DYPIU is consistently ranked among the top private universities in Pune and Maharashtra.
              </p>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-14">
            {[
              { stat: "2018", label: "Established", icon: "calendar_today" },
              { stat: "UGC", label: "Recognized", icon: "verified" },
              { stat: "8", label: "Schools", icon: "account_balance" },
              { stat: "25+", label: "Programs", icon: "menu_book" },
              { stat: "200+", label: "Faculty", icon: "groups" },
              { stat: "98%", label: "Placements", icon: "trending_up" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center shadow-[0_1px_12px_rgba(11,60,111,0.05)] border border-[#edf0f4] hover:shadow-[0_3px_20px_rgba(11,60,111,0.10)] transition-shadow duration-300">
                <span className="material-symbols-outlined text-[16px] sm:text-[20px] text-[#0B3C6F]/40 mb-1 sm:mb-2 block">{item.icon}</span>
                <div className="text-[18px] sm:text-[24px] md:text-[28px] font-headline font-bold text-[#0B3C6F]">{item.stat}</div>
                <p className="text-[9px] sm:text-[11px] text-[#8a95a3] uppercase tracking-wider font-medium mt-0.5 sm:mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Large Card — Academic Excellence */}
            <div className="lg:row-span-2 bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_2px_20px_rgba(11,60,111,0.06)] border border-[#e8ecf1] flex flex-col justify-between group hover:shadow-[0_4px_32px_rgba(11,60,111,0.10)] transition-shadow duration-300">
              <div>
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#EBF4FF] flex items-center justify-center mb-4 sm:mb-6">
                  <span className="material-symbols-outlined text-[24px] sm:text-[28px] text-[#0B3C6F]">school</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl md:text-[26px] text-[#0B3C6F] font-bold mb-2 sm:mb-3 leading-snug">
                  Academic Excellence
                </h3>
                <p className="text-[#5a6a7a] text-[14px] sm:text-[15px] leading-relaxed mb-4 sm:mb-5">
                  DYPIU offers world-class programs across 8 schools — from B.Tech in Computer Science and Semiconductor Engineering to MBA Digital Business and BFA Applied Arts. The university develops future-ready professionals through a rigorous, modern curriculum and a dynamic learning environment.
                </p>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {[
                    "Engineering, Management, Design & Liberal Arts",
                    "Industry partnerships with IBM & global leaders",
                    "PhD programs across multiple disciplines",
                    "Experiential learning from year one",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 sm:gap-3">
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-[#1F7A3E] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-[13px] sm:text-[14px] text-[#4a5568]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="https://www.dypiu.ac.in/admissions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1F7A3E] font-bold text-[14px] group-hover:gap-3 transition-all">
                Explore Programs
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            {/* Innovation & Research */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_2px_20px_rgba(11,60,111,0.06)] border border-[#e8ecf1] flex flex-col justify-between hover:shadow-[0_4px_32px_rgba(11,60,111,0.10)] transition-shadow duration-300">
              <div>
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center mb-4 sm:mb-5">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-[#7C3AED]">biotech</span>
                </div>
                <h3 className="font-headline text-lg sm:text-xl text-[#0B3C6F] font-bold mb-2">Innovation &amp; Research</h3>
                <p className="text-[#5a6a7a] text-[13px] sm:text-[14px] leading-relaxed">
                  Strong research culture with BIRAC E-YUVA recognition. Students shortlisted for prestigious national innovation competitions and awarded Best Research Paper at EAIT 2024 international conference.
                </p>
              </div>
              <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#f0f2f5] flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-[#7C3AED]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                <span className="text-[11px] sm:text-[12px] text-[#8a95a3] font-medium">BIRAC E-YUVA Recognized</span>
              </div>
            </div>

            {/* Industry & Placements */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_2px_20px_rgba(11,60,111,0.06)] border border-[#e8ecf1] flex flex-col justify-between hover:shadow-[0_4px_32px_rgba(11,60,111,0.10)] transition-shadow duration-300">
              <div>
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-4 sm:mb-5">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-[#1F7A3E]">work</span>
                </div>
                <h3 className="font-headline text-lg sm:text-xl text-[#0B3C6F] font-bold mb-2">Industry Partnerships</h3>
                <p className="text-[#5a6a7a] text-[13px] sm:text-[14px] leading-relaxed">
                  Dedicated Corporate Relations &amp; Placement Cell with comprehensive training in aptitude, communication, and professional development. Students placed at world&apos;s most prestigious companies.
                </p>
              </div>
              <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#f0f2f5] flex items-center gap-3">
                <span className="text-[20px] sm:text-[22px] font-headline font-bold text-[#1F7A3E]">98%</span>
                <span className="text-[11px] sm:text-[12px] text-[#8a95a3] uppercase tracking-wider font-medium">Placement Rate</span>
              </div>
            </div>

            {/* Wide Awards Card */}
            <div className="lg:col-span-2 bg-[#0B3C6F] rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(11,60,111,0.15)]">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-10 mb-6 sm:mb-8">
                <div className="flex-1">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-[#fbbf24]">emoji_events</span>
                  </div>
                  <h3 className="font-headline text-xl sm:text-2xl text-white font-bold mb-2">Awards &amp; Recognition</h3>
                  <p className="text-white/60 text-[13px] sm:text-[14px] leading-relaxed max-w-lg">
                    DYPIU students and faculty consistently win at national and international levels — from IIT Mumbai poster presentations to ENSIN entrepreneurship awards.
                  </p>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="text-center">
                    <span className="text-[28px] sm:text-[36px] font-headline font-bold text-[#fbbf24]">15+</span>
                    <p className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider font-medium mt-0.5 sm:mt-1">Awards 2024-25</p>
                  </div>
                  <div className="w-px h-10 sm:h-12 bg-white/15" />
                  <div className="text-center">
                    <span className="text-[28px] sm:text-[36px] font-headline font-bold text-[#66df6e]">8</span>
                    <p className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider font-medium mt-0.5 sm:mt-1">Schools</p>
                  </div>
                </div>
              </div>
              {/* Awards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {[
                  "First Prize at INNOVFEST 2025 (E-Cell PUMBA, SPPU)",
                  "Winners at Fyrst Ideation Challenge 2K25 – VIT-AP University",
                  "Best Research Paper at EAIT 2024 International Conference",
                  "Poster Presentation Award at IIT Mumbai",
                  "Best Delegate at BIZ-MUN, VNIT Nagpur",
                  "Bendre Husain Scholarship Achievement",
                  "Women Entrepreneurship Enabler Award 2025 — ENSIN Forum",
                  "Student Innovation Ambassador Award 2025 — ENSIN Forum",
                ].map((award) => (
                  <div key={award} className="flex items-start gap-2 sm:gap-2.5 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl">
                    <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-[#fbbf24] mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-[12px] sm:text-[13px] text-white/80 leading-snug">{award}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Course Catalog */}
      <div id="programs">
        <DYPIUCourseCatalog />
      </div>

      {/* Signature Quote */}
      <section className="py-12 sm:py-24 max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="bg-surface-container-high p-8 sm:p-12 md:p-16 rounded-xl flex flex-col md:flex-row items-center gap-8 sm:gap-12 relative overflow-hidden">
          <div className="w-1 bg-secondary absolute left-0 top-8 sm:top-12 bottom-8 sm:bottom-12 rounded-full" />
          <div className="flex-grow">
            <h4 className="font-label text-xs text-primary tracking-widest uppercase mb-4 sm:mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              University Philosophy
            </h4>
            <p className="font-headline text-2xl sm:text-4xl md:text-5xl text-primary font-bold leading-tight">&ldquo;In an age of endless information, the greatest skill is not acquisition, but the discernment of what truly matters.&rdquo;</p>
            <div className="mt-6 sm:mt-8 flex items-center gap-4">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">P</div>
              <div>
                <p className="font-bold text-primary text-sm sm:text-base">Academic Leadership</p>
                <p className="text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-widest">EduSync — The Digital Curator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Trust Banner */}
      <section className="py-10 sm:py-16 border-y border-outline-variant/20 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {["Global Academic Partners", "Industry Excellence", "Innovation Network", "Scholarly Trust", "Digital Transformation"].map((t) => (
            <span key={t} className="font-headline text-lg sm:text-2xl font-bold text-primary">{t}</span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 w-full py-8 sm:py-12 border-t-0">
        <div className="flex flex-col gap-4 sm:gap-6 items-center px-4 sm:px-12 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <img alt="EduSync logo" className="h-8 sm:h-10 w-auto grayscale opacity-70" src="/image.png" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {["Privacy Policy", "Terms of Service", "Institutional Access", "Contact Support"].map((link) => (
              <Link key={link} href="#" className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 hover:text-primary hover:underline decoration-tertiary decoration-2 underline-offset-4 transition-opacity duration-200">
                {link}
              </Link>
            ))}
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 text-center">© 2024 EduSync. Curated for Excellence.</p>
        </div>
      </footer>
    </>
  );
}
