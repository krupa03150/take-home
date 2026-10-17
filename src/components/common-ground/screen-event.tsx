"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { formatEventWhen, type CommunityEvent } from "@/lib/data";
import { PrimaryButton } from "@/components/common-ground/ui";

type Props = {
  event: CommunityEvent;
  joined: boolean;
  joining: boolean;
  joinError: string | null;
  onBack: () => void;
  onJoin: () => void;
  onEnterGathering: () => void;
};

export function ScreenEvent({
  event,
  joined,
  joining,
  joinError,
  onBack,
  onJoin,
  onEnterGathering,
}: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        position: "relative",
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
            height: "188px",
            backgroundColor: theme.colors.backgroundSecondary,
            backgroundImage: `linear-gradient(180deg, rgba(26,22,19,0.15), rgba(26,22,19,0.35)), url(${event.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingTop: "calc(10px + env(safe-area-inset-top, 0px))",
            paddingLeft: "12px",
            paddingRight: "12px",
          })}
        >
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to feed"
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
            marginTop: "-24px",
            backgroundColor: theme.colors.backgroundPrimary,
            color: theme.colors.contentPrimary,
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          })}
        >
          <p
            className={css({
              margin: 0,
              fontSize: "13px",
              fontWeight: 700,
              color: theme.colors.accent600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            })}
          >
            {event.interest} · {event.attendees} going · Virtual
          </p>
          <HeadingLevel>
            <Heading
              styleLevel={3}
              color="contentPrimary"
              className={css({
                marginTop: "8px !important",
                marginBottom: "0 !important",
              })}
            >
              {event.title}
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
            {event.description}
          </p>

          <section className={css({ marginTop: "22px" })}>
            <h2
              className={css({
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: theme.colors.contentPrimary,
              })}
            >
              When
            </h2>
            <p
              className={css({
                margin: "6px 0 0",
                fontSize: "17px",
                fontWeight: 600,
                color: theme.colors.contentPrimary,
              })}
            >
              {formatEventWhen(event)}
            </p>
            <p
              className={css({
                margin: "4px 0 0",
                fontSize: "16px",
                color: theme.colors.contentSecondary,
              })}
            >
              {event.duration} · Hosted by {event.host}
            </p>
          </section>

          <section className={css({ marginTop: "22px" })}>
            <h2
              className={css({
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: theme.colors.contentPrimary,
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
              {event.whatToExpect.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div
        className={css({
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom, 0px))",
          backgroundColor: theme.colors.backgroundPrimary,
          borderTop: `1px solid ${theme.colors.borderOpaque}`,
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
        <PrimaryButton
          onClick={joined ? onEnterGathering : onJoin}
          loading={joining}
        >
          {joined ? "Enter gathering" : "Join event"}
        </PrimaryButton>
      </div>
    </div>
  );
}
