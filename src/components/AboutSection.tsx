/**
 * About Section Component
 * 
 * Japanese-styled about section for the car import business.
 * Features shoji-inspired borders, brush stroke dividers, and premium typography.
 */

import { Shield, Globe, Car, CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative py-20 sm:py-28 md:py-32">
      {/* Section background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Calligraphy-inspired top divider */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Japanese accent character */}
          <span className="block text-primary/40 text-2xl mb-4 font-display">会社概要</span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            About JapWorld
          </h2>
          
          {/* Brush stroke divider */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 sm:space-y-16">
          {/* Who We Are */}
          <div className="relative">
            <div className="border-shoji p-6 sm:p-8 md:p-10 bg-card/40 backdrop-blur-sm">
              {/* Corner accent */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Who We Are
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                JapWorld is a premium vehicle import service specializing in bringing exceptional 
                Japanese automobiles to enthusiasts worldwide. With deep roots in Japan's automotive 
                industry and a network spanning global logistics, we bridge the gap between Japan's 
                legendary car culture and collectors around the world.
              </p>
            </div>
          </div>

          {/* What We Solve */}
          <div className="relative">
            <div className="border-shoji p-6 sm:p-8 md:p-10 bg-card/40 backdrop-blur-sm">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4 flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                The Problem We Solve
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-6">
                Importing a vehicle from Japan can be overwhelming—language barriers, complex regulations, 
                auction logistics, shipping complications, and the risk of purchasing sight-unseen. 
                Many buyers have been burned by unreliable intermediaries or hidden vehicle defects.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We eliminate these risks with a full-service, concierge approach. From vehicle sourcing 
                and inspection to shipping and compliance documentation, we handle every detail so you 
                can focus on the excitement of your new acquisition.
              </p>
            </div>
          </div>

          {/* Why Japan */}
          <div className="relative">
            <div className="border-shoji p-6 sm:p-8 md:p-10 bg-card/40 backdrop-blur-sm">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4 flex items-center gap-3">
                <Car className="w-5 h-5 text-primary" />
                Why Import from Japan
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-6">
                Japan's automotive heritage is unmatched. Strict inspection standards (Shaken) ensure 
                vehicles are meticulously maintained. Low average mileage, a culture of vehicle care, 
                and access to models never sold elsewhere make Japan the world's premier source for 
                quality used vehicles.
              </p>
              
              {/* Benefits list */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Rigorous inspection standards",
                  "Lower average mileage",
                  "Exceptional vehicle maintenance",
                  "Access to JDM-exclusive models",
                  "Competitive pricing",
                  "Complete service history"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust & Transparency */}
          <div className="relative">
            <div className="border-shoji p-6 sm:p-8 md:p-10 bg-card/40 backdrop-blur-sm">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4">
                Trust, Transparency & Worldwide Delivery
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                We believe in complete transparency at every stage. You'll receive detailed inspection 
                reports with high-resolution photography, clear pricing with no hidden fees, and 
                real-time tracking from auction to your doorstep.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Whether you're in North America, Europe, Australia, or beyond, our established 
                logistics network ensures safe, timely delivery. Your dream car from Japan is 
                closer than you think.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">信頼</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>

      {/* Calligraphy-inspired bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    </section>
  );
};

export default AboutSection;
