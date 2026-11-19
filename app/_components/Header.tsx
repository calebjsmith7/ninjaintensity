"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { business, links, nav } from "../data";
import { isExternal, useSiteContent } from "./SiteContent";
import { isShowing, useToday } from "./UpcomingOnly";
import { Phone } from "./ui";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { announcement, parentsNight, competitions } = useSiteContent();
  const today = useToday();
  // Drop links to cards that are currently hidden (past Parents Night Out / no upcoming comps).
  const hidden = new Set<string>();
  if (!isShowing(parentsNight.end, today)) hidden.add("#parents-night");
  if (!competitions.events.some((c) => isShowing(c.end, today))) hidden.add("#competitions");
  const navItems = nav.filter((n) => !hidden.has(n.href));
  const navKey = navItems.map((n) => n.href).join();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    const ids = navKey.split(",").map((h) => h.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navKey]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {announcement.text && isShowing(announcement.end, today) && (
        <a
          href={announcement.href || "#top"}
          {...(isExternal(announcement.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group relative z-50 block overflow-hidden bg-ninja px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-white sm:text-sm"
        >
          <span className="relative z-10">
            {announcement.text}{" "}
            <span className="underline decoration-2 underline-offset-4 group-hover:decoration-white/60">
              More info
            </span>
          </span>
          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/20 transition-all duration-700 group-hover:left-[110%]" />
        </a>
      )}

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24"
          }`}
        >
          <a href="#top" className="relative shrink-0" aria-label="Ninja Intensity home">
            <Image
              src="/images/logo.png"
              alt="Ninja Intensity"
              width={1000}
              height={630}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-9 lg:h-12" : "h-12 lg:h-16"}`}
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <WaiversMenu />
            <a
              href={business.phoneHref}
              aria-label={`Call ${business.phone}`}
              className="hidden items-center gap-2 rounded-full bg-ninja px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ninja-soft sm:inline-flex lg:max-xl:px-3"
            >
              <Phone className="h-4 w-4" />
              {/* icon-only between lg and xl so the full nav fits */}
              <span className="lg:max-xl:sr-only">{business.phone}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span
                className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span
                className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100dvh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 -z-10 overflow-y-auto overscroll-contain bg-ink lg:hidden"
            >
              <nav className="flex min-h-full flex-col justify-center gap-1 px-8 pb-10 pt-36" aria-label="Mobile">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="font-display text-4xl uppercase text-white transition-colors hover:text-ninja sm:text-5xl"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex flex-col gap-3 text-white/70"
                >
                  <a href={business.phoneHref} className="text-xl font-semibold text-white">
                    {business.phone}
                  </a>
                  <a href={links.youthWaiver} target="_blank" rel="noopener noreferrer">
                    Youth Waiver
                  </a>
                  <a href={links.adultWaiver} target="_blank" rel="noopener noreferrer">
                    Adult Waiver
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

const waivers = [
  { label: "Youth Waiver", note: "Under 18 — signed by a parent or guardian", href: links.youthWaiver },
  { label: "Adult Waiver", note: "18 and over", href: links.adultWaiver },
];

function WaiversMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          open ? "text-white" : "text-white/70 hover:text-white"
        }`}
      >
        Waivers
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-ink/95 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            {waivers.map((w) => (
              <a
                key={w.href}
                role="menuitem"
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
              >
                <span className="block text-sm font-semibold text-white">{w.label}</span>
                <span className="block text-xs text-white/60">{w.note}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
