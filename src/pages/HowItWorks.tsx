/**
 * How It Works Page
 * 
 * Detailed step-by-step breakdown of the import process
 * with interactive elements and animations.
 */

import { Search, ClipboardCheck, Gavel, Ship, FileCheck, Truck, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const steps = [
  {
    icon: Search,
    title: "Vehicle Selection",
    subtitle: "探す",
    description: "Browse Japan's extensive auction network with our guidance. We help you identify the perfect vehicle matching your specifications, budget, and preferences.",
    details: [
      "Access to all major Japanese auction houses (USS, JAA, CAA, etc.)",
      "Advanced search filters by make, model, year, mileage, and grade",
      "Expert recommendations based on your needs and budget",
      "Private seller and dealership sourcing options",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Professional Inspection",
    subtitle: "検査",
    description: "Our certified inspectors thoroughly examine your chosen vehicle. Receive detailed reports with high-resolution images covering every aspect of the car's condition.",
    details: [
      "100+ point comprehensive inspection",
      "High-resolution photography (200+ images)",
      "Auction grade verification and explanation",
      "Mechanical, body, and interior condition assessment",
      "Service history review and verification",
    ],
  },
  {
    icon: Gavel,
    title: "Auction Bidding",
    subtitle: "入札",
    description: "We handle the competitive bidding process on your behalf, leveraging our expertise to secure your vehicle at the best possible price.",
    details: [
      "Strategic bidding based on market analysis",
      "Real-time auction participation",
      "Price negotiation with private sellers",
      "Secure payment processing",
      "Immediate purchase confirmation",
    ],
  },
  {
    icon: Ship,
    title: "International Shipping",
    subtitle: "輸送",
    description: "Your vehicle is carefully loaded into a secure container and shipped via established routes. Track your car in real-time throughout the journey.",
    details: [
      "RoRo (Roll-on/Roll-off) or container shipping options",
      "Marine transit insurance coverage",
      "Real-time shipment tracking",
      "Port-to-port or door-to-door delivery",
      "Estimated 2-6 weeks transit time depending on destination",
    ],
  },
  {
    icon: FileCheck,
    title: "Compliance & Documentation",
    subtitle: "書類",
    description: "We navigate the complex import regulations specific to your country. All paperwork, customs clearance, and compliance requirements handled seamlessly.",
    details: [
      "Export documentation from Japan",
      "Import permits and customs clearance",
      "Duty and tax calculations",
      "Vehicle registration assistance",
      "Compliance with local emissions and safety standards",
    ],
  },
  {
    icon: Truck,
    title: "Delivery",
    subtitle: "配達",
    description: "Your dream car arrives at your doorstep, fully compliant and ready to drive. We're with you every step of the way until you're completely satisfied.",
    details: [
      "Final inspection upon arrival",
      "Delivery to your specified location",
      "Post-delivery support and assistance",
      "Warranty and service recommendations",
      "Ongoing relationship for future imports",
    ],
  },
];

const HowItWorks = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">手順</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              How It Works
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              A seamless journey from discovery to delivery. Here's how we bring your dream car 
              from Japan to your doorstep, step by step.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`
                    relative
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center gap-8">
                    {/* Left Content */}
                    <div className={`flex-1 ${isEven ? 'order-1' : 'order-3'}`}>
                      <div className="border-shoji p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <div className="text-primary/60 text-xs uppercase tracking-widest mb-1">
                              Step {index + 1}
                            </div>
                            <h3 className="font-display text-2xl text-foreground">{step.title}</h3>
                            <div className="text-primary/40 text-sm font-display mt-1">{step.subtitle}</div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>
                        
                        <div className="space-y-2">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="order-2 relative z-10">
                      <div className="w-20 h-20 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center shadow-lg">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/40 to-transparent" />
                      )}
                    </div>

                    {/* Right Spacer */}
                    <div className="flex-1 order-3" />
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <div className="text-primary/60 text-xs uppercase tracking-widest mb-1">
                            Step {index + 1}
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl text-foreground">{step.title}</h3>
                          <div className="text-primary/40 text-sm font-display mt-1">{step.subtitle}</div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>
                      
                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="flex justify-center my-8">
                        <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">流れ</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="border-shoji p-8 sm:p-12 bg-card/40 backdrop-blur-sm text-center relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" />
            
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-6">
              Ready to Start Your Import Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to guide you through every step. Contact us today to begin 
              your journey to owning your dream car from Japan.
            </p>
            <a
              href="/contact"
              className="
                inline-flex items-center gap-3
                px-8 py-4
                bg-primary/20 hover:bg-primary/30
                border border-primary/50 hover:border-primary
                text-primary font-medium
                transition-all duration-200
                uppercase tracking-[0.2em] text-sm
                group
              "
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
