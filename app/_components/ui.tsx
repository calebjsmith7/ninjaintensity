import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, dark = true }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${
        dark ? "text-ninja-soft" : "text-ninja"
      }`}
    >
      <span className="h-0.5 w-6 bg-current" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  dark = true,
  center = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}{" "}
        {accent && <span className="text-ninja">{accent}</span>}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-mute" : "text-ink/70"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark";
  external?: boolean;
  className?: string;
}) {
  const styles = {
    primary:
      "bg-ninja text-white shadow-[0_10px_30px_-10px] shadow-ninja/70 hover:bg-ninja-soft",
    ghost: "border border-white/20 text-white hover:border-white hover:bg-white/5",
    light: "bg-white text-ink hover:bg-bone",
    dark: "bg-ink text-white hover:bg-steel",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${styles} ${className}`}
    >
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="m5 10.5 3.2 3L15 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Phone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SocialIcon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
    facebook: (
      <path
        d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
    youtube: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
      </>
    ),
    twitter: (
      <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
