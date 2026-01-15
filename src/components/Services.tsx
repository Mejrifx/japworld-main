/**
 * Services Breakdown Component
 * 
 * Detailed breakdown of all services offered with Japanese-styled cards.
 * 
 * CUSTOMIZATION:
 * - Modify the services array to update service offerings
 * - Each service has title, description, and feature list
 */

import { Car, Eye, Ship, FileText, DollarSign, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Direct Car Sourcing",
    subtitle: "車両調達",
    description: "Access Japan's vast automotive market through our extensive network. From rare JDM legends to practical daily drivers, we locate exactly what you're looking for.",
    features: [
      "Access to all major Japanese auctions",
      "Private seller negotiations",
      "Dealership sourcing for specific models",
      "Personalized search based on your criteria",
    ],
  },
  {
    icon: Eye,
    title: "Auction Bidding & Inspection",
    subtitle: "競売検査",
    description: "Never bid blind. Our certified inspectors provide detailed condition reports before you commit, ensuring complete transparency and informed decisions.",
    features: [
      "Pre-auction vehicle inspections",
      "100+ point condition reports",
      "High-resolution photo documentation",
      "Auction grade verification",
    ],
  },
  {
    icon: Ship,
    title: "Shipping & Customs",
    subtitle: "輸送通関",
    description: "From Japanese port to your destination, we manage the entire shipping process. Secure containerized transport with real-time tracking and full insurance coverage.",
    features: [
      "RoRo and container shipping options",
      "Marine transit insurance",
      "Real-time shipment tracking",
      "Customs brokerage services",
    ],
  },
  {
    icon: FileText,
    title: "Compliance & Documentation",
    subtitle: "法規準拠",
    description: "Navigate complex import regulations with confidence. We ensure your vehicle meets all destination country requirements for a smooth registration process.",
    features: [
      "Emissions compliance testing",
      "Safety modifications if required",
      "Full documentation package",
      "Registration assistance",
    ],
  },
  {
    icon: DollarSign,
    title: "Cost Transparency",
    subtitle: "費用明細",
    description: "No surprises, no hidden fees. We provide detailed breakdowns of all costs upfront—vehicle price, auction fees, shipping, duties, and our service fees.",
    features: [
      "Itemized cost estimates",
      "Currency conversion guidance",
      "Duty and tax calculations",
      "No hidden charges guarantee",
    ],
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Support",
    subtitle: "完全支援",
    description: "From your first inquiry to the moment you turn the key, our team is with you. Questions, concerns, updates—we're always just a message away.",
    features: [
      "Dedicated customer liaison",
      "Regular progress updates",
      "Post-delivery support",
      "Warranty assistance",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Decorative brush stroke top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="block text-primary/40 text-2xl mb-4 font-display">サービス</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Our Services
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Comprehensive import services designed to make your journey seamless. Every detail handled with precision and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300"
              >
                {/* Corner accents with hover effect */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-primary" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-primary" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-primary" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-primary" />

                {/* Icon */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-primary/40 text-lg font-display">{service.subtitle}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">専門</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>

      {/* Decorative brush stroke bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    </section>
  );
};

export default Services;
