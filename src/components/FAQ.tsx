/**
 * FAQ Section Component
 * 
 * Common questions about importing vehicles from Japan.
 * Japanese-styled accordion with expand/collapse functionality.
 * 
 * CUSTOMIZATION:
 * - Update faqItems array with relevant Q&A
 * - Categories can be added for filtering if needed
 */

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "How long does the entire import process take?",
    answer: "The typical timeline is 8-12 weeks from winning a bid to delivery. This includes auction (1-2 weeks), port processing and shipping (4-6 weeks), customs clearance (1-2 weeks), and compliance/delivery (1-2 weeks). We provide tracking and updates throughout the entire journey.",
  },
  {
    question: "What countries can you ship to?",
    answer: "We ship worldwide, with established routes to the USA, Canada, UK, Australia, New Zealand, Ireland, and most European nations. Each country has specific import regulations, and we're experienced in navigating compliance requirements for all major destinations.",
  },
  {
    question: "How do I know the car's condition before bidding?",
    answer: "Our certified inspectors provide comprehensive pre-auction inspection reports. These include 100+ point condition checks, high-resolution photographs (including undercarriage), auction sheet translations, and honest assessments of any issues. You'll know exactly what you're bidding on.",
  },
  {
    question: "What types of vehicles can I import?",
    answer: "Import eligibility depends on your destination country's regulations. Generally, vehicles over 25 years old (USA), 15 years (Canada, Australia), or those meeting specific emissions standards (UK/EU) are eligible. We'll help you understand what's importable to your specific location.",
  },
  {
    question: "What costs are involved in importing a car?",
    answer: "Total costs include: vehicle purchase price, auction fees, our sourcing/inspection fee, domestic Japan transport, export documentation, international shipping, marine insurance, customs duties (varies by country), compliance modifications (if required), and local registration fees. We provide detailed estimates upfront with no hidden charges.",
  },
  {
    question: "How do I pay for the vehicle?",
    answer: "We accept bank wire transfers for all transactions. A deposit is required when you decide to bid on a vehicle, with the balance due upon successful auction. We provide clear payment timelines and assist with international wire transfers if you're unfamiliar with the process.",
  },
  {
    question: "What if the car doesn't pass inspection?",
    answer: "If our inspection reveals issues that don't match your expectations, you're under no obligation to proceed with the bid. We'll discuss the findings and help you decide whether to continue or search for another vehicle. Transparency is our foundation.",
  },
  {
    question: "Do you handle right-hand to left-hand drive conversions?",
    answer: "While we don't perform conversions ourselves, we can connect you with trusted specialists in your country if conversion is required. However, many enthusiasts prefer to keep their JDM vehicles in original right-hand drive configuration.",
  },
  {
    question: "What happens if the car is damaged during shipping?",
    answer: "All shipments include comprehensive marine transit insurance. In the rare event of shipping damage, the insurance covers repair or replacement costs. We document the vehicle's condition before shipping and upon arrival for complete protection.",
  },
  {
    question: "Can I track my vehicle during shipping?",
    answer: "Yes, we provide real-time tracking once your vehicle is loaded onto the vessel. You'll receive updates at key milestones: port departure, estimated arrival, customs clearance, and delivery scheduling. We keep you informed every step of the way.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      {/* Decorative brush stroke top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="block text-primary/40 text-2xl mb-4 font-display">よくある質問</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Everything you need to know about importing your dream car from Japan. Can't find the answer you're looking for? Contact us directly.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group border-shoji bg-card/40 backdrop-blur-sm overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 flex items-start gap-4 text-left hover:bg-card/60 transition-colors duration-200"
              >
                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="flex-grow font-display text-base sm:text-lg text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="px-6 pb-6 pl-15">
                  <div className="pl-9 border-l border-primary/20">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="
              inline-flex items-center gap-2
              py-3 px-6 
              bg-primary/10 hover:bg-primary/20
              border border-primary/30 hover:border-primary/50
              text-primary font-medium
              transition-all duration-200
              uppercase tracking-[0.15em] text-sm
            "
          >
            Contact Us
          </a>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">質問</span>
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

export default FAQ;
