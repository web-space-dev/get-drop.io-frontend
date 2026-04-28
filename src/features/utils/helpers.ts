export const INVALID_EMAIL_MESSAGE = "Please enter a valid email address.";

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
