/** Shared WhatsApp contact config (Japan: +81 70-5555-2370) */
export const WHATSAPP_DIGITS = "817055552370";
export const WHATSAPP_DISPLAY = "+81 70-5555-2370";
export const WHATSAPP_LOGO_3D_SRC = "/Whatsapp-logo-3d.png";
export const WHATSAPP_LOGO_2D_SRC = "/whatsapp-logo-2d.png";

const DEFAULT_MESSAGE =
  "Hello, I'm interested in importing a vehicle from Japan. Can you help me?";

export function getWhatsAppLink(message = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}`;
}
