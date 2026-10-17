"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import {
  formatEventWhen,
  type CommunityEvent,
} from "@/lib/data";
import { ScreenFrame } from "@/components/common-ground/ui";

type Props = {
  events: CommunityEvent[];
  joinedEventIds: string[];
  onOpenEvent: (id: string) => void;
};

export function ScreenUpcoming({
  events,
  joinedEventIds,
  onOpenEvent,
}: Props) {
  const [css, theme] = useStyletron();
  const upcoming = events
    .filter((e) => joinedEventIds.includes(e.id) && e.dayOffset <= 1)
    .sort((a, b) => a.dayOffset - b.dayOffset || a.timeLabel.localeCompare(b.timeLabel));

  const today = upcoming.filter((e) => e.dayOffset === 0);
  const tomorrow = upcoming.filter((e) => e.dayOffset === 1);

  const section = (label: string, items: CommunityEvent[]) => (
    <section className={css({ marginTop: "22px" })}>
      <h2
        className={css({
          margin: 0,
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: theme.colors.accent600,
        })}
      >
        {label}
      </h2>
      {items.length === 0 ? (
        <p
          className={css({
            margin: "10px 0 0",
            fontSize: "17px",
            color: theme.colors.contentSecondary,
          })}
        >
          Nothing joined for {label.toLowerCase()}.
        </p>
      ) : (
        <ul
          className={css({
            listStyle: "none",
            margin: "12px 0 0",
            padding: 0,
            display: "grid",
            gap: "12px",
          })}
        >
          {items.map((event) => (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => onOpenEvent(event.id)}
                className={css({
                  width: "100%",
                  textAlign: "left",
                  minHeight: "72px",
                  borderRadius: "16px",
                  border: `1px solid ${theme.colors.borderOpaque}`,
                  backgroundColor: theme.colors.backgroundPrimary,
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  fontFamily: theme.typography.ParagraphMedium.fontFamily,
                  ":focus-visible": {
                    outline: `2px solid ${theme.colors.accent}`,
                    outlineOffset: "2px",
                  },
                })}
              >
                <span
                  aria-hidden
                  className={css({
                    width: "84px",
                    flexShrink: 0,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  })}
                />
                <span className={css({ padding: "12px 14px", display: "block" })}>
                  <span
                    className={css({
                      display: "block",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: theme.colors.contentPrimary,
                    })}
                  >
                    {event.title}
                  </span>
                  <span
                    className={css({
                      display: "block",
                      marginTop: "4px",
                      fontSize: "15px",
                      color: theme.colors.contentSecondary,
                    })}
                  >
                    {formatEventWhen(event)} · virtual
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

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
          Upcoming
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
        Events you’ve joined — today and tomorrow.
      </p>

      {joinedEventIds.length === 0 ? (
        <div
          role="status"
          className={css({
            marginTop: "28px",
            padding: "28px 20px",
            borderRadius: "16px",
            backgroundColor: theme.colors.backgroundSecondary,
          })}
        >
          <p
            className={css({
              margin: 0,
              fontSize: "19px",
              fontWeight: 700,
              color: theme.colors.contentPrimary,
            })}
          >
            Nothing coming up yet
          </p>
          <p
            className={css({
              margin: "10px 0 0",
              fontSize: "18px",
              lineHeight: 1.45,
              color: theme.colors.contentSecondary,
            })}
          >
            Join a virtual gathering from the Feed and it will show up here.
          </p>
        </div>
      ) : (
        <>
          {section("Today", today)}
          {section("Tomorrow", tomorrow)}
        </>
      )}
    </ScreenFrame>
  );
}
