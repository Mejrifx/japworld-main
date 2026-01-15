/**
 * Index Page - JapWorld Homepage
 * 
 * Structure:
 * 1. Password Gate - Wraps all content, requires password to access
 * 2. Navigation - Sticky header with section links
 * 3. Hero Section - Background image with logo and construction notice
 * 4. About Section - Company information
 * 5. How It Works - Step-by-step import process
 * 6. Services - Detailed service offerings
 * 7. Interactive Tools - Auction search, alerts, calculator CTAs
 * 8. Testimonials - Client success stories
 * 9. FAQ - Common questions
 * 10. Footer - Contact info and legal
 * 
 * PASSWORD:
 * - Current password: "japanimport"
 * - To change: Edit SITE_PASSWORD in src/components/PasswordGate.tsx
 */

import japworldBg from "@/assets/japworld-bg.png";
import japworldLogo from "@/assets/japworld-logo.png";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import InteractiveTools from "@/components/InteractiveTools";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      const offset = 80;
      const elementPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <PasswordGate>
      {/* Navigation */}
      <Navigation />

      <main className="relative w-full">
        {/* Hero Section - Full viewport height */}
        <section id="hero" className="relative min-h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${japworldBg})` }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-overlay" />
          
          {/* Content Container - Optimized for mobile */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">
            {/* Logo with slide-up animation - Better mobile sizing */}
            <div className="animate-slide-up-fade w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src={japworldLogo}
                alt="JapWorld - Premium Japanese Vehicle Import"
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
            
            {/* Tagline */}
            <div className="animate-fade-in-delayed mt-6 sm:mt-8 md:mt-10 text-center px-2">
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Premium Japanese vehicle imports delivered worldwide
              </p>
              <p className="animate-shimmer mt-4 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-relaxed">
                Website Under Construction...
              </p>
            </div>
            
            {/* Scroll indicator */}
            <button
              onClick={scrollToAbout}
              className="animate-fade-in-delayed absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-primary transition-colors duration-300 cursor-pointer group"
              aria-label="Scroll to learn more"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em]">Discover</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* About Section */}
        <div id="about">
          <AboutSection />
        </div>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Services Section */}
        <Services />

        {/* Interactive Tools Section */}
        <InteractiveTools />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>
    </PasswordGate>
  );
};

export default Index;
