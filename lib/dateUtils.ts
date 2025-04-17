/**
 * dateUtils.ts
 *
 * Utility functions for date formatting and ISO week calculations.
 *
 * Functions:
 * - getTodayDate(): string       // returns YYYY-MM-DD
 * - getWeekId(): string          // returns current ISO week as YYYY-Wxx
 * - isSameWeek(dateA: Date, dateB: Date): boolean
 */

import { format, getISOWeek, getISOWeekYear, isSameISOWeek } from "date-fns";

/**
 * Returns the current date in YYYY-MM-DD format.
 * @returns {string} The formatted date string.
 */
export function getTodayDate(): string {
  return format(new Date(), "yyyy-MM-dd");
}

/**
 * Returns the current ISO week identifier in YYYY-Wxx format.
 * @returns {string} The ISO week identifier.
 */
export function getWeekId(): string {
  const now = new Date();
  const year = getISOWeekYear(now);
  const week = getISOWeek(now);
  return `${year}-W${week.toString().padStart(2, "0")}`;
}

/**
 * Checks if two dates belong to the same ISO week.
 * @param {Date} dateA - The first date.
 * @param {Date} dateB - The second date.
 * @returns {boolean} True if the dates are in the same ISO week, false otherwise.
 */
export function isSameWeek(dateA: Date, dateB: Date): boolean {
  return isSameISOWeek(dateA, dateB);
}

