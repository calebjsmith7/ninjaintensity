import { obstacles } from "../data";

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-ink" aria-hidden>
      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />
    </svg>
  );
}

export function Marquee() {
  const row = [...obstacles, ...obstacles];
  return (
    <div className="relative z-10 -my-6 py-6" aria-hidden>
      <div className="-rotate-2 overflow-hidden bg-ninja py-4 shadow-2xl shadow-ninja/20">
        <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
          {row.map((o, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
                {o}
              </span>
              <Star />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
