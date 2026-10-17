export type AppScreen =
  | "explore"
  | "details"
  | "welcome"
  | "gathering"
  | "reconnect";

export type FeedState = "ready" | "loading" | "empty" | "error";

export const DEFAULT_CIRCLE_ID = "sunday-bake";

export function showsBottomNav(screen: AppScreen): boolean {
  // Details keeps sticky Join as the sole bottom chrome; Welcome/Gathering are immersive.
  return screen === "explore" || screen === "reconnect";
}
