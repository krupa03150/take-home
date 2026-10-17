"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { ChatThread } from "@/lib/chats";
import { ScreenFrame } from "@/components/common-ground/ui";

type Props = {
  threads: ChatThread[];
  friendIds: string[];
  onOpenThread: (id: string) => void;
};

export function ScreenChats({ threads, friendIds, onOpenThread }: Props) {
  const [css, theme] = useStyletron();
  const list =
    friendIds.length > 0
      ? threads.filter((t) => friendIds.includes(t.friendId))
      : [];

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
          Chats
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
        People you met at gatherings — keep the conversation going.
      </p>

      {list.length === 0 ? (
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
            No chats yet
          </p>
          <p
            className={css({
              margin: "10px 0 0",
              fontSize: "18px",
              lineHeight: 1.45,
              color: theme.colors.contentSecondary,
            })}
          >
            Join an event and meet someone — familiar faces show up here for a
            quiet follow-up.
          </p>
        </div>
      ) : (
        <ul
          className={css({
            listStyle: "none",
            margin: "22px 0 0",
            padding: 0,
            display: "grid",
            gap: "10px",
            paddingBottom: "24px",
          })}
        >
          {list.map((thread) => (
            <li key={thread.id}>
              <button
                type="button"
                onClick={() => onOpenThread(thread.id)}
                className={css({
                  width: "100%",
                  minHeight: "76px",
                  textAlign: "left",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  padding: "12px 14px",
                  borderRadius: "16px",
                  border: `1px solid ${theme.colors.borderOpaque}`,
                  backgroundColor: theme.colors.backgroundPrimary,
                  cursor: "pointer",
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
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: thread.tint,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: theme.colors.contentPrimary,
                    flexShrink: 0,
                  })}
                >
                  {thread.initials}
                </span>
                <span className={css({ minWidth: 0, flex: 1 })}>
                  <span
                    className={css({
                      display: "block",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: theme.colors.contentPrimary,
                    })}
                  >
                    {thread.name}
                  </span>
                  <span
                    className={css({
                      display: "block",
                      marginTop: "4px",
                      fontSize: "16px",
                      color: theme.colors.contentSecondary,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    })}
                  >
                    {thread.preview}
                  </span>
                  <span
                    className={css({
                      display: "block",
                      marginTop: "2px",
                      fontSize: "14px",
                      color: theme.colors.contentTertiary,
                    })}
                  >
                    Met at {thread.metAt}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </ScreenFrame>
  );
}
