import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The 'cn' (Class Name) utility:
 * 1. clsx allows you to write conditional classes: { 'text-white': isActive }
 * 2. twMerge ensures that if you have conflicting Tailwind classes,
 * the one you added last actually wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
