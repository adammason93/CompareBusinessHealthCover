/**
 * WhatsApp click-to-chat for nav “Chat to us”.
 * UK mobile 07919 075287 → international digits for wa.me (no +, no leading 0).
 */
export const WHATSAPP_BUSINESS_DIGITS = '447919075287';

const defaultMessage = "Hi — I'd like to chat about private health insurance.";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_BUSINESS_DIGITS}?text=${encodeURIComponent(defaultMessage)}`;
