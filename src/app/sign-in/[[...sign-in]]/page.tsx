"use client";

import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100 flex flex-col items-center">
                <div className="mb-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 mb-4 overflow-hidden p-2">
                        <img src="/image.png" alt="University Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-black text-primary font-headline tracking-tighter">Welcome to EduSync</h1>
                    <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest">Academic Excellence</p>
                </div>

                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm normal-case",
                            card: "shadow-none border-none p-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: "border-slate-200 text-slate-600 font-bold",
                            formFieldInput: "rounded-xl border-slate-200",
                            footer: "hidden"
                        }
                    }}
                />

                <p className="mt-8 text-xs text-slate-400 text-center leading-relaxed">
                    By signing in, you agree to our <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
}
