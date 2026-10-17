"use client";

import { useEffect, useState } from "react";
import { useStyletron } from "baseui";

const NOTES: Record<string, { title: string; body: string }> = {
  "event-card": {
    title: "Why events look like this",
    body: "Photo + interest + relative date + virtual label: she recognizes the activity before she commits. Assumption: shared interests + no travel. Good bet because the barrier is getting there — we can ship a local catalog with filters, not a venue network.",
  },
  "nav-circle": {
    title: "Why My Circle exists",
    body: "Familiar faces, showing up next week (“I’ll be there”), and a quiet message to someone she already knows — relationship, not a social graph. Engineering: one screen + local threads. Business: recurring attendance → retention.",
  },
  "circle-person": {
    title: "Where a gathering becomes a person",
    body: "The face, the shared event, and Message are how familiarity starts — she’ll reach out because she already met them, not because it’s a social network. Business: familiar members who message and come back next week are the growth loop (connection → retention + word of mouth). Thin MVP: one local thread, high meaning.",
  },
  "nav-profile": {
    title: "Why profile shows interests",
    body: "A dedicated place for her interests keeps matching and identity obvious — what she cares about stays visible, not buried in settings.",
  },
};

/**
 * Desktop right-column hover annotations.
 * Lives outside the phone — never overlays the UI.
 */
export function HoverNotes() {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 900px)");
    const syncNarrow = () => {
      if (narrow.matches) setActiveKey(null);
    };
    syncNarrow();
    narrow.addEventListener("change", syncNarrow);

    const onEnter = (e: Event) => {
      if (narrow.matches) return;
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-annotate]",
      ) as HTMLElement | null;
      if (!el) return;
      const key = el.getAttribute("data-annotate");
      if (!key || !NOTES[key]) return;
      setActiveKey(key);
    };
    const onLeave = (e: Event) => {
      if (narrow.matches) return;
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-annotate]",
      );
      if (el) setActiveKey(null);
    };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      narrow.removeEventListener("change", syncNarrow);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  const note = activeKey ? NOTES[activeKey] : null;

  return (
    <aside
      aria-label="Hover annotations"
      aria-live="polite"
      className={`cg-hover-panel ${css({
        width: "240px",
        flexShrink: 0,
        maxHeight: "min(720px, calc(100dvh - 32px))",
        alignSelf: "center",
        color: theme.colors.contentInverseSecondary,
        "@media screen and (max-width: 900px)": {
          display: "none",
        },
      })}`}
    >
      {note ? (
        <div
          className={css({
            padding: "14px 14px",
            borderRadius: "12px",
            backgroundColor: "rgba(255,251,245,0.08)",
            border: `1px solid rgba(255,255,255,0.12)`,
            animation: "cg-fade-in 160ms ease-out",
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          })}
        >
          <p
            className={css({
              margin: 0,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: theme.colors.accent200,
            })}
          >
            On hover
          </p>
          <p
            className={css({
              margin: "8px 0 0",
              fontSize: "14px",
              fontWeight: 700,
              color: theme.colors.contentInversePrimary,
            })}
          >
            {note.title}
          </p>
          <p
            className={css({
              margin: "6px 0 0",
              fontSize: "13px",
              lineHeight: 1.45,
              color: theme.colors.contentInverseSecondary,
            })}
          >
            {note.body}
          </p>
        </div>
      ) : (
        <div
          className={css({
            padding: "14px",
            borderRadius: "12px",
            border: "1px dashed rgba(255,255,255,0.18)",
            color: theme.colors.contentInverseTertiary,
            fontSize: "13px",
            lineHeight: 1.4,
          })}
        >
          Hover a person in My Circle, an event card, or Profile to see the
          note here.
        </div>
      )}
    </aside>
  );
}
