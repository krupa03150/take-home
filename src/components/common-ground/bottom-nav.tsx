"use client";

import { useStyletron } from "baseui";
import type { AppScreen } from "@/lib/app-nav";

type Props = {
  screen: AppScreen;
  onExplore: () => void;
  onReconnect: () => void;
  onRationale: () => void;
};

export function BottomNav({
  screen,
  onExplore,
  onReconnect,
  onRationale,
}: Props) {
  const [css, theme] = useStyletron();
  const item = (active: boolean) =>
    css({
      flex: 1,
      minHeight: "48px",
      minWidth: "48px",
      border: "none",
      background: "transparent",
      color: active ? theme.colors.accent : theme.colors.contentSecondary,
      fontFamily: theme.typography.LabelMedium.fontFamily,
      fontSize: "12px",
      fontWeight: 600,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2px",
      cursor: "pointer",
      paddingTop: "6px",
      paddingBottom: "calc(6px + env(safe-area-inset-bottom, 0px))",
      ":focus-visible": {
        outline: `2px solid ${theme.colors.accent}`,
        outlineOffset: "-2px",
      },
    });

  return (
    <nav
      aria-label="Primary"
      className={css({
        display: "flex",
        borderTop: `1px solid ${theme.colors.borderOpaque}`,
        backgroundColor: theme.colors.backgroundPrimary,
        flexShrink: 0,
      })}
    >
      <button
        type="button"
        className={item(screen === "explore" || screen === "details")}
        aria-current={
          screen === "explore" || screen === "details" ? "page" : undefined
        }
        onClick={onExplore}
      >
        <span aria-hidden className={css({ fontSize: "18px" })}>
          ◇
        </span>
        Explore
      </button>
      <button
        type="button"
        className={item(screen === "reconnect")}
        aria-current={screen === "reconnect" ? "page" : undefined}
        onClick={onReconnect}
      >
        <span aria-hidden className={css({ fontSize: "18px" })}>
          ○
        </span>
        Circles
      </button>
      <button type="button" className={item(false)} onClick={onRationale}>
        <span aria-hidden className={css({ fontSize: "18px" })}>
          ?
        </span>
        Rationale
      </button>
    </nav>
  );
}
