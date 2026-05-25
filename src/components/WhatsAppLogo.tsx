import { cn } from "@/lib/utils";
import { WHATSAPP_LOGO_SRC } from "@/lib/whatsapp";

interface WhatsAppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

export function WhatsAppLogo({ className, size = "md" }: WhatsAppLogoProps) {
  return (
    <img
      src={WHATSAPP_LOGO_SRC}
      alt="WhatsApp"
      className={cn("object-contain drop-shadow-md", sizeClasses[size], className)}
      draggable={false}
    />
  );
}
