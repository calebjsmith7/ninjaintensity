"use client";

import Image from "next/image";
import { openGym, recovery } from "../data";
import { Reveal } from "./Reveal";
import { RichText, imageSrc, isExternal, useSiteContent } from "./SiteContent";
import { Button, SectionHeading } from "./ui";
import { isShowing, useToday } from "./UpcomingOnly";

export function More() {
  const { parentsNight, competitions } = useSiteContent();
  const pnoImage = imageSrc(parentsNight.image);
  const today = useToday();
  const showPno = isShowing(parentsNight.end, today);
  const events = competitions.events.filter((c) => isShowing(c.end, today));
  // The competitions card disappears once every event in it has passed.
  const showComps = events.length > 0;

  return (
    <section id="more" className="relative bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark={false}
          eyebrow="More ways to play"
          title="Nights out, comps"
          accent="& more"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {/* Parents Night Out */}
          {showPno && (
            <Reveal
              id="parents-night"
              className="group relative flex scroll-mt-8 flex-col overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-10 lg:col-span-6 lg:min-h-[28rem] lg:justify-center lg:p-14"
            >
              {pnoImage && (
                <div className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60 lg:left-1/3 lg:opacity-70 lg:group-hover:opacity-90">
                  <Image src={pnoImage} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20 lg:bg-gradient-to-r lg:from-ink lg:from-35% lg:via-ink/70 lg:via-55% lg:to-ink/0" />
              <div className="relative mt-auto max-w-xl pt-32 lg:mt-0 lg:pt-0">
                {parentsNight.badge && (
                  <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
                    {parentsNight.badge}
                  </span>
                )}
                <h3 className="mt-4 font-display text-5xl uppercase leading-none sm:text-6xl">{parentsNight.header}</h3>
                <p className="mt-4 leading-relaxed text-white/80 sm:text-lg">
                  <RichText text={parentsNight.body} strongClassName="text-white" />
                </p>
                <div className="mt-6">
                  <Button href={parentsNight.href} external={isExternal(parentsNight.href)}>
                    Reserve a spot
                  </Button>
                </div>
              </div>
            </Reveal>
          )}

          {/* Competitions */}
          {showComps && (
            <Reveal id="competitions" className="scroll-mt-8 rounded-[2rem] bg-ninja p-6 text-white sm:p-10 lg:col-span-6 lg:p-14">
              <h3 className="font-display text-5xl uppercase leading-none sm:text-6xl">{competitions.header}</h3>
              <div className={`mt-8 grid gap-4 ${events.length > 1 ? "md:grid-cols-2" : ""}`}>
                {events.map((c) => (
                      <div key={c.name + c.date} className="rounded-2xl bg-ink/20 p-5 backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{c.date}</p>
                        <p className="mt-1 font-display text-2xl uppercase">{c.name}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/85">{c.body}</p>
                        {c.href && (
                          <a
                            href={c.href}
                            {...(isExternal(c.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="mt-3 inline-block text-sm font-semibold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:decoration-white/50"
                          >
                            {c.cta} →
                          </a>
                        )}
                      </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Recovery */}
          <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] bg-white shadow-sm lg:col-span-6 lg:grid lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square">
                <Image src="/images/cold-plunge.jpg" alt="Cold plunge tub" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square">
                <Image src="/images/red-light.jpg" alt="Red light therapy" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-4xl uppercase">{recovery.name}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{recovery.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {recovery.prices.map((label, i) => (
                  <span
                    key={label}
                    className={`rounded-full px-4 py-2 text-sm ${
                      i === 0 ? "bg-ink font-semibold text-white" : i === 1 ? "bg-ninja font-semibold text-white" : "border border-ink/15"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Open Gym: kept intentionally small */}
          <Reveal className="rounded-[2rem] bg-white px-6 py-5 shadow-sm sm:px-8 lg:col-span-6 lg:flex lg:items-center lg:gap-8">
            <div className="lg:w-72 lg:shrink-0">
              <h3 className="font-display text-2xl uppercase">Open Gym</h3>
              <p className="mt-1 text-sm text-ink/70">{openGym.intro}</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <ul className="flex flex-wrap gap-2">
                {openGym.sessions.map((s) => (
                  <li key={s.day + s.time} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs">
                    <span className="font-semibold">
                      {s.day.slice(0, 3)} {s.time}
                    </span>
                    <span className="text-ink/60">
                      {" "}
                      · {s.who} · {s.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink/50">{openGym.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
