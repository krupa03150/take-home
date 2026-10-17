"use client";

import type { ReactNode } from "react";
import { useStyletron } from "baseui";
import type { AppScreen } from "@/lib/app-nav";

type Props = {
  screen: AppScreen;
  onFeed: () => void;
  onUpcoming: () => void;
  onCircle: () => void;
  onProfile: () => void;
};

function IconFeed() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <rect x="3" y="4" width="16" height="4" rx="1.5" fill="currentColor" />
      <rect x="3" y="10" width="16" height="4" rx="1.5" fill="currentColor" />
      <rect x="3" y="16" width="11" height="3" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function IconUpcoming() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <rect
        x="3"
        y="4"
        width="16"
        height="15"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 9h16" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7 2.5v3M15 2.5v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCircle() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <circle
        cx="8"
        cy="8"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="15"
        cy="9"
        r="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M2.5 18c1.2-2.8 3.4-4.2 5.5-4.2S12.3 15.2 13.5 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 14.2c1.6.2 3.1 1.3 4.2 3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <circle
        cx="11"
        cy="8"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 18c1.5-3.2 4-4.8 7-4.8S16.5 14.8 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BottomNav({
  screen,
  onFeed,
  onUpcoming,
  onCircle,
  onProfile,
}: Props) {
  const [css, theme] = useStyletron();

  const item = (
    label: string,
    active: boolean,
    onClick: () => void,
    icon: ReactNode,
    annotate?: string,
  ) => (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      data-annotate={annotate}
      className={css({
        flex: 1,
        minHeight: "56px",
        border: "none",
        background: "transparent",
        color: active ? theme.colors.accent : theme.colors.contentSecondary,
        fontSize: "11px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: theme.typography.LabelMedium.fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        ":focus-visible": {
          outline: `2px solid ${theme.colors.accent}`,
          outlineOffset: "-2px",
        },
      })}
    >
      {icon}
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
      {item("Feed", screen === "feed", onFeed, <IconFeed />)}
      {item("Upcoming", screen === "upcoming", onUpcoming, <IconUpcoming />)}
      {item(
        "My Circle",
        screen === "circle",
        onCircle,
        <IconCircle />,
        "nav-circle",
      )}
      {item(
        "Profile",
        screen === "profile",
        onProfile,
        <IconProfile />,
        "nav-profile",
      )}
    </nav>
  );
}
