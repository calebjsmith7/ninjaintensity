"use client";

import Image from "next/image";
import { campFaq, camps, links, summerCamp } from "../data";
import { useToday } from "./UpcomingOnly";
import { Faq } from "./Faq";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Button, SectionHeading } from "./ui";

export function Camps() {
  // Hide camps whose end date has passed (checked in the browser so the static build never goes stale).
  const today = useToday();
  const upcoming = today ? camps.filter((c) => c.end >= today) : camps;

  return (
    <section id="camps" className="noise relative overflow-hidden bg-ink bg-grid py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-ninja/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Seasonal camps"
          title="School's out."
          accent="Ninja's in."
          intro="High-energy kids camps that build strength, confidence and coordination through ninja training, games and challenges, all inside our safe, indoor facility. Full days or half days! We offer day camps on in-service days and week camps, following the Douglas County School District calendar."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* upcoming dates */}
          <div className="rounded-[2rem] border border-white/10 bg-coal p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-3xl uppercase text-white">School break camps</h3>
              <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
                Limited spots
              </span>
            </div>
            {upcoming.length > 0 ? (
              <RevealGroup className="mt-6 space-y-3" stagger={0.07}>
                {upcoming.map((c) => (
                  <RevealItem key={c.label}>
                    <a
                      href={links.campRegister}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-ninja hover:bg-ninja/10"
                    >
                      <div>
                        <p className="font-semibold text-white">{c.label}</p>
                        <p className="text-sm text-mute">{c.dates}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold uppercase tracking-wider text-ninja-soft transition-transform duration-300 group-hover:translate-x-1">
                        Register →
                      </span>
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <p className="mt-6 text-mute">New camp dates are coming soon. Give us a call to hear what&apos;s next!</p>
            )}
            <div className="mt-6">
              <Button href={links.campRegister} external>
                Register for your camp
              </Button>
            </div>
          </div>

          {/* summer camp */}
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem] bg-ninja p-6 text-white sm:p-8">
            <div className="absolute right-4 top-4 h-28 w-40 rotate-6 sm:right-6 sm:h-36 sm:w-52">
              <Image src="/images/summer-camp.png" alt="Summer Camp" fill sizes="240px" className="object-contain" />
            </div>
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-white/80">Summer camp</p>
            <p className="relative mt-24 font-display text-4xl uppercase leading-none sm:mt-28 sm:text-5xl">
              Back for 2027
            </p>
            <p className="relative mt-2 text-white/85">{summerCamp.note}</p>
            <div className="relative mt-6 grid gap-3">
              {summerCamp.options.map((o) => (
                <div key={o.name} className="rounded-2xl bg-ink/25 p-4 backdrop-blur">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-display text-2xl uppercase">{o.name}</p>
                    <p className="text-sm text-white/80">{o.time}</p>
                  </div>
                  <div className="mt-2 flex gap-6 text-sm">
                    <span>
                      <span className="font-display text-2xl">{o.member}</span> members
                    </span>
                    <span className="text-white/80">
                      <span className="font-display text-2xl text-white">{o.nonMember}</span> non-members
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-6">
          <Faq items={campFaq} />
        </div>
      </div>
    </section>
  );
}
