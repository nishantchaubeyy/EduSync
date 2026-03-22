import Link from "next/link";
import DYPIUCourseCatalog from "@/components/DYPIUCourseCatalog";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[850px] flex items-center overflow-hidden bg-slate-950">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/campus.png"
            alt="EduSync Campus"
            className="w-full h-full object-cover opacity-80 contrast-[1.1] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 w-full relative z-10 py-16 lg:py-24">
          <div className="max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#B6F09C] text-[#003d2b] font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-8 sm:mb-12 shadow-sm border border-[#94d578]/30">
              Established Excellence
            </div>

            {/* Heading */}
            <h1 className="text-white text-5xl sm:text-7xl lg:text-[110px] font-bold leading-[0.92] mb-8 sm:mb-12 tracking-tight">
              The Digital <br />
              Curator of <span className="italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Higher</span> <br />
              <span className="italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Learning.</span>
            </h1>

            {/* Lead */}
            <p className="font-body text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mb-12 sm:mb-16 leading-relaxed font-medium">
              A premium workspace for the modern scholar. Synchronizing tradition with innovation to curate the leaders of tomorrow.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <Link href="#programs" className="bg-[#1F7A3E] hover:bg-[#165a2d] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-950/40 text-sm sm:text-base border border-white/10 group">
                Explore Programs
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link href="/login" className="bg-[#0f172a]/60 backdrop-blur-md hover:bg-[#0f172a]/80 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold transition-all text-center text-sm sm:text-base border border-white/10">
                Virtual Campus Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* University Highlights */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-white">
        {/* Background Decorative Elements - Soft & Airy */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0B3C6F 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="mb-20 sm:mb-28">
            <div className="flex items-center gap-4 mb-6 group">
              <div className="w-12 h-1.5 bg-gradient-to-r from-[#1F7A3E] to-teal-500 rounded-full group-hover:w-20 transition-all duration-700" />
              <span className="text-xs sm:text-sm text-[#1F7A3E] uppercase tracking-[0.4em] font-extrabold">Excellence & Heritage</span>
            </div>

            <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl text-[#0B3C6F] font-black leading-tight mb-10 tracking-tight">
              University <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600">Highlights</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              <p className="text-[#4a5568] text-base sm:text-lg md:text-xl leading-relaxed font-semibold opacity-90">
                D Y Patil International University (DYPIU), Akurdi, Pune, has swiftly emerged as one of India&apos;s leading centers for academic excellence and innovation. Established in 2018 and recognized by the UGC and Government of Maharashtra, DYPIU is known for its world-class academic offerings.
              </p>
              <p className="text-[#718096] text-base sm:text-lg leading-relaxed">
                At DYPIU, learners benefit from state-of-the-art infrastructure, inspiring mentorship, and opportunities for hands-on training and real-world problem-solving right from their first year. Widely recognized for its experiential learning model, DYPIU is consistently ranked among the top private universities.
              </p>
            </div>
          </div>

          {/* Dynamic Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mb-24 sm:mb-36">
            {[
              { stat: "2018", label: "Established", icon: "calendar_today", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
              { stat: "UGC", label: "Recognized", icon: "verified", bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-100" },
              { stat: "8", label: "Schools", icon: "account_balance", bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
              { stat: "25+", label: "Programs", icon: "menu_book", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
              { stat: "200+", label: "Faculty", icon: "groups", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
              { stat: "98%", label: "Placements", icon: "trending_up", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
            ].map((item) => (
              <div key={item.label} className={`group relative ${item.bg} rounded-[2rem] p-8 text-center border-2 ${item.border} hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-2 transition-all duration-500`}>
                <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4 border ${item.border} shadow-sm group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined text-lg ${item.text}`}>{item.icon}</span>
                </div>
                <div className={`text-3xl sm:text-4xl font-headline font-black ${item.text} mb-2`}>{item.stat}</div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Highlights Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Academic Excellence Card (Light Blue Tint) */}
            <div className="lg:row-span-2 group relative bg-[#f4faff] rounded-[3rem] p-10 sm:p-14 border border-blue-100 shadow-[0_20px_50px_rgba(55,65,154,0.05)] hover:shadow-[0_30px_70px_rgba(55,65,154,0.1)] transition-all duration-700 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-400/5 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mb-10 border border-blue-100 shadow-xl shadow-blue-900/10">
                  <span className="material-symbols-outlined text-4xl text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <h3 className="font-headline text-3xl sm:text-4xl text-[#0B3C6F] font-bold mb-8 leading-tight">Academic <br />Excellence</h3>
                <p className="text-[#5a6a7a] text-lg leading-relaxed mb-10">
                  DYPIU offers world-class programs across 8 schools. We develop future-ready professionals through a rigorous, modern curriculum and a dynamic learning environment.
                </p>
                <div className="space-y-4 mb-12">
                  {[
                    "Engineering, Management & Liberal Arts",
                    "Industry partnerships with global leaders",
                    "PhD programs across disciplines",
                    "Experiential learning from year one",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-bold text-[#4a5568] group-hover/item:text-blue-600 transition-colors uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="https://www.dypiu.ac.in/admissions" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-4 text-blue-600 font-black text-lg hover:gap-6 transition-all uppercase tracking-widest">
                Explore Programs
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            {/* Innovation Card (Light Purple Tint) */}
            <div className="group relative bg-[#fdfaff] rounded-[3rem] p-10 border border-purple-100 shadow-[0_20px_50px_rgba(124,58,237,0.05)] hover:shadow-[0_30px_70px_rgba(124,58,237,0.1)] transition-all duration-700 flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 border border-purple-100 shadow-lg">
                  <span className="material-symbols-outlined text-2xl text-purple-600">biotech</span>
                </div>
                <h3 className="font-headline text-2xl text-[#0B3C6F] font-bold mb-4">Innovation & Research</h3>
                <p className="text-[#5a6a7a] text-base leading-relaxed">
                  Strong research culture with BIRAC E-YUVA recognition. Our students are awarded for Best Research Papers globally.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 text-purple-600 font-bold text-xs uppercase tracking-widest">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                BIRAC E-YUVA Recognized
              </div>
            </div>

            {/* Industry Card (Light Teal Tint) */}
            <div className="group relative bg-[#f4fffb] rounded-[3rem] p-10 border border-teal-100 shadow-[0_20px_50px_rgba(20,184,166,0.05)] hover:shadow-[0_30px_70px_rgba(20,184,166,0.1)] transition-all duration-700 flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 border border-teal-100 shadow-lg">
                  <span className="material-symbols-outlined text-2xl text-teal-600">work</span>
                </div>
                <h3 className="font-headline text-2xl text-[#0B3C6F] font-bold mb-4">Industry Partnerships</h3>
                <p className="text-[#5a6a7a] text-base leading-relaxed">
                  Dedicated corporate cell with specialized training. Our students are placed at global industry leaders.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="text-4xl font-black text-teal-600 tracking-tighter">98%</div>
                <div className="h-6 w-[2px] bg-teal-100" />
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Placement Rate</span>
              </div>
            </div>

            {/* Premium Dark Awards Card (Preserved High-Premium Design) */}
            <div className="lg:col-span-2 group relative overflow-hidden bg-[#0A192F] rounded-[3.5rem] p-10 sm:p-14 border border-white/10 shadow-3xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4" />

              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-12 mb-14 relative z-10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/20 mb-6">
                    <span className="material-symbols-outlined text-amber-400 text-xl">emoji_events</span>
                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.3em] font-black">Elite Status</span>
                  </div>
                  <h3 className="font-headline text-4xl sm:text-5xl text-white font-bold mb-6 tracking-tight">Awards & Recognition</h3>
                  <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-xl">
                    Our community consistently excels on global stages—from IIT Mumbai to esteemed International Conferences.
                  </p>
                </div>
                <div className="flex items-center gap-10 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                  <div className="text-center px-4">
                    <span className="text-5xl font-black text-amber-400">15+</span>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2">Annual Awards</p>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="text-center px-4">
                    <span className="text-5xl font-black text-blue-400">8</span>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2">Schools</p>
                  </div>
                </div>
              </div>

              {/* Awards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {[
                  "First Prize at INNOVFEST 2025 (E-Cell PUMBA)",
                  "Winners at Fyrst Ideation Challenge 2K25",
                  "Best Research Paper International Conference",
                  "Poster Presentation Award at IIT Mumbai",
                  "Best Delegate at BIZ-MUN, VNIT Nagpur",
                  "Bendre Husain Scholarship Achievement",
                  "Women Entrepreneurship Enabler Award 2025",
                  "Student Innovation Ambassador Award 2025",
                ].map((award) => (
                  <div key={award} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 px-6 py-5 rounded-[1.5rem] transition-all group/award">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50 group-hover/award:bg-amber-400 group-hover/award:scale-125 transition-all" />
                    <span className="text-sm text-gray-300 font-semibold group-hover/award:text-white transition-colors">{award}</span>
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
