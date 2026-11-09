"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { announcement, business, links, nav } from "../data";
import { Phone } from "./ui";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
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
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <a
        href={announcement.href}
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

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <a href="#top" className="relative shrink-0" aria-label="Ninja Intensity home">
            <Image
              src="/images/logo.png"
              alt="Ninja Intensity"
              width={1000}
              height={630}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-12"}`}
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
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
            <a
              href={links.youthWaiver}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white md:block"
            >
              Waivers
            </a>
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-ninja px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ninja-soft sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {business.phone}
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
              className="fixed inset-x-0 top-0 -z-10 overflow-hidden bg-ink lg:hidden"
            >
              <nav className="flex h-full flex-col justify-center gap-1 px-8" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="font-display text-5xl uppercase text-white transition-colors hover:text-ninja"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 flex flex-col gap-3 text-white/70"
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
