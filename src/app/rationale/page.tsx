"use client";

import Link from "next/link";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const FIGJAM =
  "https://www.figma.com/board/x67SZPFAjFQ28HnWdnpcyX/take-home-everlaw";

/** Rationale lives beside the phone on desktop — this route points reviewers there. */
export default function RationalePage() {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        minHeight: "100dvh",
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        padding:
          "calc(24px + env(safe-area-inset-top, 0px)) 20px calc(32px + env(safe-area-inset-bottom, 0px))",
        maxWidth: "36rem",
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
          margin: "14px 0 0",
          fontSize: "18px",
          lineHeight: 1.5,
          color: theme.colors.contentSecondary,
        })}
      >
        Rationale stays <strong>outside</strong> Eleanor’s phone — in the left
        panel on desktop (or the “Why this” control on a narrow screen). It is
        not in her bottom nav.
      </p>
      <p
        className={css({
          margin: "14px 0 0",
          fontSize: "18px",
          lineHeight: 1.5,
          color: theme.colors.contentSecondary,
        })}
      >
        Source:{" "}
        <a
          href={FIGJAM}
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            color: theme.colors.contentAccent,
            fontWeight: 700,
          })}
        >
          take-home-everlaw FigJam
        </a>
      </p>
      <Link
        href="/"
        className={css({
          display: "inline-flex",
          marginTop: "24px",
          minHeight: "48px",
          alignItems: "center",
          paddingLeft: "18px",
          paddingRight: "18px",
          borderRadius: "14px",
          backgroundColor: theme.colors.brandBackgroundPrimary,
          color: theme.colors.brandContentOnPrimary,
          fontWeight: 700,
          textDecoration: "none",
          fontSize: "17px",
        })}
      >
        Open the phone preview
      </Link>
    </div>
  );
}
