import { useState } from 'react';
import { CheckCircle2, LogOut, Plus, ListTodo, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
 const navigate = useNavigate()

  return (
       <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-slate-900">Taskify</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/auth/login')}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/auth/register')}
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:brightness-105 active:scale-[0.98]"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
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
            onClick={() => navigate('/auth/register')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all hover:brightness-105 hover:shadow-2xl active:scale-[0.98]"
          >
            Create free account
            <ArrowRightSmall />
          </button>
          <button
            onClick={() => navigate('/auth/login')}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
          >
            Sign in
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
          <FeatureCard
            icon={<ListTodo className="h-5 w-5" />}
            title="Organize tasks"
            desc="Create, categorize, and prioritize tasks with an intuitive interface."
          />
          <FeatureCard
            icon={<Clock className="h-5 w-5" />}
            title="Track progress"
            desc="Move tasks through stages and see exactly where things stand."
          />
          <FeatureCard
            icon={<CheckCircle className="h-5 w-5" />}
            title="Stay on top"
            desc="Never miss a deadline with clear status tracking and reminders."
          />
        </div>
      </section>
    </div>
  );
}



function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-3 text-emerald-600 ring-1 ring-emerald-100">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function ArrowRightSmall() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
