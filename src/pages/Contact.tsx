/**
 * Contact Page
 * 
 * Contact form and business information with Japanese-styled design.
 * Includes contact form, business details, and location information.
 */

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            {/* Contact Form */}
            <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
              
              <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="import">Import Question</option>
                    <option value="quote">Request Quote</option>
                    <option value="existing">Existing Order</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="
                    w-full py-4 px-8
                    bg-primary/20 hover:bg-primary/30
                    border border-primary/50 hover:border-primary
                    text-primary font-medium
                    transition-all duration-200
                    uppercase tracking-[0.2em] text-sm
                    flex items-center justify-center gap-3
                    group
                  "
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="border-shoji p-6 sm:p-8 bg-card/40 backdrop-blur-sm relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
                
                <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                  Get In Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1">Email</h3>
                      <a href="mailto:info@japworld.com" className="text-muted-foreground hover:text-primary transition-colors">
                        info@japworld.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (234) 567-8900
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
                        Tokyo, Japan<br />
                        London, UK<br />
                        Los Angeles, USA
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
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
