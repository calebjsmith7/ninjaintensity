# Ninja Intensity

One-page marketing site for Ninja Intensity (Castle Rock, CO), built with Next.js (static export), Tailwind CSS v4 and Motion.

## Editing content

Almost all copy (prices, schedules, camp dates, competitions, links) lives in [`app/data.ts`](app/data.ts).
Camps and competitions hide themselves automatically once their `end` date passes.
Images are in `public/images/` and are pre-sized; resize new photos to ~1800px max before adding them.

## Develop

```bash
npm run dev     # http://localhost:3000
```

## Build & deploy (Firebase Hosting, static)

```bash
npm run build                 # outputs static site to ./out
npx firebase-tools login      # first time only
npx firebase-tools use --add  # first time only: pick your Firebase project
npx firebase-tools deploy --only hosting
```

`firebase.json` serves `./out` and 301-redirects the old Wix page URLs (e.g. `/birthday-party-places-castle-rock`) to the matching section of the new page.

## Contact form

Static hosting has no server, so the contact form opens the visitor's email app with a pre-filled message to info@ninjaintensity.com.
To collect submissions automatically, swap `onSubmit` in `app/_components/Contact.tsx` for a form service (e.g. Formspree) or a Firebase Function.
