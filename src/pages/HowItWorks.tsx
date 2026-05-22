/**
 * How It Works Page
 * 
 * Detailed step-by-step breakdown of the import process
 * with interactive elements and animations.
 */

import { MessageSquare, Search, ShoppingCart, Ship, FileCheck, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    subtitle: "相談",
    description: "From your first contact with us, we discuss your location, desired vehicle, budget, and import eligibility requirements.",
    details: [
      "Discuss your location and destination requirements",
      "Define desired vehicle specifications and budget",
      "Review import eligibility requirements for your country",
      "Access to over 60,000 cars weekly from Japanese auctions",
      "Honest assessment of market conditions and realistic expectations",
      "Transparent communication to save you time, stress, and money",
    ],
    fullText: "As an import agent, not a dealership, every vehicle is sourced specifically to order for each customer. If market conditions make certain expectations unrealistic, we explain this honestly from the beginning. We believe transparency saves our clients time, stress, and money.",
  },
  {
    icon: Search,
    title: "Auction Search & Bidding",
    subtitle: "検索入札",
    description: "We provide access to Japanese vehicle auctions with market pricing guidance, auction history and sale data, plus professional recommendations.",
    details: [
      "Access to major Japanese vehicle auctions",
      "Market pricing guidance and auction history",
      "Sale data analysis and professional recommendations",
      "Physical attendance at major Japanese auctions by our team",
      "Personal vehicle inspections before bidding",
      "Extra photos of paint, body, and interior condition",
      "Mechanical observations and signs of repairs or modifications",
    ],
    fullText: "Our experienced auction team physically attends major Japanese auctions and personally inspects vehicles before bidding. You choose the vehicle — we help you make the safest and smartest purchase possible.",
  },
  {
    icon: ShoppingCart,
    title: "Purchase & Export Preparation",
    subtitle: "購入準備",
    description: "Once purchased, we handle all paperwork from the auction, de-registration in Japan, export documentation preparation, and vessel booking.",
    details: [
      "Original paperwork received from auction",
      "Vehicle de-registration in Japan",
      "Export documentation preparation",
      "Booking onto next available vessel",
      "Shipping schedules confirmed within 2 weeks of auction purchase",
    ],
    fullText: "Shipping schedules are normally confirmed within 2 weeks of auction purchase.",
  },
  {
    icon: Ship,
    title: "Shipping & Documentation",
    subtitle: "輸送書類",
    description: "We arrange international vehicle shipping, export customs clearance, all shipping paperwork, and courier delivery of original documents with tracking.",
    details: [
      "International vehicle shipping coordination",
      "Export customs clearance processing",
      "Complete shipping paperwork management",
      "Courier delivery of original documents with tracking",
      "Japanese registration documents converted to Export Certificate",
      "Original documents, spare keys, manuals, and accessories shipped securely",
    ],
    fullText: "Your Japanese registration documents are converted into an official Export Certificate by Japan Customs. Original documents, spare keys, manuals, and accessories are securely shipped to you via international courier with tracking provided.",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance & Delivery",
    subtitle: "通関配達",
    description: "Your customs agent prepares import clearance documentation before arrival. Typical clearance takes 3–5 working days, then your vehicle is delivered or collected.",
    details: [
      "Customs agent prepares documentation before arrival",
      "Typical clearance: 3–5 working days (customs & quarantine dependent)",
      "Direct delivery to your location available",
      "Personal collection option available",
      "Shipping from Japan: 5–8 weeks to UK/Europe (destination dependent)",
    ],
    fullText: "Shipping times from Japan generally range from 5–8 weeks depending on destination within the UK and Europe.",
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
              Our Process
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              From consultation to delivery, we manage the entire import process for you — professional, transparent, and reliable every step of the way.
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
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-start gap-8">
                    {/* Left Content */}
                    <div className={`flex-1 ${isEven ? 'order-1' : 'order-3'}`}>
                      <div className="border-shoji p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        
                        <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                        
                        {step.fullText && (
                          <p className="text-muted-foreground/80 text-sm leading-relaxed mb-6 italic border-l-2 border-primary/30 pl-4">
                            {step.fullText}
                          </p>
                        )}
                        
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
                        <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                      
                      <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                      
                      {step.fullText && (
                        <p className="text-muted-foreground/80 text-sm leading-relaxed mb-6 italic border-l-2 border-primary/30 pl-4">
                          {step.fullText}
                        </p>
                      )}
                      
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

      {/* After-Sales Support Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-6 text-center">
              After-Sales Support
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                "Ongoing support after arrival",
                "Help with missing paperwork",
                "Advice on registration procedures",
                "Assistance tracking shipments",
                "Future sourcing support"
              ].map((support, i) => (
                <div key={i} className="flex items-start gap-3 text-muted-foreground">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{support}</span>
                </div>
              ))}
            </div>
          </div>
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
              sourcing your vehicle from Japan.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary text-primary font-medium transition-all duration-200 uppercase tracking-[0.2em] text-sm group"
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
