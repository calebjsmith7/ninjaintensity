"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};
const getToday = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
const getServerToday = () => null;

/** Today's date as YYYY-MM-DD in the browser, or null while prerendering. */
export function useToday() {
  return useSyncExternalStore(subscribe, getToday, getServerToday);
}

/** True until the `end` date (YYYY-MM-DD) has passed. Blank `end`, or no date yet (prerendering), means show. */
export function isShowing(end: string, today: string | null) {
  return !today || !end || end >= today;
}

/** Renders children until the `end` date (YYYY-MM-DD) has passed in the visitor's browser. A blank `end` never hides. */
export function UpcomingOnly({ end, children }: { end: string; children: ReactNode }) {
  const today = useToday();
  if (!isShowing(end, today)) return null;
  return <>{children}</>;
}

const getYear = () => String(new Date().getFullYear());
const getBuildYear = () => "2026";

/** Current year, computed in the browser (falls back to the build year while prerendering). */
export function Year() {
  return <>{useSyncExternalStore(subscribe, getYear, getBuildYear)}</>;
}
