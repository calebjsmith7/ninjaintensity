import Image from "next/image";
import { business, gallery } from "../data";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./ui";

function Row({ items, reverse = false }: { items: typeof gallery; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex w-max gap-4 pr-4 hover:[animation-play-state:paused] ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {doubled.map((img, i) => (
          <div
            key={i}
            className={`relative h-56 shrink-0 overflow-hidden rounded-3xl sm:h-72 ${i % 3 === 0 ? "w-72 sm:w-96" : "w-48 sm:w-60"}`}
          >
            <Image
              src={img.src}
              alt={i < items.length ? img.alt : ""}
              fill
              sizes="384px"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const half = Math.ceil(gallery.length / 2);
  return (
    <section className="relative overflow-hidden bg-ink pt-8 pb-24 sm:pb-32">
      <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 pb-10 sm:px-6">
        <h2 className="font-display text-5xl uppercase leading-[0.95] text-white sm:text-6xl">
          Follow the <span className="text-ninja">fun</span>
        </h2>
        <a
          href={business.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-white transition-colors hover:border-ninja hover:bg-ninja"
        >
          <SocialIcon name="instagram" className="h-5 w-5" />
          <span className="font-semibold">@ninjaintensity</span>
        </a>
      </Reveal>
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row items={gallery.slice(0, half)} />
        <Row items={gallery.slice(half)} reverse />
      </div>
    </section>
  );
}
