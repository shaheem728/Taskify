import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const LandingNav = ({ onSignIn, onGetStarted }) => (
    <nav className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 pt-2">
        <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25">
                <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-slate-900">Taskify</span>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={onSignIn}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
                Sign in
            </button>
            <button
                onClick={onGetStarted}
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:brightness-105 active:scale-[0.98]"
            >
                Get started
            </button>
        </div>
    </nav>
);

export default LandingNav;