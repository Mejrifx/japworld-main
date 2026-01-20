/**
 * Index Page - JapWorld Homepage
 * 
 * Homepage with hero section and navigation to other pages.
 * 
 * PASSWORD:
 * - Current password: "japanimport"
 * - To change: Edit SITE_PASSWORD in src/components/PasswordGate.tsx
 */

import { Link } from "react-router-dom";
import japworldBg from "@/assets/japworld-bg.png";
import japworldLogo from "@/assets/japworld-logo.png";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Car, Search, Calculator, HelpCircle } from "lucide-react";

const Index = () => {
  const quickLinks = [
    { icon: Car, label: "About Us", path: "/about", description: "Learn about our company and mission" },
    { icon: Search, label: "How It Works", path: "/how-it-works", description: "Step-by-step import process" },
    { icon: Calculator, label: "Cost Calculator", path: "/calculator", description: "Estimate your import costs" },
    { icon: HelpCircle, label: "FAQ", path: "/faq", description: "Common questions answered" },
  ];

  return (
    <PasswordGate>
      <Navigation />

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
          
          {/* Content Container */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">
            {/* Logo with slide-up animation */}
            <div className="animate-slide-up-fade w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src={japworldLogo}
                alt="JapWorld - Premium Japanese Vehicle Import"
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
            
            {/* Tagline */}
            <div className="animate-fade-in-delayed mt-6 sm:mt-8 md:mt-10 text-center px-2">
              <h1 className="animate-shimmer text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-relaxed mb-4">
                Premium Japanese Vehicle Imports
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6">
                Trusted UK specialists in Japanese car imports, delivering quality, expertise, and a seamless experience
              </p>
              <p className="animate-shimmer text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-relaxed">
                Website Under Construction...
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="relative py-20 sm:py-28 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Explore Our Services
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover everything you need to know about importing your dream car from Japan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className="border-shoji p-6 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                    
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="font-display text-xl text-foreground mb-2">{link.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                    
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PasswordGate>
  );
};

export default Index;
