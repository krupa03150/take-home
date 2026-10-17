"use client";

import { useStyletron } from "baseui";
import type { AppScreen } from "@/lib/app-nav";

type Props = {
  screen: AppScreen;
  onFeed: () => void;
  onProfile: () => void;
  onRationale: () => void;
};

export function BottomNav({
  screen,
  onFeed,
  onProfile,
  onRationale,
}: Props) {
  const [css, theme] = useStyletron();

  const item = (
    label: string,
    active: boolean,
    onClick: () => void,
  ) => (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={css({
        flex: 1,
        minHeight: "52px",
        border: "none",
        background: "transparent",
        color: active ? theme.colors.accent : theme.colors.contentSecondary,
        fontSize: "13px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: theme.typography.LabelMedium.fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
        ":focus-visible": {
          outline: `2px solid ${theme.colors.accent}`,
          outlineOffset: "-2px",
        },
      })}
    >
      {label}
    </button>
  );

  return (
    <nav
      aria-label="Primary"
      className={css({
        display: "flex",
        borderTop: `1px solid ${theme.colors.borderOpaque}`,
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        flexShrink: 0,
      })}
    >
      {item("Feed", screen === "feed", onFeed)}
      {item("Profile", screen === "profile", onProfile)}
      {item("Rationale", false, onRationale)}
    </nav>
  );
}
