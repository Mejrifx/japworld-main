/**
 * Footer Component
 * 
 * Full footer with contact information, business address, and legal links.
 * Japanese-styled with decorative elements.
 * 
 * CUSTOMIZATION:
 * - Update contact details, address, and social links as needed
 * - Add/remove footer sections as required
 */

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import japworldLogo from "@/assets/japworld-logo.png";
import { WHATSAPP_DIGITS, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Services", path: "/services" },
  { label: "Auctions", path: "/auctions" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Footer = () => {

  return (
    <footer className="relative bg-card/50 border-t border-border/50">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img 
              src={japworldLogo} 
              alt="JapWorld" 
              className="h-12 w-auto mb-6 opacity-80"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium Japanese vehicle import services. Bringing Japan's finest automobiles to enthusiasts worldwide with transparency, expertise, and care.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-200"
                style={{ transition: 'all var(--ease-out-strong) 200ms' }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-200"
                style={{ transition: 'all var(--ease-out-strong) 200ms' }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-200"
                style={{ transition: 'all var(--ease-out-strong) 200ms' }}
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary/40 text-sm">リンク</span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary/40 text-sm">連絡先</span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:Japworldofficial@gmail.com" 
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary">Email</div>
                    <div className="text-sm">Japworldofficial@gmail.com</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:+${WHATSAPP_DIGITS}`}
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary">Phone</div>
                    <div className="text-sm">{WHATSAPP_DISPLAY}</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Address</div>
                    <div className="text-sm">
                      Chiba-ken, Narita-shi<br />
                      Taka 478-1, Japan
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary/40 text-sm">更新</span>
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Get import tips, auction updates, and news from JapWorld.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    flex-grow px-4 py-2 
                    bg-background/50 
                    border border-border
                    text-foreground placeholder:text-muted-foreground/50
                    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
                    transition-colors duration-200
                    text-sm
                  "
                />
                <button 
                  className="
                    px-4 py-2 
                    bg-primary/20 hover:bg-primary/30
                    border border-primary/50 hover:border-primary
                    text-primary
                    rounded-lg
                    transition-all duration-200
                    text-sm font-medium
                  "
                  style={{ transition: 'all var(--ease-out-strong) 200ms' }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-muted-foreground/60 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} JapWorld. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground/60 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground/60 hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground/60 hover:text-primary text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Decorative bottom element */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/20" />
            <span className="text-primary/30 text-xs font-display">日本から世界へ</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/20" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
