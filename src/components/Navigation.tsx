/**
 * Navigation Component
 * 
 * Sticky top navigation with Japanese-styled design.
 * Uses React Router for multi-page navigation.
 * 
 * CUSTOMIZATION:
 * - Modify navLinks array to add/remove/reorder navigation items
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import japworldLogo from "@/assets/japworld-logo.png";

const navLinks = [
  { label: "About Us", path: "/about" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Services", path: "/services" },
  { label: "Auctions", path: "/auctions" },
  { label: "Cost Calculator", path: "/calculator" },
  { label: "FAQ", path: "/faq" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
            <Link 
              to="/"
              className="flex-shrink-0"
            >
              <img 
                src={japworldLogo} 
                alt="JapWorld" 
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      relative
                      px-4 py-2
                      text-sm font-medium
                      border-shoji
                      ${isActive 
                        ? 'bg-card/60 text-primary' 
                        : 'bg-card/30 hover:bg-card/50 text-muted-foreground hover:text-primary'
                      }
                      transition-all duration-300
                      group
                      active:scale-[0.98]
                    `}
                  >
                    {/* Corner accents - top left */}
                    <div className={`absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                    {/* Corner accents - top right */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                    {/* Corner accents - bottom left */}
                    <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                    {/* Corner accents - bottom right */}
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                    
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
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
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="
            lg:hidden fixed inset-0 z-40
            bg-black/60 backdrop-blur-sm
            transition-opacity duration-300
          "
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Slide-in Panel */}
      <div
        className={`
          lg:hidden fixed top-0 right-0 bottom-0 z-50
          w-80 max-w-[85vw]
          bg-background/98 backdrop-blur-md
          border-l border-border/50
          shadow-2xl shadow-black/40
          transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <span className="text-primary/40 text-sm font-display">メニュー</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="
              relative
              p-2
              border-shoji
              bg-card/30 hover:bg-card/50
              text-foreground hover:text-primary
              transition-all duration-300
              group
              active:scale-[0.98]
            "
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links - Center Aligned */}
        <div className="flex flex-col items-center gap-3 p-6 pt-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  relative
                  w-full max-w-xs
                  px-6 py-4
                  text-base font-medium
                  border-shoji
                  ${isActive 
                    ? 'bg-card/60 text-primary' 
                    : 'bg-card/30 hover:bg-card/50 text-muted-foreground hover:text-primary'
                  }
                  transition-all duration-300
                  group
                  active:scale-[0.98]
                  text-center
                `}
              >
                {/* Corner accents - top left */}
                <div className={`absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                {/* Corner accents - top right */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                {/* Corner accents - bottom left */}
                <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                {/* Corner accents - bottom right */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-0" />
    </>
  );
};

export default Navigation;
