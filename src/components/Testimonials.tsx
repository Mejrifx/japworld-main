/**
 * Testimonials / Social Proof Component
 * 
 * Client testimonials and success stories with Japanese-styled cards.
 * 
 * CUSTOMIZATION:
 * - Update testimonials array with real client feedback
 * - Add actual client photos when available
 */

import { Quote, Star, MapPin, Car } from "lucide-react";

const testimonials = [
  {
    quote: "JapWorld made importing my R34 GT-R an absolute breeze. The inspection report was incredibly detailed—I knew exactly what I was bidding on. The car arrived in even better condition than I expected.",
    author: "Marcus D.",
    location: "California, USA",
    vehicle: "1999 Nissan Skyline R34 GT-R",
    rating: 5,
  },
  {
    quote: "After getting burned by another importer, I was skeptical. JapWorld's transparency changed everything. Regular updates, honest assessments, and zero surprises. My 180SX is perfect.",
    author: "James T.",
    location: "Melbourne, Australia",
    vehicle: "1996 Nissan 180SX Type X",
    rating: 5,
  },
  {
    quote: "The team helped me find a pristine MX-5 that I'd been searching for years. Their knowledge of Japanese auctions and attention to detail is unmatched. Highly recommended.",
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
];

const stats = [
  { value: "500+", label: "Vehicles Imported" },
  { value: "25+", label: "Countries Served" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Years Experience" },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Decorative brush stroke top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="block text-primary/40 text-2xl mb-4 font-display">お客様の声</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            Client Stories
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Don't just take our word for it. Here's what our clients have to say about their JapWorld experience.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-16 sm:mb-20">
          <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl sm:text-4xl text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300"
            >
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed text-base sm:text-lg mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author info */}
              <div className="border-t border-border/50 pt-4">
                <div className="font-display text-lg text-foreground mb-2">
                  {testimonial.author}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{testimonial.location}</span>
                  </div>
                  <span className="hidden sm:inline text-primary/30">|</span>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    <span>{testimonial.vehicle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">実績</span>
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

export default Testimonials;
