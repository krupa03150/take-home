export type AppScreen =
  | "landing"
  | "auth"
  | "setup"
  | "feed"
  | "event"
  | "gathering"
  | "profile";

export type AuthMode = "signup" | "signin";

export function showsBottomNav(screen: AppScreen): boolean {
  return screen === "feed" || screen === "profile";
}
