"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { business, membershipNotes, programs } from "../data";
import { Reveal } from "./Reveal";
import { Button, Check, SectionHeading } from "./ui";

export function Programs() {
  const [activeId, setActiveId] = useState(programs[0].id);
  const p = programs.find((x) => x.id === activeId) ?? programs[0];

  return (
    <section id="classes" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Programs we offer"
          title="Classes that"
          accent="level you up"
          intro="Kids ninja classes and after school programs in Castle Rock! Structured, coach-led weekly classes for every age and skill level, from first-timers to elite competitors."
        />

        {/* tabs */}
        <Reveal delay={0.1} className="mt-12">
          <div
            role="tablist"
            aria-label="Class types"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {programs.map((prog) => {
              const isActive = prog.id === activeId;
              return (
                <button
                  key={prog.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${prog.id}`}
                  onClick={() => setActiveId(prog.id)}
                  className={`relative shrink-0 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? "text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="program-pill"
                      className="absolute inset-0 rounded-full bg-ninja"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{prog.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              id={`panel-${p.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 rounded-[2rem] border border-white/10 bg-coal p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-8"
            >
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0 round 1.5rem)" }}
                animate={{ clipPath: "inset(0 0% 0 0 round 1.5rem)" }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-auto lg:min-h-[34rem]"
              >
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                  {p.ages}
                </span>
                <p className="absolute bottom-5 left-5 right-5 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                  {p.tagline}
                </p>
              </motion.div>

              <div className="flex flex-col py-2">
                <div className="space-y-4 text-lg leading-relaxed text-white/80">
                  {p.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {p.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-start gap-3 text-sm font-medium text-white"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ninja/15 text-ninja-soft">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                {p.schedule && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {p.schedule.map((s) => (
                      <span key={s} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80">
                        🗓 {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                  <div className="bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ninja-soft">
                    Pricing
                  </div>
                  <ul className="divide-y divide-white/10">
                    {p.pricing.map((row) => (
                      <li key={row.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                        <span className="text-sm text-white/80">{row.label}</span>
                        <span className="shrink-0 font-display text-2xl text-white">{row.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={business.phoneHref}>Call to register</Button>
                  <Button href="#contact" variant="ghost">
                    Request info
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* membership fine print + referral */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-3xl border border-white/10 bg-coal/60 p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-mute">Membership details</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-white/70">
              {membershipNotes.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ninja" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/50">
              Need to cancel? Email{" "}
              <a className="text-white underline underline-offset-4" href={`mailto:${business.email}?subject=Membership%20cancellation`}>
                {business.email}
              </a>{" "}
              by the 5th of the month.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-3xl bg-ninja p-6 text-white sm:p-8"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 right-10 h-32 w-32 rounded-full bg-white/10" />
            <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              New referral program!
            </span>
            <p className="relative mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">
              Bring a friend, get $20 off
            </p>
            <p className="relative mt-3 text-sm text-white/85">
              Get a friend to sign up for the monthly and get $20 off your next month! They must
              be a new member and refer you. Call for details!
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
