"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { Friend } from "@/lib/data";
import {
  expectedNames,
  weeklyGathering,
} from "@/lib/circle";
import { ScreenFrame } from "@/components/common-ground/ui";

type Props = {
  members: Friend[];
  confirmed: boolean;
  onConfirm: () => void;
};

export function ScreenCircle({ members, confirmed, onConfirm }: Props) {
  const [css, theme] = useStyletron();
  const who = expectedNames();

  return (
    <ScreenFrame>
      <HeadingLevel>
        <Heading
          styleLevel={3}
          color="contentPrimary"
          className={css({
            marginTop: "0 !important",
            marginBottom: "0 !important",
          })}
        >
          My Circle
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "8px 0 0",
          fontSize: "18px",
          lineHeight: 1.45,
          color: theme.colors.contentSecondary,
        })}
      >
        Familiar faces from gatherings — and the next week you can plan on.
      </p>

      <section
        aria-label="People in your circle"
        className={css({ marginTop: "22px" })}
      >
        <p
          className={css({
            margin: "0 0 12px",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: theme.colors.contentTertiary,
          })}
        >
          People you know
        </p>
        <ul
          className={css({
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "12px",
          })}
        >
          {members.map((person) => (
            <li
              key={person.id}
              className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "14px 10px",
                borderRadius: "16px",
                backgroundColor: theme.colors.backgroundSecondary,
                minHeight: "120px",
                justifyContent: "center",
              })}
            >
              <span
                aria-hidden
                className={css({
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: person.tint,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: theme.colors.contentPrimary,
                })}
              >
                {person.initials}
              </span>
              <span
                className={css({
                  fontSize: "18px",
                  fontWeight: 700,
                  textAlign: "center",
                  color: theme.colors.contentPrimary,
                  lineHeight: 1.25,
                })}
              >
                {person.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Next weekly gathering"
        className={css({
          marginTop: "24px",
          padding: "20px",
          borderRadius: "18px",
          border: `1.5px solid ${theme.colors.borderOpaque}`,
          backgroundColor: theme.colors.backgroundPrimary,
        })}
      >
        <p
          className={css({
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: theme.colors.accent700,
          })}
        >
          Next weekly gathering
        </p>
        <p
          className={css({
            margin: "10px 0 0",
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.25,
            color: theme.colors.contentPrimary,
          })}
        >
          {weeklyGathering.title}
        </p>
        <p
          className={css({
            margin: "8px 0 0",
            fontSize: "18px",
            lineHeight: 1.4,
            color: theme.colors.contentSecondary,
          })}
        >
          {weeklyGathering.whenLabel}
        </p>
        <p
          className={css({
            margin: "4px 0 0",
            fontSize: "18px",
            lineHeight: 1.4,
            color: theme.colors.contentSecondary,
          })}
        >
          {weeklyGathering.format} · Hosted by {weeklyGathering.host}
        </p>
        <p
          className={css({
            margin: "12px 0 0",
            fontSize: "18px",
            lineHeight: 1.4,
            color: theme.colors.contentPrimary,
          })}
        >
          Expected: {who.join(", ")}
          {who.length > 0 ? ", and you" : "You and familiar faces"}
        </p>

        {confirmed ? (
          <div
            role="status"
            className={css({
              marginTop: "18px",
              minHeight: "56px",
              padding: "14px 16px",
              borderRadius: "14px",
              backgroundColor: theme.colors.backgroundAccentLight,
              border: `2px solid ${theme.colors.accent}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            })}
          >
            <span
              aria-hidden
              className={css({
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: theme.colors.accent,
                color: theme.colors.contentInversePrimary,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "16px",
                flexShrink: 0,
              })}
            >
              ✓
            </span>
            <span
              className={css({
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1.35,
                color: theme.colors.contentPrimary,
              })}
            >
              You’re confirmed for next week. We’ll save you a seat.
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className={css({
              marginTop: "18px",
              width: "100%",
              minHeight: "56px",
              border: "none",
              borderRadius: "14px",
              backgroundColor: theme.colors.brandBackgroundPrimary,
              color: theme.colors.brandContentOnPrimary,
              fontSize: "19px",
              fontWeight: 700,
              fontFamily: theme.typography.LabelLarge.fontFamily,
              cursor: "pointer",
              ":focus-visible": {
                outline: `3px solid ${theme.colors.accent}`,
                outlineOffset: "2px",
              },
            })}
          >
            I’ll be there next week
          </button>
        )}
      </section>
    </ScreenFrame>
  );
}
