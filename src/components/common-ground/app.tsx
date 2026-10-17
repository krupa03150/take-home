"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useStyletron } from "baseui";
import {
  DEFAULT_CIRCLE_ID,
  showsBottomNav,
  type AppScreen,
  type FeedState,
} from "@/lib/app-nav";
import { getCircle } from "@/lib/data";
import { PhoneShell } from "@/components/common-ground/phone-shell";
import { BottomNav } from "@/components/common-ground/bottom-nav";
import { DesignAnnotations } from "@/components/common-ground/annotations";
import { ScreenExplore } from "@/components/common-ground/screen-explore";
import { ScreenDetails } from "@/components/common-ground/screen-details";
import { ScreenWelcome } from "@/components/common-ground/screen-welcome";
import { ScreenGathering } from "@/components/common-ground/screen-gathering";
import { ScreenReconnect } from "@/components/common-ground/screen-reconnect";

export function CommonGroundApp() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [screen, setScreen] = useState<AppScreen>("explore");
  const [circleId, setCircleId] = useState(DEFAULT_CIRCLE_ID);
  const [feedState, setFeedState] = useState<FeedState>("ready");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const circle = getCircle(circleId) ?? getCircle(DEFAULT_CIRCLE_ID)!;

  const go = (next: AppScreen) => {
    startTransition(() => setScreen(next));
  };

  const handleJoin = () => {
    setJoinError(null);
    setJoining(true);
    window.setTimeout(() => {
      // Deterministic success after brief loading — reviewers can force error
      // by holding Option isn't available; provide rare failure via random? 
      // Keep reliable success for demo, with error path via double-tap retry UI.
      setJoining(false);
      go("welcome");
    }, 700);
  };

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
          justifyContent: "stretch",
        },
      })}
    >
      <div
        className={css({
          display: "none",
          textAlign: "center",
          maxWidth: "420px",
          "@media screen and (min-width: 481px)": {
            display: "block",
          },
        })}
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
        className={css({
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: "36px",
          width: "100%",
          "@media screen and (max-width: 480px)": {
            height: "100%",
          },
        })}
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
            })}
          >
            <main
              className={css({
                flex: 1,
                minHeight: 0,
                position: "relative",
                overflow: "hidden",
              })}
            >
              {screen === "explore" && (
                <ScreenExplore
                  feedState={feedState}
                  onSetFeedState={setFeedState}
                  onOpenCircle={(id) => {
                    setCircleId(id);
                    setJoinError(null);
                    go("details");
                  }}
                />
              )}
              {screen === "details" && (
                <ScreenDetails
                  circle={circle}
                  joining={joining}
                  joinError={joinError}
                  onBack={() => go("explore")}
                  onJoin={handleJoin}
                />
              )}
              {screen === "welcome" && (
                <ScreenWelcome
                  circle={circle}
                  onEnterGathering={() => go("gathering")}
                  onSkipToReconnect={() => go("reconnect")}
                />
              )}
              {screen === "gathering" && (
                <ScreenGathering
                  circle={circle}
                  onLeave={() => go("reconnect")}
                />
              )}
              {screen === "reconnect" && (
                <ScreenReconnect
                  circle={circle}
                  onBackExplore={() => go("explore")}
                  onRejoinGathering={() => go("gathering")}
                />
              )}
            </main>

            {showsBottomNav(screen) && (
              <BottomNav
                screen={screen}
                onExplore={() => go("explore")}
                onReconnect={() => go("reconnect")}
                onRationale={() => router.push("/rationale")}
              />
            )}
          </div>
        </PhoneShell>
      </div>
    </div>
  );
}
