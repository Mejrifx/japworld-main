/**
 * Interactive Tools Component
 * 
 * CTAs for Auction Search, Free Alerts, and Cost Calculator.
 * Japanese-styled cards with hover effects.
 * 
 * CUSTOMIZATION:
 * - Update tool descriptions and CTAs as needed
 * - Link to actual tools once implemented
 */

import { Search, Bell, Calculator, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: Search,
    title: "Auction Search",
    subtitle: "競売検索",
    description: "Browse live and upcoming auctions across Japan's major auction houses. Filter by make, model, year, price range, and auction grade.",
    cta: "Search Auctions",
    accent: "primary",
  },
  {
    icon: Bell,
    title: "Free Auction Alerts",
    subtitle: "通知設定",
    description: "Set up personalized alerts for your dream car. We'll notify you instantly when matching vehicles appear at auction—never miss an opportunity.",
    cta: "Set Up Alerts",
    accent: "secondary",
  },
  {
    icon: Calculator,
    title: "Cost Calculator",
    subtitle: "費用計算",
    description: "Estimate the total cost of importing your chosen vehicle. Factor in purchase price, shipping, duties, and fees for a complete picture.",
    cta: "Calculate Costs",
    accent: "primary",
  },
];

const InteractiveTools = () => {
  return (
    <section id="auctions" className="relative py-20 sm:py-28 md:py-32">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />

      {/* Decorative brush stroke top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="block text-primary/40 text-2xl mb-4 font-display">ツール</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Get Started
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Powerful tools to help you find, track, and plan your import. Start your journey today.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Main Card */}
                <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm h-full flex flex-col hover:bg-card/60 transition-all duration-300">
                  {/* Corner accents */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-primary" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-primary" />

                  {/* Icon and subtitle */}
                  <div className="mb-6">
                    <div className={`
                      w-16 h-16 rounded-lg flex items-center justify-center mb-4
                      ${tool.accent === 'secondary' 
                        ? 'bg-secondary/10 border border-secondary/30 group-hover:bg-secondary/20' 
                        : 'bg-primary/10 border border-primary/30 group-hover:bg-primary/20'
                      }
                      transition-colors duration-300
                    `}>
                      <Icon className={`w-8 h-8 ${tool.accent === 'secondary' ? 'text-secondary' : 'text-primary'}`} />
                    </div>
                    <span className={`text-lg font-display ${tool.accent === 'secondary' ? 'text-secondary/40' : 'text-primary/40'}`}>
                      {tool.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-8 flex-grow">
                    {tool.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`
                      w-full py-3 px-6 flex items-center justify-center gap-2
                      ${tool.accent === 'secondary'
                        ? 'bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 hover:border-secondary/50 text-secondary'
                        : 'bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary'
                      }
                      font-medium transition-all duration-200
                      uppercase tracking-[0.15em] text-sm
                      group/btn
                    `}
                  >
                    <span>{tool.cta}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculator Section */}
        <div id="calculator" className="mt-16 sm:mt-20">
          <div className="border-shoji p-8 sm:p-12 bg-card/40 backdrop-blur-sm relative">
            {/* Decorative corners */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" />

            <div className="max-w-3xl mx-auto text-center">
              <Calculator className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
                Ready to Calculate Your Import?
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg mb-8">
                Get an accurate estimate for your dream car. Enter the vehicle details, your destination, and we'll break down all costs including shipping, duties, taxes, and our service fees.
              </p>
              <button className="
                py-4 px-8 
                bg-primary/20 hover:bg-primary/30
                border border-primary/50 hover:border-primary
                text-primary font-medium
                transition-all duration-200
                uppercase tracking-[0.2em] text-sm
                inline-flex items-center gap-3
              ">
                <span>Launch Cost Calculator</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">始める</span>
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

export default InteractiveTools;
