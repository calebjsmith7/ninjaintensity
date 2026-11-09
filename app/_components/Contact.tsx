"use client";

import { useState, type FormEvent } from "react";
import { business, links } from "../data";
import { Reveal } from "./Reveal";
import { Phone } from "./ui";

const interests = [
  "Ninja classes",
  "Parkour",
  "OCR training",
  "Sports performance",
  "NiFIT",
  "Birthday party",
  "Camps",
  "Team building",
  "Something else",
];

/**
 * Static hosting has no server, so this form opens the visitor's email app with a
 * pre-filled message. Swap `onSubmit` for a form service (e.g. Formspree) or a
 * Firebase Function later if you want submissions collected automatically.
 */
export function Contact() {
  const [interest, setInterest] = useState(interests[0]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Interested in: ${interest}`,
      data.get("date") ? `Preferred date: ${data.get("date")}` : "",
      "",
      String(data.get("message") ?? ""),
    ]
      .filter((l) => l !== "")
      .join("\n");
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      `Website inquiry: ${interest}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition focus:border-white focus:bg-white/10";

  return (
    <section id="contact" className="noise relative overflow-hidden bg-ninja py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-20 top-10 select-none font-display text-[18rem] uppercase leading-none text-white/[0.06]" aria-hidden>
        Hi-ya!
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Contact us</span>
          <h2 className="mt-4 font-display text-6xl uppercase leading-[0.9] text-white sm:text-7xl lg:text-8xl">
            Ready to
            <br />
            get <span className="text-ink">intense?</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/85">
            Questions about classes, parties or camps? Give us a call. It&apos;s the fastest way to
            schedule or check availability.
          </p>

          <a
            href={business.phoneHref}
            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-ink py-3 pl-3 pr-8 text-white transition-transform hover:-translate-y-1"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-ninja transition-transform duration-500 group-hover:rotate-[20deg]">
              <Phone className="h-6 w-6" />
            </span>
            <span className="font-display text-3xl tracking-wide sm:text-4xl">{business.phone}</span>
          </a>

          <div className="mt-10 grid gap-6 text-white sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Visit</p>
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-lg leading-snug hover:underline">
                {business.street}
                <br />
                {business.cityLine}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Email</p>
              <a href={`mailto:${business.email}`} className="mt-2 block text-lg hover:underline">
                {business.email}
              </a>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Waivers</p>
              <p className="mt-1 text-sm text-white/75">
                Please fill out only once. Email confirmation may take up to 24 hours.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={links.youthWaiver} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">
                  Youth waiver
                </a>
                <a href={links.adultWaiver} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Adult waiver
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="rounded-[2rem] bg-ink p-6 shadow-2xl shadow-ink/40 sm:p-8">
            <h3 className="font-display text-3xl uppercase text-white">Send us a message</h3>
            <p className="mt-1 text-sm text-mute">This doesn&apos;t sign you up. We&apos;ll get back to you!</p>

            <fieldset className="mt-6">
              <legend className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">I&apos;m interested in</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setInterest(i)}
                    aria-pressed={interest === i}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      interest === i ? "scale-105 bg-ninja text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" name="name" required placeholder="Your name" className={field} autoComplete="name" />
              <label className="sr-only" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="Phone" className={field} autoComplete="tel" />
              {interest === "Birthday party" && (
                <>
                  <label className="sr-only" htmlFor="date">Preferred party date</label>
                  <input id="date" name="date" type="date" className={`${field} sm:col-span-2 [color-scheme:dark]`} />
                </>
              )}
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Ages, questions, anything we should know…" className={`${field} sm:col-span-2`} />
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-ninja py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-ninja-soft"
            >
              Send message →
            </button>
          </form>
        </Reveal>
      </div>

      <Reveal className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border-4 border-ink/20 bg-ink/20">
          <iframe
            title="Map to Ninja Intensity"
            src={business.mapEmbed}
            className="h-72 w-full grayscale-[0.3] sm:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}
