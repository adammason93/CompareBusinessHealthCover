/** UK number (same as site phone 01484 773038) for WhatsApp click-to-chat — digits only, no + */
const WHATSAPP_E164_DIGITS = '441484773038';

const defaultMessage = "Hi — I'd like to chat about private health insurance.";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_E164_DIGITS}?text=${encodeURIComponent(defaultMessage)}`;
