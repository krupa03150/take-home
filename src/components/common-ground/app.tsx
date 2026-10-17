"use client";

import { useEffect, useState, useTransition } from "react";
import { useStyletron } from "baseui";
import { showsBottomNav, type AppScreen } from "@/lib/app-nav";
import { seedFriends, type CommunityEvent } from "@/lib/data";
import { circleMembers } from "@/lib/circle";
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
import { RationalePanel } from "@/components/common-ground/rationale-panel";
import { HoverNotes } from "@/components/common-ground/hover-notes";
import { ScreenLanding } from "@/components/common-ground/screen-landing";
import { ScreenSetup } from "@/components/common-ground/screen-setup";
import { ScreenFeed } from "@/components/common-ground/screen-feed";
import { ScreenEvent } from "@/components/common-ground/screen-event";
import { ScreenGathering } from "@/components/common-ground/screen-gathering";
import { ScreenUpcoming } from "@/components/common-ground/screen-upcoming";
import { ScreenCircle } from "@/components/common-ground/screen-circle";
import {
  ScreenProfile,
  type Prefs,
} from "@/components/common-ground/screen-profile";

function initialScreen(user: UserProfile | null): AppScreen {
  if (!user) return "landing";
  if (!user.setupComplete) return "setup";
  return "feed";
}

export function CommonGroundApp() {
  const [css, theme] = useStyletron();
  const [, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<SessionState>(() => loadSession());
  const [screen, setScreen] = useState<AppScreen>("landing");
  const [eventId, setEventId] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Prefs>({
    largeText: false,
    reduceMotion: false,
  });
  const [whyOpen, setWhyOpen] = useState(false);

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

  useEffect(() => {
    if (prefs.reduceMotion) {
      document.documentElement.dataset.reduceMotion = "true";
    } else {
      delete document.documentElement.dataset.reduceMotion;
    }
  }, [prefs.reduceMotion]);

  const go = (next: AppScreen) => {
    startTransition(() => setScreen(next));
  };

  const updateUser = (updater: (user: UserProfile) => UserProfile) => {
    setSession((prev) => {
      if (!prev.user) return prev;
      return { ...prev, user: updater(prev.user) };
    });
  };

  /** Sign up and Sign in both use the short one-question-per-screen path. */
  const beginOnboarding = () => {
    const user = createEmptyProfile("", "", "");
    setSession((prev) => ({ ...prev, user }));
    go("setup");
  };

  const handleSignIn = () => {
    const existing = loadSession();
    if (existing.user?.setupComplete) {
      setSession(existing);
      go("feed");
      return;
    }
    if (existing.user && !existing.user.setupComplete) {
      setSession(existing);
      go("setup");
      return;
    }
    beginOnboarding();
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
      let friendIdsForEvent = seedFriends
        .filter((f) => f.metAtEventId === activeEvent.id)
        .map((f) => f.id);
      if (friendIdsForEvent.length === 0) {
        friendIdsForEvent = seedFriends.slice(0, 2).map((f) => f.id);
      }
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
    }, prefs.reduceMotion ? 0 : 650);
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

  const handleCircleConfirm = () => {
    updateUser((user) => ({ ...user, circleNextWeekRsvp: true }));
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
          fontSize: "18px",
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
        padding: "12px",
        gap: "0",
        fontSize: prefs.largeText ? "19px" : "18px",
        "@media screen and (max-width: 480px)": {
          padding: 0,
          backgroundImage: "none",
          backgroundColor: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
          justifyContent: "stretch",
        },
      })}
    >
      {/* Narrow viewport: Why this outside Eleanor’s nav */}
      <button
        type="button"
        onClick={() => setWhyOpen(true)}
        className={css({
          display: "none",
          minHeight: "44px",
          paddingLeft: "16px",
          paddingRight: "16px",
          borderRadius: "999px",
          border: `1.5px solid ${theme.colors.borderOpaque}`,
          backgroundColor: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
          fontWeight: 700,
          fontSize: "16px",
          cursor: "pointer",
          "@media screen and (max-width: 900px)": {
            display: "inline-flex",
            alignItems: "center",
            position: "fixed",
            top: "calc(10px + env(safe-area-inset-top, 0px))",
            right: "12px",
            zIndex: 30,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          },
        })}
      >
        Why this
      </button>

      <div
        className={`cg-stage ${css({
          "@media screen and (max-width: 480px)": {
            height: "100%",
          },
        })}`}
      >
        <div
          className={css({
            display: "block",
            "@media screen and (max-width: 900px)": {
              display: "none",
            },
          })}
        >
          <RationalePanel />
        </div>

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
              fontSize: prefs.largeText ? "19px" : undefined,
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
                  onSignUp={beginOnboarding}
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
                  onLeave={() => go("upcoming")}
                />
              )}
              {screen === "upcoming" && session.user && (
                <ScreenUpcoming
                  events={session.events}
                  joinedEventIds={session.user.joinedEventIds}
                  onOpenEvent={(id) => {
                    setEventId(id);
                    go("event");
                  }}
                />
              )}
              {screen === "circle" && session.user && (
                <ScreenCircle
                  members={circleMembers(session.user.friendIds)}
                  confirmed={session.user.circleNextWeekRsvp}
                  onConfirm={handleCircleConfirm}
                />
              )}
              {screen === "profile" && session.user && (
                <ScreenProfile
                  user={session.user}
                  events={session.events}
                  friends={seedFriends}
                  prefs={prefs}
                  onPrefsChange={setPrefs}
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
                onUpcoming={() => go("upcoming")}
                onCircle={() => go("circle")}
                onProfile={() => go("profile")}
              />
            )}
          </div>
        </PhoneShell>

        <HoverNotes />
      </div>

      <RationalePanel
        compact
        open={whyOpen}
        onClose={() => setWhyOpen(false)}
      />
    </div>
  );
}
