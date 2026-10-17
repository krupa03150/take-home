"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { FeedState } from "@/lib/app-nav";
import type { CommunityEvent } from "@/lib/data";
import {
  ErrorText,
  Field,
  PrimaryButton,
  SecondaryButton,
  ScreenFrame,
} from "@/components/common-ground/ui";

type Props = {
  userName: string;
  interests: string[];
  events: CommunityEvent[];
  joinedEventIds: string[];
  feedState: FeedState;
  onSetFeedState: (state: FeedState) => void;
  onOpenEvent: (id: string) => void;
  onCreateEvent: (event: Omit<CommunityEvent, "id" | "attendees">) => void;
};

export function ScreenFeed({
  userName,
  interests,
  events,
  joinedEventIds,
  feedState,
  onSetFeedState,
  onOpenEvent,
  onCreateEvent,
}: Props) {
  const [css, theme] = useStyletron();
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [interest, setInterest] = useState(interests[0] ?? "Baking");
  const [description, setDescription] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  const ranked = [...events].sort((a, b) => {
    const aMatch = interests.includes(a.interest) ? 0 : 1;
    const bMatch = interests.includes(b.interest) ? 0 : 1;
    return aMatch - bMatch;
  });

  const visible =
    feedState === "empty"
      ? []
      : feedState === "error"
        ? []
        : ranked;

  const submitCreate = () => {
    setCreateError(null);
    if (!title.trim() || !when.trim() || !description.trim()) {
      setCreateError("Add a title, time, and short description.");
      return;
    }
    onCreateEvent({
      title: title.trim(),
      host: userName,
      when: when.trim(),
      duration: "60 min · virtual",
      interest: interest.trim() || "Community",
      description: description.trim(),
      whatToExpect: [
        "Virtual gathering — join from anywhere.",
        "Host opens with a 5-minute welcome.",
        "Cameras optional after intros.",
      ],
    });
    setTitle("");
    setWhen("");
    setDescription("");
    setCreating(false);
  };

  return (
    <ScreenFrame>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "4px",
        })}
      >
        <div>
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
            Common Ground
          </p>
          <HeadingLevel>
            <Heading
              styleLevel={4}
              color="contentPrimary"
              className={css({
                marginTop: "6px !important",
                marginBottom: "0 !important",
              })}
            >
              Hi {userName.split(" ")[0]}
            </Heading>
          </HeadingLevel>
          <p
            className={css({
              margin: "6px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.4,
            })}
          >
            Virtual community events you can join this week.
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Feed edge states"
        className={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "16px",
          marginBottom: "16px",
        })}
      >
        {(["ready", "loading", "empty", "error"] as FeedState[]).map((state) => (
          <button
            key={state}
            type="button"
            onClick={() => onSetFeedState(state)}
            aria-pressed={feedState === state}
            className={css({
              minHeight: "36px",
              paddingLeft: "12px",
              paddingRight: "12px",
              borderRadius: "10px",
              border: `1px solid ${
                feedState === state
                  ? theme.colors.accent
                  : theme.colors.borderOpaque
              }`,
              backgroundColor:
                feedState === state
                  ? theme.colors.backgroundAccentLight
                  : theme.colors.backgroundSecondary,
              color: theme.colors.contentPrimary,
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "capitalize",
              cursor: "pointer",
              fontFamily: theme.typography.LabelMedium.fontFamily,
            })}
          >
            {state}
          </button>
        ))}
      </div>

      {feedState === "loading" && (
        <div
          role="status"
          aria-live="polite"
          className={css({
            display: "grid",
            gap: "12px",
            paddingBottom: "80px",
          })}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={css({
                height: "110px",
                borderRadius: "16px",
                backgroundColor: theme.colors.backgroundSecondary,
                animationDuration: "1.2s",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                animationName: "cg-pulse",
              })}
            />
          ))}
          <span className="sr-only">Loading events</span>
        </div>
      )}

      {feedState === "error" && (
        <div
          className={css({
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: theme.colors.backgroundSecondary,
            marginBottom: "16px",
          })}
        >
          <ErrorText>
            We couldn’t load the feed. Check your connection and try again.
          </ErrorText>
          <div className={css({ marginTop: "14px" })}>
            <PrimaryButton onClick={() => onSetFeedState("ready")}>
              Retry
            </PrimaryButton>
          </div>
        </div>
      )}

      {feedState === "empty" && (
        <div
          className={css({
            padding: "24px 20px",
            borderRadius: "16px",
            backgroundColor: theme.colors.backgroundSecondary,
            marginBottom: "16px",
          })}
        >
          <p
            className={css({
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: theme.colors.contentPrimary,
            })}
          >
            No events yet
          </p>
          <p
            className={css({
              margin: "8px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.45,
            })}
          >
            Create a virtual gathering for your interest — others can join from
            the feed.
          </p>
        </div>
      )}

      {feedState === "ready" && (
        <div
          className={css({
            display: "grid",
            gap: "12px",
            paddingBottom: "12px",
          })}
        >
          {visible.map((event) => {
            const joined = joinedEventIds.includes(event.id);
            const matched = interests.includes(event.interest);
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onOpenEvent(event.id)}
                className={css({
                  textAlign: "left",
                  border: `1px solid ${theme.colors.borderOpaque}`,
                  borderRadius: "16px",
                  padding: "16px",
                  backgroundColor: theme.colors.backgroundPrimary,
                  color: theme.colors.contentPrimary,
                  cursor: "pointer",
                  minHeight: "44px",
                  fontFamily: theme.typography.ParagraphMedium.fontFamily,
                  ":focus-visible": {
                    outline: `2px solid ${theme.colors.accent}`,
                    outlineOffset: "2px",
                  },
                })}
              >
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                  })}
                >
                  <span
                    className={css({
                      fontSize: "13px",
                      fontWeight: 700,
                      color: theme.colors.accent600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    })}
                  >
                    {event.interest}
                    {matched ? " · For you" : ""}
                  </span>
                  {joined && (
                    <span
                      className={css({
                        fontSize: "12px",
                        fontWeight: 700,
                        color: theme.colors.accent700,
                      })}
                    >
                      Joined
                    </span>
                  )}
                </div>
                <p
                  className={css({
                    margin: "8px 0 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: theme.colors.contentPrimary,
                    fontFamily: theme.typography.HeadingXSmall.fontFamily,
                  })}
                >
                  {event.title}
                </p>
                <p
                  className={css({
                    margin: "6px 0 0",
                    fontSize: "15px",
                    color: theme.colors.contentSecondary,
                  })}
                >
                  {event.when} · {event.duration}
                </p>
                <p
                  className={css({
                    margin: "8px 0 0",
                    fontSize: "16px",
                    lineHeight: 1.4,
                    color: theme.colors.contentSecondary,
                  })}
                >
                  {event.description}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {!creating ? (
        <div className={css({ paddingBottom: "88px", marginTop: "8px" })}>
          <SecondaryButton onClick={() => setCreating(true)}>
            Create a virtual event
          </SecondaryButton>
        </div>
      ) : (
        <div
          className={css({
            marginTop: "8px",
            marginBottom: "88px",
            padding: "16px",
            borderRadius: "16px",
            border: `1px solid ${theme.colors.borderOpaque}`,
            display: "grid",
            gap: "12px",
            backgroundColor: theme.colors.backgroundSecondary,
          })}
        >
          <p
            className={css({
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              color: theme.colors.contentPrimary,
            })}
          >
            New virtual event
          </p>
          <Field
            id="cg-ev-title"
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Friday Sketch Night"
          />
          <Field
            id="cg-ev-when"
            label="When"
            value={when}
            onChange={setWhen}
            placeholder="Fri, Oct 25 · 7:00 PM"
          />
          <Field
            id="cg-ev-interest"
            label="Interest"
            value={interest}
            onChange={setInterest}
            placeholder="Making"
          />
          <Field
            id="cg-ev-desc"
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Quiet drawing hour with optional share-out."
          />
          <ErrorText>{createError}</ErrorText>
          <PrimaryButton onClick={submitCreate}>Publish locally</PrimaryButton>
          <SecondaryButton onClick={() => setCreating(false)}>
            Cancel
          </SecondaryButton>
        </div>
      )}
    </ScreenFrame>
  );
}
