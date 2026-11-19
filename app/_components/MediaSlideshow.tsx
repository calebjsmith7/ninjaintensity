"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export type Media = {
  /** Image or video file, e.g. /images/ninja-class.jpg or /videos/ninja-class.mp4 */
  src: string;
  alt: string;
  /** Still frame shown while a video loads (and instead of it for reduced-motion users). */
  poster?: string;
};

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);

/** How long a photo stays up before moving on. Videos play through once, then move on. */
const PHOTO_MS = 5000;

/**
 * Decorative, auto-advancing stack of photos and/or videos that fills its parent.
 * Every slide stays mounted so cross-fades never flash an unloaded frame.
 */
export function MediaSlideshow({ items, sizes }: { items: Media[]; sizes: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const multiple = items.length > 1;
  const next = () => setIndex((i) => (i + 1) % items.length);

  // Photos advance on a timer; videos advance when they end (see onEnded).
  useEffect(() => {
    if (!multiple || reduceMotion || isVideo(items[index].src)) return;
    const t = setTimeout(next, PHOTO_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, multiple, reduceMotion, items]);

  // Only the visible video plays; it restarts from the top each time it comes around.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && !reduceMotion) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, reduceMotion]);

  return (
    <div className="absolute inset-0" aria-hidden={multiple || undefined}>
      {items.map((m, i) => {
        const active = i === index;
        const cls = `absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          active ? "opacity-100" : "opacity-0"
        }`;
        return isVideo(m.src) ? (
          <video
            key={m.src}
            ref={(el) => {
              videos.current[i] = el;
            }}
            src={m.src}
            poster={m.poster}
            muted
            playsInline
            loop={!multiple}
            preload={i === 0 ? "auto" : "metadata"}
            onEnded={multiple ? next : undefined}
            aria-label={m.alt}
            className={cls}
          />
        ) : (
          <Image key={m.src} src={m.src} alt={m.alt} fill sizes={sizes} className={cls} />
        );
      })}

      {multiple && (
        <div className="absolute right-4 top-5 z-10 flex gap-1.5">
          {items.map((m, i) => (
            <span
              key={m.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
