import React from 'react';
import moment from 'moment';
import { Building2, Sparkles, Calendar } from 'lucide-react';

// Role-agnostic hero. Pages pass the role label/icon/description.
const WelcomeBanner = ({
    orgName,
    roleLabel,
    RoleIcon,
    description,
    gradient = 'from-emerald-600 via-teal-600 to-cyan-600',
}) => (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${gradient} text-white p-6 shadow-md`}>
        <div className='absolute -right-8 -bottom-10 opacity-10 pointer-events-none'>
            <Building2 size={160} />
        </div>
        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
                <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-emerald-100 mb-2.5 border border-white/10'>
                    {RoleIcon && <RoleIcon size={14} className='text-emerald-300' />}
                    <span>{roleLabel}</span>
                </div>
                <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2'>
                    Welcome to {orgName || 'your Organization'}
                    <Sparkles size={22} className='text-amber-300 shrink-0' />
                </h2>
                <p className='text-sm md:text-base text-emerald-50/90 mt-1 max-w-xl leading-relaxed'>
                    {description}
                </p>
            </div>
            <div className='self-start md:self-auto shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/15 backdrop-blur-sm border border-white/10 text-xs font-medium text-emerald-100'>
                <Calendar size={14} />
                <span>{moment().format('dddd, Do MMMM YYYY')}</span>
            </div>
        </div>
    </div>
);

export default WelcomeBanner;