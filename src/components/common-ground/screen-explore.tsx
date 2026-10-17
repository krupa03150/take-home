"use client";

import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import { Tag, KIND as TAG_KIND, HIERARCHY } from "baseui/tag";
import { circles } from "@/lib/data";
import type { FeedState } from "@/lib/app-nav";

type Props = {
  feedState: FeedState;
  onOpenCircle: (id: string) => void;
  onSetFeedState: (state: FeedState) => void;
};

export function ScreenExplore({
  feedState,
  onOpenCircle,
  onSetFeedState,
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
      <header
        className={css({
          paddingTop: "calc(12px + env(safe-area-inset-top, 0px))",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "12px",
        })}
      >
        <p
          className={css({
            margin: 0,
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: theme.colors.contentAccent,
            fontFamily: theme.typography.LabelMedium.fontFamily,
          })}
        >
          Common Ground
        </p>
        <HeadingLevel>
          <Heading
            styleLevel={3}
            className={css({
              marginTop: "6px !important",
              marginBottom: "0 !important",
              fontFamily: `${theme.typography.HeadingSmall.fontFamily} !important`,
            })}
          >
            Find a circle that meets again next week.
          </Heading>
        </HeadingLevel>
        <p
          className={css({
            margin: "10px 0 0",
            fontSize: "17px",
            lineHeight: 1.45,
            color: theme.colors.contentSecondary,
          })}
        >
          Hi Eleanor — recurring rooms for interests you already love, so showing
          up gets easier every time.
        </p>
      </header>

      <div
        className={css({
          display: "flex",
          gap: "8px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "12px",
          overflowX: "auto",
        })}
        role="group"
        aria-label="Simulate feed states"
      >
        {(
          [
            ["ready", "Ready"],
            ["loading", "Loading"],
            ["empty", "Empty"],
            ["error", "Error"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => onSetFeedState(value)}
            className={css({
              minHeight: "44px",
              paddingLeft: "14px",
              paddingRight: "14px",
              borderRadius: "999px",
              border: `1px solid ${
                feedState === value
                  ? theme.colors.accent
                  : theme.colors.borderOpaque
              }`,
              backgroundColor:
                feedState === value
                  ? theme.colors.backgroundAccentLight
                  : theme.colors.backgroundSecondary,
              color: theme.colors.contentPrimary,
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: theme.typography.LabelMedium.fontFamily,
            })}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className={css({
          flex: 1,
          overflowY: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          WebkitOverflowScrolling: "touch",
        })}
      >
        {feedState === "loading" && (
          <div
            role="status"
            aria-live="polite"
            className={css({
              display: "grid",
              gap: "12px",
            })}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={css({
                  height: "128px",
                  borderRadius: "16px",
                  backgroundColor: theme.colors.backgroundSecondary,
                  animation:
                    "cg-pulse 1.2s ease-in-out infinite alternate",
                  animationDelay: `${i * 0.12}s`,
                })}
              />
            ))}
            <span className="sr-only">Loading circles…</span>
          </div>
        )}

        {feedState === "empty" && (
          <div
            className={css({
              padding: "28px 8px",
              textAlign: "center",
            })}
          >
            <HeadingLevel>
              <Heading styleLevel={5}>No circles nearby yet</Heading>
            </HeadingLevel>
            <p
              className={css({
                margin: "8px 0 16px",
                fontSize: "17px",
                lineHeight: 1.45,
                color: theme.colors.contentSecondary,
              })}
            >
              We’re seeding your neighborhood. Check back Sunday, or tell us what
              you’d host.
            </p>
            <Button onClick={() => onSetFeedState("ready")}>
              Show sample circles
            </Button>
          </div>
        )}

        {feedState === "error" && (
          <div
            role="alert"
            className={css({
              padding: "24px 16px",
              borderRadius: "16px",
              backgroundColor: theme.colors.backgroundNegativeLight,
              color: theme.colors.contentNegative,
            })}
          >
            <p
              className={css({
                margin: "0 0 12px",
                fontSize: "17px",
                fontWeight: 600,
              })}
            >
              Couldn’t load circles
            </p>
            <p
              className={css({
                margin: "0 0 16px",
                fontSize: "16px",
                lineHeight: 1.45,
              })}
            >
              Check your connection and try again. Your place in any circle you
              already joined is safe.
            </p>
            <Button kind="secondary" onClick={() => onSetFeedState("ready")}>
              Retry
            </Button>
          </div>
        )}

        {feedState === "ready" && (
          <ul
            className={css({
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: "14px",
            })}
          >
            {circles.map((circle) => (
              <li key={circle.id}>
                <button
                  type="button"
                  onClick={() => onOpenCircle(circle.id)}
                  className={css({
                    width: "100%",
                    textAlign: "left",
                    border: `1px solid ${theme.colors.borderOpaque}`,
                    borderRadius: "18px",
                    padding: "16px",
                    backgroundColor: theme.colors.backgroundSecondary,
                    cursor: "pointer",
                    minHeight: "44px",
                    color: theme.colors.contentPrimary,
                    ":focus-visible": {
                      outline: `2px solid ${theme.colors.accent}`,
                      outlineOffset: "2px",
                    },
                    "@media (prefers-reduced-motion: no-preference)": {
                      transition: "transform 160ms ease, box-shadow 160ms ease",
                      ":active": { transform: "scale(0.985)" },
                    },
                  })}
                >
                  <div
                    className={css({
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      marginBottom: "8px",
                    })}
                  >
                    <Tag
                      closeable={false}
                      kind={TAG_KIND.accent}
                      hierarchy={HIERARCHY.secondary}
                    >
                      {circle.interest}
                    </Tag>
                    <span
                      className={css({
                        fontSize: "13px",
                        color: theme.colors.contentTertiary,
                        fontWeight: 600,
                        alignSelf: "center",
                      })}
                    >
                      {circle.members} members
                    </span>
                  </div>
                  <p
                    className={css({
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: 700,
                      fontFamily: theme.typography.HeadingXSmall.fontFamily,
                      letterSpacing: "-0.02em",
                    })}
                  >
                    {circle.name}
                  </p>
                  <p
                    className={css({
                      margin: "8px 0 0",
                      fontSize: "16px",
                      lineHeight: 1.45,
                      color: theme.colors.contentSecondary,
                    })}
                  >
                    {circle.tagline}
                  </p>
                  <p
                    className={css({
                      margin: "12px 0 0",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: theme.colors.contentAccent,
                    })}
                  >
                    {circle.cadence}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
