"use client";

import { useStyletron } from "baseui";
import type { AppScreen } from "@/lib/app-nav";

/** Short, screen-specific lines from Krupa’s FigJam rationale. */
const copy: Partial<Record<AppScreen, { title: string; body: string }[]>> = {
  landing: [
    {
      title: "One job: start",
      body: "Discoverability is obvious; onboarding hurdles stay few. Sign up or sign in — that’s the only job on the first screen.",
    },
  ],
  auth: [
    {
      title: "Low hurdle in",
      body: "Get Eleanor inside something familiar fast. Mock local auth keeps the path short for the prototype.",
    },
  ],
  setup: [
    {
      title: "Interests as the match",
      body: "Name, age, hobby, interests — matching starts from what she cares about, not a profile that asks for everything.",
    },
  ],
  feed: [
    {
      title: "Today / Tomorrow + photos",
      body: "Relative dates match how she plans. Photos make the activity recognizable before she commits.",
    },
    {
      title: "Interest filter — trip removed",
      body: "Filter by what she wants. Activities lean 65+ because mobility removed the trip — the event still has to feel like hers.",
    },
  ],
  event: [
    {
      title: "Know before you join",
      body: "Show who and what first. Meeting strangers is uncomfortable; she wants to know what she’s walking into.",
    },
  ],
  gathering: [
    {
      title: "Virtual, from home",
      body: "The barrier is getting there. Every event is a call she can join without the trip across town.",
    },
  ],
  profile: [
    {
      title: "Reconnection loop",
      body: "Friends she met + events she went to — familiarity is the reason to return and tell someone.",
    },
  ],
};

type Props = { screen: AppScreen };

export function DesignAnnotations({ screen }: Props) {
  const [css, theme] = useStyletron();
  const items = copy[screen] ?? [];

  return (
    <aside
      aria-label="Design annotations for reviewers"
      className={`cg-annotations ${css({
        color: theme.colors.contentInverseSecondary,
      })}`}
    >
      <p
        className={css({
          margin: "0 0 16px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: theme.colors.accent200,
        })}
      >
        Reviewer notes · {screen}
      </p>
      <ol
        className={css({
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: "18px",
        })}
      >
        {items.map((item, index) => (
          <li key={item.title}>
            <p
              className={css({
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: theme.colors.contentInversePrimary,
                fontFamily: theme.typography.HeadingXSmall.fontFamily,
              })}
            >
              {index + 1}. {item.title}
            </p>
            <p
              className={css({
                margin: "6px 0 0",
                fontSize: "14px",
                lineHeight: 1.45,
              })}
            >
              {item.body}
            </p>
          </li>
        ))}
      </ol>
      <p
        className={css({
          margin: "22px 0 0",
          fontSize: "13px",
          lineHeight: 1.4,
          color: theme.colors.contentInverseTertiary,
        })}
      >
        Full writeup in-app under Rationale ·{" "}
        <a
          href="https://www.figma.com/board/x67SZPFAjFQ28HnWdnpcyX/take-home-everlaw"
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            color: theme.colors.accent200,
            fontWeight: 700,
          })}
        >
          FigJam
        </a>
      </p>
    </aside>
  );
}
