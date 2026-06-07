/**
 * Services Page
 * 
 * Comprehensive breakdown of all services offered
 * with detailed descriptions and features.
 */

import { Car, Eye, Ship, FileText, DollarSign, ShieldCheck, CheckCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const services = [
  {
    icon: Car,
    title: "Direct Car Sourcing",
    subtitle: "車両調達",
    description: "Access Japan's vast automotive market through our extensive network. From rare JDM legends to practical daily drivers, we locate exactly what you're looking for.",
    features: [
      "Access to all major Japanese auctions (USS, JAA, CAA, etc.)",
      "Private seller negotiations and direct purchases",
      "Dealership sourcing for specific models and specifications",
      "Personalized search based on your exact criteria",
      "Market analysis and pricing guidance",
      "Vehicle history verification",
    ],
  },
  {
    icon: Eye,
    title: "Auction Bidding & Inspection",
    subtitle: "競売検査",
    description: "Never bid blind. Our certified inspectors provide detailed condition reports before you commit, ensuring complete transparency and informed decisions.",
    features: [
      "Pre-auction vehicle inspections at auction sites",
      "100+ point comprehensive condition reports",
      "High-resolution photo documentation (200+ images)",
      "Auction grade verification and explanation",
      "Mechanical, body, and interior assessments",
      "Service history review and verification",
      "Strategic bidding based on market analysis",
    ],
  },
  {
    icon: Ship,
    title: "Shipping & Customs",
    subtitle: "輸送通関",
    description: "From Japanese port to your destination, we manage the entire shipping process. Secure containerized transport with real-time tracking and full insurance coverage.",
    features: [
      "RoRo (Roll-on/Roll-off) and container shipping options",
      "Marine transit insurance coverage",
      "Real-time shipment tracking",
      "Customs brokerage services",
      "Port-to-port or door-to-door delivery",
      "Coordination with local delivery services",
      "Estimated transit times: 2-6 weeks depending on destination",
    ],
  },
  {
    icon: FileText,
    title: "Compliance & Documentation",
    subtitle: "法規準拠",
    description: "Navigate complex import regulations with confidence. We ensure your vehicle meets all destination country requirements for a smooth registration process.",
    features: [
      "Export documentation from Japan",
      "Import permits and customs clearance",
      "Emissions compliance testing and modifications",
      "Safety standard compliance verification",
      "Full documentation package preparation",
      "Registration assistance in your country",
      "Ongoing support for compliance questions",
    ],
  },
  {
    icon: DollarSign,
    title: "Cost Transparency",
    subtitle: "費用明細",
    description: "No surprises, no hidden fees. We provide detailed breakdowns of all costs upfront—vehicle price, auction fees, shipping, duties, and our service fees.",
    features: [
      "Itemized cost estimates before purchase",
      "Currency conversion guidance",
      "Duty and tax calculations specific to your country",
      "Shipping cost breakdowns",
      "No hidden charges guarantee",
      "Payment schedule and options",
      "Final invoice with all costs detailed",
    ],
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Support",
    subtitle: "完全支援",
    description: "From your first inquiry to the moment you turn the key, our team is with you. Questions, concerns, updates—we're always just a message away.",
    features: [
      "Dedicated customer liaison throughout the process",
      "Regular progress updates at every stage",
      "24/7 communication availability",
      "Post-delivery support and assistance",
      "Warranty and service recommendations",
      "Ongoing relationship for future imports",
      "Satisfaction guarantee",
    ],
  },
];

const Services = () => {
  return (
    <PageLayout>
      {/* Hero Section - Refined */}
      <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-20 sm:mb-24 animate-fade-in">
            <span className="block text-primary/35 text-4xl sm:text-5xl mb-8 font-display tracking-tight">サービス</span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-8 tracking-tight text-balance">
              Our Services
            </h1>
            <p className="text-muted-foreground text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed text-pretty">
              Comprehensive import services covering every aspect of bringing your dream car 
              from Japan to your doorstep. We handle the complexity so you can enjoy the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Premium Layout */}
      <section className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="border-shoji p-8 sm:p-10 bg-card/50 backdrop-blur-xl relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'scale-in 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards',
                    opacity: 0
                  }}
                >
                  <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-primary" />
                  <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-primary" />
                  
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-primary/35 text-lg font-display tracking-tight">{service.subtitle}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base sm:text-lg text-pretty">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3.5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent - refined */}
        <div className="flex items-center justify-center gap-5 mt-20 sm:mt-24">
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-primary/25" />
          <span className="text-primary/30 text-xl sm:text-2xl font-display tracking-tight">専門</span>
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-primary/25" />
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
