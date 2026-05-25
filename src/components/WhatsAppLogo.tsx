import { cn } from "@/lib/utils";
import { WHATSAPP_LOGO_2D_SRC, WHATSAPP_LOGO_3D_SRC } from "@/lib/whatsapp";

interface WhatsAppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "3d" | "2d";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

export function WhatsAppLogo({ className, size = "md", variant = "3d" }: WhatsAppLogoProps) {
  const src = variant === "2d" ? WHATSAPP_LOGO_2D_SRC : WHATSAPP_LOGO_3D_SRC;

  return (
    <img
      src={src}
      alt="WhatsApp"
      className={cn("object-contain drop-shadow-md", sizeClasses[size], className)}
      draggable={false}
    />
  );
}
