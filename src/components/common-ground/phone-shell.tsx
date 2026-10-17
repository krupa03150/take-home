"use client";

import type { ReactNode } from "react";
import { useStyletron } from "baseui";

type Props = {
  children: ReactNode;
  statusTime?: string;
};

/** Realistic iPhone 14/15 Pro-style device chrome for desktop reviewers. */
export function PhoneShell({ children, statusTime = "9:41" }: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        position: "relative",
        width: "100%",
        maxWidth: "430px",
        flexShrink: 0,
        "@media screen and (max-width: 480px)": {
          maxWidth: "100%",
          height: "100%",
        },
      })}
      data-phone-frame="iphone-15-pro"
    >
      {/* Outer titanium chassis — desktop only */}
      <div
        className={css({
          position: "relative",
          borderRadius: "54px",
          padding: "12px",
          backgroundImage:
            "linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 40%, #0a0a0a 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08) inset, 0 28px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)",
          "@media screen and (max-width: 480px)": {
            borderRadius: 0,
            padding: 0,
            backgroundImage: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            height: "100%",
          },
        })}
      >
        {/* Silent / volume / power nubbins */}
        <span
          aria-hidden
          className={css({
            position: "absolute",
            left: "-3px",
            top: "118px",
            width: "3px",
            height: "28px",
            borderRadius: "2px 0 0 2px",
            backgroundColor: "#2c2c2e",
            "@media screen and (max-width: 480px)": { display: "none" },
          })}
        />
        <span
          aria-hidden
          className={css({
            position: "absolute",
            left: "-3px",
            top: "168px",
            width: "3px",
            height: "52px",
            borderRadius: "2px 0 0 2px",
            backgroundColor: "#2c2c2e",
            "@media screen and (max-width: 480px)": { display: "none" },
          })}
        />
        <span
          aria-hidden
          className={css({
            position: "absolute",
            left: "-3px",
            top: "230px",
            width: "3px",
            height: "52px",
            borderRadius: "2px 0 0 2px",
            backgroundColor: "#2c2c2e",
            "@media screen and (max-width: 480px)": { display: "none" },
          })}
        />
        <span
          aria-hidden
          className={css({
            position: "absolute",
            right: "-3px",
            top: "190px",
            width: "3px",
            height: "72px",
            borderRadius: "0 2px 2px 0",
            backgroundColor: "#2c2c2e",
            "@media screen and (max-width: 480px)": { display: "none" },
          })}
        />

        {/* Screen */}
        <div
          className={css({
            position: "relative",
            width: "393px",
            maxWidth: "100%",
            height: "min(852px, calc(100dvh - 48px))",
            minHeight: "640px",
            borderRadius: "44px",
            overflow: "hidden",
            backgroundColor: theme.colors.backgroundPrimary,
            color: theme.colors.contentPrimary,
            display: "flex",
            flexDirection: "column",
            isolation: "isolate",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
            "@media screen and (max-width: 480px)": {
              width: "100%",
              height: "100dvh",
              minHeight: "100dvh",
              borderRadius: 0,
              boxShadow: "none",
            },
            "@media screen and (min-width: 481px) and (max-width: 420px)": {
              width: "375px",
            },
          })}
          data-phone-screen="393"
        >
          {/* Status bar + Dynamic Island */}
          <div
            aria-hidden
            className={css({
              position: "relative",
              height: "54px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "28px",
              paddingRight: "22px",
              backgroundColor: theme.colors.backgroundPrimary,
              color: theme.colors.contentPrimary,
              zIndex: 5,
              "@media screen and (max-width: 480px)": {
                display: "none",
              },
            })}
          >
            <span
              className={css({
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                fontVariantNumeric: "tabular-nums",
                minWidth: "54px",
              })}
            >
              {statusTime}
            </span>

            <span
              className={css({
                position: "absolute",
                left: "50%",
                top: "11px",
                transform: "translateX(-50%)",
                width: "124px",
                height: "34px",
                borderRadius: "20px",
                backgroundColor: "#0a0a0a",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
              })}
            />

            <span
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "6px",
                minWidth: "72px",
                justifyContent: "flex-end",
              })}
            >
              {/* Cellular */}
              <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.6" />
                <rect x="5" y="5" width="3" height="7" rx="0.6" />
                <rect x="10" y="2.5" width="3" height="9.5" rx="0.6" />
                <rect x="15" y="0" width="3" height="12" rx="0.6" />
              </svg>
              {/* Wi‑Fi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm0-3.2c1.7 0 3.2.7 4.3 1.8l-1.4 1.4A4.1 4.1 0 0 0 8 7.8c-1.1 0-2.1.4-2.9 1.2L4.7 7.6A5.9 5.9 0 0 1 8 6.4Zm0-3.2c2.7 0 5.1 1.1 6.9 2.8L13.5 7A7.8 7.8 0 0 0 8 4.4 7.8 7.8 0 0 0 2.5 7L1.1 5.6A10.2 10.2 0 0 1 8 3.2Z" />
              </svg>
              {/* Battery */}
              <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="12"
                  rx="3.5"
                  stroke="currentColor"
                  strokeOpacity="0.45"
                />
                <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
                <path
                  d="M25 4.5v4a2 2 0 0 0 0-4Z"
                  fill="currentColor"
                  fillOpacity="0.45"
                />
              </svg>
            </span>
          </div>

          {/* App content */}
          <div
            className={css({
              flex: 1,
              minHeight: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              color: theme.colors.contentPrimary,
              backgroundColor: theme.colors.backgroundPrimary,
              // Real phones rely on safe-area; desktop chrome already accounts for status bar.
              paddingTop: "env(safe-area-inset-top, 0px)",
              "@media screen and (min-width: 481px)": {
                paddingTop: 0,
              },
            })}
          >
            {children}
          </div>

          {/* Home indicator */}
          <div
            aria-hidden
            className={css({
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "8px",
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 6,
              "@media screen and (max-width: 480px)": {
                display: "none",
              },
            })}
          >
            <span
              className={css({
                width: "134px",
                height: "5px",
                borderRadius: "100px",
                backgroundColor: "rgba(42, 36, 32, 0.35)",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
