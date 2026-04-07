'use client';

import { Lobster } from 'next/font/google';
import { LandingNav } from '@/components/features/landing/LandingNav';
import { HeroSection } from '@/components/features/landing/HeroSection';
import { DemoMockup } from '@/components/features/landing/DemoMockup';
import { BentoFeatureGrid } from '@/components/features/landing/BentoFeatureGrid';
import { LandingCTA } from '@/components/features/landing/LandingCTA';
import { LandingFooter } from '@/components/features/landing/LandingFooter';

const cursiveFont = Lobster({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-edu-nsw-act-cursive',
});

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#FDFCF9]">
            <LandingNav />

            <main className="pt-26 overflow-hidden">
                <HeroSection cursiveClass={cursiveFont.className} />
                <DemoMockup />
                <BentoFeatureGrid />
                <LandingCTA cursiveClass={cursiveFont.className} />
            </main>

            <LandingFooter />
        </div>
    );
}