import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ onSignIn, onGetStarted }) => (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-700">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Task management, simplified
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Stay organized.
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Get things done.
            </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Taskify helps you track your work, manage deadlines, and collaborate effortlessly — all in one clean, modern interface.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
            <button
                onClick={onGetStarted}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all hover:brightness-105 hover:shadow-2xl active:scale-[0.98]"
            >
                Create free account
                <ArrowRight className="h-4 w-4" />
            </button>
            <button
                onClick={onSignIn}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
            >
                Sign in
            </button>
        </div>
    </section>
);

export default HeroSection;