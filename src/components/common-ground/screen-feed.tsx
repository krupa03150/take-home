"use client";

import { useMemo, useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import {
  INTEREST_OPTIONS,
  buildDateChips,
  formatEventWhen,
  weekendOffsets,
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

type InterestChip = "all" | string;
type DateSelection = "any" | DateFilterId;

type Props = {
  userName: string;
  interests: string[];
  events: CommunityEvent[];
  joinedEventIds: string[];
  onOpenEvent: (id: string) => void;
  onCreateEvent: (event: Omit<CommunityEvent, "id" | "attendees">) => void;
};

function dayOffsetFromDateId(id: DateFilterId): number {
  if (id === "today") return 0;
  if (id === "tomorrow") return 1;
  if (id === "weekend") return weekendOffsets()[0] ?? 6;
  const match = /^day-(\d+)$/.exec(id);
  if (match) return Number(match[1]);
  return 1;
}

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
  const interestChips: InterestChip[] = useMemo(
    () => ["all", ...interests],
    [interests],
  );

  const [interestChip, setInterestChip] = useState<InterestChip>("all");
  const [dateFilter, setDateFilter] = useState<DateSelection>("any");
  const [draftDate, setDraftDate] = useState<DateSelection>("any");
  const [filterOpen, setFilterOpen] = useState(false);

  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [createInterest, setCreateInterest] = useState(
    interests[0] ?? "Gardening",
  );
  const [createDate, setCreateDate] = useState<DateFilterId>("tomorrow");
  const [description, setDescription] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  const activeDateChip =
    dateFilter === "any"
      ? null
      : (dateChips.find((c) => c.id === dateFilter) ?? null);

  const visible = useMemo(() => {
    return events
      .filter((event) => {
        if (interestChip === "all") return true;
        return event.interest === interestChip;
      })
      .filter((event) => {
        if (dateFilter === "any" || !activeDateChip) return true;
        return activeDateChip.match(event);
      })
      .sort((a, b) => {
        const aMatch = interests.includes(a.interest) ? 0 : 1;
        const bMatch = interests.includes(b.interest) ? 0 : 1;
        if (interestChip === "all" && aMatch !== bMatch) return aMatch - bMatch;
        if (a.dayOffset !== b.dayOffset) return a.dayOffset - b.dayOffset;
        return a.timeLabel.localeCompare(b.timeLabel);
      });
  }, [events, interestChip, dateFilter, activeDateChip, interests]);

  const openDateFilter = () => {
    setDraftDate(dateFilter);
    setFilterOpen(true);
  };

  const applyDateFilter = () => {
    setDateFilter(draftDate);
    setFilterOpen(false);
  };

  const clearDateFilter = () => {
    setDraftDate("any");
    setDateFilter("any");
    setFilterOpen(false);
  };

  const openCreate = () => {
    setCreateError(null);
    setTitle("");
    setDescription("");
    setCreateInterest(interests[0] ?? "Gardening");
    setCreateDate("tomorrow");
    setCreating(true);
  };

  const emptyLabel = () => {
    const interestLabel =
      interestChip === "all" ? "your interests" : interestChip.toLowerCase();
    if (dateFilter === "any") return `No ${interestLabel} events yet`;
    const day = activeDateChip?.label.toLowerCase() ?? "that day";
    return `Nothing for ${interestLabel} on ${day}`;
  };

  const submitCreate = () => {
    setCreateError(null);
    if (!title.trim()) {
      setCreateError("Add a title for your gathering.");
      return;
    }
    if (!description.trim()) {
      setCreateError("Add a short description.");
      return;
    }
    onCreateEvent({
      title: title.trim(),
      host: userName,
      dayOffset: dayOffsetFromDateId(createDate),
      timeLabel: "10:00 AM",
      duration: "60 min · virtual",
      interest: createInterest,
      description: description.trim(),
      image: DEFAULT_EVENT_IMAGE,
      whatToExpect: [
        "Virtual gathering — join from anywhere.",
        "Host opens with a 5-minute welcome.",
        "Cameras optional after intros.",
      ],
    });
    setCreating(false);
  };

  const chipButton = (active: boolean) =>
    css({
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
      color: active ? theme.colors.accent700 : theme.colors.contentPrimary,
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: theme.typography.LabelMedium.fontFamily,
      whiteSpace: "nowrap",
      ":focus-visible": {
        outline: `2px solid ${theme.colors.accent}`,
        outlineOffset: "2px",
      },
    });

  return (
    <ScreenFrame>
      <div
        className={css({
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        })}
      >
        <div className={css({ minWidth: 0, flex: 1 })}>
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
            Virtual community events matched to what you love.
          </p>
        </div>

        <button
          type="button"
          aria-label="Create event"
          onClick={openCreate}
          className={css({
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: theme.colors.brandBackgroundPrimary,
            color: theme.colors.brandContentOnPrimary,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(47, 111, 94, 0.28)",
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent}`,
              outlineOffset: "2px",
            },
          })}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path
              d="M11 4v14M4 11h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Interest chips + date filter */}
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
          aria-label="Filter by interest"
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
          {interestChips.map((chip) => {
            const active = chip === interestChip;
            const label = chip === "all" ? "All" : chip;
            return (
              <button
                key={chip}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setInterestChip(chip)}
                className={chipButton(active)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={
            dateFilter === "any"
              ? "Open date filter"
              : `Open date filter, ${activeDateChip?.label ?? "active"}`
          }
          aria-expanded={filterOpen}
          onClick={openDateFilter}
          className={css({
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            border: `1.5px solid ${
              dateFilter !== "any"
                ? theme.colors.accent
                : theme.colors.borderOpaque
            }`,
            backgroundColor:
              dateFilter !== "any"
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
          {dateFilter !== "any" && (
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

      {dateFilter !== "any" && activeDateChip && (
        <p
          className={css({
            margin: "-6px 0 12px",
            fontSize: "14px",
            color: theme.colors.contentSecondary,
          })}
        >
          Showing {activeDateChip.label.toLowerCase()}
        </p>
      )}

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
            {emptyLabel()}
          </p>
          <p
            className={css({
              margin: "8px 0 0",
              fontSize: "16px",
              color: theme.colors.contentSecondary,
              lineHeight: 1.45,
            })}
          >
            Try another interest, clear the date filter, or tap + to create a
            virtual gathering.
          </p>
          {dateFilter !== "any" && (
            <div className={css({ marginTop: "14px" })}>
              <SecondaryButton onClick={clearDateFilter}>
                Clear date filter
              </SecondaryButton>
            </div>
          )}
        </div>
      ) : (
        <div
          className={css({
            display: "grid",
            gap: "14px",
            paddingBottom: "88px",
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

      {creating && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Create event"
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
              color: theme.colors.contentPrimary,
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding:
                "20px 20px calc(20px + env(safe-area-inset-bottom, 0px))",
              maxHeight: "86%",
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
                Create event
              </h2>
              <button
                type="button"
                aria-label="Close create event"
                onClick={() => setCreating(false)}
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
              Host a virtual gathering — it stays on this device for the demo.
            </p>

            <div className={css({ display: "grid", gap: "16px" })}>
              <Field
                id="cg-ev-title"
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="Afternoon tea circle"
              />

              <fieldset
                className={css({
                  margin: 0,
                  padding: 0,
                  border: "none",
                })}
              >
                <legend
                  className={css({
                    fontSize: "14px",
                    fontWeight: 700,
                    color: theme.colors.contentSecondary,
                    marginBottom: "8px",
                  })}
                >
                  Interest
                </legend>
                <div
                  className={css({
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  })}
                >
                  {INTEREST_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={createInterest === option}
                      onClick={() => setCreateInterest(option)}
                      className={chipButton(createInterest === option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset
                className={css({
                  margin: 0,
                  padding: 0,
                  border: "none",
                })}
              >
                <legend
                  className={css({
                    fontSize: "14px",
                    fontWeight: 700,
                    color: theme.colors.contentSecondary,
                    marginBottom: "8px",
                  })}
                >
                  Date
                </legend>
                <div
                  className={css({
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  })}
                >
                  {dateChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      aria-pressed={createDate === chip.id}
                      onClick={() => setCreateDate(chip.id)}
                      className={chipButton(createDate === chip.id)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <Field
                id="cg-ev-desc"
                label="Short description"
                value={description}
                onChange={setDescription}
                placeholder="What will people do together?"
              />

              <ErrorText>{createError}</ErrorText>
              <PrimaryButton onClick={submitCreate}>
                Publish locally
              </PrimaryButton>
              <SecondaryButton onClick={() => setCreating(false)}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}

      {filterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter by date"
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
                When do you want to join?
              </h2>
              <button
                type="button"
                aria-label="Close date filter"
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
              Today, tomorrow, or later this week — leave as any day to see
              everything.
            </p>
            <div
              className={css({
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              })}
            >
              <button
                type="button"
                aria-pressed={draftDate === "any"}
                onClick={() => setDraftDate("any")}
                className={chipButton(draftDate === "any")}
              >
                Any day
              </button>
              {dateChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={draftDate === chip.id}
                  onClick={() => setDraftDate(chip.id)}
                  className={chipButton(draftDate === chip.id)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
            <div
              className={css({
                display: "grid",
                gap: "10px",
                marginTop: "20px",
              })}
            >
              <PrimaryButton onClick={applyDateFilter}>
                Apply dates
              </PrimaryButton>
              <SecondaryButton onClick={clearDateFilter}>
                Clear dates
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </ScreenFrame>
  );
}
