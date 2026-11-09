import Image from "next/image";
import { competitions, links, openGym } from "../data";
import { Reveal } from "./Reveal";
import { Button, SectionHeading } from "./ui";
import { UpcomingOnly } from "./UpcomingOnly";

export function More() {
  return (
    <section id="more" className="relative bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark={false}
          eyebrow="More ways to play"
          title="Open gym, nights out"
          accent="& more"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {/* Open Gym */}
          <Reveal className="grid overflow-hidden rounded-[2rem] bg-white shadow-sm sm:grid-cols-[1fr_1.3fr] lg:col-span-4">
            <div className="relative min-h-64">
              <Image src="/images/open-gym.jpg" alt="Training ninja on your own at open gym" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-4xl uppercase">Open Gym</h3>
              <p className="mt-2 text-ink/70">{openGym.intro} Offered Friday – Sunday.</p>
              <ul className="mt-5 divide-y divide-ink/10">
                {openGym.sessions.map((s) => (
                  <li key={s.day + s.time} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 py-2.5 text-sm">
                    <span className="font-display text-base uppercase">{s.day.slice(0, 3)}</span>
                    <span>
                      <span className="font-semibold">{s.time}</span>
                      <span className="block text-ink/60">{s.who}</span>
                    </span>
                    <span className="rounded-full bg-ink px-3 py-1 font-display text-white">{s.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ink/60">{openGym.note}</p>
            </div>
          </Reveal>

          {/* Parents Night Out */}
          <Reveal delay={0.1} className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8 lg:col-span-2">
            <div className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60">
              <Image src="/images/parents-night-2.jpg" alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
            <div className="relative mt-auto pt-32">
              <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
                2nd Saturday monthly
              </span>
              <h3 className="mt-4 font-display text-4xl uppercase leading-none">Parents Night Out</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                6–9 PM. For just <strong className="text-white">$40 per ninja</strong>, your kids get three
                hours of fun games and exciting ninja activities. Space is limited and fills up fast!
              </p>
              <div className="mt-5">
                <Button href={links.parentsNight} external>
                  Reserve a spot
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Competitions */}
          <Reveal className="rounded-[2rem] bg-ninja p-6 text-white sm:p-8 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-4xl uppercase">Competitions @ Intensity</h3>
            </div>
            <div className="mt-6 space-y-4">
              {competitions.map((c) => (
                <UpcomingOnly key={c.name} end={c.end}>
                  <div className="rounded-2xl bg-ink/20 p-5 backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{c.date}</p>
                    <p className="mt-1 font-display text-2xl uppercase">{c.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{c.body}</p>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-semibold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:decoration-white/50"
                    >
                      {c.cta} →
                    </a>
                  </div>
                </UpcomingOnly>
              ))}
            </div>
          </Reveal>

          {/* Recovery */}
          <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] bg-white shadow-sm lg:col-span-3">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square">
                <Image src="/images/cold-plunge.jpg" alt="Cold plunge tub" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square">
                <Image src="/images/red-light.jpg" alt="Red light therapy" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-4xl uppercase">Ni Recovery Room</h3>
              <p className="mt-2 leading-relaxed text-ink/70">
                The perfect place for athletes, parents, and anyone in need of recovery. Our cold
                plunge helps aid recovery, reduce inflammation and stress, and boost immunity. Red light
                therapy, backed by over 6,000 published studies, can speed recovery, improve sleep and more.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">$10 for one</span>
                <span className="rounded-full bg-ninja px-4 py-2 text-sm font-semibold text-white">$15 for the combo</span>
                <span className="rounded-full border border-ink/15 px-4 py-2 text-sm">Ask about unlimited monthly</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
