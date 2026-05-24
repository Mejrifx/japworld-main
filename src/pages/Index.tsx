/**
 * Index Page - JapWorld Homepage
 *
 * Public marketing homepage. Client/admin portals use Supabase auth separately.
 */

import { Link } from "react-router-dom";
import japworldBg from "@/assets/japworld-bg.png";
import japworldLogo from "@/assets/japworld-logo.png";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  ShoppingCart, 
  DollarSign, 
  Eye, 
  Shield, 
  CheckCircle,
  Users,
  Plane,
  TrendingUp,
  Package,
  Clock,
  FileCheck,
  Star,
  Award,
  Handshake,
  Phone,
  Truck,
  AlertTriangle,
  Target
} from "lucide-react";

const Index = () => {
  const whyImportFeatures = [
    {
      icon: ShoppingCart,
      title: "Buy Direct From Japanese Auctions",
      features: [
        "Access thousands of vehicles daily",
        "Purchase vehicles at true market prices",
        "Avoid dealer markups and unnecessary middlemen",
        "Choose the exact vehicle specifications you want"
      ]
    },
    {
      icon: DollarSign,
      title: "Save Money",
      features: [
        "Reduced shipping and import costs",
        "Small fixed service fee",
        "No hidden commissions or inflated auction pricing",
        "Better value compared to buying locally"
      ]
    },
    {
      icon: Eye,
      title: "Full Transparency",
      features: [
        "Honest vehicle condition reports",
        "Verified auction sheets",
        "Genuine mileage and specifications",
        "Professional guidance throughout the process"
      ]
    }
  ];

  const whyChooseUs = [
    { icon: Award, title: "25+ Years Experience", desc: "Thousands of vehicles sourced and exported worldwide" },
    { icon: Shield, title: "Honest & Transparent Service", desc: "Fixed service fee with no hidden costs" },
    { icon: Target, title: "Auction Expertise", desc: "Direct auction member access with real market pricing" },
    { icon: Eye, title: "Reliable Inspection Team", desc: "Professional agents physically inspect vehicles" },
    { icon: Clock, title: "Streamlined Export Process", desc: "Fast paperwork handling and efficient coordination" },
    { icon: Truck, title: "Discounted Shipping Rates", desc: "Cost-effective shipping services saving you money" },
    { icon: Phone, title: "Customer Service", desc: "Fast, detailed, and honest communication" },
    { icon: Handshake, title: "Long-Term Relationships", desc: "We value repeat business and partnership growth" }
  ];

  const vehicleTypes = [
    "JDM performance cars",
    "SUVs",
    "Commercial vans",
    "Kei trucks",
    "Hybrid vehicles",
    "Luxury vehicles",
    "Dealership stock units",
    "Classic Japanese cars",
    "Modified cars",
    "Trucks and machinery"
  ];

  const commonRisks = [
    "Odometer tampering",
    "Fake auction reports",
    "Hidden accident history",
    "Incorrect vehicle specifications",
    "Inflated pricing",
    "Poor-quality repairs",
    "Shipping scams"
  ];

  const dealerBenefits = [
    "Access to clean auction-grade stock",
    "Better profit margins through direct sourcing",
    "Reliable long-term supply",
    "Accurate condition reporting",
    "Reduced risk of purchasing poor-quality vehicles",
    "Fast communication and streamlined logistics"
  ];

  return (
    <>
      <Navigation />

      <main className="relative w-full">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${japworldBg})` }}
          />
          <div className="absolute inset-0 bg-overlay" />
          
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">
            <div className="animate-slide-up-fade w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src={japworldLogo}
                alt="JapWorld - Japanese Vehicle Import & Export Services"
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
            
            <div className="animate-fade-in-delayed mt-6 sm:mt-8 md:mt-10 text-center px-2 max-w-4xl">
              <h1 className="text-primary text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-relaxed mb-4">
                Japanese Vehicle Import & Export Services
              </h1>
              <p className="text-foreground text-xl sm:text-2xl md:text-3xl font-display mb-6">
                Your Trusted Japan Vehicle Import Partner
              </p>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                We provide a reliable, transparent, and cost-effective service for importing vehicles directly from Japan.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                As a licensed import and export agent with over 25 years of experience in the Japanese automotive industry, 
                we work on your side from start to finish, ensuring a smooth, secure, and professional process every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Why Import Direct From Japan */}
        <section className="relative py-16 sm:py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Why Import Direct From Japan?
              </h2>
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {whyImportFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                    
                    <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4">
                      {feature.title}
                    </h3>
                    
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process - Link to dedicated page */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300 text-center">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" />
              
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Our Process
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                From auction bidding and vehicle inspections to shipping, export documentation, and import procedures, 
                we manage the entire process for you.
              </p>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary text-primary font-medium transition-all duration-200 uppercase tracking-[0.2em] text-sm group"
              >
                <span>View Our 5-Step Process</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* B2B Dealership Focus */}
        <section className="relative py-16 sm:py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-sm uppercase tracking-wider">
                B2B Specialization
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                Supporting Dealers & Trade Partners Worldwide
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                While we also assist private buyers, our main focus is supplying dealerships, traders, and automotive 
                businesses with clean, high-quality vehicles from Japan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
              <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">We Work With</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {["Car dealerships", "Import businesses", "Vehicle traders", "Export partners", "Fleet buyers"].map((type, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">Benefits for Dealers</h3>
                </div>
                
                <ul className="space-y-3">
                  {dealerBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-lg italic">
                Our purpose is to build clients for life — not one-time transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Attend Auctions */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-card/20" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl text-foreground">
                    Attend Japanese Auctions With Us
                  </h2>
                  <p className="text-primary/60 text-sm mt-1">Visit Japan & Experience The Auctions First-Hand</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                We offer overseas buyers the opportunity to visit Japan and experience the vehicle auction process 
                personally through our company.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-display text-lg text-foreground mb-3">What We Offer</h4>
                  <ul className="space-y-2">
                    {[
                      "Meet our team in Japan",
                      "Attend live vehicle auctions",
                      "Inspect vehicles in person",
                      "Bid on your own vehicles",
                      "Learn how Japanese auctions operate",
                      "Build long-term business relationships"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-lg text-foreground mb-3">Ideal For</h4>
                  <ul className="space-y-2">
                    {[
                      "Dealers wanting direct industry exposure",
                      "Serious importers",
                      "Investors entering the automotive trade",
                      "Buyers wanting complete confidence"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground italic text-center">
                We believe strong business relationships are built face-to-face, and we welcome clients who wish 
                to experience the process themselves.
              </p>
            </div>
          </div>
        </section>

        {/* Avoid Common Risks */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Avoid Common Import Risks
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Unfortunately, the international vehicle trade contains many dishonest operators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                  <h3 className="font-display text-xl text-foreground">Common Industry Issues</h3>
                </div>
                
                <ul className="space-y-2">
                  {commonRisks.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                  <h3 className="font-display text-xl text-foreground">Our Experience Helps You Avoid</h3>
                </div>
                
                <ul className="space-y-2">
                  {[
                    "Purchasing accident-damaged vehicles",
                    "Buying cars with false mileage",
                    "Overpaying auction or shipping costs",
                    "Import compliance issues",
                    "Customs and quarantine problems",
                    "Receiving the wrong vehicle — or no vehicle at all"
                  ].map((protection, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{protection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Clients Choose Us */}
        <section className="relative py-16 sm:py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Why Clients Choose Us
              </h2>
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={index}
                    className="border-shoji p-6 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300 cursor-pointer text-center"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
                    
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="font-display text-lg text-foreground mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vehicle Types We Source */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-card/20" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Vehicle Types We Source
              </h2>
              <p className="text-muted-foreground text-lg">
                We can supply everything from performance cars to commercial vehicles
              </p>
            </div>

            <div className="border-shoji p-8 sm:p-10 bg-card/40 backdrop-blur-sm relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {vehicleTypes.map((type, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 bg-background/40 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-200 cursor-pointer group"
                  >
                    <Package className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment + CTA */}
        <section className="relative py-16 sm:py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="border-shoji p-8 sm:p-10 md:p-12 bg-card/40 backdrop-blur-sm relative text-center">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" />
              
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                Our Commitment
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                We understand how important trust is when purchasing vehicles internationally.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
                {[
                  "Supply quality vehicles",
                  "Protect clients from unnecessary risks",
                  "Provide honest advice",
                  "Deliver reliable service every time"
                ].map((commitment, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{commitment}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-lg mb-8 italic">
                Whether you are importing your first vehicle or managing a large dealership inventory, we are here 
                to make the process smooth, transparent, and profitable.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary text-primary font-medium transition-all duration-200 uppercase tracking-[0.2em] text-sm group"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
