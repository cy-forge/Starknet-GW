import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an address string to show the first 7 and last 4 characters with ellipses
 * @param address The address string to format
 * @returns Formatted address string (e.g., "0x12345...6789")
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 11) return address;
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
}

/**
 * Adds commas to a number for better readability
 * @param num The number to format
 * @returns Formatted number string with commas
 */
export function addCommasToNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
