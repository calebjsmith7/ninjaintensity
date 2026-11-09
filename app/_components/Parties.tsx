import Image from "next/image";
import { business, party } from "../data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Button, Check, SectionHeading } from "./ui";
import { Faq } from "./Faq";

export function Parties() {
  return (
    <section id="parties" className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-ninja/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            dark={false}
            eyebrow="Birthday parties"
            title="2 hours of private"
            accent="ninja fun"
            intro={party.intro}
          />
          <Reveal delay={0.15} className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={business.phoneHref}>Call {business.phone}</Button>
            <Button href="#contact" variant="dark">
              Check availability
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* photo + spinning cake badge */}
          <Reveal className="relative lg:col-span-7" y={40}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
              <Image
                src="/images/birthday-1.jpg"
                alt="Kids birthday party group flexing in front of the Ninja Intensity sign"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-[1.5s] hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -right-3 h-32 w-32 sm:-right-6 sm:h-40 sm:w-40">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
                <defs>
                  <path id="circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                </defs>
                <circle cx="100" cy="100" r="100" fill="#0a0a0b" />
                <text fill="#fff" fontSize="17" fontWeight="700" letterSpacing="5">
                  <textPath href="#circle">BEST BIRTHDAY EVER • BEST BIRTHDAY EVER •</textPath>
                </text>
              </svg>
              <div className="absolute inset-[22%] overflow-hidden rounded-full">
                <Image src="/images/birthday-home.jpg" alt="" fill sizes="100px" className="scale-110 object-cover" />
              </div>
            </div>
          </Reveal>

          {/* pricing */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <RevealGroup className="grid grid-cols-2 gap-4">
              {party.pricing.map((p, i) => (
                <RevealItem
                  key={p.label}
                  className={`group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg] ${
                    i === 0 ? "bg-ink text-white" : "bg-ninja text-white"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{p.label}</p>
                  <p className="mt-3 font-display text-6xl leading-none">{p.price}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="flex flex-wrap gap-2">
              {party.extras.map((e) => (
                <span key={e} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/70">
                  {e}
                </span>
              ))}
            </Reveal>

            <Reveal className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ninja">Party time slots</h3>
              <dl className="mt-4 space-y-3">
                {party.slots.map((s) => (
                  <div key={s.day} className="grid grid-cols-[5.5rem_1fr] gap-2">
                    <dt className="font-display text-lg uppercase">{s.day}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {s.times.map((t) => (
                        <span key={t} className="rounded-full bg-bone px-3 py-1 text-sm font-medium">
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm font-semibold text-ink/60">Ages 5+ only</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Reveal className="rounded-3xl bg-ink p-7 text-white lg:col-span-2">
            <h3 className="font-display text-3xl uppercase">What&apos;s included</h3>
            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.05}>
              {party.included.map((item) => (
                <RevealItem key={item} className="flex items-center gap-3 text-white/85">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ninja">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 text-sm leading-relaxed text-white/50">{party.body}</p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-ink/10 p-7">
            <h3 className="font-display text-3xl uppercase">Good to know</h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-ink/70">
              {party.fine.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ninja" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-6">
          <Faq items={party.faq} light />
        </div>
      </div>
    </section>
  );
}
