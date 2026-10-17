"use client";

import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import type { Circle } from "@/lib/data";

type Props = {
  circle: Circle;
  joining: boolean;
  joinError: string | null;
  onBack: () => void;
  onJoin: () => void;
};

export function ScreenDetails({
  circle,
  joining,
  joinError,
  onBack,
  onJoin,
}: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
      })}
    >
      <div
        className={css({
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "108px",
        })}
      >
        <div
          className={css({
            height: "168px",
            backgroundImage: `linear-gradient(145deg, ${theme.colors.accent600} 0%, ${theme.colors.accent300} 55%, ${theme.colors.accent100} 100%)`,
            paddingTop: "calc(10px + env(safe-area-inset-top, 0px))",
            paddingLeft: "12px",
            paddingRight: "12px",
          })}
        >
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Explore"
            className={css({
              minHeight: "44px",
              minWidth: "44px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "rgba(255,251,245,0.92)",
              color: theme.colors.contentPrimary,
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              paddingLeft: "14px",
              paddingRight: "14px",
              fontFamily: theme.typography.LabelMedium.fontFamily,
              ":focus-visible": {
                outline: `2px solid ${theme.colors.contentInversePrimary}`,
                outlineOffset: "2px",
              },
            })}
          >
            ← Back
          </button>
        </div>

        <div
          className={css({
            padding: "20px",
            marginTop: "-28px",
            backgroundColor: theme.colors.backgroundPrimary,
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
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
            {circle.interest} · {circle.members} members
          </p>
          <HeadingLevel>
            <Heading
              styleLevel={3}
              className={css({
                marginTop: "8px !important",
                marginBottom: "0 !important",
              })}
            >
              {circle.name}
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
            {circle.tagline}
          </p>

          <section className={css({ marginTop: "22px" })}>
            <h2
              className={css({
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: theme.typography.LabelLarge.fontFamily,
              })}
            >
              Next gathering
            </h2>
            <p
              className={css({
                margin: "6px 0 0",
                fontSize: "17px",
                fontWeight: 600,
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

          <section className={css({ marginTop: "22px" })}>
            <h2
              className={css({
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
              })}
            >
              Hosted by {circle.host}
            </h2>
            <p
              className={css({
                margin: "8px 0 0",
                fontSize: "17px",
                lineHeight: 1.5,
                color: theme.colors.contentSecondary,
              })}
            >
              “{circle.hostNote}”
            </p>
          </section>

          <section className={css({ marginTop: "22px" })}>
            <h2
              className={css({
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
              })}
            >
              What to expect
            </h2>
            <ul
              className={css({
                margin: "10px 0 0",
                paddingLeft: "1.15rem",
                fontSize: "17px",
                lineHeight: 1.5,
                color: theme.colors.contentSecondary,
                display: "grid",
                gap: "8px",
              })}
            >
              {circle.whatToExpect.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <p
            className={css({
              margin: "22px 0 0",
              fontSize: "16px",
              lineHeight: 1.45,
              color: theme.colors.contentTertiary,
              fontStyle: "italic",
            })}
          >
            {circle.tone}
          </p>
        </div>
      </div>

      <div
        className={css({
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom, 0px))",
          backgroundImage: `linear-gradient(180deg, transparent, ${theme.colors.backgroundPrimary} 28%)`,
          borderTop: `1px solid ${theme.colors.borderOpaque}`,
          backgroundColor: theme.colors.backgroundPrimary,
        })}
      >
        {joinError && (
          <p
            role="alert"
            className={css({
              margin: "0 0 8px",
              fontSize: "14px",
              color: theme.colors.contentNegative,
            })}
          >
            {joinError}
          </p>
        )}
        <Button
          onClick={onJoin}
          isLoading={joining}
          overrides={{
            BaseButton: {
              style: {
                width: "100%",
                minHeight: "52px",
                backgroundColor: theme.colors.brandBackgroundPrimary,
                color: theme.colors.brandContentOnPrimary,
                fontSize: "17px",
                fontWeight: 700,
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
                borderBottomLeftRadius: "14px",
                borderBottomRightRadius: "14px",
                ":hover": {
                  backgroundColor: theme.colors.accent600,
                },
              },
            },
          }}
        >
          Join Circle
        </Button>
      </div>
    </div>
  );
}
