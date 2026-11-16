"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  announcement,
  camps,
  cmsSheetId,
  competitions,
  links,
  parentsNight,
  summerCamp,
  type Camp,
  type Competition,
} from "../data";

/*
 * Simple Google Sheets CMS.
 *
 * The site is a static export, so the copy in data.ts is baked into the HTML and shown first.
 * After the page loads, the browser pulls each tab of the CMS sheet (public, "anyone with the
 * link can view") as CSV and swaps in the live values. If the sheet can't be reached, or a
 * field is missing from it, the data.ts copy stays on screen.
 */

export type SiteContent = {
  announcement: typeof announcement;
  camps: Camp[];
  summerCamp: typeof summerCamp;
  parentsNight: typeof parentsNight;
  competitions: typeof competitions;
};

const defaults: SiteContent = { announcement, camps, summerCamp, parentsNight, competitions };

const SiteContentContext = createContext<SiteContent>(defaults);

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaults);

  useEffect(() => {
    let cancelled = false;
    loadFromSheet().then((next) => {
      if (!cancelled) setContent(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

/* ---------- loading ---------- */

type Rows = string[][];

async function fetchTab(tab: string): Promise<Rows | null> {
  const url =
    `https://docs.google.com/spreadsheets/d/${cmsSheetId}/gviz/tq?tqx=out:csv&headers=0` +
    `&sheet=${encodeURIComponent(tab)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    // A private sheet answers with an HTML sign-in page instead of CSV.
    if (!res.ok || !res.headers.get("content-type")?.includes("text/csv")) return null;
    return parseCsv(await res.text());
  } catch {
    return null;
  }
}

async function loadFromSheet(): Promise<SiteContent> {
  const [top, breakCamps, summer, pno, comps] = await Promise.all([
    fetchTab("Top Bar"),
    fetchTab("School Break Camps"),
    fetchTab("Summer Camp"),
    fetchTab("Parents Night Out"),
    fetchTab("Competitions"),
  ]);

  const content = { ...defaults };

  if (top) {
    const f = fields(top);
    content.announcement = {
      text: f("Message", announcement.text),
      href: f("More Info Link", announcement.href),
      end: toIsoDate(f("Hide After", announcement.end)),
    };
  }

  if (breakCamps) {
    const rows = table(breakCamps, "Title");
    if (rows) {
      content.camps = rows
        .filter((r) => r("Title"))
        .map((r) => ({
          days: r("Days"),
          dates: r("Dates"),
          title: r("Title"),
          href: r("Register Link") || links.campRegister,
          end: toIsoDate(r("Hide After")),
        }));
    }
  }

  if (summer) {
    const f = fields(summer);
    const d = summerCamp;
    content.summerCamp = {
      title: f("Title", d.title),
      image: f("Image", d.image),
      header: f("Header", d.header),
      body: f("Body Text", d.body),
      options: [
        {
          name: f("Morning Text", d.options[0].name),
          time: f("Morning Time", d.options[0].time),
          member: f("Morning Member Price", d.options[0].member),
          nonMember: f("Morning Non-Member Price", d.options[0].nonMember),
        },
        {
          name: f("All Day Text", d.options[1].name),
          time: f("All Day Time", d.options[1].time),
          member: f("All Day Member Price", d.options[1].member),
          nonMember: f("All Day Non-Member Price", d.options[1].nonMember),
        },
      ],
      href: f("Register Link", d.href),
      end: toIsoDate(f("Hide After", d.end)),
    };
  }

  if (pno) {
    const f = fields(pno);
    const d = parentsNight;
    content.parentsNight = {
      badge: f("Yellow Bar Text", d.badge),
      header: f("Header", d.header),
      body: f("Body Text", d.body),
      href: f("Link", d.href),
      image: f("Background Image", d.image),
      end: toIsoDate(f("Hide After", d.end)),
    };
  }

  if (comps) {
    const rows = table(comps, "Event Header");
    content.competitions = {
      header: fields(comps)("Card Header", competitions.header),
      events: rows
        ? rows
            .filter((r) => r("Event Header"))
            .map(
              (r): Competition => ({
                date: r("Dates"),
                name: r("Event Header"),
                body: r("Body Text"),
                href: r("Link"),
                cta: r("Link Text") || "Sign up",
                end: toIsoDate(r("Hide After")),
              }),
            )
        : competitions.events,
    };
  }

  // iCloud links need a lookup to find the actual image file; fall back to the built-in image if that fails.
  const [summerImage, pnoImage] = await Promise.all([
    resolveImage(content.summerCamp.image, summerCamp.image),
    resolveImage(content.parentsNight.image, parentsNight.image),
  ]);
  content.summerCamp = { ...content.summerCamp, image: summerImage };
  content.parentsNight = { ...content.parentsNight, image: pnoImage };

  return content;
}

/* ---------- images ---------- */

const ICLOUD_PHOTO = /^https?:\/\/(?:share\.icloud\.com\/photos\/|(?:www\.)?icloud\.com\/photos\/#\/?)([\w-]+)/i;
const GOOGLE_DRIVE =
  /^https?:\/\/(?:drive|docs)\.google\.com\/(?:file\/d\/|open\?(?:[^#]*&)?id=|uc\?(?:[^#]*&)?id=|thumbnail\?(?:[^#]*&)?id=)([\w-]{10,})/i;

/**
 * Turns an image cell into a URL an <img> can load:
 *  - local file: /images/summer-camp.png, images/summer-camp.png, or just summer-camp.png (assumed to be in /images)
 *  - full link straight to an image: https://example.com/photo.jpg
 *  - Google Drive share link (file must be shared "Anyone with the link")
 * iCloud links are resolved separately in resolveImage().
 */
export function imageSrc(value: string) {
  const v = value.trim();
  if (!v) return "";
  const drive = v.match(GOOGLE_DRIVE);
  if (drive) return `https://lh3.googleusercontent.com/d/${drive[1]}`;
  if (/^https?:\/\//i.test(v) || v.startsWith("/")) return v;
  const local = v.replace(/^(\.\/)?(public\/)?/, "");
  return local.includes("/") ? `/${local}` : `/images/${local}`;
}

async function resolveImage(value: string, fallback: string) {
  const v = value.trim();
  const icloud = v.match(ICLOUD_PHOTO);
  if (icloud) return (await resolveICloudPhoto(icloud[1])) ?? fallback;
  // Other iCloud links (e.g. shared albums) are web pages, not images.
  if (/^https?:\/\/([\w-]+\.)*icloud\.com\//i.test(v)) return fallback;
  return value;
}

/**
 * iCloud "Copy Link" photo shares (share.icloud.com/photos/…) point at a web page, not an image.
 * Apple's public CloudKit endpoint resolves the link to signed, short-lived download URLs; since this
 * runs on every page view, the expiry doesn't matter. Shared *albums* use a different API that
 * browsers aren't allowed to call, so they aren't supported.
 */
async function resolveICloudPhoto(shortGuid: string): Promise<string | null> {
  try {
    const res = await fetch(
      "https://ckdatabasews.icloud.com/database/1/com.apple.photos.cloud/production/public/records/resolve",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortGUIDs: [{ value: shortGuid }] }),
      },
    );
    if (!res.ok) return null;
    // Collect every asset field that has a download URL, wherever it sits in the response.
    const assets = new Map<string, string>();
    const walk = (node: unknown, key = "") => {
      if (!node || typeof node !== "object") return;
      const obj = node as Record<string, unknown>;
      if (typeof obj.downloadURL === "string" && !assets.has(key)) assets.set(key, obj.downloadURL);
      for (const [k, child] of Object.entries(obj)) walk(child, /^value$/.test(k) ? key : k);
    };
    walk(await res.json());
    // Prefer browser-friendly JPEG renditions; originals may be HEIC, which most browsers can't show.
    const preferred = ["resJPEGFullRes", "resJPEGLargeRes", "resJPEGMedRes", "resOriginalRes"];
    const pick =
      preferred.map((k) => assets.get(k)).find(Boolean) ??
      [...assets].find(([k]) => /jpe?g/i.test(k))?.[1] ??
      assets.values().next().value;
    return pick ? pick.replace("${f}", "image.jpg") : null;
  } catch {
    return null;
  }
}

/* ---------- sheet parsing ---------- */

const norm = (s: string) => s.trim().toLowerCase();

/** "Field | Value" tabs: look up column B by the label in column A. Missing labels use the fallback. */
function fields(rows: Rows) {
  const map = new Map<string, string>();
  for (const [key, value = ""] of rows) if (key?.trim()) map.set(norm(key), value.trim());
  return (label: string, fallback: string) => map.get(norm(label)) ?? fallback;
}

/** Tables: find the header row by one of its column names, then read each row below it by column name. */
function table(rows: Rows, headerCell: string) {
  const headerIndex = rows.findIndex((r) => r.some((c) => norm(c) === norm(headerCell)));
  if (headerIndex === -1) return null;
  const columns = rows[headerIndex].map(norm);
  return rows.slice(headerIndex + 1).map((row) => (name: string) => {
    const i = columns.indexOf(norm(name));
    return i === -1 ? "" : (row[i] ?? "").trim();
  });
}

/** Accepts 2026-11-25 or 11/25/2026. Anything else (including blank) means "never hide". */
function toIsoDate(value: string) {
  const iso = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  const us = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const parts = iso ? [iso[1], iso[2], iso[3]] : us ? [us[3], us[1], us[2]] : null;
  if (!parts) return "";
  const [y, m, d] = parts;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/** Minimal RFC 4180 CSV parser (quoted fields, doubled quotes, newlines inside quotes). */
function parseCsv(text: string): Rows {
  const rows: Rows = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/* ---------- helpers for components ---------- */

export function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

/** Renders **double asterisks** as bold. */
export function RichText({ text, strongClassName }: { text: string; strongClassName?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className={strongClassName}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
