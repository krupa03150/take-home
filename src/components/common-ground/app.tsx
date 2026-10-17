"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useStyletron } from "baseui";
import {
  showsBottomNav,
  type AppScreen,
  type AuthMode,
  type FeedState,
} from "@/lib/app-nav";
import { seedFriends, type CommunityEvent } from "@/lib/data";
import {
  clearSession,
  createEmptyProfile,
  loadSession,
  saveSession,
  type SessionState,
  type UserProfile,
} from "@/lib/session";
import { PhoneShell } from "@/components/common-ground/phone-shell";
import { BottomNav } from "@/components/common-ground/bottom-nav";
import { DesignAnnotations } from "@/components/common-ground/annotations";
import { ScreenLanding } from "@/components/common-ground/screen-landing";
import { ScreenAuth } from "@/components/common-ground/screen-auth";
import { ScreenSetup } from "@/components/common-ground/screen-setup";
import { ScreenFeed } from "@/components/common-ground/screen-feed";
import { ScreenEvent } from "@/components/common-ground/screen-event";
import { ScreenGathering } from "@/components/common-ground/screen-gathering";
import { ScreenProfile } from "@/components/common-ground/screen-profile";

function initialScreen(user: UserProfile | null): AppScreen {
  if (!user) return "landing";
  if (!user.setupComplete) return "setup";
  return "feed";
}

