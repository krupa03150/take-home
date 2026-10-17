"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { CommunityEvent } from "@/lib/data";
import { PrimaryButton, SecondaryButton } from "@/components/common-ground/ui";

type Props = {
  event: CommunityEvent;
  userName: string;
  onLeave: () => void;
};

const tiles = [
  { name: "Maya", tint: "#C9E4D8" },
  { name: "Sam", tint: "#F0D9C8" },
  { name: "Lee", tint: "#E2D6F0" },
  { name: "You", tint: "#F5E6B8" },
];

export function ScreenGathering({ event, userName, onLeave }: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.backgroundInversePrimary,
        color: theme.colors.contentInversePrimary,
        paddingTop: "calc(16px + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        paddingLeft: "16px",
        paddingRight: "16px",
      })}
    >
      <p
        className={css({
          margin: 0,
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: theme.colors.accent200,
        })}
      >
        Live · Virtual
      </p>
      <HeadingLevel>
        <Heading
          styleLevel={5}
          color="contentInversePrimary"
          className={css({
            marginTop: "6px !important",
            marginBottom: "0 !important",
            color: theme.colors.contentInversePrimary,
          })}
        >
          {event.title}
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "6px 0 0",
          fontSize: "15px",
          color: theme.colors.contentInverseSecondary,
        })}
      >
        {userName}, you’re in with {event.attendees} others
      </p>

      <div
        className={css({
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "18px",
          marginBottom: "18px",
          minHeight: 0,
        })}
      >
        {tiles.map((tile) => (
          <div
            key={tile.name}
            className={css({
              borderRadius: "16px",
              backgroundColor: tile.tint,
              color: theme.colors.contentPrimary,
              display: "flex",
              alignItems: "flex-end",
              padding: "12px",
              fontWeight: 700,
              fontSize: "15px",
              minHeight: "120px",
            })}
          >
            {tile.name === "You" ? userName.split(" ")[0] : tile.name}
          </div>
        ))}
      </div>

      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "16px",
        })}
      >
        {["Mute", "Cam", "Hand"].map((label) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className={css({
              width: "64px",
              height: "64px",
              borderRadius: "32px",
              border: "none",
              backgroundColor: theme.colors.backgroundInverseSecondary,
              color: theme.colors.contentInversePrimary,
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: theme.typography.LabelMedium.fontFamily,
              ":focus-visible": {
                outline: `2px solid ${theme.colors.accent200}`,
                outlineOffset: "2px",
              },
            })}
          >
            {label}
          </button>
        ))}
      </div>

      <PrimaryButton onClick={onLeave}>Leave gathering</PrimaryButton>
      <div className={css({ height: "10px" })} />
      <SecondaryButton onClick={onLeave}>Done for now</SecondaryButton>
    </div>
  );
}
