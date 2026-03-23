"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { BrandLogo } from "@/components/BrandLogo";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SignInContent() {
    const searchParams = useSearchParams();
    const { isSignedIn } = useAuth();
    const errorMsg = searchParams.get("message");
    const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

    useEffect(() => {
        if (isSignedIn) {
            // Instant redirect to the specified destination
            window.location.replace(redirectUrl);
        }
    }, [isSignedIn, redirectUrl]);

    // If signed in, show a simple non-blocking redirect message.
    // Otherwise, show the premium sign-in vault.
    if (isSignedIn) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-slate-50/50">
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <BrandLogo size="lg" className="mb-6 shadow-indigo-200 shadow-2xl animate-bounce" />
                    <h2 className="text-xl font-black text-slate-950 tracking-tighter">Redirecting...</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Entering Academic Curator Node</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-slate-50/50">
            <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -translate-y-12 translate-x-12" />

                <div className="mb-10 flex flex-col items-center relative z-10 text-center">
                    <BrandLogo size="lg" className="mb-6 shadow-indigo-500/20 shadow-xl border-white/5 bg-indigo-950" />
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Welcome to EduSync</h1>
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] opacity-80">The Academic Curriculum Curator</p>
                </div>

                {errorMsg && (
                    <div className="w-full p-4 mb-6 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <span className="material-symbols-outlined text-sm ml-2">report</span>
                        {errorMsg}
                    </div>
                )}

                <div className="w-full relative z-10">
                    <SignIn
                        forceRedirectUrl={redirectUrl}
                        appearance={{
                            elements: {
                                formButtonPrimary: "bg-slate-900 hover:bg-slate-800 text-sm font-black normal-case py-3 rounded-2xl transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]",
                                card: "shadow-none border-none p-0 bg-transparent flex flex-col",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "border-slate-200 bg-slate-50/50 text-slate-700 font-black rounded-2xl hover:bg-white transition-all shadow-sm border border-slate-100",
                                socialButtonsBlockButtonText: "font-black tracking-tight",
                                formFieldInput: "rounded-2xl border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-8 focus:ring-slate-500/5 focus:border-slate-500 outline-none transition-all py-3 px-5 font-bold",
                                footer: "hidden",
                                formFieldLabel: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1",
                                dividerRow: "my-6 opacity-30",
                                identityPreviewText: "font-bold text-slate-900"
                            }
                        }}
                    />
                </div>

                <div className="mt-10 pt-8 border-t border-slate-50 w-full text-center">
                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] leading-relaxed">
                        Establishing session at <span className="text-slate-500">EduSync Curator Node</span>
                    </p>
                </div>
            </div>

            <p className="mt-10 text-[9px] text-slate-400 max-w-xs text-center font-bold tracking-[0.1em] opacity-60 uppercase">
                EduSync Curriculum Protocol v2.4.1
            </p>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SignInContent />
        </Suspense>
    );
}
