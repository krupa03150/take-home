"use client";

import Link from "next/link";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const sections = [
  {
    title: "Product intent",
    body: "Common Ground helps Eleanor find recurring interest circles so belonging compounds through familiar faces — not one-off events that reset social courage every week.",
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
    title: "Five-screen loop",
    body: "Explore → Circle Details (sticky Join) → Welcome → Gathering → Reconnect. Each step has one job: discover, commit, arrive, meet, return.",
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
        Separate from Eleanor’s in-app path — open this when you want the why,
        not while walking the five screens.
      </p>

      <ol
        className={css({
          margin: "28px 0 0",
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: "22px",
        })}
      >
        {sections.map((section, index) => (
          <li
            key={section.title}
            className={css({
              paddingBottom: "22px",
              borderBottom: `1px solid ${theme.colors.borderOpaque}`,
            })}
          >
            <p
              className={css({
                margin: 0,
                fontSize: "13px",
                fontWeight: 700,
                color: theme.colors.contentAccent,
              })}
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2
              className={css({
                margin: "6px 0 0",
                fontSize: "20px",
                fontWeight: 700,
                fontFamily: theme.typography.HeadingXSmall.fontFamily,
              })}
            >
              {section.title}
            </h2>
            <p
              className={css({
                margin: "8px 0 0",
                fontSize: "17px",
                lineHeight: 1.55,
                color: theme.colors.contentSecondary,
              })}
            >
              {section.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
