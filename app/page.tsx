import { HeroSection } from '@/features/landing/components/hero-section';
import { FeaturesSection } from '@/features/landing/components/features-section';
import { AboutSection } from '@/features/landing/components/about-section';
import { CTASection } from '@/features/landing/components/cta-section';
import { Footer } from '@/features/shared/components/footer';
import { Navbar } from '@/features/shared/components/navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
