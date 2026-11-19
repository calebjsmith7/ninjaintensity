// All site copy lives here so prices, dates and schedules can be updated in one place.
import type { Media } from "./_components/MediaSlideshow";

export const business = {
  name: "Ninja Intensity",
  legalName: "Ninja Intensity, LLC",
  street: "2275 Manatt Ct.",
  cityLine: "Castle Rock, CO 80104",
  phone: "720-515-4395",
  phoneHref: "tel:+17205154395",
  email: "info@ninjaintensity.com",
  mapsUrl: "https://maps.google.com/?q=2275+Manatt+Ct,+Castle+Rock,+CO+80104",
  mapEmbed:
    "https://www.google.com/maps?q=2275+Manatt+Ct,+Castle+Rock,+CO+80104&output=embed",
  url: "https://www.ninjaintensity.com",
  serving: "Serving Castle Rock, Castle Pines, Parker, Monument and South Denver.",
  social: {
    instagram: "https://www.instagram.com/ninjaintensity",
    facebook: "https://www.facebook.com/ninjaintensity",
    youtube: "https://www.youtube.com/user/ninjaintensity",
    twitter: "https://www.twitter.com/ninjaintensity",
  },
};

export const links = {
  campRegister:
    "https://clients.mindbodyonline.com/classic/ws?studioid=892354&stype=-8&sTG=29&sView=week&sLoc=0",
  parentsNight:
    "https://clients.mindbodyonline.com/classic/ws?studioid=892354&stype=-8&sTG=29&sVT=55&sView=week&sLoc=0",
  youthWaiver: "https://waiver.smartwaiver.com/w/5980bc8c70205/web/",
  adultWaiver: "https://waiver.smartwaiver.com/w/5980bd7536d2f/web",
  beginnerComp: "https://www.ninjamasterapp.com/events/7169-november-beginner-comp",
  nscYouth: "https://www.ninjamasterapp.com/events/7226-ninja-intensity-nsc-youth-qualifier",
};

// Google Sheet that drives the "CMS" sections below (top bar, break camps, summer camp,
// parents night out, competitions). The values in this file are the fallback shown until the
// sheet loads in the browser. See app/_components/SiteContent.tsx.
export const cmsSheetId = "1b5qL8rYaW2DYOY99wc2e-RAmLuv3Tl7j-5GiiZgDEhs";

// Web app URL (ends in /exec) of the Apps Script in google-apps-script/contact-submissions.gs.
// It adds each contact form submission as a row in a private Google Sheet. While this is blank,
// the form falls back to opening the visitor's email app.
export const contactEndpoint =
  "https://script.google.com/macros/s/AKfycby3XVHV-hh8xceP4czz_AyxXMrqDzEW1DK1Jju9MKzRqEAmUSsJNwcUpuRpR7DzdSxyUw/exec";

export const announcement = {
  text: "Thanksgiving Break Camp Nov 23–25 is coming up quick. Spots are limited!",
  href: "#camps",
  end: "2026-11-25", // "" = never hide
};

