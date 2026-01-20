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
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">サービス</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Our Services
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive import services covering every aspect of bringing your dream car 
              from Japan to your doorstep. We handle the complexity so you can enjoy the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                  
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-primary/40 text-lg font-display">{service.subtitle}</span>
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">専門</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
