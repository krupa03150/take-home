"use client";

import { useStyletron } from "baseui";

const FIGJAM =
  "https://www.figma.com/board/x67SZPFAjFQ28HnWdnpcyX/take-home-everlaw";

const features = [
  {
    title: "Landing → sign up",
    why: "One job and a low hurdle so Eleanor starts without a long form — MVP auth we can ship locally; business needs her inside the network.",
  },
  {
    title: "Interests in setup",
    why: "Shared interests are the match we can build without ML. They seed relevant groups → more connection → retention.",
  },
  {
    title: "Virtual events feed",
    why: "Photos + interest chips + date filter — recognizable activities without the trip (mobility). Engineering: local catalog + filters.",
  },
  {
    title: "Upcoming",
    why: "Joined events for Today/Tomorrow = recurring time she can plan. Small feature, big return habit.",
  },
  {
    title: "My Circle",
    why: "Familiar faces + next weekly gathering + “I’ll be there,” plus a quiet Message to someone she knows. Assumption: showing up and a short follow-up build a relationship, not a social graph. Engineering: one tab, local threads. Business: recurring attendance → retention.",
  },
  {
    title: "Profile + interests",
    why: "Identity and match stay visible (Instagram-simple). Friends + past events close the reconnection loop for word of mouth.",
  },
];

type Props = {
  open?: boolean;
  onClose?: () => void;
  compact?: boolean;
};

export function RationalePanel({ open = true, onClose, compact }: Props) {
  const [css, theme] = useStyletron();

  if (!open) return null;

  const body = (
    <>
      <p
        className={css({
          margin: "0 0 6px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: theme.colors.accent200,
        })}
      >
        Why this · for reviewers
      </p>
      <p
        className={css({
          margin: "0 0 12px",
          fontSize: "12px",
          lineHeight: 1.4,
          color: theme.colors.contentInverseSecondary,
        })}
      >
        Eleanor, 73 — mobility makes the trip hard. Hypotheses from the FigJam:
        shared interests, virtual quality time, familiarity that compounds.
      </p>
      <ol
        className={css({
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: "10px",
        })}
      >
        {features.map((f, i) => (
          <li key={f.title}>
            <p
              className={css({
                margin: 0,
                fontSize: "13px",
                fontWeight: 700,
                color: theme.colors.contentInversePrimary,
              })}
            >
              {i + 1}. {f.title}
            </p>
            <p
              className={css({
                margin: "3px 0 0",
                fontSize: "11px",
                lineHeight: 1.4,
                color: theme.colors.contentInverseSecondary,
              })}
            >
              {f.why}
            </p>
          </li>
        ))}
      </ol>
      <p
        className={css({
          margin: "12px 0 0",
          fontSize: "11px",
          lineHeight: 1.35,
          color: theme.colors.contentInverseTertiary,
        })}
      >
        Grounded in MVP capacity + business goals (relevant groups → connection
        → retention).{" "}
        <a
          href={FIGJAM}
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            color: theme.colors.accent200,
            fontWeight: 700,
          })}
        >
          FigJam source
        </a>
      </p>
    </>
  );

  if (compact) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Why this design"
        className={css({
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(26,22,19,0.55)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "16px",
        })}
      >
        <div
          className={css({
            width: "100%",
            maxWidth: "420px",
            maxHeight: "80dvh",
            overflowY: "auto",
            backgroundColor: "#2a2420",
            color: theme.colors.contentInversePrimary,
            borderRadius: "20px",
            padding: "20px",
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "flex-end",
            })}
          >
            <button
              type="button"
              aria-label="Close why this"
              onClick={onClose}
              className={css({
                minHeight: "44px",
                minWidth: "44px",
                border: "none",
                background: "transparent",
                color: theme.colors.contentInversePrimary,
                fontSize: "22px",
                cursor: "pointer",
              })}
            >
              ×
            </button>
          </div>
          {body}
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="Design rationale for reviewers"
      className={`cg-annotations ${css({
        width: "220px",
        maxHeight: "min(720px, calc(100dvh - 32px))",
        overflowY: "auto",
        color: theme.colors.contentInverseSecondary,
        padding: "4px 2px 4px 0",
        flexShrink: 0,
        alignSelf: "center",
      })}`}
    >
      {body}
    </aside>
  );
}
