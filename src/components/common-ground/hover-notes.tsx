"use client";

import { useEffect, useState } from "react";
import { useStyletron } from "baseui";

const NOTES: Record<
  string,
  { title: string; body: string }
> = {
  "event-card": {
    title: "Why events look like this",
    body: "Photo + interest + relative date + virtual label: she recognizes the activity before she commits. Assumption: shared interests + no travel. Good bet because the barrier is getting there — we can ship a local catalog with filters, not a venue network.",
  },
  "nav-chats": {
    title: "Why chat exists",
    body: "Familiarity after an event can become a relationship. Not a big social network — a quiet follow-up with someone she already met. Ties to meaningful relationships over follower counts.",
  },
  "nav-profile": {
    title: "Why profile shows interests",
    body: "A dedicated place for her interests keeps matching and identity obvious — what she cares about stays visible, not buried in settings.",
  },
};

/** Desktop-only hover callouts for three annotated targets inside the phone. */
export function HoverNotes() {
  const [css, theme] = useStyletron();
  const [tip, setTip] = useState<{
    key: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 900px)");
    if (narrow.matches) return;

    const onEnter = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-annotate]",
      ) as HTMLElement | null;
      if (!el) return;
      const key = el.getAttribute("data-annotate");
      if (!key || !NOTES[key]) return;
      const r = el.getBoundingClientRect();
      setTip({ key, x: r.right + 12, y: r.top + r.height / 2 });
    };
    const onLeave = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-annotate]",
      );
      if (el) setTip(null);
    };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!tip) return null;
  const note = NOTES[tip.key];
  if (!note) return null;

  return (
    <div
      role="tooltip"
      className={css({
        position: "fixed",
        left: `${Math.min(tip.x, window.innerWidth - 320)}px`,
        top: `${tip.y}px`,
        transform: "translateY(-50%)",
        width: "280px",
        zIndex: 50,
        padding: "14px 16px",
        borderRadius: "14px",
        backgroundColor: "#FFFBF5",
        color: theme.colors.contentPrimary,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        border: `1px solid ${theme.colors.borderOpaque}`,
        pointerEvents: "none",
        "@media (max-width: 900px)": { display: "none" },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      })}
    >
      <p
        className={css({
          margin: 0,
          fontSize: "14px",
          fontWeight: 700,
          color: theme.colors.accent700,
        })}
      >
        {note.title}
      </p>
      <p
        className={css({
          margin: "6px 0 0",
          fontSize: "14px",
          lineHeight: 1.45,
          color: theme.colors.contentSecondary,
        })}
      >
        {note.body}
      </p>
    </div>
  );
}
