"use client";

import { useMemo, useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import {
  INTEREST_OPTIONS,
  buildDateChips,
  formatEventWhen,
  type CommunityEvent,
  type DateFilterId,
  DEFAULT_EVENT_IMAGE,
} from "@/lib/data";
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
  onOpenEvent: (id: string) => void;
  onCreateEvent: (event: Omit<CommunityEvent, "id" | "attendees">) => void;
};

export function ScreenFeed({
  userName,
  interests,
  events,
  joinedEventIds,
  onOpenEvent,
  onCreateEvent,
}: Props) {
  const [css, theme] = useStyletron();
  const dateChips = useMemo(() => buildDateChips(), []);
  const [dateFilter, setDateFilter] = useState<DateFilterId>("today");
  const [interestFilters, setInterestFilters] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftInterests, setDraftInterests] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [interest, setInterest] = useState(interests[0] ?? "Baking");
  const [description, setDescription] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  const activeChip = dateChips.find((c) => c.id === dateFilter) ?? dateChips[0];

  const visible = useMemo(() => {
    return events
      .filter((event) => activeChip.match(event))
      .filter(
        (event) =>
          interestFilters.length === 0 ||
          interestFilters.includes(event.interest),
      )
      .sort((a, b) => {
        const aMatch = interests.includes(a.interest) ? 0 : 1;
        const bMatch = interests.includes(b.interest) ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
        return a.timeLabel.localeCompare(b.timeLabel);
      });
  }, [events, activeChip, interestFilters, interests]);

  const openFilters = () => {
    setDraftInterests(interestFilters);
    setFilterOpen(true);
  };

  const applyFilters = () => {
    setInterestFilters(draftInterests);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setDraftInterests([]);
    setInterestFilters([]);
    setFilterOpen(false);
  };

  const submitCreate = () => {
    setCreateError(null);
    if (!title.trim() || !when.trim() || !description.trim()) {
      setCreateError("Add a title, time, and short description.");
      return;
    }
    onCreateEvent({
      title: title.trim(),
      host: userName,
      dayOffset: 1,
      timeLabel: when.trim(),
      duration: "60 min · virtual",
      interest: interest.trim() || "Community",
      description: description.trim(),
      image: DEFAULT_EVENT_IMAGE,
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

      {/* Date row + filter */}
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "18px",
          marginBottom: "14px",
        })}
      >
        <div
          role="tablist"
          aria-label="Filter by day"
          className={css({
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            flex: 1,
            minWidth: 0,
            WebkitOverflowScrolling: "touch",
            paddingBottom: "2px",
          })}
        >
          {dateChips.map((chip) => {
            const active = chip.id === dateFilter;
            return (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDateFilter(chip.id)}
                className={css({
                  flexShrink: 0,
                  minHeight: "44px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                  borderRadius: "12px",
                  border: `1.5px solid ${
                    active ? theme.colors.accent : theme.colors.borderOpaque
                  }`,
                  backgroundColor: active
                    ? theme.colors.backgroundAccentLight
                    : theme.colors.backgroundPrimary,
                  color: active
                    ? theme.colors.accent700
                    : theme.colors.contentPrimary,
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: theme.typography.LabelMedium.fontFamily,
                  whiteSpace: "nowrap",
                  ":focus-visible": {
                    outline: `2px solid ${theme.colors.accent}`,
                    outlineOffset: "2px",
                  },
                })}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={
            interestFilters.length
              ? `Open filters, ${interestFilters.length} active`
              : "Open filters"
          }
          aria-expanded={filterOpen}
          onClick={openFilters}
          className={css({
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            border: `1.5px solid ${
              interestFilters.length
                ? theme.colors.accent
                : theme.colors.borderOpaque
            }`,
            backgroundColor: interestFilters.length
              ? theme.colors.backgroundAccentLight
              : theme.colors.backgroundPrimary,
            color: theme.colors.contentPrimary,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent}`,
              outlineOffset: "2px",
            },
          })}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M3 5h14l-5.5 6.2V15l-3 1.5v-5.3L3 5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          {interestFilters.length > 0 && (
            <span
              className={css({
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: theme.colors.accent,
              })}
            />
          )}
        </button>
      </div>

      {visible.length === 0 ? (
        <div
          role="status"
          className={css({
            padding: "28px 20px",
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
            Nothing on {activeChip.label.toLowerCase()}
            {interestFilters.length ? " for those interests" : ""}
          </p>
          <p
            className={css({
              margin: "8px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.45,
            })}
          >
            Try another day, clear your filters, or create a virtual gathering
            for your community.
          </p>
          {interestFilters.length > 0 && (
            <div className={css({ marginTop: "14px" })}>
              <SecondaryButton onClick={clearFilters}>
                Clear interest filters
              </SecondaryButton>
            </div>
          )}
        </div>
      ) : (
        <div
          className={css({
            display: "grid",
            gap: "14px",
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
                  borderRadius: "18px",
                  padding: 0,
                  overflow: "hidden",
                  backgroundColor: theme.colors.backgroundPrimary,
                  color: theme.colors.contentPrimary,
                  cursor: "pointer",
                  fontFamily: theme.typography.ParagraphMedium.fontFamily,
                  ":focus-visible": {
                    outline: `2px solid ${theme.colors.accent}`,
                    outlineOffset: "2px",
                  },
                })}
              >
                <div
                  className={css({
                    height: "148px",
                    backgroundColor: theme.colors.backgroundSecondary,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  })}
                  role="img"
                  aria-label=""
                />
                <div className={css({ padding: "14px 16px 16px" })}>
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
                    {formatEventWhen(event)} · {event.duration}
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
                </div>
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
            label="Time"
            value={when}
            onChange={setWhen}
            placeholder="7:00 PM"
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

      {filterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter events"
          className={css({
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: theme.colors.backgroundOverlay,
          })}
        >
          <div
            className={css({
              backgroundColor: theme.colors.backgroundPrimary,
              color: theme.colors.contentPrimary,
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding:
                "20px 20px calc(20px + env(safe-area-inset-bottom, 0px))",
              maxHeight: "78%",
              overflowY: "auto",
            })}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              })}
            >
              <h2
                className={css({
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: theme.typography.HeadingXSmall.fontFamily,
                })}
              >
                Filter by interest
              </h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setFilterOpen(false)}
                className={css({
                  minHeight: "44px",
                  minWidth: "44px",
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: theme.colors.contentPrimary,
                })}
              >
                ×
              </button>
            </div>
            <p
              className={css({
                margin: "8px 0 16px",
                fontSize: "16px",
                color: theme.colors.contentSecondary,
                lineHeight: 1.4,
              })}
            >
              Choose the activities you want to see. Leave empty to show all.
            </p>
            <div
              className={css({
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              })}
            >
              {INTEREST_OPTIONS.map((option) => {
                const active = draftInterests.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setDraftInterests((prev) =>
                        prev.includes(option)
                          ? prev.filter((i) => i !== option)
                          : [...prev, option],
                      )
                    }
                    className={css({
                      minHeight: "44px",
                      paddingLeft: "14px",
                      paddingRight: "14px",
                      borderRadius: "12px",
                      border: `1.5px solid ${
                        active ? theme.colors.accent : theme.colors.borderOpaque
                      }`,
                      backgroundColor: active
                        ? theme.colors.backgroundAccentLight
                        : theme.colors.backgroundPrimary,
                      color: active
                        ? theme.colors.accent700
                        : theme.colors.contentPrimary,
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: theme.typography.LabelMedium.fontFamily,
                    })}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div
              className={css({
                display: "grid",
                gap: "10px",
                marginTop: "20px",
              })}
            >
              <PrimaryButton onClick={applyFilters}>Apply filters</PrimaryButton>
              <SecondaryButton onClick={clearFilters}>
                Clear all
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </ScreenFrame>
  );
}
