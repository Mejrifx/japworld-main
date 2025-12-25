import japworldBg from "@/assets/japworld-bg.png";
import japworldLogo from "@/assets/japworld-logo.png";

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${japworldBg})` }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-overlay" />
      
      {/* Content Container - Optimized for mobile */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">
        {/* Logo with slide-up animation - Better mobile sizing */}
        <div className="animate-slide-up-fade w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
          <img
            src={japworldLogo}
            alt="JapWorld"
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
        
        {/* Under Construction Text - Better mobile spacing and sizing */}
        <div className="animate-fade-in-delayed mt-6 sm:mt-8 md:mt-10 text-center px-2">
          <p className="animate-shimmer text-[10px] sm:text-xs md:text-sm lg:text-base font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-relaxed">
            Website Under Construction...
          </p>
        </div>
        
        {/* Decorative bottom accent - Better mobile positioning */}
        <div className="animate-fade-in-delayed absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-primary animate-pulse-subtle" />
            <span className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
