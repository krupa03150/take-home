"use client";

import { useEffect, useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { Circle } from "@/lib/data";
import { participants } from "@/lib/data";

type Props = {
  circle: Circle;
  onLeave: () => void;
};

export function ScreenGathering({ circle, onLeave }: Props) {
  const [css, theme] = useStyletron();
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setConnecting(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  const control = (active?: boolean) =>
    css({
      minHeight: "64px",
      minWidth: "64px",
      borderRadius: "999px",
      border: "none",
      backgroundColor: active
        ? theme.colors.contentInversePrimary
        : "rgba(255,251,245,0.14)",
      color: active
        ? theme.colors.contentPrimary
        : theme.colors.contentInversePrimary,
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2px",
      fontFamily: theme.typography.LabelMedium.fontFamily,
      ":focus-visible": {
        outline: `2px solid ${theme.colors.accent200}`,
        outlineOffset: "3px",
      },
    });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: theme.colors.backgroundInversePrimary,
        color: theme.colors.contentInversePrimary,
      })}
    >
      <header
        className={css({
          paddingTop: "calc(14px + env(safe-area-inset-top, 0px))",
          paddingLeft: "18px",
          paddingRight: "18px",
          paddingBottom: "10px",
        })}
      >
        <p
          className={css({
            margin: 0,
            fontSize: "13px",
            fontWeight: 600,
            color: theme.colors.contentInverseSecondary,
          })}
        >
          Live gathering
        </p>
        <HeadingLevel>
          <Heading
            styleLevel={5}
            color="contentInversePrimary"
            className={css({
              marginTop: "4px !important",
              marginBottom: "0 !important",
              color: `${theme.colors.contentInversePrimary} !important`,
            })}
          >
            {circle.name}
          </Heading>
        </HeadingLevel>
      </header>

      <div
        className={css({
          flex: 1,
          padding: "8px 12px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          minHeight: 0,
        })}
      >
        {connecting ? (
          <div
            role="status"
            className={css({
              gridColumn: "1 / -1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "17px",
              color: theme.colors.contentInverseSecondary,
            })}
          >
            Connecting you to the kitchen…
          </div>
        ) : (
          <>
            {[
              { name: "You", note: cameraOff ? "Camera off" : "Eleanor" },
              ...participants.slice(0, 3).map((p) => ({
                name: p.name,
                note: p.note.split("·")[0].trim(),
              })),
            ].map((tile) => (
              <div
                key={tile.name}
                className={css({
                  borderRadius: "16px",
                  backgroundColor: theme.colors.backgroundInverseSecondary,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "12px",
                  minHeight: "120px",
                  position: "relative",
                  overflow: "hidden",
                })}
              >
                <div
                  aria-hidden
                  className={css({
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 30% 20%, ${theme.colors.accent400}55, transparent 55%)`,
                    opacity: 0.7,
                  })}
                />
                <div className={css({ position: "relative" })}>
                  <p
                    className={css({
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                    })}
                  >
                    {tile.name}
                  </p>
                  <p
                    className={css({
                      margin: "2px 0 0",
                      fontSize: "13px",
                      color: theme.colors.contentInverseSecondary,
                    })}
                  >
                    {tile.note}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          padding: "16px 16px calc(20px + env(safe-area-inset-bottom, 0px))",
        })}
      >
        <button
          type="button"
          className={control(muted)}
          aria-pressed={muted}
          onClick={() => setMuted((v) => !v)}
        >
          <span aria-hidden className={css({ fontSize: "18px" })}>{muted ? "×" : "♩"}</span>
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          type="button"
          className={control(cameraOff)}
          aria-pressed={cameraOff}
          onClick={() => setCameraOff((v) => !v)}
        >
          <span aria-hidden className={css({ fontSize: "16px" })}>{cameraOff ? "○" : "▣"}</span>
          {cameraOff ? "Cam on" : "Cam off"}
        </button>
        <button
          type="button"
          onClick={onLeave}
          className={css({
            minHeight: "64px",
            minWidth: "88px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: theme.colors.negative,
            color: theme.colors.contentInversePrimary,
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: theme.typography.LabelMedium.fontFamily,
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent200}`,
              outlineOffset: "3px",
            },
          })}
        >
          Leave
        </button>
      </div>
    </div>
  );
}
