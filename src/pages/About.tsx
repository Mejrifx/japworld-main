/**
 * About Page
 * 
 * Comprehensive about page with detailed company information,
 * mission, values, and team. Features Japanese-styled design
 * with animations and interactive elements.
 */

import { useEffect, useState } from "react";
import { Shield, Globe, Car, CheckCircle, Users, Award, Target, Heart, TrendingUp, Package, User, FileText, Handshake, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparent pricing, honest assessments, and ethical business practices in every transaction.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Meticulous attention to detail in vehicle inspection, documentation, and logistics coordination.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Genuine love for Japanese automotive culture drives our commitment to excellence.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuous improvement and dedication to delivering the highest quality service.",
    },
  ];

  const stats = [
    { number: "1000+", label: "Vehicles Exported", subtitle: "成功" },
    { number: "60,000+", label: "Cars Weekly", subtitle: "選択" },
    { number: "25+", label: "Years Experience", subtitle: "経験" },
    { number: "100%", label: "Transparency", subtitle: "信頼" },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="block text-primary/40 text-3xl mb-6 font-display">会社概要</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              About JapWorld
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Licensed import and export agents with over 25 years of experience in the Japanese automotive industry. 
              We work on your side from start to finish — reliable, transparent, and professional.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`
                  border-shoji p-6 bg-card/40 backdrop-blur-sm text-center
                  transition-all duration-700 delay-${index * 100}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  hover:bg-card/60 hover:scale-105
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-primary/40 text-sm mb-2 font-display">{stat.subtitle}</div>
                <div className="font-display text-3xl sm:text-4xl text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground">Who We Are</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                As a licensed import and export agent with over 25 years of experience in the Japanese 
                automotive industry, we provide a reliable, transparent, and cost-effective service for 
                importing vehicles directly from Japan.
              </p>
              <p>
                While we also assist private buyers, our main focus is supplying dealerships, traders, 
                and automotive businesses with clean, high-quality vehicles from Japan. We work closely 
                with car dealerships, import businesses, vehicle traders, export partners, and fleet buyers.
              </p>
              <p>
                From auction bidding and vehicle inspections to shipping, export documentation, and import 
                procedures, we manage the entire process for you. Our experienced auction team physically 
                attends major Japanese auctions and personally inspects vehicles before bidding.
              </p>
              <p>
                Our purpose is to build clients for life — not one-time transactions. We believe 
                transparency saves our clients time, stress, and money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="block text-primary/40 text-2xl mb-4 font-display">価値観</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              Our Values
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Japan Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground">Why Import from Japan</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
              <p>
                Japan's automotive market is unique in the world. The country's strict vehicle 
                inspection system (Shaken) ensures that every vehicle on the road meets rigorous 
                safety and emissions standards. This, combined with Japan's culture of meticulous 
                vehicle care, results in used cars that are often in exceptional condition.
              </p>
              <p>
                We provide access to over 60,000 vehicles weekly from Japanese auctions. From rare 
                JDM legends to practical daily drivers, we help you purchase vehicles at true market 
                prices while avoiding dealer markups and unnecessary middlemen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Access thousands of vehicles daily",
                "True market pricing from auctions",
                "Verified auction sheets and condition reports",
                "Genuine mileage and specifications",
                "Exceptional maintenance culture in Japan",
                "Complete service history documentation",
                "Professional inspection before purchase",
                "Transparent pricing with no hidden fees"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Partnership Program */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <span className="block text-primary/40 text-2xl mb-4 font-display">B2B パートナーシップ</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              Dealer Partnership Program
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

          <div className="border-shoji p-8 sm:p-10 bg-card/40 backdrop-blur-sm relative mb-8">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
            
            <p className="text-muted-foreground text-lg text-center mb-8">
              Our goal is to build long-term partnerships that increase your profit margins while 
              consistently delivering quality vehicles your customers can trust.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "Priority Sourcing", desc: "Fast-track access to auction vehicles" },
                { icon: TrendingUp, title: "Volume Pricing Support", desc: "Better rates for regular partners" },
                { icon: Package, title: "Stock Sourcing Assistance", desc: "Help finding specific inventory" },
                { icon: MessageCircle, title: "Fast Communication", desc: "Dedicated response channels" },
                { icon: User, title: "Account Management", desc: "Personal point of contact" },
                { icon: Handshake, title: "Long-Term Focus", desc: "Building lasting relationships" },
                { icon: FileText, title: "Stock Profiling", desc: "Assistance with specific requirements" }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-background/40 hover:bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-lg italic mb-6">
              We understand what dealerships need: clean inventory, reliable turnaround times, competitive 
              landed costs, consistency, and trust.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary text-primary font-medium transition-all duration-200 uppercase tracking-[0.2em] text-sm group"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground">
                Trust, Transparency & Worldwide Delivery
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                We believe transparency builds trust. Every vehicle we source comes with detailed 
                inspection reports featuring high-resolution photography of every angle, condition 
                assessments, and honest evaluations. You'll know exactly what you're buying before 
                you commit.
              </p>
              <p>
                Our pricing is clear and comprehensive—no hidden fees, no surprises. You'll receive 
                a complete cost breakdown including purchase price, shipping, duties, taxes, and our 
                service fees upfront.
              </p>
              <p>
                Real-time tracking keeps you informed throughout the entire journey. From auction 
                win to port departure, ocean transit, customs clearance, and final delivery, you'll 
                have visibility into every stage.
              </p>
              <p>
                Our worldwide delivery network spans North America, Europe, Australia, New Zealand, 
                the Middle East, and beyond. Wherever you are, we can deliver your dream car from Japan.
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
      </section>
    </PageLayout>
  );
};

export default About;
