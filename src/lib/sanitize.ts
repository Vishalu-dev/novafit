/** Strip tags and trim user text for safe display / submission. */
export function sanitizeText(input: string, maxLength = 200): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(input: string): string {
  return sanitizeText(input, 254).toLowerCase();
}

export function sanitizePhoneDigits(input: string): string {
  return input.replace(/\D/g, "").slice(0, 15);
}
