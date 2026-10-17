"use client";

import { useStyletron } from "baseui";
import type { ChatThread } from "@/lib/chats";
import { ScreenFrame } from "@/components/common-ground/ui";

type Props = {
  thread: ChatThread;
  onBack: () => void;
};

export function ScreenChatThread({ thread, onBack }: Props) {
  const [css, theme] = useStyletron();

  return (
    <ScreenFrame>
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to chats"
        className={css({
          minHeight: "44px",
          minWidth: "44px",
          marginLeft: "-8px",
          border: "none",
          background: "transparent",
          color: theme.colors.contentPrimary,
          fontWeight: 700,
          fontSize: "16px",
          cursor: "pointer",
          fontFamily: theme.typography.LabelMedium.fontFamily,
          ":focus-visible": {
            outline: `2px solid ${theme.colors.accent}`,
            outlineOffset: "2px",
          },
        })}
      >
        ← Chats
      </button>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "8px",
        })}
      >
        <span
          aria-hidden
          className={css({
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: thread.tint,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: theme.colors.contentPrimary,
          })}
        >
          {thread.initials}
        </span>
        <div>
          <p
            className={css({
              margin: 0,
              fontSize: "20px",
              fontWeight: 700,
              color: theme.colors.contentPrimary,
            })}
          >
            {thread.name}
          </p>
          <p
            className={css({
              margin: "2px 0 0",
              fontSize: "15px",
              color: theme.colors.contentSecondary,
            })}
          >
            Met at {thread.metAt}
          </p>
        </div>
      </div>

      <div
        className={css({
          marginTop: "22px",
          display: "grid",
          gap: "12px",
          paddingBottom: "24px",
        })}
      >
        {thread.messages.map((msg) => (
          <div
            key={msg.id}
            className={css({
              justifySelf: msg.from === "me" ? "end" : "start",
              maxWidth: "85%",
              padding: "14px 16px",
              borderRadius:
                msg.from === "me" ? "18px 18px 6px 18px" : "18px 18px 18px 6px",
              backgroundColor:
                msg.from === "me"
                  ? theme.colors.backgroundAccentLight
                  : theme.colors.backgroundSecondary,
              color: theme.colors.contentPrimary,
              fontSize: "18px",
              lineHeight: 1.45,
            })}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </ScreenFrame>
  );
}
