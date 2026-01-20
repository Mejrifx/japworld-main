/**
 * Cost Calculator Page
 * 
 * Interactive cost calculator for estimating total import costs
 * with Japanese-styled design and animations.
 */

import { Calculator, DollarSign, Ship, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const Calculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [destination, setDestination] = useState("usa");
  const [shippingType, setShippingType] = useState("roro");

  const destinations = {
    usa: { name: "United States", duty: 2.5, tax: 0 },
    canada: { name: "Canada", duty: 6.1, tax: 13 },
    uk: { name: "United Kingdom", duty: 10, tax: 20 },
    australia: { name: "Australia", duty: 0, tax: 10 },
  };

  const shippingCosts = {
    roro: { name: "RoRo Shipping", cost: 1200 },
    container: { name: "Container Shipping", cost: 2500 },
  };

  const calculateCosts = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const dest = destinations[destination as keyof typeof destinations];
    const shipping = shippingCosts[shippingType as keyof typeof shippingCosts];
    
    const auctionFee = price * 0.03; // 3% auction fee
    const serviceFee = price * 0.08; // 8% service fee
    const japanTransport = 300;
    const exportDocs = 200;
    const shippingCost = shipping.cost;
    const insurance = shippingCost * 0.01; // 1% of shipping
    const duty = price * (dest.duty / 100);
    const tax = (price + duty) * (dest.tax / 100);
    const compliance = destination === "usa" ? 0 : 500;
    const registration = 200;

    const total = price + auctionFee + serviceFee + japanTransport + exportDocs + 
                  shippingCost + insurance + duty + tax + compliance + registration;

    return {
      vehiclePrice: price,
      auctionFee,
      serviceFee,
      japanTransport,
      exportDocs,
      shippingCost,
      insurance,
      duty,
      tax,
      compliance,
      registration,
      total,
    };
  };

  const costs = calculateCosts();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">費用計算</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Cost Calculator
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Estimate the total cost of importing your dream car from Japan. 
              Get a detailed breakdown of all fees and charges.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary" />
                Enter Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Vehicle Purchase Price (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(e.target.value)}
                      placeholder="25000"
                      className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Destination Country
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    {Object.entries(destinations).map(([key, dest]) => (
                      <option key={key} value={key}>{dest.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Shipping Method
                  </label>
                  <select
                    value={shippingType}
                    onChange={(e) => setShippingType(e.target.value)}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    {Object.entries(shippingCosts).map(([key, ship]) => (
                      <option key={key} value={key}>{ship.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                Cost Breakdown
              </h2>
              
              {vehiclePrice ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Vehicle Price</span>
                    <span>${costs.vehiclePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Auction Fee (3%)</span>
                    <span>${costs.auctionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service Fee (8%)</span>
                    <span>${costs.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Japan Transport</span>
                    <span>${costs.japanTransport.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Export Documentation</span>
                    <span>${costs.exportDocs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>${costs.shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Insurance</span>
                    <span>${costs.insurance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Duty ({destinations[destination as keyof typeof destinations].duty}%)</span>
                    <span>${costs.duty.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax ({destinations[destination as keyof typeof destinations].tax}%)</span>
                    <span>${costs.tax.toLocaleString()}</span>
                  </div>
                  {costs.compliance > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Compliance Modifications</span>
                      <span>${costs.compliance.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Registration</span>
                    <span>${costs.registration.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-display text-xl text-foreground">Total Estimated Cost</span>
                      <span className="font-display text-2xl text-primary">${costs.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Enter vehicle price to calculate costs</p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 border-shoji p-6 bg-card/20 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground text-center">
              * This is an estimate. Final costs may vary based on actual vehicle price, 
              exchange rates, shipping routes, and destination-specific requirements. 
              Contact us for a detailed quote.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">計算</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </section>
    </PageLayout>
  );
};

export default Calculator;
