import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  locale: string = "en-US",
  currency: string = "USD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Formats a date into the specified Indonesian format with WIB timezone.
 * @param {string | Date} date - The date to format.
 * @returns {string} - Formatted date string in the format "D MMMM YYYY HH:mm WIB".
 */
export const formatDateToWIB = (date: string | Date): string => {
  const parsedDate = dayjs(date); // Parse the date with dayjs

  // Check if the date is valid
  if (!parsedDate.isValid()) {
    return "Invalid date"; // Handle invalid date gracefully
  }

  return parsedDate.format("DD MMMM YYYY H:mm:ss") + " " + "WIB";
};
