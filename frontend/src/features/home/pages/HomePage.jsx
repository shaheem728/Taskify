import React from 'react';
import useLandingNavigation from '@/features/home/hooks/useLandingNavigation';
import BackgroundDecor from '@/features/home/components/BackgroundDecor';
import LandingNav from '@/features/home/components/LandingNav';
import HeroSection from '@/features/home/components/HeroSection';
import FeaturesSection from '@/features/home/components/FeaturesSection';

export default function HomePage() {
  const { goToLogin, goToRegister } = useLandingNavigation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <BackgroundDecor />
      <LandingNav onSignIn={goToLogin} onGetStarted={goToRegister} />
      <HeroSection onSignIn={goToLogin} onGetStarted={goToRegister} />
      <FeaturesSection />
    </div>
  );
}