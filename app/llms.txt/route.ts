// Generates /llms.txt (https://llmstxt.org) from the same data as the site, so AI assistants
// get an accurate plain-text summary of programs, prices and schedules.
// Built at `next build` time. Sections edited in the Google Sheet reach this file on the next deploy.
import {
  business,
  campFaq,
  camps,
  competitions,
  fieldTrips,
  links,
  membershipNotes,
  obstacles,
  openGym,
  parentsNight,
  party,
  programs,
  recovery,
  summerCamp,
  team,
} from "../data";

export const dynamic = "force-static";

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const plain = (s: string) => s.replace(/\*\*/g, "");
const upcoming = <T extends { end: string }>(items: T[]) => {
  const today = new Date().toISOString().slice(0, 10);
  return items.filter((i) => !i.end || i.end >= today);
};

function build() {
  const u = business.url;
  const parts: string[] = [];

  parts.push(`# ${business.name}

> ${business.name} is a ninja warrior gym in Castle Rock, Colorado offering kids, teen and adult ninja warrior classes, parkour, obstacle course race (OCR) training, sports performance, adult fitness (NiFIT), birthday parties, school break and summer camps, open gym, Parents Night Out, competitions, a cold plunge and red light recovery room, corporate team building, and field trips for schools and groups. ${business.serving}

- Address: ${business.street}, ${business.cityLine}
- Phone: ${business.phone}
- Email: ${business.email}
- Website: ${u}
- Map: ${business.mapsUrl}
- Obstacles include: ${obstacles.join(", ")}`);

  parts.push(`## Classes

${programs
  .map(
    (p) => `### ${p.name}: ${p.tagline} (${p.ages})

${p.body.join("\n\n")}

${list(p.highlights)}

Pricing:
${list(p.pricing.map((r) => `${r.price}${r.detail ? ` (${r.detail})` : ""}: ${r.classes.join(", ")}`))}${
      p.schedule ? `\n\nSchedule:\n${list(p.schedule)}` : ""
    }${p.note ? `\n\n${p.note}` : ""}`,
  )
  .join("\n\n")}

Membership notes:
${list(membershipNotes)}`);

  parts.push(`## Birthday Parties

${party.intro}

${party.body}

Pricing:
${list([...party.pricing.map((p) => `${p.label}: ${p.price}`), ...party.extras])}

Included:
${list(party.included)}

Time slots:
${list(party.slots.map((s) => `${s.day}: ${s.times.join(", ")}`))}

Good to know:
${list(party.fine)}

${party.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`);

  const upcomingCamps = upcoming(camps);
  parts.push(`## Camps

School break camps${upcomingCamps.length ? `:\n${list(upcomingCamps.map((c) => `${c.title}: ${c.dates}${c.days ? ` (${c.days})` : ""}`))}` : " run during most school breaks."}

Register: ${links.campRegister}

### ${summerCamp.title}: ${summerCamp.header}

${summerCamp.body}

${list(summerCamp.options.map((o) => `${o.name} (${o.time}): ${o.member} members / ${o.nonMember} non-members`))}

${campFaq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`);

  parts.push(`## Open Gym

${openGym.intro}

${list(openGym.sessions.map((s) => `${s.day} ${s.time}, ${s.who}: ${s.price}`))}

${openGym.note}`);

  parts.push(`## ${parentsNight.header} (${parentsNight.badge})

${plain(parentsNight.body)}

Register: ${parentsNight.href}`);

  const events = upcoming(competitions.events);
  if (events.length) {
    parts.push(`## ${competitions.header}

${events.map((e) => `### ${e.name} (${e.date})\n\n${e.body}\n\nSign up: ${e.href}`).join("\n\n")}`);
  }

  parts.push(`## ${recovery.name}

${recovery.body}

${list(recovery.prices)}`);

  parts.push(`## Team Building

${team.intro}

${team.body}

Session lengths: ${team.durations.join(", ")}

Focus:
${list(team.focus)}

Perfect for:
${list(team.perfectFor)}`);

  parts.push(`## Field Trips

${fieldTrips.intro}

${fieldTrips.body}

Trip lengths: ${fieldTrips.durations.join(", ")}

Focus:
${list(fieldTrips.focus)}

Perfect for:
${list(fieldTrips.perfectFor)}`);

  parts.push(`## Links

- [Home page](${u}/): full site with all of the above
- [Classes](${u}/#classes)
- [Birthday parties](${u}/#parties)
- [Camps](${u}/#camps)
- [Parents Night Out](${u}/#parents-night)
- [Competitions](${u}/#competitions)
- [Recovery room and open gym](${u}/#more)
- [Team building](${u}/#team)
- [Field trips](${u}/#field-trips)
- [Contact and waivers](${u}/#contact)
- [Camp and class registration](${links.campRegister})
- [Youth waiver](${links.youthWaiver})
- [Adult waiver](${links.adultWaiver})

## Optional

${list(Object.entries(business.social).map(([k, v]) => `[${k[0].toUpperCase()}${k.slice(1)}](${v})`))}`);

  return parts.join("\n\n") + "\n";
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
