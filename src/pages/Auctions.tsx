/**
 * Auctions Page
 * 
 * Auction search and listing page with search functionality
 * and auction information.
 */

import { Search, Filter, Calendar, MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const auctionHouses = [
  {
    name: "USS Tokyo",
    location: "Tokyo, Japan",
    description: "Japan's largest used car auction house with over 10,000 vehicles weekly.",
    specialties: ["Sports Cars", "Luxury Vehicles", "JDM Classics"],
  },
  {
    name: "JAA Nagoya",
    location: "Nagoya, Japan",
    description: "Major auction facility specializing in high-grade vehicles and rare models.",
    specialties: ["Premium Models", "Low Mileage", "Collector Cars"],
  },
  {
    name: "CAA Osaka",
    location: "Osaka, Japan",
    description: "Western Japan's premier auction house with extensive inventory.",
    specialties: ["Daily Drivers", "Commercial Vehicles", "Kei Cars"],
  },
];

const Auctions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">競売検索</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Japanese Auctions
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Access Japan's premier auction houses. Search thousands of vehicles, set alerts, 
              and find your perfect car.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="border-shoji p-6 bg-card/40 backdrop-blur-sm relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by make, model, year..."
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <button className="px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary text-primary font-medium transition-all duration-200 uppercase tracking-[0.15em] text-sm">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Houses */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
              Major Auction Houses
            </h2>
            <p className="text-muted-foreground">We have access to all major Japanese auction facilities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {auctionHouses.map((house, index) => (
              <div
                key={index}
                className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300"
              >
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl sm:text-2xl text-foreground">{house.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{house.location}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{house.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm text-primary/60 uppercase tracking-widest mb-2">Specialties</div>
                  {house.specialties.map((specialty, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="border-shoji p-8 sm:p-12 bg-card/40 backdrop-blur-sm relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
            
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-8 text-center">
              Auction Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Advanced Search</h3>
                  <p className="text-muted-foreground text-sm">
                    Filter by make, model, year, mileage, grade, and price range. Find exactly what you're looking for.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Live Auctions</h3>
                  <p className="text-muted-foreground text-sm">
                    Browse upcoming auctions and view live bidding. Never miss an opportunity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Filter className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Smart Filters</h3>
                  <p className="text-muted-foreground text-sm">
                    Grade ratings, condition reports, and detailed vehicle information at your fingertips.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Auction Alerts</h3>
                  <p className="text-muted-foreground text-sm">
                    Set up personalized alerts for your dream car. Get notified when matching vehicles appear.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">探索</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </section>
    </PageLayout>
  );
};

export default Auctions;
