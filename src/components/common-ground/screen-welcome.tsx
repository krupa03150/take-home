"use client";

import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import type { Circle } from "@/lib/data";

type Props = {
  circle: Circle;
  onEnterGathering: () => void;
  onSkipToReconnect: () => void;
};

export function ScreenWelcome({
  circle,
  onEnterGathering,
  onSkipToReconnect,
}: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: "calc(48px + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
        paddingLeft: "24px",
        paddingRight: "24px",
        backgroundImage: `radial-gradient(120% 80% at 20% 0%, ${theme.colors.accent200} 0%, transparent 50%), linear-gradient(180deg, ${theme.colors.backgroundAccentLight} 0%, ${theme.colors.backgroundPrimary} 55%)`,
        color: theme.colors.contentPrimary,
      })}
    >
      <p
        className={css({
          margin: 0,
          fontSize: "14px",
          fontWeight: 700,
          color: theme.colors.contentAccent,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        })}
      >
        You’re in
      </p>
      <HeadingLevel>
        <Heading
          styleLevel={2}
          className={css({
            marginTop: "12px !important",
            marginBottom: "0 !important",
            letterSpacing: "-0.03em",
          })}
        >
          Welcome to {circle.name}, Eleanor.
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "16px 0 0",
          fontSize: "18px",
          lineHeight: 1.5,
          color: theme.colors.contentSecondary,
          maxWidth: "22rem",
        })}
      >
        Your seat is saved for {circle.nextGathering}. The same faces will be
        here — that familiarity is the whole point.
      </p>

      <div
        className={css({
          marginTop: "auto",
          display: "grid",
          gap: "12px",
        })}
      >
        <Button
          onClick={onEnterGathering}
          overrides={{
            BaseButton: {
              style: {
                minHeight: "52px",
                backgroundColor: theme.colors.brandBackgroundPrimary,
                color: theme.colors.brandContentOnPrimary,
                fontSize: "17px",
                fontWeight: 700,
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
                borderBottomLeftRadius: "14px",
                borderBottomRightRadius: "14px",
              },
            },
          }}
        >
          Enter this week’s gathering
        </Button>
        <Button
          kind="secondary"
          onClick={onSkipToReconnect}
          overrides={{
            BaseButton: {
              style: {
                minHeight: "48px",
                fontSize: "16px",
                fontWeight: 600,
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
                borderBottomLeftRadius: "14px",
                borderBottomRightRadius: "14px",
              },
            },
          }}
        >
          Not now — see my circle
        </Button>
      </div>
    </div>
  );
}