export const nav = [
  { label: "Classes", href: "#classes" },
  { label: "Parties", href: "#parties" },
  { label: "Camps", href: "#camps" },
  { label: "Parents Night", href: "#parents-night" },
  { label: "Competitions", href: "#competitions" },
  { label: "Team Building", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const obstacles = [
  "Warped Wall",
  "Spider Wall",
  "Salmon Ladder",
  "Rope Climb",
  "Cliffhanger",
  "Parkour Zone",
  "Lache Bars",
  "Ring Swing",
];

export type Program = {
  id: string;
  name: string;
  tagline: string;
  ages: string;
  /** Featured photos/videos, shown as a rotating slideshow. Videos: .mp4 or .webm in /public/videos. */
  media: Media[];
  body: string[];
  highlights: string[];
  /** One row per price. `classes` lists every class that costs this much. */
  pricing: { price: string; detail?: string; classes: string[] }[];
  schedule?: string[];
  note?: string;
};

export const programs: Program[] = [
  {
    id: "ninja",
    name: "Ninja",
    tagline: "Ninja Warrior Classes",
    ages: "Ages 4 → Adults",
    media: [
      { src: "/images/ninja-class.jpg", alt: "Ninja student leaping between hanging obstacles" },
      { src: "/images/home-1.jpg", alt: "Kid swinging across ninja obstacles" },
      { src: "/images/team-2.jpg", alt: "Athlete topping the warped wall" },
    ],
    body: [
      "As seen on American Ninja Warrior, students will be introduced to all of the staple obstacles such as the Warped Wall, Spider Wall, Salmon Ladder, and many more!",
      "Classes are available to kids, teens and adults. Students are instructed on how to complete each obstacle with different techniques. We strive to be one of the best ninja warrior gyms in Colorado!",
    ],
    highlights: [
      "Builds confidence, strength, and focus",
      "Safe, coach-led environment",
      "Perfect outlet after a long school day",
      "Flexible evening class times",
    ],
    pricing: [
      {
        price: "$115/mo",
        detail: "1x week",
        classes: [
          "Pee Wee (4–5)",
          "Mini (6–7)",
          "Beginner Youth (8–12)",
          "Teen (13–17)",
          "Adult",
          "Intermediate*",
        ],
      },
      { price: "$210/mo", detail: "2x week", classes: ["Beginner Youth", "Teen", "Adult"] },
      { price: "$160/mo", detail: "1x week · 90 min", classes: ["Elite*"] },
    ],
    note: "*Intermediate and Elite require a skills test.",
  },
  {
    id: "parkour",
    name: "Parkour",
    tagline: "Parkour Classes",
    ages: "Ages 10+",
    media: [
      { src: "/images/parkour-kong.jpg", alt: "Athlete vaulting over a parkour box" },
      { src: "/images/parkour-area.jpg", alt: "The parkour area" },
    ],
    body: [
      "Parkour is the art of moving from one obstacle to another in a quick, safe and efficient manner. Many ninja warrior athletes have a parkour background.",
      "With our amazing parkour zone and extensive knowledge of coaching and efficient class structure, we promise the best parkour learning environment any location has to offer.",
    ],
    highlights: [
      "Dedicated parkour zone",
      "Vaults, precision jumps & flow",
      "Coach-led progressions",
      "Great base for ninja athletes",
    ],
    pricing: [{ price: "$115/mo", detail: "1x week", classes: ["Beginner Parkour (10+)", "Teen Parkour (13+)"] }],
  },
  {
    id: "ocr",
    name: "OCR",
    tagline: "Obstacle Course Race Training",
    ages: "Ages 13+",
    media: [
      { src: "/images/ocr-rope.jpg", alt: "Athlete climbing a rope during OCR training" },
      { src: "/images/ocr-1.jpg", alt: "OCR athlete climbing over a wall" },
    ],
    body: [
      "Train for any obstacle. Build real strength. Have fun doing it. OCR Training combines strength, conditioning, and obstacle technique to prepare you for races like Spartan, Tough Mudder, and local competitions, while also being an incredible full-body workout.",
      "You'll train on real obstacles in a structured, coach-led environment. We don't just train. You'll be part of a community that pushes each other to get better!",
    ],
    highlights: [
      "Rope climbs & grip strength",
      "Wall techniques & obstacle efficiency",
      "Endurance + functional fitness",
      "Race strategy & pacing",
    ],
    pricing: [{ price: "$115/mo", detail: "1x week", classes: ["OCR Training (13+)"] }],
    schedule: ["Tuesday & Wednesday · 6:45 PM"],
  },
  {
    id: "sports",
    name: "Sports Performance",
    tagline: "Get Faster. Stronger. More Explosive.",
    ages: "Youth & 13+",
    media: [
      { src: "/images/sports-performance.jpg", alt: "Athletes in a sports performance class" },
    ],
    body: [
      "Our Sports Performance program helps athletes of all levels improve speed, strength, agility, and overall athleticism, so they can dominate in their sport.",
      "Football, soccer, basketball, baseball/softball, lacrosse, wrestling and more. If your sport requires speed, strength, and coordination, we've got you covered.",
    ],
    highlights: [
      "Speed & acceleration",
      "Strength & power",
      "Agility & change of direction",
      "Injury prevention & movement mechanics",
    ],
    pricing: [{ price: "$115/mo", detail: "1x week", classes: ["Youth", "13+"] }],
    schedule: ["Youth: Wednesday & Friday · 5:30 PM", "13+: Tuesday & Wednesday · 6:45 PM"],
  },
  {
    id: "nifit",
    name: "NiFIT",
    tagline: "Get Your Workout In While Your Kids Train",
    ages: "Adults",
    media: [
      { src: "/images/nifit-2.jpg", alt: "Adult fitness class at Ninja Intensity" },
      { src: "/images/nifit-1.jpg", alt: "Athlete on a ring swing" },
    ],
    body: [
      "Life is busy. We get it. NiFIT is our group fitness program for adults who want an effective, fun workout in a supportive environment, right here while your kids are in class.",
      "No distractions. No scrolling your phone. No sitting on the sidelines. This is your time. Stop watching practice. Be part of it.",
    ],
    highlights: [
      "Train while your kids are in class",
      "No extra trips to the gym",
      "Built-in schedule keeps you consistent",
      "A motivating community",
    ],
    pricing: [
      { price: "FREE", classes: ["First-time trial class"] },
      { price: "$75", classes: ["6 session pass"] },
      { price: "$140", classes: ["12 session pass"] },
      { price: "$100/mo", classes: ["Unlimited (billed monthly)"] },
    ],
    schedule: ["Monday – Friday · 4:15 PM & 5:30 PM"],
  },
];

export const membershipNotes = [
  "Annual membership fee is $25 (all classes).",
  "30 day cancellation notice. Notice must be given by the 5th of the month to cancel for the following month.",
  "2 class makeups a month are allowed, or a free open gym (up to 2). Makeups must be done in the same month.",
];

export const party = {
  intro:
    "Host your child's birthday party at Ninja Intensity for an unforgettable indoor party filled with ninja obstacles, games, and expert coaching. We handle setup and cleanup so parents can relax while kids have nonstop fun.",
  body: "Each party is led by experienced ninja coaches who guide participants through structured activities while prioritizing safety and fun. Whether your child is celebrating with close friends or a big group, Ninja Intensity is a top choice for active kids birthday parties between Denver and Colorado Springs!",
  pricing: [
    { label: "1–10 Ninjas", price: "$340" },
    { label: "11–18 Ninjas", price: "$450" },
  ],
  extras: ["$20 per ninja after 18", "$50 for an extra coach after 18"],
  included: [
    "Entire gym reserved for your party",
    "At least 2 coaches hosting at all times",
    "Private party room (fridge & freezer)",
    "Set up & clean up",
    "Plastic/paper goods provided",
    "Ninja Intensity bracelets for the party gang",
    "Water bottle for the birthday ninja",
    "Bring your own food and cake",
  ],
  slots: [
    { day: "Friday", times: ["1:30 – 3:30 PM"] },
    { day: "Saturday", times: ["11:00 AM – 1:00 PM", "1:30 – 3:30 PM", "4:00 – 6:00 PM"] },
    { day: "Sunday", times: ["1:30 – 3:30 PM", "4:00 – 6:00 PM"] },
  ],
  fine: [
    "A $100 deposit reserves your date and time slot. Once reserved, the deposit is non-refundable and the date/time can't be changed.",
    "All participants must have a completed waiver before going on any obstacle. Parents or legal guardians must sign for anyone under 18.",
    "Dress to move. Shoes required! No open-toed shoes on obstacles.",
  ],
  faq: [
    { q: "What ages is the birthday party for?", a: "We offer birthday parties for ages five (5) and up." },
    {
      q: "Can I bring my own food and cake?",
      a: "Yes! Every party gets a private party room with a refrigerator and freezer. We decorate it in red and black, but feel free to bring your own decorations.",
    },
    {
      q: "How do I book a birthday party?",
      a: "Give us a call at 720-515-4395 or send us a message below to check availability.",
    },
  ],
};

// Upcoming school break camps. Entries whose `end` date has passed hide automatically ("" = never hide).
export type Camp = { days: string; dates: string; title: string; href: string; end: string };

export const camps: Camp[] = [
  { days: "Mon–Wed", dates: "Nov 23–25", title: "Thanksgiving Break", href: links.campRegister, end: "2026-11-25" },
  { days: "Fri", dates: "Nov 27", title: "Black Friday", href: links.campRegister, end: "2026-11-27" },
  { days: "Mon–Wed", dates: "Dec 21–23", title: "Christmas Break 1", href: links.campRegister, end: "2026-12-23" },
  { days: "", dates: "Dec 28–30", title: "Christmas Break 2", href: links.campRegister, end: "2026-12-30" },
];

export const campFaq = [
  { q: "What ages can attend?", a: "Our camps are typically designed for kids ages 5–12, with activities adapted by age and ability." },
  { q: "Are camps limited?", a: "Yes, each camp has limited spots. Early registration is recommended." },
  { q: "Do kids need prior ninja experience?", a: "No experience is required. Our camps are beginner-friendly and skill-based." },
  {
    q: "What makes our camps different?",
    a: "We combine fitness, obstacle training, and team games, making us a top choice for active kids camps in Castle Rock, CO.",
  },
];

export const summerCamp = {
  title: "Summer camp",
  image: "/images/summer-camp.png",
  header: "Back for 2027",
  body: "Summer camp is back for 2027. Check back soon for weeks!",
  options: [
    { name: "Morning", time: "9:00 AM – 12:00 PM", member: "$225", nonMember: "$250" },
    { name: "All Day", time: "9:00 AM – 3:00 PM", member: "$400", nonMember: "$425" },
  ],
  // Blank hides the register button (e.g. before registration opens).
  href: "",
  end: "", // "" = never hide
};

export const parentsNight = {
  badge: "2nd Saturday monthly",
  header: "Parents Night Out",
  // **double asterisks** render as bold
  body: "6–9 PM. For just **$40 per ninja**, your kids get three hours of fun games and exciting ninja activities. Space is limited and fills up fast!",
  href: links.parentsNight,
  image: "/images/parents-night-2.jpg",
  end: "", // "" = never hide
};

export const openGym = {
  intro: "Open gym is for those who have knowledge of obstacles and are looking for a place to train.",
  sessions: [
    { day: "Friday", time: "6:30–7:30 PM", who: "Ages 5–9", price: "$10" },
    { day: "Friday", time: "7:30–9:00 PM", who: "Ages 10+", price: "$15" },
    { day: "Saturday", time: "6:00–7:30 PM", who: "Ages 5–9", price: "$15" },
    { day: "Saturday", time: "7:30–9:00 PM", who: "Ages 10+", price: "$15" },
    { day: "Sunday", time: "6:00–8:00 PM", who: "Family Night · Ages 5+", price: "$15" },
  ],
  note: "Non-member safety orientation required ($5 additional). No-tolerance rule: break the rules more than twice and you'll be asked to leave.",
};

export const recovery = {
  name: "Ni Recovery Room",
  body: "The perfect place for athletes, parents, and anyone in need of recovery. Our cold plunge helps aid recovery, reduce inflammation and stress, and boost immunity. Red light therapy, backed by over 6,000 published studies, can speed recovery, improve sleep and more.",
  prices: ["$10 for one", "$15 for the combo", "Ask about unlimited monthly"],
};

// Entries whose `end` date has passed hide automatically ("" = never hide).
export type Competition = { name: string; date: string; end: string; body: string; href: string; cta: string };

export const competitions: { header: string; events: Competition[] } = {
  header: "Competitions @ Intensity",
  events: [
    {
      name: "Friday the 13th Beginner Comp",
      date: "Friday, Nov 13 · 6:30 PM",
      end: "2026-11-13",
      body: "A beginner comp for any novice ninja. 7u, 9u, 11u and 13u divisions. A great way to test your skills and have fun (we promise it won't be scary).",
      href: links.beginnerComp,
      cta: "Sign up",
    },
    {
      name: "NSC Youth Qualifier",
      date: "Jan 16 & 17",
      end: "2027-01-17",
      body: "All athletes run the Hybrid and Speed courses, with the top 10 combined in open and female advancing to the Burnout course. Top 3 in each youth group (9U–13U) earn a spot at the NSC Youth West Sectional in Tempe, AZ (June 5–6, 2027).",
      href: links.nscYouth,
      cta: "Schedule & sign up",
    },
  ],
};

export const team = {
  intro:
    "Bring your crew in for a high-energy Ninja Challenge. Fun, competitive, and guaranteed to get everyone laughing, moving, and working together.",
  body: "Our obstacle-based challenges bring teams together through movement, problem-solving, and shared wins, all in a supportive, no-pressure environment. Built for all skill levels, so everyone can jump in.",
  durations: ["1 hr", "1.5 hr", "2 hr", "3 hr"],
  focus: [
    "Communication & collaboration",
    "Leadership development",
    "Problem-solving under pressure",
    "Confidence building",
  ],
  perfectFor: [
    "Corporate team outings",
    "Small businesses & startups",
    "Sales teams & leadership groups",
    "Employee appreciation events",
    "Company retreats",
  ],
};

export const fieldTrips = {
  intro:
    "Bring your class, troop, or group for an action-packed field trip on real American Ninja Warrior obstacles. Active, safe, and something your students will talk about for weeks.",
  body: "Our coaches lead every group through warm-ups, skill stations, and a fun ninja challenge, adapted to every age and ability so everyone gets in on the action. We handle the planning and the coaching; you just bring the crew.",
  durations: ["1 hr", "1.5 hr", "2 hr"],
  focus: [
    "Coach-led, structured activities",
    "Teamwork & encouragement",
    "Confidence through new challenges",
    "Healthy, active fun",
  ],
  perfectFor: [
    "School classes & grade levels",
    "Homeschool groups",
    "Scout troops",
    "Church & youth groups",
    "Sports teams & clubs",
  ],
};

export const gallery = [
  { src: "/images/home-3.jpg", alt: "Athlete diving for a rope in the gym" },
  { src: "/images/home-2.jpg", alt: "Kid climbing a spider wall obstacle" },
  { src: "/images/team-2.jpg", alt: "Athlete topping the warped wall" },
  { src: "/images/home-1.jpg", alt: "Kid swinging across ninja obstacles" },
  { src: "/images/open-gym.jpg", alt: "Training ninja on your own at open gym" },
  { src: "/images/home-4.jpg", alt: "Athlete on hanging grips at Ninja Intensity" },
  { src: "/images/birthday-1.jpg", alt: "Birthday party group flexing in front of the Ninja Intensity sign" },
  { src: "/images/parkour-area.jpg", alt: "The parkour area" },
  { src: "/images/nifit-1.jpg", alt: "Athlete on a ring swing" },
  { src: "/images/ocr-1.jpg", alt: "OCR athlete climbing over a wall" },
];
