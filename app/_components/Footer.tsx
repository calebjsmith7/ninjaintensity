import Image from "next/image";
import { business, nav } from "../data";
import { SocialIcon } from "./ui";
import { Year } from "./UpcomingOnly";

export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image src="/images/logo.png" alt="Ninja Intensity" width={1000} height={630} className="h-16 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-mute">{business.serving}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm" aria-label="Footer">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-white/70 transition-colors hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="text-sm text-white/70">
            <p className="font-semibold text-white">{business.legalName}</p>
            <p className="mt-2">{business.street}</p>
            <p>{business.cityLine}</p>
            <a href={business.phoneHref} className="mt-2 block hover:text-white">{business.phone}</a>
            <div className="mt-4 flex gap-2">
              {Object.entries(business.social).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition-all hover:-translate-y-1 hover:bg-ninja"
                >
                  <SocialIcon name={name} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>Copyright © Ninja Intensity LLC <Year />. All Rights Reserved.</p>
          <a href="#top" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
