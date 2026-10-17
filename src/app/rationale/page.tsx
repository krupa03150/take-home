"use client";

import Link from "next/link";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const sections = [
  {
    title: "Product intent",
    body: "Common Ground helps Eleanor find virtual community events she can return to — so belonging compounds through familiar faces, not one-off rooms that reset social courage every week.",
  },
  {
    title: "Why mobile-first",
    body: "The primary artifact is an iPhone flow at 393×852 (also 375). Desktop reviewers see a centered phone preview with optional annotations; the product itself is not a multi-column dashboard.",
  },
  {
    title: "Design system",
    body: "Uber Base Web + Uber Move stay as the component and type system. A warm createLightTheme overlay (stone surfaces, deep sage accent) makes the UI feel approachable and human without abandoning Base Web semantics.",
  },
  {
    title: "Required flow",
    body: "Landing (Sign up / Sign in) → mock Auth → Profile setup (name, age, hobby, interests) → Events feed (seeded + locally creatable virtual events) → Event join / gathering moment → Profile (friends made + events attended).",
  },
  {
    title: "Local-first demo",
    body: "Auth and events persist in localStorage so reviewers can complete the loop without a backend. Design rationale lives on /rationale and in the bottom nav — never cluttering Eleanor’s primary path.",
  },
  {
    title: "Accessibility",
    body: "Touch targets ≥44×44 (primary CTAs 48–64), body copy ~17–18px, focus-visible outlines, semantic alerts for errors, and reduced-motion respect on press feedback.",
  },
];

export default function RationalePage() {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        minHeight: "100dvh",
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        padding:
          "calc(20px + env(safe-area-inset-top, 0px)) 20px calc(32px + env(safe-area-inset-bottom, 0px))",
        maxWidth: "40rem",
        marginLeft: "auto",
        marginRight: "auto",
      })}
    >
      <Link
        href="/"
        className={css({
          display: "inline-flex",
          alignItems: "center",
          minHeight: "44px",
          fontWeight: 700,
          color: theme.colors.contentAccent,
          textDecoration: "none",
          fontSize: "16px",
          ":focus-visible": {
            outline: `2px solid ${theme.colors.accent}`,
            outlineOffset: "2px",
          },
        })}
      >
        ← Back to app
      </Link>

      <HeadingLevel>
        <Heading
          styleLevel={2}
          color="contentPrimary"
          className={css({
            marginTop: "16px !important",
            marginBottom: "0 !important",
          })}
        >
          Design rationale
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "12px 0 0",
          fontSize: "17px",
          lineHeight: 1.5,
          color: theme.colors.contentSecondary,
        })}
      >
        Decisions behind the Common Ground mobile take-home — kept off Eleanor’s
        critical path.
      </p>

      <div
        className={css({
          marginTop: "28px",
          display: "grid",
          gap: "22px",
        })}
      >
        {sections.map((section) => (
          <section key={section.title}>
            <h2
              className={css({
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                color: theme.colors.contentPrimary,
                fontFamily: theme.typography.HeadingXSmall.fontFamily,
              })}
            >
              {section.title}
            </h2>
            <p
              className={css({
                margin: "8px 0 0",
                fontSize: "17px",
                lineHeight: 1.5,
                color: theme.colors.contentSecondary,
              })}
            >
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
