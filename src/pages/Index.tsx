/**
 * Index Page - JapWorld Homepage
 * 
 * Structure:
 * 1. Password Gate - Wraps all content, requires password to access
 * 2. Hero Section - Background image with logo and construction notice
 * 3. About Section - Company information after scrolling
 * 
 * PASSWORD:
 * - Current password: "japanimport"
 * - To change: Edit SITE_PASSWORD in src/components/PasswordGate.tsx
 */

import japworldBg from "@/assets/japworld-bg.png";
import japworldLogo from "@/assets/japworld-logo.png";
import PasswordGate from "@/components/PasswordGate";
import AboutSection from "@/components/AboutSection";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const scrollToAbout = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <PasswordGate>
      <main className="relative w-full">
        {/* Hero Section - Full viewport height */}
        <section className="relative min-h-screen w-full overflow-hidden">
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
            
            {/* Under Construction Text - Better mobile spacing and sizing */}
            <div className="animate-fade-in-delayed mt-6 sm:mt-8 md:mt-10 text-center px-2">
              <p className="animate-shimmer text-[10px] sm:text-xs md:text-sm lg:text-base font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-relaxed">
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
        <AboutSection />

        {/* Footer */}
        <footer className="relative py-12 sm:py-16 border-t border-border/50">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
              <img 
                src={japworldLogo} 
                alt="JapWorld" 
                className="h-8 sm:h-10 w-auto opacity-60"
              />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
            </div>
            <p className="text-muted-foreground/60 text-sm">
              © {new Date().getFullYear()} JapWorld. All rights reserved.
            </p>
            <p className="text-muted-foreground/40 text-xs mt-2">
              Premium Japanese Vehicle Import Services
            </p>
          </div>
        </footer>
      </main>
    </PasswordGate>
  );
};

export default Index;
