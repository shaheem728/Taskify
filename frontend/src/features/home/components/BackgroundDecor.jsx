import React from 'react';

const BackgroundDecor = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
    </div>
);

export default BackgroundDecor;