export type Circle = {
  id: string;
  name: string;
  tagline: string;
  interest: string;
  cadence: string;
  nextGathering: string;
  members: number;
  tone: string;
  host: string;
  hostNote: string;
  location: string;
  whatToExpect: string[];
};

export type Participant = {
  id: string;
  name: string;
  note: string;
  initials: string;
  tint: string;
};

export const circles: Circle[] = [
  {
    id: "sunday-bake",
    name: "Sunday Morning Bake",
    tagline: "Knead dough, trade recipes, leave with warm bread and warmer company.",
    interest: "Baking",
    cadence: "Sundays · 9:30 AM",
    nextGathering: "Sun, Oct 19 · 9:30 AM",
    members: 14,
    tone: "Quiet kitchen energy — flour on the counter, no small talk pressure.",
    host: "Maya Chen",
    hostNote: "I’ve hosted for eight weeks. We always save a loaf for whoever’s new.",
    location: "Maya’s kitchen · Hayes Valley",
    whatToExpect: [
      "Arrive anytime in the first 20 minutes — doors stay open.",
      "We bake one shared recipe, then break into side projects.",
      "Nobody grades your crumbs. Bring an apron if you have one.",
    ],
  },
  {
    id: "bird-walk",
    name: "Neighborhood Bird Walk",
    tagline: "Slow morning loops for people who notice the ordinary sky.",
    interest: "Birding",
    cadence: "Saturdays · 8:00 AM",
    nextGathering: "Sat, Oct 18 · 8:00 AM",
    members: 22,
    tone: "Whispered IDs, borrowed binoculars, coffee after if you want it.",
    host: "Jordan Blake",
    hostNote: "We walk the same creek path. Familiar faces make showing up easier.",
    location: "Mission Creek trailhead",
    whatToExpect: [
      "Beginner-friendly — we’ll name what we see without jargon.",
      "Pace is gentle; sit-outs on benches are welcome.",
      "Optional voice notes shared in the circle after the walk.",
    ],
  },
  {
    id: "story-circle",
    name: "Thursday Story Circle",
    tagline: "Ten minutes each. No performance. Just something true from your week.",
    interest: "Storytelling",
    cadence: "Thursdays · 7:00 PM",
    nextGathering: "Thu, Oct 23 · 7:00 PM",
    members: 11,
    tone: "Soft lamps, one candle, phones face-down.",
    host: "Priya Nair",
    hostNote: "Pass if you need to. Listening counts as belonging here.",
    location: "Online gathering room",
    whatToExpect: [
      "A prompt to start — you can ignore it.",
      "Timers keep shares short so everyone gets airtime.",
      "Optional check-in text the day before if you’re nervous.",
    ],
  },
  {
    id: "repair-cafe",
    name: "Wednesday Repair Café",
    tagline: "Fix lamps, hems, and stubborn zippers beside people who get stuck too.",
    interest: "Making",
    cadence: "Wednesdays · 6:30 PM",
    nextGathering: "Wed, Oct 22 · 6:30 PM",
    members: 18,
    tone: "Tools on tables, patience as the house rule.",
    host: "Luis Ortega",
    hostNote: "Bring the broken thing. Or just come to help someone else’s.",
    location: "Community workshop · Dogpatch",
    whatToExpect: [
      "Stations for sewing, small electronics, and wood touch-ups.",
      "Mentors float — ask twice if you need to.",
      "We close with tea and a show-and-tell of what got saved.",
    ],
  },
];

export const participants: Participant[] = [
  {
    id: "maya",
    name: "Maya",
    note: "Host · always saves you a corner of counter space",
    initials: "MC",
    tint: "#C9E4D8",
  },
  {
    id: "sam",
    name: "Sam",
    note: "Brings extra flour and terrible dad jokes about yeast",
    initials: "SR",
    tint: "#F0D9C8",
  },
  {
    id: "lee",
    name: "Lee",
    note: "Quiet kneader · waves when you join the call",
    initials: "LK",
    tint: "#E2D6F0",
  },
  {
    id: "ana",
    name: "Ana",
    note: "New last week · already asked if you’re coming Sunday",
    initials: "AV",
    tint: "#F5E6B8",
  },
];

export const exploreFeedStatus = {
  /** Toggle in UI via simulated controls for empty/loading/error demos */
  default: "ready" as const,
};

export function getCircle(id: string): Circle | undefined {
  return circles.find((c) => c.id === id);
}
