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
import { HeroFallingPetals } from "@/components/HeroFallingPetals";
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
        {/* Hero Section - Refined & Premium */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${japworldBg})` }}
          />
          <div className="absolute inset-0 bg-overlay" />
          <HeroFallingPetals />

          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">
            <div className="animate-slide-up-fade w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src={japworldLogo}
                alt="JapWorld - Japanese Vehicle Import & Export Services"
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
            
            <div className="animate-fade-in mt-8 sm:mt-10 md:mt-12 w-full max-w-3xl px-4 sm:px-6">
              <div className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl px-8 py-10 sm:px-12 sm:py-12 text-center shadow-2xl">
                {/* Primary headline - No eyebrow (following design-taste-frontend eyebrow restraint) */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 text-balance">
                  Your Trusted Japan Vehicle Import Partner
                </h1>

                {/* Lead line */}
                <p className="text-lg sm:text-xl text-foreground/85 font-medium leading-relaxed mb-5 max-w-2xl mx-auto text-pretty">
                  Reliable, transparent, and cost-effective service for importing vehicles directly from Japan.
                </p>

                {/* Supporting copy */}
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 text-pretty">
                  As a licensed import and export agent with over 25 years of experience in the Japanese automotive industry,
                  we work on your side from start to finish.
                </p>
                
                {/* CTA buttons with Emil-style interactions */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/how-it-works"
                    className="btn-primary group"
                  >
                    <span>Explore Our Process</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-secondary group"
                  >
                    <span>Get In Touch</span>
                    <Phone className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Import Direct From Japan - Asymmetric Feature Grid */}
        <section className="relative py-20 sm:py-32 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight text-balance">
                Why Import Direct From Japan?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Access the world's premier automotive market with transparency, expertise, and unmatched value.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {whyImportFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group border-shoji p-8 sm:p-10 bg-card/50 backdrop-blur-sm relative hover:bg-card/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'scale-in 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards',
                      opacity: 0
                    }}
                  >
                    <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-primary" />
                    <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-primary" />
                    
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-5 tracking-tight">
                      {feature.title}
                    </h3>
                    
                    <ul className="space-y-3.5">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process - Centered Feature Block */}
        <section className="relative py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="border-shoji p-10 sm:p-12 md:p-16 bg-card/50 backdrop-blur-xl relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 text-center">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight text-balance">
                Our Process
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
                From auction bidding and vehicle inspections to shipping, export documentation, and import procedures, 
                we manage the entire journey for you.
              </p>
              <Link
                to="/how-it-works"
                className="btn-primary group"
              >
                <span>View Our 5-Step Process</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* B2B Dealership Focus - Split Layout with Badge (using 1 eyebrow per brief allowance) */}
        <section className="relative py-20 sm:py-32 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16 sm:mb-20">
              <div className="inline-block mb-6 px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest font-semibold rounded-full">
                B2B Specialization
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-8 tracking-tight text-balance">
                Supporting Dealers & Trade Partners Worldwide
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-pretty">
                While we also assist private buyers, our main focus is supplying dealerships, traders, and automotive 
                businesses with clean, high-quality vehicles from Japan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
              <div className="border-shoji p-8 sm:p-10 bg-card/50 backdrop-blur-sm relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">We Work With</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {["Car dealerships", "Import businesses", "Vehicle traders", "Export partners", "Fleet buyers"].map((type, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm sm:text-base">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-shoji p-8 sm:p-10 bg-card/50 backdrop-blur-sm relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">Benefits for Dealers</h3>
                </div>
                
                <ul className="space-y-4">
                  {dealerBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-lg sm:text-xl italic font-medium">
                Our purpose is to build clients for life, not one-time transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Attend Auctions - Full-Width Feature Block */}
        <section className="relative py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-muted/10" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="border-shoji p-10 sm:p-12 md:p-16 bg-card/50 backdrop-blur-xl relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Plane className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 tracking-tight">
                    Attend Japanese Auctions With Us
                  </h2>
                  <p className="text-primary text-base sm:text-lg font-medium">Visit Japan & Experience The Auctions First-Hand</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg sm:text-xl mb-10 text-pretty">
                We offer overseas buyers the opportunity to visit Japan and experience the vehicle auction process 
                personally through our company.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 mb-10">
                <div>
                  <h4 className="font-display text-xl sm:text-2xl text-foreground mb-5 tracking-tight">What We Offer</h4>
                  <ul className="space-y-3.5">
                    {[
                      "Meet our team in Japan",
                      "Attend live vehicle auctions",
                      "Inspect vehicles in person",
                      "Bid on your own vehicles",
                      "Learn how Japanese auctions operate",
                      "Build long-term business relationships"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-xl sm:text-2xl text-foreground mb-5 tracking-tight">Ideal For</h4>
                  <ul className="space-y-3.5">
                    {[
                      "Dealers wanting direct industry exposure",
                      "Serious importers",
                      "Investors entering the automotive trade",
                      "Buyers wanting complete confidence"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                        <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground text-lg sm:text-xl italic text-center font-medium">
                We believe strong business relationships are built face-to-face, and we welcome clients who wish 
                to experience the process themselves.
              </p>
            </div>
          </div>
        </section>

        {/* Avoid Common Risks - Contrast Split Layout */}
        <section className="relative py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-background" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight text-balance">
                Avoid Common Import Risks
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto text-pretty">
                Unfortunately, the international vehicle trade contains many dishonest operators. Our experience protects you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="border-shoji p-8 sm:p-10 bg-card/50 backdrop-blur-sm relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-red-500/50 group-hover:border-red-500 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-red-500/50 group-hover:border-red-500 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-all duration-300">
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">Common Industry Issues</h3>
                </div>
                
                <ul className="space-y-3.5">
                  {commonRisks.map((risk, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                      <span className="leading-relaxed">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-shoji p-8 sm:p-10 bg-card/50 backdrop-blur-sm relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">How We Protect You</h3>
                </div>
                
                <ul className="space-y-3.5">
                  {[
                    "Purchasing accident-damaged vehicles",
                    "Buying cars with false mileage",
                    "Overpaying auction or shipping costs",
                    "Import compliance issues",
                    "Customs and quarantine problems",
                    "Receiving the wrong vehicle or no vehicle at all"
                  ].map((protection, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{protection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Clients Choose Us - 4-Column Grid */}
        <section className="relative py-20 sm:py-32 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight text-balance">
                Why Clients Choose Us
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Decades of experience, proven reliability, and an unwavering commitment to transparency.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {whyChooseUs.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={index}
                    className="border-shoji p-7 sm:p-8 bg-card/50 backdrop-blur-sm relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
                    style={{ 
                      animationDelay: `${index * 75}ms`,
                      animation: 'scale-in 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards',
                      opacity: 0
                    }}
                  >
                    <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-primary" />
                    <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-primary" />
                    
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-3 tracking-tight">{reason.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{reason.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vehicle Types We Source - Compact Grid */}
        <section className="relative py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-muted/10" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight text-balance">
                Vehicle Types We Source
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto text-pretty">
                From performance legends to commercial workhorses, we source exactly what you need.
              </p>
            </div>

            <div className="border-shoji p-10 sm:p-12 bg-card/50 backdrop-blur-xl relative group hover:bg-card/70 hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
              <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-5 group-hover:h-5 transition-all duration-300" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-5">
                {vehicleTypes.map((type, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-4 bg-background/60 hover:bg-primary/10 border border-border/50 hover:border-primary/40 transition-all duration-200 cursor-pointer group rounded-lg"
                  >
                    <Package className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment + CTA - Final Premium Block */}
        <section className="relative py-20 sm:py-32 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-background" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="border-shoji p-10 sm:p-12 md:p-16 bg-card/50 backdrop-blur-xl relative text-center group hover:bg-card/70 hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/50 group-hover:border-primary group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-8 tracking-tight text-balance">
                Our Commitment
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-pretty">
                We understand how important trust is when purchasing vehicles internationally. That's why we've built our reputation on unwavering integrity.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-12 text-left max-w-2xl mx-auto">
                {[
                  "Supply quality vehicles",
                  "Protect clients from unnecessary risks",
                  "Provide honest advice",
                  "Deliver reliable service every time"
                ].map((commitment, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <FileCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-base sm:text-lg leading-relaxed">{commitment}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-lg sm:text-xl mb-10 italic font-medium max-w-3xl mx-auto text-pretty">
                Whether you're importing your first vehicle or managing a large dealership inventory, we're here 
                to make the process smooth, transparent, and profitable.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="btn-primary group"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="btn-secondary group"
                >
                  <span>View All Services</span>
                  <Eye className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
