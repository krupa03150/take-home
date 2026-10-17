export type AppScreen =
  | "landing"
  | "auth"
  | "setup"
  | "feed"
  | "event"
  | "gathering"
  | "profile";

export type AuthMode = "signup" | "signin";

export type FeedState = "ready" | "loading" | "empty" | "error";

export function showsBottomNav(screen: AppScreen): boolean {
  return screen === "feed" || screen === "profile";
}
