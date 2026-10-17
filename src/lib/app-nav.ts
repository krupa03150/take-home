export type AppScreen =
  | "landing"
  | "auth"
  | "setup"
  | "feed"
  | "event"
  | "gathering"
  | "upcoming"
  | "circle"
  | "profile";

export type AuthMode = "signup" | "signin";

export function showsBottomNav(screen: AppScreen): boolean {
  return (
    screen === "feed" ||
    screen === "upcoming" ||
    screen === "circle" ||
    screen === "profile"
  );
}
