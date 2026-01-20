/**
 * Testimonials Page
 * 
 * Client testimonials and success stories with detailed reviews
 * and ratings. Japanese-styled design with animations.
 */

import { Quote, Star, MapPin, Car } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const testimonials = [
  {
    quote: "JapWorld made importing my R34 GT-R an absolute breeze. The inspection report was incredibly detailed—I knew exactly what I was bidding on. The car arrived in even better condition than I expected. The team's communication was excellent throughout the entire process.",
    author: "Marcus D.",
    location: "California, USA",
    vehicle: "1999 Nissan Skyline R34 GT-R",
    rating: 5,
  },
  {
    quote: "After getting burned by another importer, I was skeptical. JapWorld's transparency changed everything. Regular updates, honest assessments, and zero surprises. My 180SX is perfect and exactly as described. Highly recommend!",
    author: "James T.",
    location: "Melbourne, Australia",
    vehicle: "1996 Nissan 180SX Type X",
    rating: 5,
  },
  {
    quote: "The team helped me find a pristine MX-5 that I'd been searching for years. Their knowledge of Japanese auctions and attention to detail is unmatched. The entire process was smooth from start to finish.",
    author: "Elena K.",
    location: "London, UK",
    vehicle: "1994 Mazda MX-5 V-Special",
    rating: 5,
  },
  {
    quote: "From the first email to delivery, the communication was exceptional. They explained every step of the process and handled all the compliance paperwork. Couldn't be happier with my Supra.",
    author: "David R.",
    location: "Toronto, Canada",
    vehicle: "1997 Toyota Supra RZ-S",
    rating: 5,
  },
  {
    quote: "I imported a Land Cruiser for my business, and JapWorld made it seamless. The cost calculator was accurate, shipping was on time, and the vehicle was exactly as described. Professional service throughout.",
    author: "Sarah M.",
    location: "Auckland, New Zealand",
    vehicle: "2015 Toyota Land Cruiser",
    rating: 5,
  },
  {
    quote: "As a first-time importer, I had many questions. The team was patient, knowledgeable, and always available. My RX-7 arrived in perfect condition, and I'm already planning my next import with them.",
    author: "Michael P.",
    location: "Dublin, Ireland",
    vehicle: "1995 Mazda RX-7 FD3S",
    rating: 5,
  },
];

const stats = [
  { value: "500+", label: "Vehicles Imported", subtitle: "成功" },
  { value: "25+", label: "Countries Served", subtitle: "世界" },
  { value: "98%", label: "Client Satisfaction", subtitle: "満足" },
  { value: "15+", label: "Years Experience", subtitle: "経験" },
];

const Testimonials = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">お客様の声</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Client Testimonials
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Real stories from real clients. See what our customers have to say 
              about their import experience with JapWorld.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border-shoji p-6 bg-card/40 backdrop-blur-sm text-center hover:bg-card/60 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary/40 text-sm mb-2 font-display">{stat.subtitle}</div>
                <div className="font-display text-3xl sm:text-4xl text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
                  {testimonial.quote}
                </p>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="font-display text-foreground mb-2">{testimonial.author}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{testimonial.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary/60">
                    <Car className="w-4 h-4" />
                    <span>{testimonial.vehicle}</span>
                  </div>
                </div>
              </div>
            ))}
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

export default Testimonials;
