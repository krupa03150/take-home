"use client";

import { useStyletron } from "baseui";
import type { AppScreen } from "@/lib/app-nav";

const copy: Partial<Record<AppScreen, { title: string; body: string }[]>> = {
  landing: [
    {
      title: "Brand-first splash",
      body: "Common Ground leads; Sign up / Sign in are the only jobs on the first screen.",
    },
  ],
  auth: [
    {
      title: "Mock local auth",
      body: "Credentials stay in localStorage — enough for a reviewable flow without a backend.",
    },
  ],
  setup: [
    {
      title: "Lightweight profile",
      body: "Name, age, hobby, and interests unlock a ranked virtual events feed.",
    },
  ],
  feed: [
    {
      title: "Virtual events",
      body: "Seeded locally; reviewers can create new events that persist on this device.",
    },
    {
      title: "Edge states",
      body: "Ready / Loading / Empty / Error chips prove resilience without leaving the phone.",
    },
  ],
  event: [
    {
      title: "Sticky join",
      body: "Primary CTA stays pinned above the home indicator while the story scrolls.",
    },
  ],
  gathering: [
    {
      title: "Arrival moment",
      body: "A short simulated call makes joining feel like showing up, not a checkbox.",
    },
  ],
  profile: [
    {
      title: "Belonging compounds",
      body: "Friends made + events attended close the loop after Eleanor leaves a gathering.",
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
    </aside>
  );
}
