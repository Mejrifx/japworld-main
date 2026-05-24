/**
 * Contact Page
 * 
 * Contact information with WhatsApp integration.
 * Includes business details and direct messaging option.
 */

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Contact = () => {
  const whatsappNumber = "+81705552370"; // Format for WhatsApp link (no spaces or hyphens)
  const displayNumber = "+81 70-5555-2370"; // Format for display
  const whatsappMessage = encodeURIComponent("Hello, I'm interested in importing a vehicle from Japan. Can you help me?");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <span className="block text-primary/40 text-3xl mb-6 font-display">お問い合わせ</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Contact Us
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Have questions? Ready to start your import journey? Get in touch with our team. 
              We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* WhatsApp Contact Card */}
            <div className="border-shoji p-8 sm:p-10 bg-card/40 backdrop-blur-sm relative group hover:bg-card/60 transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" />
              
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-10 h-10 text-[#25D366]" />
                  </div>
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                  Message Us on WhatsApp
                </h2>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Get instant responses to your questions. Chat with our team directly on WhatsApp 
                  for quick, convenient communication about your vehicle import needs.
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-[#25D366]/20 hover:bg-[#25D366]/30 border-2 border-[#25D366]/50 hover:border-[#25D366] text-[#25D366] font-medium transition-all duration-200 uppercase tracking-[0.2em] text-sm group cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Start WhatsApp Chat</span>
                </a>

                <p className="text-muted-foreground/60 text-sm mt-6">
                  Available for quick inquiries and immediate assistance
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                  Contact Details
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1">Email</h3>
                      <a href="mailto:Japworldofficial@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        Japworldofficial@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1">Phone</h3>
                      <a href={`tel:${whatsappNumber}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {displayNumber}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1">Office</h3>
                      <p className="text-muted-foreground">
                        Chiba-ken, Narita-shi<br />
                        Taka 478-1, Japan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/30 text-lg font-display">連絡</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
