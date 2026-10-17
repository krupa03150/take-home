export type CircleMessage = {
  id: string;
  from: "them" | "me";
  text: string;
};

export type CircleThread = {
  friendId: string;
  starter: string;
  messages: CircleMessage[];
};

const seed: Record<string, CircleThread> = {
  ana: {
    friendId: "ana",
    starter: "Same time next week if you’d like company.",
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
  helen: {
    friendId: "helen",
    starter: "Same pace next week — no rushing.",
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
  ruth: {
    friendId: "ruth",
    starter: "We saved you a soft chair by the lamp.",
    messages: [
      {
        id: "r1",
        from: "them",
        text: "We saved you a soft chair by the lamp.",
      },
    ],
  },
  dorothy: {
    friendId: "dorothy",
    starter: "Your brown-thumb joke made me smile.",
    messages: [
      {
        id: "d1",
        from: "them",
        text: "Your brown-thumb joke made me smile.",
      },
    ],
  },
  maya: {
    friendId: "maya",
    starter: "I saved you a corner of counter space for Sunday.",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "So glad you joined bake circle.",
      },
      {
        id: "m2",
        from: "them",
        text: "I saved you a corner of counter space for Sunday.",
      },
    ],
  },
  priya: {
    friendId: "priya",
    starter: "Your garden story stayed with me.",
    messages: [
      {
        id: "p1",
        from: "them",
        text: "Your garden story stayed with me.",
      },
    ],
  },
};

export function getCircleThread(friendId: string): CircleThread {
  return (
    seed[friendId] ?? {
      friendId,
      starter: "Nice to see a familiar face again.",
      messages: [],
    }
  );
}
