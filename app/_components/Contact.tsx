"use client";

import { useState, type FormEvent } from "react";
import { business, contactEndpoint, links } from "../data";
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

type Submission = Record<"name" | "email" | "phone" | "interest" | "date" | "message" | "website", string>;

function mailtoHref(s: Submission) {
  const details = [
    `Name: ${s.name}`,
    s.email && `Email: ${s.email}`,
    s.phone && `Phone: ${s.phone}`,
    `Interested in: ${s.interest}`,
    s.date && `Preferred date: ${s.date}`,
  ].filter(Boolean);
  const body = [details.join("\n"), s.message].filter(Boolean).join("\n\n");
  return `mailto:${business.email}?subject=${encodeURIComponent(`Website inquiry: ${s.interest}`)}&body=${encodeURIComponent(body)}`;
}

/**
 * Submissions are posted to a Google Apps Script web app (see google-apps-script/contact-submissions.gs),
 * which adds a row to a private Google Sheet. Until `contactEndpoint` is set, the form opens the
 * visitor's email app with a pre-filled message instead.
 */
export function Contact() {
  const [interest, setInterest] = useState(interests[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [last, setLast] = useState<Submission | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const submission: Submission = {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      interest,
      date: get("date"),
      message: get("message"),
      website: get("website"),
    };

    if (!submission.email && !submission.phone) {
      setStatus("error");
      setError("Please add an email or phone number so we can get back to you.");
      return;
    }

    if (!contactEndpoint) {
      window.location.href = mailtoHref(submission);
      return;
    }

    setStatus("sending");
    setError("");
    setLast(submission);
    try {
      // Plain-text body keeps this a "simple" request, which Apps Script accepts without a CORS preflight.
      const res = await fetch(contactEndpoint, { method: "POST", body: JSON.stringify(submission) });
      const result = (await res.json()) as { ok?: boolean };
      if (!result.ok) throw new Error("Not saved");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Sorry, your message didn't go through.");
    }
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
          {status === "sent" ? (
            <div className="flex min-h-full flex-col justify-center rounded-[2rem] bg-ink p-6 shadow-2xl shadow-ink/40 sm:p-8" role="status">
              <h3 className="font-display text-4xl uppercase text-white">Message sent!</h3>
              <p className="mt-3 text-white/80">
                Thanks for reaching out. We&apos;ll get back to you soon. Need an answer fast? Call us at{" "}
                <a href={business.phoneHref} className="font-semibold text-white underline underline-offset-4">
                  {business.phone}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 self-start rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Send another message
              </button>
            </div>
          ) : (
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
                <input id="name" name="name" required placeholder="Your name" className={`${field} sm:col-span-2`} autoComplete="name" />
                <label className="sr-only" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" className={field} autoComplete="email" />
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
                {/* Spam trap: hidden from people, but bots fill it in. */}
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
              </div>
              {status === "error" && (
                <p className="mt-4 rounded-2xl bg-ninja/15 px-4 py-3 text-sm text-white" role="alert">
                  {error}{" "}
                  {last && error.startsWith("Sorry") && (
                    <>
                      Please{" "}
                      <a href={mailtoHref(last)} className="font-semibold underline underline-offset-4">
                        email us
                      </a>{" "}
                      or call{" "}
                      <a href={business.phoneHref} className="font-semibold underline underline-offset-4">
                        {business.phone}
                      </a>
                      .
                    </>
                  )}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 w-full rounded-full bg-ninja py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-ninja-soft disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message →"}
              </button>
            </form>
          )}
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
