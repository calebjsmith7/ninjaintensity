"use client";

import { useState } from "react";

export function Faq({ items, light = false }: { items: { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`divide-y rounded-3xl border ${light ? "divide-ink/10 border-ink/10 bg-white" : "divide-white/10 border-white/10 bg-coal"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-semibold sm:px-8"
            >
              <span className={light ? "text-ink" : "text-white"}>{item.q}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-ninja text-white" : light ? "bg-bone text-ink" : "bg-white/10 text-white"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {/* Answers stay in the HTML (collapsed with CSS) so search engines and LLMs can read them. */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <p className={`px-6 pb-6 leading-relaxed sm:px-8 ${light ? "text-ink/70" : "text-mute"}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
