export type CommunityEvent = {
  id: string;
  title: string;
  host: string;
  when: string;
  duration: string;
  interest: string;
  description: string;
  attendees: number;
  whatToExpect: string[];
};

export type Friend = {
  id: string;
  name: string;
  note: string;
  initials: string;
  tint: string;
  metAtEventId: string;
};

export const INTEREST_OPTIONS = [
  "Baking",
  "Birding",
  "Storytelling",
  "Making",
  "Music",
  "Fitness",
  "Reading",
  "Gardening",
] as const;

export const seedEvents: CommunityEvent[] = [
  {
    id: "sunday-bake",
    title: "Sunday Morning Bake",
    host: "Maya Chen",
    when: "Sun, Oct 19 · 9:30 AM",
    duration: "90 min · virtual",
    interest: "Baking",
    description:
      "Knead dough on camera, trade recipes, leave with warm bread energy and warmer company.",
    attendees: 14,
    whatToExpect: [
      "Join from your kitchen — apron optional, camera optional after intros.",
      "One shared recipe, then side projects in breakout rooms.",
      "Nobody grades your crumbs.",
    ],
  },
  {
    id: "bird-walk",
    title: "Neighborhood Bird Walk",
    host: "Jordan Blake",
    when: "Sat, Oct 18 · 8:00 AM",
    duration: "60 min · virtual",
    interest: "Birding",
    description:
      "Slow morning loops for people who notice the ordinary sky — shared from porches and park benches.",
    attendees: 22,
    whatToExpect: [
      "Beginner-friendly IDs without jargon.",
      "Gentle pace; mute and listen whenever you need.",
      "Optional voice notes after the walk.",
    ],
  },
  {
    id: "story-circle",
    title: "Thursday Story Circle",
    host: "Priya Nair",
    when: "Thu, Oct 23 · 7:00 PM",
    duration: "75 min · virtual",
    interest: "Storytelling",
    description:
      "Ten minutes each. No performance. Just something true from your week.",
    attendees: 11,
    whatToExpect: [
      "A prompt to start — you can ignore it.",
      "Timers keep shares short so everyone gets airtime.",
      "Pass anytime. Listening counts.",
    ],
  },
  {
    id: "repair-cafe",
    title: "Wednesday Repair Café",
    host: "Luis Ortega",
    when: "Wed, Oct 22 · 6:30 PM",
    duration: "80 min · virtual",
    interest: "Making",
    description:
      "Fix lamps, hems, and stubborn zippers beside people who get stuck too — cameras pointed at the workbench.",
    attendees: 18,
    whatToExpect: [
      "Stations for sewing, small electronics, and wood touch-ups.",
      "Mentors float on the call — ask twice if you need to.",
      "Close with a show-and-tell of what got saved.",
    ],
  },
  {
    id: "vinyl-hour",
    title: "Vinyl Listening Hour",
    host: "Sam Rivera",
    when: "Fri, Oct 24 · 8:00 PM",
    duration: "60 min · virtual",
    interest: "Music",
    description:
      "One album, lights low, chat between sides. Bring whatever’s on your shelf.",
    attendees: 16,
    whatToExpect: [
      "Host queues Side A; guests suggest Side B.",
      "Cameras welcome but not required.",
      "No dunking on taste — curiosity only.",
    ],
  },
];

export const seedFriends: Friend[] = [
  {
    id: "maya",
    name: "Maya Chen",
    note: "Host of Sunday Morning Bake",
    initials: "MC",
    tint: "#C9E4D8",
    metAtEventId: "sunday-bake",
  },
  {
    id: "sam",
    name: "Sam Rivera",
    note: "Brought flour jokes to the bake",
    initials: "SR",
    tint: "#F0D9C8",
    metAtEventId: "sunday-bake",
  },
  {
    id: "lee",
    name: "Lee Kim",
    note: "Quiet kneader who waved first",
    initials: "LK",
    tint: "#E2D6F0",
    metAtEventId: "sunday-bake",
  },
  {
    id: "priya",
    name: "Priya Nair",
    note: "Story Circle host · soft lamps energy",
    initials: "PN",
    tint: "#F5E6B8",
    metAtEventId: "story-circle",
  },
  {
    id: "jordan",
    name: "Jordan Blake",
    note: "Named three sparrows without showing off",
    initials: "JB",
    tint: "#D6E8F0",
    metAtEventId: "bird-walk",
  },
];

export function getSeedEvent(id: string): CommunityEvent | undefined {
  return seedEvents.find((e) => e.id === id);
}
