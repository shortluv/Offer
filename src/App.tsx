import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { HeroSection } from './components/HeroSection';
import { CoreBenefitsSection } from './components/CoreBenefitsSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { BotSimulator } from './components/BotSimulator';
import { RoleBenefitsSection } from './components/RoleBenefitsSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { ImplementationStepsSection } from './components/ImplementationStepsSection';
import { BriefGeneratorSection } from './components/BriefGeneratorSection';
import { TransparencySection } from './components/TransparencySection';
import { PricingAndContactSection } from './components/PricingAndContactSection';

export default function App() {
  const [currency, setCurrency] = useState<'RUB' | 'AMD' | 'USD'>('RUB');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* 3-Zone Strict Top Bar */}
      <TopBar onScrollToSection={scrollToSection} onPrint={handlePrint} />

      {/* Formal Executive Document Header */}
      <ExecutiveHeader currency={currency} onCurrencyChange={setCurrency} />

      {/* Main Document Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onScrollToSection={scrollToSection} />

        {/* Core Advantages */}
        <CoreBenefitsSection />

        {/* Before / After Operational Comparison */}
        <BeforeAfterSection />

        {/* Interactive Live Telegram Simulator */}
        <BotSimulator currency={currency} />

        {/* Benefits by Role: Owner / Master / Client */}
        <RoleBenefitsSection />

        {/* Financial ROI Calculator */}
        <RoiCalculatorSection
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        {/* 7-Step Implementation Plan */}
        <ImplementationStepsSection />

        {/* Turnkey Onboarding Brief Generator & Checklist */}
        <BriefGeneratorSection />

        {/* Transparent Boundaries & Technical Prerequisites */}
        <TransparencySection />

        {/* Packages, Agreement Form & Minimalist Footer */}
        <PricingAndContactSection
          currency={currency}
          onCurrencyChange={setCurrency}
          onScrollToTop={() => scrollToSection('hero')}
        />
      </main>
    </div>
  );
}
