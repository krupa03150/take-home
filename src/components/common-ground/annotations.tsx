"use client";

import { useStyletron } from "baseui";
import type { AppScreen } from "@/lib/app-nav";

const copy: Record<AppScreen, { title: string; body: string }[]> = {
  explore: [
    {
      title: "Discovery without a dashboard",
      body: "One vertical feed of recurring circles — interest, cadence, and membership count — so Eleanor can choose in a single thumb scroll.",
    },
    {
      title: "Edge-state switches",
      body: "Ready / Loading / Empty / Error chips let reviewers prove resilience without leaving the phone chrome.",
    },
  ],
  details: [
    {
      title: "Sticky Join",
      body: "Primary CTA stays pinned above the home indicator with a 52px hit target while the story scrolls underneath.",
    },
    {
      title: "Host voice",
      body: "A short host note and concrete expectations reduce first-visit anxiety before commitment.",
    },
  ],
  welcome: [
    {
      title: "Membership as a moment",
      body: "Full-screen confirmation names Eleanor and the next gathering so joining feels like arrival, not a settings toggle.",
    },
  ],
  gathering: [
    {
      title: "Large call controls",
      body: "64px circular controls favor touch accuracy over dense desktop toolbars during a simulated group call.",
    },
  ],
  reconnect: [
    {
      title: "Familiarity loop",
      body: "Known faces + next week’s time close the product loop: belonging compounds when the same people return.",
    },
  ],
};

type Props = { screen: AppScreen };

export function DesignAnnotations({ screen }: Props) {
  const [css, theme] = useStyletron();
  const items = copy[screen];

  return (
    <aside
      aria-label="Design annotations for reviewers"
      className={css({
        display: "none",
        width: "280px",
        flexShrink: 0,
        color: theme.colors.contentInverseSecondary,
        "@media screen and (min-width: 960px)": {
          display: "block",
        },
      })}
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
    </aside>
  );
}
