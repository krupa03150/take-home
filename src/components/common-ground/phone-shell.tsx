"use client";

import type { ReactNode } from "react";
import { useStyletron } from "baseui";

type Props = {
  children: ReactNode;
  statusLabel?: string;
};

export function PhoneShell({ children, statusLabel = "9:41" }: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        width: "100%",
        maxWidth: "393px",
        height: "min(852px, calc(100dvh - 32px))",
        minHeight: "640px",
        borderRadius: "36px",
        border: `10px solid ${theme.colors.backgroundInversePrimary}`,
        backgroundColor: theme.colors.backgroundPrimary,
        boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "@media screen and (max-width: 480px)": {
          maxWidth: "100%",
          height: "100dvh",
          minHeight: "100dvh",
          borderRadius: 0,
          borderWidth: 0,
          boxShadow: "none",
        },
      })}
      data-phone-frame="iphone-393"
    >
      <div
        aria-hidden
        className={css({
          height: "28px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "4px",
          fontSize: "12px",
          fontWeight: 700,
          color: theme.colors.contentPrimary,
          backgroundColor: theme.colors.backgroundPrimary,
          flexShrink: 0,
          "@media screen and (max-width: 480px)": {
            display: "none",
          },
        })}
      >
        <span
          className={css({
            position: "absolute",
            top: "12px",
            width: "108px",
            height: "28px",
            borderRadius: "18px",
            backgroundColor: theme.colors.backgroundInversePrimary,
          })}
        />
        <span className={css({ position: "relative", zIndex: 1 })}>
          {statusLabel}
        </span>
      </div>
      <div
        className={css({
          flex: 1,
          minHeight: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        })}
      >
        {children}
      </div>
    </div>
  );
}
