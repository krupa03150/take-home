"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { Friend } from "@/lib/data";
import {
  expectedNames,
  weeklyGathering,
} from "@/lib/circle";
import {
  getCircleThread,
  type CircleMessage,
} from "@/lib/circle-chats";
import { ScreenFrame } from "@/components/common-ground/ui";

type Props = {
  members: Friend[];
  confirmed: boolean;
  onConfirm: () => void;
};

export function ScreenCircle({ members, confirmed, onConfirm }: Props) {
  const [css, theme] = useStyletron();
  const [chatWith, setChatWith] = useState<Friend | null>(null);
  const [draft, setDraft] = useState("");
  const [extraByFriend, setExtraByFriend] = useState<
    Record<string, CircleMessage[]>
  >({});

  if (chatWith) {
    const seed = getCircleThread(chatWith.id);
    const extras = extraByFriend[chatWith.id] ?? [];
    const messages = [...seed.messages, ...extras];

    const send = () => {
      const text = draft.trim();
      if (!text) return;
      const msg: CircleMessage = {
        id: `local-${Date.now()}`,
        from: "me",
        text,
      };
      setExtraByFriend((prev) => ({
        ...prev,
        [chatWith.id]: [...(prev[chatWith.id] ?? []), msg],
      }));
      setDraft("");
    };

    return (
      <ScreenFrame>
        <button
          type="button"
          onClick={() => {
            setChatWith(null);
            setDraft("");
          }}
          aria-label="Back to My Circle"
          className={css({
            minHeight: "48px",
            minWidth: "48px",
            marginLeft: "-8px",
            border: "none",
            background: "transparent",
            color: theme.colors.contentPrimary,
            fontWeight: 700,
            fontSize: "18px",
            cursor: "pointer",
            fontFamily: theme.typography.LabelMedium.fontFamily,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent}`,
              outlineOffset: "2px",
            },
          })}
        >
          ← My Circle
        </button>

        <div
          className={css({
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          })}
        >
          <span
            aria-hidden
            className={css({
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: chatWith.tint,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "18px",
              color: theme.colors.contentPrimary,
              flexShrink: 0,
            })}
          >
            {chatWith.initials}
          </span>
          <div>
            <p
              className={css({
                margin: 0,
                fontSize: "22px",
                fontWeight: 700,
                color: theme.colors.contentPrimary,
              })}
            >
              {chatWith.name}
            </p>
            <p
              className={css({
                margin: "2px 0 0",
                fontSize: "16px",
                color: theme.colors.contentSecondary,
              })}
            >
              Quiet message · someone you already know
            </p>
          </div>
        </div>

        <div
          className={css({
            marginTop: "18px",
            display: "grid",
            gap: "12px",
            paddingBottom: "12px",
            minHeight: "240px",
          })}
          role="log"
          aria-label={`Conversation with ${chatWith.name}`}
        >
          {messages.length === 0 ? (
            <p
              className={css({
                margin: 0,
                padding: "16px",
                borderRadius: "14px",
                backgroundColor: theme.colors.backgroundSecondary,
                fontSize: "18px",
                lineHeight: 1.45,
                color: theme.colors.contentSecondary,
              })}
            >
              {seed.starter}
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={css({
                  justifySelf: m.from === "me" ? "end" : "start",
                  maxWidth: "88%",
                  padding: "14px 16px",
                  borderRadius:
                    m.from === "me"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  backgroundColor:
                    m.from === "me"
                      ? theme.colors.brandBackgroundPrimary
                      : theme.colors.backgroundSecondary,
                  color:
                    m.from === "me"
                      ? theme.colors.brandContentOnPrimary
                      : theme.colors.contentPrimary,
                  fontSize: "18px",
                  lineHeight: 1.4,
                })}
              >
                {m.text}
              </div>
            ))
          )}
        </div>

        <form
          className={css({
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "10px",
            alignItems: "end",
            paddingTop: "8px",
            paddingBottom: "8px",
          })}
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <label
            htmlFor="cg-circle-msg"
            className={css({
              display: "grid",
              gap: "6px",
              minWidth: 0,
            })}
          >
            <span
              className={css({
                fontSize: "15px",
                fontWeight: 700,
                color: theme.colors.contentSecondary,
              })}
            >
              Message
            </span>
            <input
              id="cg-circle-msg"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoComplete="off"
              className={css({
                minHeight: "52px",
                borderRadius: "14px",
                border: `1.5px solid ${theme.colors.borderOpaque}`,
                backgroundColor: theme.colors.backgroundPrimary,
                color: theme.colors.contentPrimary,
                fontSize: "18px",
                paddingLeft: "14px",
                paddingRight: "14px",
                fontFamily: theme.typography.ParagraphMedium.fontFamily,
                ":focus-visible": {
                  outline: `2px solid ${theme.colors.accent}`,
                  outlineOffset: "1px",
                  borderColor: theme.colors.accent,
                },
              })}
            />
          </label>
          <button
            type="submit"
            aria-label="Send message"
            className={css({
              minHeight: "52px",
              minWidth: "88px",
              border: "none",
              borderRadius: "14px",
              backgroundColor: theme.colors.brandBackgroundPrimary,
              color: theme.colors.brandContentOnPrimary,
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: theme.typography.LabelLarge.fontFamily,
              ":focus-visible": {
                outline: `2px solid ${theme.colors.accent}`,
                outlineOffset: "2px",
              },
            })}
          >
            Send
          </button>
        </form>
      </ScreenFrame>
    );
  }

  const who = expectedNames();

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
          My Circle
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "6px 0 0",
          fontSize: "18px",
          lineHeight: 1.4,
          color: theme.colors.contentSecondary,
        })}
      >
        Familiar faces, next week’s gathering, and a quiet message when you
        want one.
      </p>

      <section
        aria-label="People in your circle"
        className={css({ marginTop: "16px" })}
      >
        <p
          className={css({
            margin: "0 0 10px",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: theme.colors.contentTertiary,
          })}
        >
          People you know
        </p>
        <ul
          className={css({
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gap: "10px",
          })}
        >
          {members.map((person) => (
            <li
              key={person.id}
              data-annotate="circle-person"
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                borderRadius: "16px",
                backgroundColor: theme.colors.backgroundSecondary,
                minHeight: "88px",
              })}
            >
              <span
                aria-hidden
                className={css({
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: person.tint,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: theme.colors.contentPrimary,
                  flexShrink: 0,
                })}
              >
                {person.initials}
              </span>
              <span className={css({ flex: 1, minWidth: 0 })}>
                <span
                  className={css({
                    display: "block",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: theme.colors.contentPrimary,
                    lineHeight: 1.25,
                  })}
                >
                  {person.name}
                </span>
                <span
                  className={css({
                    display: "block",
                    marginTop: "2px",
                    fontSize: "15px",
                    color: theme.colors.contentSecondary,
                    lineHeight: 1.3,
                  })}
                >
                  {person.note}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setChatWith(person)}
                className={css({
                  minHeight: "48px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                  borderRadius: "12px",
                  border: `1.5px solid ${theme.colors.accent}`,
                  backgroundColor: theme.colors.backgroundPrimary,
                  color: theme.colors.accent700,
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  flexShrink: 0,
                  fontFamily: theme.typography.LabelMedium.fontFamily,
                  ":focus-visible": {
                    outline: `2px solid ${theme.colors.accent}`,
                    outlineOffset: "2px",
                  },
                })}
              >
                Message
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Next weekly gathering"
        className={css({
          marginTop: "16px",
          padding: "16px",
          borderRadius: "18px",
          border: `1.5px solid ${theme.colors.borderOpaque}`,
          backgroundColor: theme.colors.backgroundPrimary,
        })}
      >
        <p
          className={css({
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: theme.colors.accent700,
          })}
        >
          Next weekly gathering
        </p>
        <p
          className={css({
            margin: "8px 0 0",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: 1.25,
            color: theme.colors.contentPrimary,
          })}
        >
          {weeklyGathering.title}
        </p>
        <p
          className={css({
            margin: "6px 0 0",
            fontSize: "18px",
            lineHeight: 1.35,
            color: theme.colors.contentSecondary,
          })}
        >
          {weeklyGathering.whenLabel}
        </p>
        <p
          className={css({
            margin: "2px 0 0",
            fontSize: "18px",
            lineHeight: 1.35,
            color: theme.colors.contentSecondary,
          })}
        >
          {weeklyGathering.format} · Hosted by {weeklyGathering.host}
        </p>
        <p
          className={css({
            margin: "8px 0 0",
            fontSize: "18px",
            lineHeight: 1.35,
            color: theme.colors.contentPrimary,
          })}
        >
          Expected: {who.join(", ")}
          {who.length > 0 ? ", and you" : "You and familiar faces"}
        </p>

        {confirmed ? (
          <div
            role="status"
            className={css({
              marginTop: "14px",
              minHeight: "56px",
              padding: "14px 16px",
              borderRadius: "14px",
              backgroundColor: theme.colors.backgroundAccentLight,
              border: `2px solid ${theme.colors.accent}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            })}
          >
            <span
              aria-hidden
              className={css({
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: theme.colors.accent,
                color: theme.colors.contentInversePrimary,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "16px",
                flexShrink: 0,
              })}
            >
              ✓
            </span>
            <span
              className={css({
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1.35,
                color: theme.colors.contentPrimary,
              })}
            >
              You’re confirmed for next week. We’ll save you a seat.
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className={css({
              marginTop: "14px",
              width: "100%",
              minHeight: "56px",
              border: "none",
              borderRadius: "14px",
              backgroundColor: theme.colors.brandBackgroundPrimary,
              color: theme.colors.brandContentOnPrimary,
              fontSize: "19px",
              fontWeight: 700,
              fontFamily: theme.typography.LabelLarge.fontFamily,
              cursor: "pointer",
              ":focus-visible": {
                outline: `3px solid ${theme.colors.accent}`,
                outlineOffset: "2px",
              },
            })}
          >
            I’ll be there next week
          </button>
        )}
      </section>
    </ScreenFrame>
  );
}
