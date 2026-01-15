/**
 * Navigation Component
 * 
 * Sticky top navigation with Japanese-styled design.
 * Links: About Us, How It Works, Services, Auctions, Cost Calculator, FAQ, Testimonials, Contact
 * 
 * CUSTOMIZATION:
 * - Modify navLinks array to add/remove/reorder navigation items
 * - Adjust scroll offset in scrollToSection if header height changes
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import japworldLogo from "@/assets/japworld-logo.png";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Auctions", href: "#auctions" },
  { label: "Cost Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, "#hero")}
              className="flex-shrink-0"
            >
              <img 
                src={japworldLogo} 
                alt="JapWorld" 
                className="h-8 sm:h-10 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="
                    px-3 py-2 text-sm font-medium
                    text-muted-foreground hover:text-primary
                    transition-colors duration-200
                    relative group
                  "
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all duration-200 group-hover:w-3/4" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden absolute top-full left-0 right-0
            bg-background/98 backdrop-blur-md
            border-b border-border/50
            transition-all duration-300 overflow-hidden
            ${isMobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="
                    px-4 py-3 text-base font-medium
                    text-muted-foreground hover:text-primary hover:bg-primary/5
                    transition-colors duration-200
                    border-l-2 border-transparent hover:border-primary
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-0" />
    </>
  );
};

export default Navigation;
