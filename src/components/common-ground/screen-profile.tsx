"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import {
  formatEventWhen,
  type CommunityEvent,
  type Friend,
} from "@/lib/data";
import type { UserProfile } from "@/lib/session";
import {
  PrimaryButton,
  SecondaryButton,
  ScreenFrame,
} from "@/components/common-ground/ui";

export type Prefs = {
  largeText: boolean;
  reduceMotion: boolean;
};

type Props = {
  user: UserProfile;
  events: CommunityEvent[];
  friends: Friend[];
  prefs: Prefs;
  onPrefsChange: (prefs: Prefs) => void;
  onOpenEvent: (id: string) => void;
  onSignOut: () => void;
};

export function ScreenProfile({
  user,
  events,
  friends,
  prefs,
  onPrefsChange,
  onOpenEvent,
  onSignOut,
}: Props) {
  const [css, theme] = useStyletron();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const attended = events.filter((e) => user.joinedEventIds.includes(e.id));
  const myFriends = friends.filter((f) => user.friendIds.includes(f.id));
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScreenFrame>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        })}
      >
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
        <button
          type="button"
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
          className={css({
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            border: `1.5px solid ${theme.colors.borderOpaque}`,
            backgroundColor: theme.colors.backgroundPrimary,
            color: theme.colors.contentPrimary,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent}`,
              outlineOffset: "2px",
            },
          })}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <circle
              cx="11"
              cy="11"
              r="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M11 2.5v2.2M11 17.3V19.5M2.5 11h2.2M17.3 11H19.5M4.6 4.6l1.6 1.6M15.8 15.8l1.6 1.6M17.4 4.6l-1.6 1.6M6.2 15.8l-1.6 1.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Instagram-like header */}
      <div
        className={css({
          display: "flex",
          gap: "18px",
          alignItems: "center",
          marginTop: "18px",
        })}
      >
        <div
          aria-hidden
          className={css({
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            backgroundImage: `linear-gradient(145deg, ${theme.colors.accent200}, ${theme.colors.accent500})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 700,
            color: theme.colors.contentInversePrimary,
            flexShrink: 0,
            border: `3px solid ${theme.colors.backgroundPrimary}`,
            boxShadow: `0 0 0 2px ${theme.colors.accent300}`,
          })}
        >
          {initials || "?"}
        </div>
        <div className={css({ minWidth: 0, flex: 1 })}>
          <p
            className={css({
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: theme.colors.contentPrimary,
              fontFamily: theme.typography.HeadingXSmall.fontFamily,
            })}
          >
            {user.name}
          </p>
          <p
            className={css({
              margin: "6px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
            })}
          >
            {user.age} · {user.hobby}
          </p>
          <div
            className={css({
              display: "flex",
              gap: "18px",
              marginTop: "12px",
            })}
          >
            <div>
              <p
                className={css({
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: theme.colors.contentPrimary,
                })}
              >
                {attended.length}
              </p>
              <p
                className={css({
                  margin: 0,
                  fontSize: "14px",
                  color: theme.colors.contentSecondary,
                })}
              >
                Events
              </p>
            </div>
            <div>
              <p
                className={css({
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: theme.colors.contentPrimary,
                })}
              >
                {myFriends.length}
              </p>
              <p
                className={css({
                  margin: 0,
                  fontSize: "14px",
                  color: theme.colors.contentSecondary,
                })}
              >
                Friends
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interests block */}
      <section
        className={css({
          marginTop: "24px",
          padding: "16px",
          borderRadius: "16px",
          backgroundColor: theme.colors.backgroundSecondary,
        })}
      >
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
          Interests
        </h2>
        <p
          className={css({
            margin: "6px 0 0",
            fontSize: "16px",
            color: theme.colors.contentSecondary,
            lineHeight: 1.4,
          })}
        >
          What she cares about — the match for events and people.
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
                minHeight: "40px",
                display: "inline-flex",
                alignItems: "center",
                paddingLeft: "14px",
                paddingRight: "14px",
                borderRadius: "999px",
                backgroundColor: theme.colors.backgroundAccentLight,
                color: theme.colors.accent700,
                fontSize: "15px",
                fontWeight: 700,
              })}
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className={css({ marginTop: "26px" })}>
        <h2
          className={css({
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: theme.colors.contentPrimary,
          })}
        >
          Friends
        </h2>
        {myFriends.length === 0 ? (
          <p
            className={css({
              margin: "10px 0 0",
              fontSize: "17px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.45,
            })}
          >
            Join a gathering — faces you meet show up here.
          </p>
        ) : (
          <div
            className={css({
              display: "flex",
              gap: "14px",
              overflowX: "auto",
              marginTop: "12px",
              paddingBottom: "4px",
            })}
          >
            {myFriends.map((friend) => (
              <div
                key={friend.id}
                className={css({
                  width: "72px",
                  flexShrink: 0,
                  textAlign: "center",
                })}
              >
                <div
                  aria-hidden
                  className={css({
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: friend.tint,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: theme.colors.contentPrimary,
                  })}
                >
                  {friend.initials}
                </div>
                <p
                  className={css({
                    margin: "8px 0 0",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: theme.colors.contentPrimary,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  })}
                >
                  {friend.name.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={css({ marginTop: "26px", paddingBottom: "88px" })}>
        <h2
          className={css({
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: theme.colors.contentPrimary,
          })}
        >
          Events she went to
        </h2>
        {attended.length === 0 ? (
          <p
            className={css({
              margin: "10px 0 0",
              fontSize: "17px",
              color: theme.colors.contentSecondary,
            })}
          >
            Nothing attended yet.
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
                      marginTop: "2px",
                      fontSize: "15px",
                      color: theme.colors.contentSecondary,
                    })}
                  >
                    {formatEventWhen(event)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {settingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Settings"
          className={css({
            position: "absolute",
            inset: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: theme.colors.backgroundOverlay,
          })}
        >
          <div
            className={css({
              backgroundColor: theme.colors.backgroundPrimary,
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding:
                "20px 20px calc(20px + env(safe-area-inset-bottom, 0px))",
            })}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              })}
            >
              <h2
                className={css({
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                })}
              >
                Settings
              </h2>
              <button
                type="button"
                aria-label="Close settings"
                onClick={() => setSettingsOpen(false)}
                className={css({
                  minHeight: "44px",
                  minWidth: "44px",
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                })}
              >
                ×
              </button>
            </div>

            <label
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                minHeight: "56px",
                marginTop: "12px",
                fontSize: "18px",
                color: theme.colors.contentPrimary,
              })}
            >
              Larger text
              <input
                type="checkbox"
                checked={prefs.largeText}
                onChange={(e) =>
                  onPrefsChange({ ...prefs, largeText: e.target.checked })
                }
                className={css({ width: "22px", height: "22px" })}
              />
            </label>
            <label
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                minHeight: "56px",
                fontSize: "18px",
                color: theme.colors.contentPrimary,
              })}
            >
              Reduce motion
              <input
                type="checkbox"
                checked={prefs.reduceMotion}
                onChange={(e) =>
                  onPrefsChange({ ...prefs, reduceMotion: e.target.checked })
                }
                className={css({ width: "22px", height: "22px" })}
              />
            </label>

            <div className={css({ display: "grid", gap: "10px", marginTop: "16px" })}>
              <PrimaryButton
                onClick={() => {
                  setSettingsOpen(false);
                  onSignOut();
                }}
              >
                Sign out
              </PrimaryButton>
              <SecondaryButton onClick={() => setSettingsOpen(false)}>
                Done
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </ScreenFrame>
  );
}
