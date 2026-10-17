export type ChatMessage = {
  id: string;
  from: "them" | "me";
  text: string;
};

export type ChatThread = {
  id: string;
  friendId: string;
  name: string;
  initials: string;
  tint: string;
  preview: string;
  metAt: string;
  messages: ChatMessage[];
};

export const seedChats: ChatThread[] = [
  {
    id: "chat-maya",
    friendId: "maya",
    name: "Maya Chen",
    initials: "MC",
    tint: "#C9E4D8",
    preview: "I saved you a corner of counter space for Sunday.",
    metAt: "Sunday Morning Bake",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "So glad you joined bake circle, Eleanor.",
      },
      {
        id: "m2",
        from: "me",
        text: "Me too — I haven’t kneaded dough with company in years.",
      },
      {
        id: "m3",
        from: "them",
        text: "I saved you a corner of counter space for Sunday.",
      },
    ],
  },
  {
    id: "chat-helen",
    friendId: "helen",
    name: "Helen Park",
    initials: "HP",
    tint: "#D8E8D4",
    preview: "Same pace next week — no rushing.",
    metAt: "Gentle Morning Walk Club",
    messages: [
      {
        id: "h1",
        from: "them",
        text: "You kept a lovely steady pace today.",
      },
      {
        id: "h2",
        from: "me",
        text: "Thank you — the chair warm-up helped.",
      },
      {
        id: "h3",
        from: "them",
        text: "Same pace next week — no rushing.",
      },
    ],
  },
  {
    id: "chat-priya",
    friendId: "priya",
    name: "Priya Nair",
    initials: "PN",
    tint: "#F5E6B8",
    preview: "Your garden story stayed with me.",
    metAt: "Memoir & Memory Circle",
    messages: [
      {
        id: "p1",
        from: "them",
        text: "Your garden story stayed with me.",
      },
      {
        id: "p2",
        from: "me",
        text: "I almost passed — thank you for the gentle prompt.",
      },
    ],
  },
  {
    id: "chat-ana",
    friendId: "ana",
    name: "Ana Voss",
    initials: "AV",
    tint: "#E2D6F0",
    preview: "You held that side stretch beautifully.",
    metAt: "Chair Yoga & Breath",
    messages: [
      {
        id: "a1",
        from: "them",
        text: "You held that side stretch beautifully.",
      },
      {
        id: "a2",
        from: "me",
        text: "Thank you — the chair made it feel possible.",
      },
      {
        id: "a3",
        from: "them",
        text: "Same time next week if you’d like company.",
      },
    ],
  },
];
