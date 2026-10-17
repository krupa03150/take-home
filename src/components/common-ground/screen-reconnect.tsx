"use client";

import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import type { Circle } from "@/lib/data";
import { participants } from "@/lib/data";

type Props = {
  circle: Circle;
  onBackExplore: () => void;
  onRejoinGathering: () => void;
};

export function ScreenReconnect({
  circle,
  onBackExplore,
  onRejoinGathering,
}: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
      })}
    >
      <div
        className={css({
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          paddingTop: "calc(16px + env(safe-area-inset-top, 0px))",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "24px",
        })}
      >
        <p
          className={css({
            margin: 0,
            fontSize: "13px",
            fontWeight: 700,
            color: theme.colors.contentAccent,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          })}
        >
          Your circle
        </p>
        <HeadingLevel>
          <Heading
            styleLevel={3}
            className={css({
              marginTop: "8px !important",
              marginBottom: "0 !important",
            })}
          >
            See you next {circle.cadence.split("·")[0].trim()}.
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
          Familiar people make the next yes easier. Here’s who you’ll recognize
          when you return to {circle.name}.
        </p>

        <section className={css({ marginTop: "24px" })}>
          <h2
            className={css({
              margin: "0 0 12px",
              fontSize: "15px",
              fontWeight: 700,
            })}
          >
            People you’ll know
          </h2>
          <ul
            className={css({
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: "10px",
            })}
          >
            {participants.map((person) => (
              <li
                key={person.id}
                className={css({
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "16px",
                  backgroundColor: theme.colors.backgroundSecondary,
                  border: `1px solid ${theme.colors.borderOpaque}`,
                })}
              >
                <div
                  aria-hidden
                  className={css({
                    width: "48px",
                    height: "48px",
                    borderRadius: "999px",
                    backgroundColor: person.tint,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: theme.colors.contentPrimary,
                    flexShrink: 0,
                  })}
                >
                  {person.initials}
                </div>
                <div>
                  <p
                    className={css({
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 700,
                    })}
                  >
                    {person.name}
                  </p>
                  <p
                    className={css({
                      margin: "2px 0 0",
                      fontSize: "15px",
                      lineHeight: 1.4,
                      color: theme.colors.contentSecondary,
                    })}
                  >
                    {person.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={css({
            marginTop: "24px",
            padding: "16px",
            borderRadius: "18px",
            backgroundColor: theme.colors.backgroundAccentLight,
            border: `1px solid ${theme.colors.accent200}`,
          })}
        >
          <h2
            className={css({
              margin: 0,
              fontSize: "15px",
              fontWeight: 700,
              color: theme.colors.contentAccent,
            })}
          >
            Next week
          </h2>
          <p
            className={css({
              margin: "8px 0 0",
              fontSize: "18px",
              fontWeight: 700,
            })}
          >
            {circle.nextGathering}
          </p>
          <p
            className={css({
              margin: "4px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
            })}
          >
            {circle.location}
          </p>
        </section>

        <div
          className={css({
            marginTop: "20px",
            display: "grid",
            gap: "10px",
          })}
        >
          <Button
            onClick={onRejoinGathering}
            overrides={{
              BaseButton: {
                style: {
                  minHeight: "48px",
                  backgroundColor: theme.colors.brandBackgroundPrimary,
                  color: theme.colors.brandContentOnPrimary,
                  fontWeight: 700,
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                  borderBottomLeftRadius: "14px",
                  borderBottomRightRadius: "14px",
                },
              },
            }}
          >
            Rejoin gathering demo
          </Button>
          <Button kind="secondary" onClick={onBackExplore}>
            Back to Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
