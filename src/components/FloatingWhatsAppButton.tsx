import { useLocation } from "react-router-dom";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";

/** Fixed bottom-left WhatsApp chat entry — hidden on admin routes */
export function FloatingWhatsAppButton() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with JapWorld on WhatsApp"
      title="Message us on WhatsApp"
      className="
        fixed bottom-5 left-5 z-40
        flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center
        rounded-full bg-[#25D366]/15 border-2 border-[#25D366]/40
        shadow-lg shadow-black/20
        transition-all duration-300
        hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/25 hover:shadow-xl
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background
      "
    >
      <WhatsAppLogo size="md" className="h-9 w-9 sm:h-11 sm:w-11" />
    </a>
  );
}
