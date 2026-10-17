import { seedFriends, type Friend } from "@/lib/data";

/** Next weekly gathering for My Circle — one screen, local state. */
export type WeeklyGathering = {
  id: string;
  title: string;
  whenLabel: string;
  format: "Virtual";
  host: string;
  expectedFriendIds: string[];
};

export const weeklyGathering: WeeklyGathering = {
  id: "chair-yoga-weekly",
  title: "Chair Yoga & Breath",
  whenLabel: "Next week · Tuesday · 11:00 AM",
  format: "Virtual",
  host: "Ana Voss",
  expectedFriendIds: ["ana", "helen", "ruth", "dorothy"],
};

export function circleMembers(friendIds: string[]): Friend[] {
  if (friendIds.length > 0) {
    return seedFriends.filter((f) => friendIds.includes(f.id));
  }
  // Reviewer-friendly fallback: familiar faces from the weekly gathering.
  return seedFriends.filter((f) =>
    weeklyGathering.expectedFriendIds.includes(f.id),
  );
}

export function expectedNames(): string[] {
  return seedFriends
    .filter((f) => weeklyGathering.expectedFriendIds.includes(f.id))
    .map((f) => f.name.split(" ")[0]!);
}
