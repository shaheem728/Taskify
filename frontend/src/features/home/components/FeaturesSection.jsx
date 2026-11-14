import React from 'react';
import FeatureCard from './FeatureCard';
import { FEATURES } from '@/features/home/constants/Landing.contants';

const FeaturesSection = () => (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
            {FEATURES.map(({ id, icon, title, desc }) => (
                <FeatureCard key={id} icon={icon} title={title} desc={desc} />
            ))}
        </div>
    </section>
);

export default FeaturesSection;