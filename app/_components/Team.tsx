import Image from "next/image";
import { business, fieldTrips, team } from "../data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Button, Check, SectionHeading } from "./ui";

export function Team() {
  return (
    <GroupSection
      id="team"
      content={team}
      image={{ src: "/images/team-1.jpg", alt: "Team building group in the gym" }}
      eyebrow="Corporate team building"
      title="Ditch the boring"
      accent="team building"
      cta="Plan your event"
      footnote="No prior experience needed. Just show up ready to move, laugh, and grow together."
    />
  );
}

export function FieldTrips() {
  return (
    <GroupSection
      id="field-trips"
      content={fieldTrips}
      image={{ src: "/images/home-2.jpg", alt: "Kid climbing a spider wall obstacle on a field trip" }}
      eyebrow="Schools & groups"
      title="Field trips worth"
      accent="the bus ride"
      cta="Book a field trip"
      footnote="All ages and abilities welcome. Waivers required for every participant."
      flip
    />
  );
}

type GroupContent = {
  intro: string;
  body: string;
  durations: string[];
  focus: string[];
  perfectFor: string[];
};

/** Image + copy layout shared by Team Building and Field Trips. `flip` puts the image on the right (desktop). */
function GroupSection({
  id,
  content,
  image,
  eyebrow,
  title,
  accent,
  cta,
  footnote,
  flip = false,
}: {
  id: string;
  content: GroupContent;
  image: { src: string; alt: string };
  eyebrow: string;
  title: string;
  accent: string;
  cta: string;
  footnote: string;
  flip?: boolean;
}) {
  return (
    <section id={id} className={`relative overflow-hidden bg-ink ${flip ? "pb-24 pt-8 sm:pb-32 sm:pt-12" : "py-24 sm:py-32"}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal x={flip ? 40 : -40} y={0} className={`relative order-last ${flip ? "" : "lg:order-first"}`}>
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[2rem]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-coal/90 p-2 backdrop-blur">
            {content.durations.map((d) => (
              <span key={d} className="whitespace-nowrap rounded-full bg-white/5 px-3 py-2 font-display text-lg text-white sm:px-4">
                {d}
              </span>
            ))}
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow={eyebrow} title={title} accent={accent} intro={content.intro} />
          <Reveal delay={0.1}>
            <p className="mt-4 leading-relaxed text-mute">{content.body}</p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ninja-soft">Built around</h3>
              <RevealGroup className="mt-3 space-y-2.5" stagger={0.06}>
                {content.focus.map((f) => (
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
                {content.perfectFor.map((f) => (
                  <RevealItem key={f} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80">
                    {f}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={business.phoneHref}>{cta}</Button>
            <p className="text-sm text-mute">{footnote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
