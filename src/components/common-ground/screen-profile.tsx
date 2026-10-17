"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { CommunityEvent, Friend } from "@/lib/data";
import type { UserProfile } from "@/lib/session";
import { SecondaryButton, ScreenFrame } from "@/components/common-ground/ui";

type Props = {
  user: UserProfile;
  events: CommunityEvent[];
  friends: Friend[];
  onOpenEvent: (id: string) => void;
  onSignOut: () => void;
};

export function ScreenProfile({
  user,
  events,
  friends,
  onOpenEvent,
  onSignOut,
}: Props) {
  const [css, theme] = useStyletron();
  const attended = events.filter((e) => user.joinedEventIds.includes(e.id));
  const myFriends = friends.filter((f) => user.friendIds.includes(f.id));

  return (
    <ScreenFrame>
      <p
        className={css({
          margin: 0,
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: theme.colors.accent600,
        })}
      >
        Profile
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
          {user.name}
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "8px 0 0",
          fontSize: "17px",
          color: theme.colors.contentSecondary,
          lineHeight: 1.45,
        })}
      >
        {user.age} · {user.hobby}
      </p>
      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "12px",
        })}
      >
        {user.interests.map((interest) => (
          <span
            key={interest}
            className={css({
              minHeight: "36px",
              display: "inline-flex",
              alignItems: "center",
              paddingLeft: "12px",
              paddingRight: "12px",
              borderRadius: "10px",
              backgroundColor: theme.colors.backgroundAccentLight,
              color: theme.colors.accent700,
              fontSize: "14px",
              fontWeight: 600,
            })}
          >
            {interest}
          </span>
        ))}
      </div>

      <section className={css({ marginTop: "28px" })}>
        <h2
          className={css({
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: theme.colors.contentPrimary,
          })}
        >
          Friends you made
        </h2>
        {myFriends.length === 0 ? (
          <p
            className={css({
              margin: "10px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.45,
            })}
          >
            Join a virtual gathering — faces you meet show up here.
          </p>
        ) : (
          <ul
            className={css({
              listStyle: "none",
              margin: "12px 0 0",
              padding: 0,
              display: "grid",
              gap: "10px",
            })}
          >
            {myFriends.map((friend) => (
              <li
                key={friend.id}
                className={css({
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  minHeight: "56px",
                })}
              >
                <span
                  aria-hidden
                  className={css({
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: friend.tint,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: theme.colors.contentPrimary,
                    flexShrink: 0,
                  })}
                >
                  {friend.initials}
                </span>
                <div>
                  <p
                    className={css({
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: theme.colors.contentPrimary,
                    })}
                  >
                    {friend.name}
                  </p>
                  <p
                    className={css({
                      margin: "2px 0 0",
                      fontSize: "14px",
                      color: theme.colors.contentSecondary,
                    })}
                  >
                    {friend.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={css({ marginTop: "28px", paddingBottom: "88px" })}>
        <h2
          className={css({
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: theme.colors.contentPrimary,
          })}
        >
          Events you went to
        </h2>
        {attended.length === 0 ? (
          <p
            className={css({
              margin: "10px 0 16px",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.45,
            })}
          >
            Nothing attended yet. Pick something from the feed.
          </p>
        ) : (
          <ul
            className={css({
              listStyle: "none",
              margin: "12px 0 16px",
              padding: 0,
              display: "grid",
              gap: "10px",
            })}
          >
            {attended.map((event) => (
              <li key={event.id}>
                <button
                  type="button"
                  onClick={() => onOpenEvent(event.id)}
                  className={css({
                    width: "100%",
                    textAlign: "left",
                    minHeight: "56px",
                    borderRadius: "14px",
                    border: `1px solid ${theme.colors.borderOpaque}`,
                    backgroundColor: theme.colors.backgroundPrimary,
                    padding: "12px 14px",
                    cursor: "pointer",
                    fontFamily: theme.typography.ParagraphMedium.fontFamily,
                    ":focus-visible": {
                      outline: `2px solid ${theme.colors.accent}`,
                      outlineOffset: "2px",
                    },
                  })}
                >
                  <span
                    className={css({
                      display: "block",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: theme.colors.contentPrimary,
                    })}
                  >
                    {event.title}
                  </span>
                  <span
                    className={css({
                      display: "block",
                      marginTop: "2px",
                      fontSize: "14px",
                      color: theme.colors.contentSecondary,
                    })}
                  >
                    {event.when}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <SecondaryButton onClick={onSignOut}>Sign out</SecondaryButton>
      </section>
    </ScreenFrame>
  );
}
