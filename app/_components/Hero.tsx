"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { business } from "../data";
import { Button } from "./ui";

const lines = [
  { words: ["Best", "after"], accent: false },
  { words: ["school", "program"], accent: false },
  { words: ["in", "Castle", "Rock"], accent: true },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bigText = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  let wordIndex = 0;

  return (
    <section
      id="top"
      ref={ref}
      className="noise relative -mt-20 overflow-hidden bg-grid pt-28 pb-20 sm:pt-32 lg:pb-28"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-ninja/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-ninja/10 blur-[100px]" />

      {/* giant outline word */}
      <motion.div
        style={{ x: bigText }}
        className="pointer-events-none absolute bottom-6 left-0 select-none whitespace-nowrap font-display text-[22vw] uppercase leading-none text-white/[0.035]"
        aria-hidden
      >
        Ninja Intensity Ninja Intensity
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ninja opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ninja" />
            </span>
            Ninja Warrior Gym · Castle Rock, CO
          </motion.div>

          <h1 className="mt-6 font-display text-[3.4rem] uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
            {lines.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-1">
                {line.words.map((w) => {
                  const i = wordIndex++;
                  return (
                    <motion.span
                      key={w}
                      initial={{ y: "110%", rotate: 4 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease }}
                      className={`mr-[0.22em] inline-block ${line.accent ? "text-ninja" : ""}`}
                    >
                      {w}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-mute"
          >
            Warped walls, salmon ladders, parkour, parties and camps, coached by people who love
            this stuff. Classes for kids ages 3 and up, teens and adults.{" "}
            <span className="text-white/90">{business.serving}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="#classes">Explore classes</Button>
            <Button href="#parties" variant="ghost">
              Book a birthday party
            </Button>
          </motion.div>
        </div>

        {/* image collage */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.92, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl shadow-black/60"
          >
            <Image
              src="/images/hero-athlete.jpg"
              alt="Ninja athlete hanging from the monkey bars"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, x: -40, rotate: -12 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 1, delay: 0.45, ease }}
            className="absolute bottom-[-6%] left-0 aspect-[4/3] w-[58%] overflow-hidden rounded-3xl border-4 border-ink shadow-2xl shadow-black/60"
          >
            <Image
              src="/images/home-3.jpg"
              alt="Athlete diving for a rope"
              fill
              sizes="(min-width: 1024px) 28vw, 55vw"
              className="object-cover"
            />
          </motion.div>

          {/* floating stickers */}
          <div
            className="absolute -left-2 top-6 animate-float rounded-2xl bg-sun px-4 py-3 font-display text-xl uppercase leading-none text-ink shadow-xl [--r:-8deg] sm:-left-6"
            style={{ animationDelay: "-2s" }}
          >
            Ages 3<span className="text-ninja">+</span>
            <span className="block font-sans text-[10px] font-bold tracking-widest">to adults</span>
          </div>
          <div className="absolute -right-1 top-1/2 animate-float whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-ink shadow-xl [--r:6deg] sm:-right-4 sm:px-5 sm:py-3 sm:text-xs">
            Warped Wall · Salmon Ladder · Spider Wall
          </div>
        </div>
      </div>
    </section>
  );
}
