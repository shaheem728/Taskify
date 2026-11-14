import React from 'react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
        <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-3 text-emerald-600 ring-1 ring-emerald-100">
            <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
    </div>
);

export default FeatureCard;