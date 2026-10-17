export type AppScreen =
  | "landing"
  | "auth"
  | "setup"
  | "feed"
  | "event"
  | "gathering"
  | "upcoming"
  | "chats"
  | "chat-thread"
  | "profile";

export type AuthMode = "signup" | "signin";

export function showsBottomNav(screen: AppScreen): boolean {
  return (
    screen === "feed" ||
    screen === "upcoming" ||
    screen === "chats" ||
    screen === "profile"
  );
}
