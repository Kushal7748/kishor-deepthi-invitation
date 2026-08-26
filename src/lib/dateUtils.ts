import type { InvitationConfig } from "../config/invitation";

/**
 * Resolves the event date from config into a real Date object,
 * or null if the year hasn't been confirmed yet. Every consumer
 * (countdown, event details) must handle the null case gracefully
 * rather than guessing a year.
 */
export function resolveEventDate(
  event: InvitationConfig["event"]
): Date | null {
  if (event.year === null) return null;

  const monthIndex = new Date(`${event.month} 1, 2000`).getMonth();
  if (Number.isNaN(monthIndex)) return null;

  const [hours, minutes] = parseTimeOfDay(event.time);
  return new Date(event.year, monthIndex, event.day, hours, minutes, 0);
}

function parseTimeOfDay(time: string | null): [number, number] {
  if (!time) return [0, 0];

  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return [0, 0];

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return [hours, minutes];
}

export type CountdownState =
  | { status: "unconfirmed" }
  | { status: "upcoming"; days: number; hours: number; minutes: number; seconds: number }
  | { status: "today" }
  | { status: "past" };

export function getCountdownState(target: Date | null, now: Date): CountdownState {
  if (!target) return { status: "unconfirmed" };

  const diff = target.getTime() - now.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (diff <= 0 && diff > -oneDay) return { status: "today" };
  if (diff <= -oneDay) return { status: "past" };

  const days = Math.floor(diff / oneDay);
  const hours = Math.floor((diff % oneDay) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  return { status: "upcoming", days, hours, minutes, seconds };
}