export function CommonGroundApp() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<SessionState>(() => loadSession());
  const [screen, setScreen] = useState<AppScreen>("landing");
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [eventId, setEventId] = useState<string | null>(null);
  const [feedState, setFeedState] = useState<FeedState>("ready");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadSession();
    setSession(loaded);
    setScreen(initialScreen(loaded.user));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSession(session);
  }, [session, hydrated]);

  const go = (next: AppScreen) => {
    startTransition(() => setScreen(next));
  };

  const updateUser = (updater: (user: UserProfile) => UserProfile) => {
    setSession((prev) => {
      if (!prev.user) return prev;
      return { ...prev, user: updater(prev.user) };
    });
  };

  const handleSignUp = (email: string, password: string): string | null => {
    const existing = loadSession();
    if (
      existing.user &&
      existing.user.email === email.trim().toLowerCase()
    ) {
      return "That email already has an account — try signing in.";
    }
    const user = createEmptyProfile(email, password);
    setSession((prev) => ({ ...prev, user }));
    go("setup");
    return null;
  };

  const handleSignIn = (email: string, password: string): string | null => {
    const existing = loadSession();
    if (!existing.user) {
      return "No local account yet — create one with Sign up.";
    }
    if (existing.user.email !== email.trim().toLowerCase()) {
      return "No account for that email on this device.";
    }
    if (existing.user.password !== password) {
      return "Password doesn’t match. (Mock auth — check what you typed.)";
    }
    setSession(existing);
    go(existing.user.setupComplete ? "feed" : "setup");
    return null;
  };

  const handleSetupComplete = (profile: {
    name: string;
    age: string;
    hobby: string;
    interests: string[];
  }) => {
    updateUser((user) => ({
      ...user,
      ...profile,
      setupComplete: true,
    }));
    go("feed");
  };

  const activeEvent =
    session.events.find((e) => e.id === eventId) ?? session.events[0];

  const handleJoin = () => {
    if (!activeEvent || !session.user) return;
    setJoinError(null);
    setJoining(true);
    window.setTimeout(() => {
      const friendIdsForEvent = seedFriends
        .filter((f) => f.metAtEventId === activeEvent.id)
        .map((f) => f.id);
      setSession((prev) => {
        if (!prev.user) return prev;
        const already = prev.user.joinedEventIds.includes(activeEvent.id);
        return {
          ...prev,
          user: {
            ...prev.user,
            joinedEventIds: already
              ? prev.user.joinedEventIds
              : [...prev.user.joinedEventIds, activeEvent.id],
            friendIds: Array.from(
              new Set([...prev.user.friendIds, ...friendIdsForEvent]),
            ),
          },
          events: prev.events.map((e) =>
            e.id === activeEvent.id
              ? { ...e, attendees: e.attendees + (already ? 0 : 1) }
              : e,
          ),
        };
      });
      setJoining(false);
      go("gathering");
    }, 650);
  };

  const handleCreateEvent = (
    draft: Omit<CommunityEvent, "id" | "attendees">,
  ) => {
    const id = `local-${Date.now()}`;
    const event: CommunityEvent = {
      ...draft,
      id,
      attendees: 1,
    };
    setSession((prev) => ({
      ...prev,
      events: [event, ...prev.events],
      user: prev.user
        ? {
            ...prev.user,
            joinedEventIds: [...prev.user.joinedEventIds, id],
          }
        : prev.user,
    }));
    setEventId(id);
    go("event");
  };

  const handleSignOut = () => {
    clearSession();
    setSession({ user: null, events: session.events });
    setEventId(null);
    go("landing");
  };

  if (!hydrated) {
    return (
      <div
        className={css({
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          backgroundColor: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
          fontSize: "17px",
        })}
      >
        Loading Common Ground…
      </div>
    );
  }

  return (
    <div
      className={css({
        minHeight: "100dvh",
        backgroundImage: `radial-gradient(90% 60% at 10% 0%, ${theme.colors.accent600} 0%, transparent 50%), linear-gradient(165deg, #1a1613 0%, #2a2420 45%, #3d342e 100%)`,
        color: theme.colors.contentInversePrimary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        gap: "28px",
        "@media screen and (max-width: 480px)": {
          padding: 0,
          backgroundImage: "none",
          backgroundColor: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
          justifyContent: "stretch",
        },
      })}
    >
      <div
        className={`cg-desktop-label ${css({
          textAlign: "center",
          maxWidth: "420px",
        })}`}
      >
        <p
          className={css({
            margin: 0,
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: theme.colors.accent200,
          })}
        >
          Common Ground
        </p>
        <p
          className={css({
            margin: "8px 0 0",
            fontSize: "15px",
            color: theme.colors.contentInverseSecondary,
          })}
        >
          Mobile-first iPhone preview · 393×852 (also 375)
        </p>
      </div>

      <div
        className={`cg-stage ${css({
          "@media screen and (max-width: 480px)": {
            height: "100%",
          },
        })}`}
      >
        <DesignAnnotations screen={screen} />

        <PhoneShell>
          <div
            className={css({
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              color: theme.colors.contentPrimary,
              backgroundColor: theme.colors.backgroundPrimary,
            })}
          >
            <main
              className={css({
                flex: 1,
                minHeight: 0,
                position: "relative",
                overflow: "hidden",
                color: theme.colors.contentPrimary,
              })}
            >
              {screen === "landing" && (
                <ScreenLanding
                  onSignUp={() => {
                    setAuthMode("signup");
                    go("auth");
                  }}
                  onSignIn={() => {
                    setAuthMode("signin");
                    go("auth");
                  }}
                />
              )}
              {screen === "auth" && (
                <ScreenAuth
                  mode={authMode}
                  onModeChange={setAuthMode}
                  onBack={() => go("landing")}
                  onSignUp={handleSignUp}
                  onSignIn={handleSignIn}
                />
              )}
              {screen === "setup" && session.user && (
                <ScreenSetup
                  initialName={session.user.name}
                  onComplete={handleSetupComplete}
                />
              )}
              {screen === "feed" && session.user && (
                <ScreenFeed
                  userName={session.user.name || "friend"}
                  interests={session.user.interests}
                  events={session.events}
                  joinedEventIds={session.user.joinedEventIds}
                  feedState={feedState}
                  onSetFeedState={setFeedState}
                  onOpenEvent={(id) => {
                    setEventId(id);
                    setJoinError(null);
                    go("event");
                  }}
                  onCreateEvent={handleCreateEvent}
                />
              )}
              {screen === "event" && activeEvent && session.user && (
                <ScreenEvent
                  event={activeEvent}
                  joined={session.user.joinedEventIds.includes(activeEvent.id)}
                  joining={joining}
                  joinError={joinError}
                  onBack={() => go("feed")}
                  onJoin={handleJoin}
                  onEnterGathering={() => go("gathering")}
                />
              )}
              {screen === "gathering" && activeEvent && session.user && (
                <ScreenGathering
                  event={activeEvent}
                  userName={session.user.name}
                  onLeave={() => go("profile")}
                />
              )}
              {screen === "profile" && session.user && (
                <ScreenProfile
                  user={session.user}
                  events={session.events}
                  friends={seedFriends}
                  onOpenEvent={(id) => {
                    setEventId(id);
                    go("event");
                  }}
                  onSignOut={handleSignOut}
                />
              )}
            </main>

            {showsBottomNav(screen) && (
              <BottomNav
                screen={screen}
                onFeed={() => go("feed")}
                onProfile={() => go("profile")}
                onRationale={() => router.push("/rationale")}
              />
            )}
          </div>
        </PhoneShell>
      </div>
    </div>
  );
}
