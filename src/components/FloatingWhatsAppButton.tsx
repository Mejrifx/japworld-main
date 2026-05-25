import { useLocation } from "react-router-dom";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";

/** Fixed bottom-right WhatsApp chat entry — hidden on admin routes */
export function FloatingWhatsAppButton() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with JapWorld on WhatsApp"
        title="Message us on WhatsApp"
        className="
          group relative flex items-center justify-center
          transition-transform duration-300
          hover:scale-110 active:scale-95
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background
        "
      >
        <span
          className="pointer-events-none absolute inset-0 -m-3 rounded-full bg-[#25D366]/40 blur-2xl animate-whatsapp-glow"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 -m-1 rounded-full bg-[#25D366]/30 blur-lg animate-whatsapp-glow"
          style={{ animationDelay: "0.6s" }}
          aria-hidden
        />
        <WhatsAppLogo
          variant="2d"
          size="lg"
          className="relative z-10 h-16 w-16 sm:h-20 sm:w-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] animate-whatsapp-glow-shadow"
        />
      </a>
    </div>
  );
}
