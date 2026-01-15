/**
 * How It Works / Process Component
 * 
 * Step-by-step breakdown of the import process with Japanese-styled icons and accents.
 * 
 * CUSTOMIZATION:
 * - Modify the steps array to update process steps
 * - Icons are from lucide-react
 */

import { Search, ClipboardCheck, Gavel, Ship, FileCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Vehicle Selection",
    subtitle: "探す",
    description: "Browse Japan's extensive auction network with our guidance. We help you identify the perfect vehicle matching your specifications, budget, and preferences.",
  },
  {
    icon: ClipboardCheck,
    title: "Professional Inspection",
    subtitle: "検査",
    description: "Our certified inspectors thoroughly examine your chosen vehicle. Receive detailed reports with high-resolution images covering every aspect of the car's condition.",
  },
  {
    icon: Gavel,
    title: "Auction Bidding",
    subtitle: "入札",
    description: "We handle the competitive bidding process on your behalf, leveraging our expertise to secure your vehicle at the best possible price.",
  },
  {
    icon: Ship,
    title: "International Shipping",
    subtitle: "輸送",
    description: "Your vehicle is carefully loaded into a secure container and shipped via established routes. Track your car in real-time throughout the journey.",
  },
  {
    icon: FileCheck,
    title: "Compliance & Documentation",
    subtitle: "書類",
    description: "We navigate the complex import regulations specific to your country. All paperwork, customs clearance, and compliance requirements handled seamlessly.",
  },
  {
    icon: Truck,
    title: "Delivery",
    subtitle: "配達",
    description: "Your dream car arrives at your doorstep, fully compliant and ready to drive. We're with you every step of the way until you're completely satisfied.",
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="relative py-20 sm:py-28 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      {/* Brush stroke top divider */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="block text-primary/40 text-2xl mb-4 font-display">手順</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            How It Works
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            A seamless journey from discovery to delivery. Here's how we bring your dream car from Japan to your doorstep.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`
                    relative lg:flex lg:items-center lg:gap-8
                    ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                  `}
                >
                  {/* Content Card */}
                  <div className={`lg:w-[calc(50%-2rem)] ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-colors duration-300">
                      {/* Corner accents */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />

                      {/* Step number (mobile) */}
                      <div className="lg:hidden flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-primary/60 text-xs uppercase tracking-widest">Step {index + 1}</span>
                          <span className="text-primary/40 text-sm ml-2 font-display">{step.subtitle}</span>
                        </div>
                      </div>

                      {/* Title (desktop) */}
                      <div className={`hidden lg:flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-primary/40 text-lg font-display">{step.subtitle}</span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-2 border-primary/40 items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="absolute -top-6 text-primary/60 text-xs uppercase tracking-widest">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Spacer for opposite side (desktop) */}
                  <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
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
      </div>

      {/* Brush stroke bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    </section>
  );
};

export default HowItWorks;
