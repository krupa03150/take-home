export type CommunityEvent = {
  id: string;
  title: string;
  host: string;
  /** Days from “today” in the demo calendar (0 = today). */
  dayOffset: number;
  timeLabel: string;
  duration: string;
  interest: string;
  description: string;
  attendees: number;
  image: string;
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
  "Memoir",
  "Games",
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function startOfLocalDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function dateFromOffset(dayOffset: number, now = new Date()) {
  const base = startOfLocalDay(now);
  base.setDate(base.getDate() + dayOffset);
  return base;
}

export function formatEventWhen(
  event: Pick<CommunityEvent, "dayOffset" | "timeLabel">,
  now = new Date(),
): string {
  const d = dateFromOffset(event.dayOffset, now);
  const label =
    event.dayOffset === 0
      ? "Today"
      : event.dayOffset === 1
        ? "Tomorrow"
        : `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  return `${label} · ${event.timeLabel}`;
}

export function isWeekendOffset(dayOffset: number, now = new Date()) {
  const day = dateFromOffset(dayOffset, now).getDay();
  return day === 0 || day === 6;
}

/** Next Saturday/Sunday offsets from today (inclusive of today if weekend). */
export function weekendOffsets(now = new Date()): number[] {
  const today = now.getDay();
  const offsets: number[] = [];
  for (let i = 0; i < 8; i += 1) {
    if (isWeekendOffset(i, now)) offsets.push(i);
  }
  // Prefer upcoming weekend; if mid-week and none in 0–1, still return found
  if (today !== 0 && today !== 6) {
    return offsets.filter((o) => o > 0).slice(0, 2);
  }
  return offsets.slice(0, 2);
}

export type DateFilterId = "today" | "tomorrow" | "weekend" | `day-${number}`;

export type DateChip = {
  id: DateFilterId;
  label: string;
  match: (event: CommunityEvent) => boolean;
};

export function buildDateChips(now = new Date()): DateChip[] {
  const chips: DateChip[] = [
    {
      id: "today",
      label: "Today",
      match: (e) => e.dayOffset === 0,
    },
    {
      id: "tomorrow",
      label: "Tomorrow",
      match: (e) => e.dayOffset === 1,
    },
  ];

  // Next named weekdays (+2 .. +4) that aren’t already covered
  for (let offset = 2; offset <= 4; offset += 1) {
    const d = dateFromOffset(offset, now);
    chips.push({
      id: `day-${offset}`,
      label: WEEKDAYS[d.getDay()],
      match: (e) => e.dayOffset === offset,
    });
  }

  chips.push({
    id: "weekend",
    label: "This weekend",
    match: (e) => weekendOffsets(now).includes(e.dayOffset),
  });

  return chips;
}

export const seedEvents: CommunityEvent[] = [
  {
    id: "porch-walk",
    title: "Gentle Morning Walk Club",
    host: "Helen Park",
    dayOffset: 0,
    timeLabel: "9:00 AM",
    duration: "45 min · virtual",
    interest: "Fitness",
    description:
      "Chair-to-standing stretches, then a shared stroll from your block — cameras welcome, pace is yours.",
    attendees: 19,
    image: "/events/walk.jpg",
    whatToExpect: [
      "Seated warm-up first — no one rushes you.",
      "Optional outdoor walk with phone in a pocket.",
      "Cool-down chat with tea if you like.",
    ],
  },
  {
    id: "sunday-bake",
    title: "Sunday Morning Bake",
    host: "Maya Chen",
    dayOffset: 1,
    timeLabel: "9:30 AM",
    duration: "90 min · virtual",
    interest: "Baking",
    description:
      "Knead on camera, trade heirloom recipes, leave with warm bread energy and warmer company.",
    attendees: 14,
    image: "/events/bake.jpg",
    whatToExpect: [
      "Join from your kitchen — apron optional.",
      "One shared recipe, then side projects.",
      "Nobody grades your crumbs.",
    ],
  },
  {
    id: "bird-walk",
    title: "Neighborhood Bird Watch",
    host: "Jordan Blake",
    dayOffset: 0,
    timeLabel: "8:00 AM",
    duration: "60 min · virtual",
    interest: "Birding",
    description:
      "Slow morning IDs from porches and park benches — beginner-friendly, no jargon.",
    attendees: 22,
    image: "/events/birds.jpg",
    whatToExpect: [
      "Borrow binocular tips from the host.",
      "Gentle pace; sit-outs welcome.",
      "Optional voice notes after.",
    ],
  },
  {
    id: "book-club",
    title: "Afternoon Book Club",
    host: "Ruth Alvarez",
    dayOffset: 2,
    timeLabel: "2:00 PM",
    duration: "75 min · virtual",
    interest: "Reading",
    description:
      "Large-print picks, unhurried discussion, and permission to spoil the ending if you need to.",
    attendees: 16,
    image: "/events/book.jpg",
    whatToExpect: [
      "Summary card shared for anyone catching up.",
      "One question at a time — no crosstalk rush.",
      "Optional tea break mid-way.",
    ],
  },
  {
    id: "repair-cafe",
    title: "Wednesday Repair Café",
    host: "Luis Ortega",
    dayOffset: 3,
    timeLabel: "6:30 PM",
    duration: "80 min · virtual",
    interest: "Making",
    description:
      "Fix lamps, hems, and stubborn zippers beside people who get stuck too.",
    attendees: 18,
    image: "/events/repair.jpg",
    whatToExpect: [
      "Stations for sewing and small electronics.",
      "Mentors float — ask twice if you need to.",
      "Show-and-tell of what got saved.",
    ],
  },
  {
    id: "vinyl-hour",
    title: "Vinyl Listening Hour",
    host: "Sam Rivera",
    dayOffset: 4,
    timeLabel: "8:00 PM",
    duration: "60 min · virtual",
    interest: "Music",
    description:
      "One album, lights low, chat between sides. Bring whatever’s on your shelf.",
    attendees: 16,
    image: "/events/music.jpg",
    whatToExpect: [
      "Host queues Side A; guests suggest Side B.",
      "Cameras welcome but not required.",
      "Curiosity only — no dunking on taste.",
    ],
  },
  {
    id: "garden-hour",
    title: "Windowsill Garden Hour",
    host: "Dorothy Kim",
    dayOffset: 1,
    timeLabel: "10:00 AM",
    duration: "55 min · virtual",
    interest: "Gardening",
    description:
      "Herbs on the sill, cuttings swaps, and patient answers for brown-thumb questions.",
    attendees: 21,
    image: "/events/garden.jpg",
    whatToExpect: [
      "Show your plant — or just listen.",
      "Seasonal tips for apartment growers.",
      "Optional seed-mail list after.",
    ],
  },
  {
    id: "memoir-circle",
    title: "Memoir & Memory Circle",
    host: "Priya Nair",
    dayOffset: 2,
    timeLabel: "7:00 PM",
    duration: "70 min · virtual",
    interest: "Memoir",
    description:
      "Ten minutes each for a true story from your life. Pass anytime. Listening counts.",
    attendees: 12,
    image: "/events/memoir.jpg",
    whatToExpect: [
      "A soft prompt — you can ignore it.",
      "Timers keep shares gentle and fair.",
      "No performance, no critique.",
    ],
  },
  {
    id: "chair-yoga",
    title: "Chair Yoga & Breath",
    host: "Ana Voss",
    dayOffset: 0,
    timeLabel: "11:00 AM",
    duration: "40 min · virtual",
    interest: "Fitness",
    description:
      "Gentle movement from a sturdy chair — joints first, breath second, no floor work required.",
    attendees: 27,
    image: "/events/movement.jpg",
    whatToExpect: [
      "Seated options for every shape.",
      "Captions on for breathing cues.",
      "Cool-down with optional stretch straps.",
    ],
  },
  {
    id: "tea-chat",
    title: "Tea & Tuesday Catch-Up",
    host: "Margaret Cole",
    dayOffset: 3,
    timeLabel: "3:30 PM",
    duration: "50 min · virtual",
    interest: "Storytelling",
    description:
      "Bring a mug. Small-group conversation for familiar faces and new neighbors alike.",
    attendees: 15,
    image: "/events/tea.jpg",
    whatToExpect: [
      "Host opens with a light prompt.",
      "Breakout rooms of 4–5 people.",
      "No pressure to turn the camera on.",
    ],
  },
  {
    id: "chess-afternoon",
    title: "Leisurely Chess Afternoon",
    host: "Walter Ng",
    dayOffset: 4,
    timeLabel: "1:00 PM",
    duration: "90 min · virtual",
    interest: "Games",
    description:
      "Friendly matches online — teach a grandchild’s opening, or relearn the Sicilian slowly.",
    attendees: 10,
    image: "/events/chess.jpg",
    whatToExpect: [
      "Pairings by comfort, not ranking.",
      "Hints encouraged.",
      "Spectators welcome with chat.",
    ],
  },
  {
    id: "community-choir",
    title: "Living Room Choir",
    host: "Grace Okonkwo",
    dayOffset: 5,
    timeLabel: "4:00 PM",
    duration: "60 min · virtual",
    interest: "Music",
    description:
      "Familiar hymns and folk songs — mute while you warm up, unmute when you’re ready.",
    attendees: 24,
    image: "/events/choir.jpg",
    whatToExpect: [
      "Lyric sheets shared on screen.",
      "Parts optional; humming counts.",
      "Request a song for next week.",
    ],
  },
  {
    id: "story-circle",
    title: "Thursday Story Circle",
    host: "Priya Nair",
    dayOffset: 5,
    timeLabel: "7:00 PM",
    duration: "75 min · virtual",
    interest: "Storytelling",
    description:
      "Something true from your week. Soft lamps energy — phones face-down if you can.",
    attendees: 11,
    image: "/events/memoir.jpg",
    whatToExpect: [
      "A prompt to start — optional.",
      "Timers so everyone gets airtime.",
      "Pass anytime.",
    ],
  },
  {
    id: "weekend-bake",
    title: "Saturday Sourdough Circle",
    host: "Maya Chen",
    dayOffset: 6,
    timeLabel: "10:00 AM",
    duration: "90 min · virtual",
    interest: "Baking",
    description:
      "Starter stories, slow rises, and a loaf to share with whoever’s new next week.",
    attendees: 17,
    image: "/events/bake.jpg",
    whatToExpect: [
      "Beginner starters welcome.",
      "Troubleshooting for sticky dough.",
      "Recipe card emailed after.",
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
    note: "Memoir Circle host · soft lamps",
    initials: "PN",
    tint: "#F5E6B8",
    metAtEventId: "memoir-circle",
  },
  {
    id: "jordan",
    name: "Jordan Blake",
    note: "Named three sparrows without showing off",
    initials: "JB",
    tint: "#D6E8F0",
    metAtEventId: "bird-walk",
  },
  {
    id: "helen",
    name: "Helen Park",
    note: "Walk Club host · never rushes the pace",
    initials: "HP",
    tint: "#D8E8D4",
    metAtEventId: "porch-walk",
  },
];

export function getSeedEvent(id: string): CommunityEvent | undefined {
  return seedEvents.find((e) => e.id === id);
}

export const DEFAULT_EVENT_IMAGE = "/events/tea.jpg";
