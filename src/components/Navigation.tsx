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
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity: starts at 0.15 at top, reaches 0.95 at 100px scroll
  const calculateOpacity = () => {
    const maxScroll = 100; // Full opacity reached at 100px
    const minOpacity = 0.15; // Minimum opacity at top
    const maxOpacity = 0.95; // Maximum opacity when scrolled
    
    if (scrollY <= 0) return minOpacity;
    if (scrollY >= maxScroll) return maxOpacity;
    
    // Linear interpolation
    const ratio = scrollY / maxScroll;
    return minOpacity + (maxOpacity - minOpacity) * ratio;
  };

  const navOpacity = calculateOpacity();

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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20"
        style={{
          backgroundColor: `hsl(var(--background) / ${navOpacity})`,
        }}
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
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="
                    relative
                    px-4 py-2
                    text-sm font-medium
                    border-shoji
                    bg-card/30 hover:bg-card/50
                    text-muted-foreground hover:text-primary
                    transition-all duration-300
                    group
                    active:scale-[0.98]
                  "
                >
                  {/* Corner accents - top left */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner accents - top right */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner accents - bottom left */}
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner accents - bottom right */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                lg:hidden
                relative
                p-2.5
                border-shoji
                bg-card/30 hover:bg-card/50
                text-foreground hover:text-primary
                transition-all duration-300
                group
                active:scale-[0.98]
              "
              aria-label="Toggle menu"
            >
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </span>
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
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="
                    relative
                    px-4 py-3
                    text-base font-medium
                    border-shoji
                    bg-card/30 hover:bg-card/50
                    text-muted-foreground hover:text-primary
                    transition-all duration-300
                    group
                    active:scale-[0.98]
                  "
                >
                  {/* Corner accents - top left */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner accents - top right */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner accents - bottom left */}
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner accents - bottom right */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10">{link.label}</span>
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
