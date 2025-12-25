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
      
      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo with slide-up animation */}
        <div className="animate-slide-up-fade">
          <img
            src={japworldLogo}
            alt="JapWorld"
            className="h-auto w-full max-w-md drop-shadow-2xl md:max-w-lg lg:max-w-xl"
          />
        </div>
        
        {/* Under Construction Text */}
        <div className="animate-fade-in-delayed mt-8 text-center">
          <p className="animate-shimmer text-sm font-medium uppercase tracking-[0.4em] md:text-base lg:text-lg">
            Website Under Construction...
          </p>
        </div>
        
        {/* Decorative bottom accent */}
        <div className="animate-fade-in-delayed absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-subtle" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
