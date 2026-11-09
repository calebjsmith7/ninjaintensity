import Image from "next/image";
import { business, team } from "../data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Button, Check, SectionHeading } from "./ui";

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal x={-40} y={0} className="relative order-last lg:order-first">
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[2rem]">
            <Image src="/images/team-1.jpg" alt="Team building group in the gym" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-coal/90 p-2 backdrop-blur">
            {team.durations.map((d) => (
              <span key={d} className="rounded-full bg-white/5 px-3 py-2 font-display text-lg text-white sm:px-4">
                {d}
              </span>
            ))}
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="Corporate team building" title="Ditch the boring" accent="team building" intro={team.intro} />
          <Reveal delay={0.1}>
            <p className="mt-4 leading-relaxed text-mute">{team.body}</p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ninja-soft">Built around</h3>
              <RevealGroup className="mt-3 space-y-2.5" stagger={0.06}>
                {team.focus.map((f) => (
                  <RevealItem key={f} className="flex items-center gap-3 text-white">
                    <Check className="h-4 w-4 shrink-0 text-ninja" />
                    {f}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ninja-soft">Perfect for</h3>
              <RevealGroup className="mt-3 flex flex-wrap gap-2" stagger={0.05}>
                {team.perfectFor.map((f) => (
                  <RevealItem key={f} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80">
                    {f}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={business.phoneHref}>Plan your event</Button>
            <p className="text-sm text-mute">No prior experience needed. Just show up ready to move, laugh, and grow together.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
