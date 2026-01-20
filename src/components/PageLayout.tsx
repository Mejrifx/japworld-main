/**
 * PageLayout Component
 * 
 * Shared layout wrapper for all pages with consistent structure:
 * - Navigation
 * - Page content with fade-in animation
 * - Footer
 * 
 * Provides consistent Japanese-styled page structure across all routes.
 */

import { useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navigation />
      <main className="relative w-full min-h-screen">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
