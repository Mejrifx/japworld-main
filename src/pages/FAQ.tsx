/**
 * FAQ Page
 * 
 * Comprehensive FAQ page with expandable questions
 * and detailed answers about the import process.
 */

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

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
  {
    question: "What is an auction grade and how does it work?",
    answer: "Japanese auctions use a grading system (typically 0-6, with 6 being the best) to rate vehicle condition. Grade 6 means excellent condition, Grade 5 is very good, Grade 4 is good, and so on. Lower grades may indicate accidents, repairs, or wear. We'll explain each grade and what it means for your specific vehicle.",
  },
  {
    question: "Do you offer financing or payment plans?",
    answer: "We don't offer financing directly, but we can work with your timeline for payments. Typically, a deposit is required to secure bidding, with the balance due after successful auction. We're happy to discuss payment arrangements that work for your situation.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">よくある質問</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about importing your dream car from Japan. 
              Can't find the answer you're looking for? Contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="group border-shoji bg-card/40 backdrop-blur-sm overflow-hidden hover:bg-card/60 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 flex items-start gap-4 text-left transition-colors duration-200"
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
            <div className="border-shoji p-8 bg-card/40 backdrop-blur-sm relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <p className="text-muted-foreground mb-6 text-lg">
                Still have questions?
              </p>
              <Link
                to="/contact"
                className="
                  inline-flex items-center gap-3
                  py-4 px-8 
                  bg-primary/20 hover:bg-primary/30
                  border border-primary/50 hover:border-primary
                  text-primary font-medium
                  transition-all duration-200
                  uppercase tracking-[0.2em] text-sm
                  group
                "
              >
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="text-primary/30 text-lg font-display">質問</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQ;
