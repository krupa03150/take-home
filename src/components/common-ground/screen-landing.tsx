"use client";

import { useStyletron } from "baseui";
import { LandingFriends } from "@/components/common-ground/landing-friends";

type Props = {
  onSignUp: () => void;
  onSignIn: () => void;
};

export function ScreenLanding({ onSignUp, onSignIn }: Props) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(120% 80% at 50% -10%, #EDE4F7 0%, #F7F1EA 42%, #FBF7F2 100%)",
        color: theme.colors.contentPrimary,
        paddingTop: "calc(20px + env(safe-area-inset-top, 0px))",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "calc(18px + env(safe-area-inset-bottom, 0px))",
      })}
    >
      <div
        className={css({
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        })}
      >
        <div className={css({ marginTop: "12px" })}>
          <h1
            className={css({
              margin: 0,
              fontSize: "42px",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: theme.colors.contentPrimary,
              fontFamily: theme.typography.HeadingLarge.fontFamily,
            })}
          >
            Common
            <br />
            Ground
          </h1>
          <p
            className={css({
              margin: "16px 0 0",
              fontSize: "19px",
              lineHeight: 1.4,
              color: theme.colors.contentSecondary,
              maxWidth: "18rem",
              fontWeight: 500,
            })}
          >
            Virtual gatherings with people who share what you love.
          </p>
        </div>

        <div
          className={css({
            flex: 1,
            minHeight: "140px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: "8px",
            marginBottom: "8px",
          })}
        >
          <LandingFriends
            className={css({
              width: "100%",
              maxWidth: "360px",
              height: "auto",
              display: "block",
            })}
          />
        </div>

        <div
          className={css({
            display: "grid",
            gap: "10px",
            paddingBottom: "4px",
          })}
        >
          <button
            type="button"
            onClick={onSignUp}
            className={css({
              width: "100%",
              minHeight: "56px",
              border: "none",
              borderRadius: "999px",
              backgroundColor: "#2F6F5E",
              color: "#FFFBF5",
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: theme.typography.LabelLarge.fontFamily,
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(47, 111, 94, 0.28)",
              ":focus-visible": {
                outline: `3px solid ${theme.colors.accent300}`,
                outlineOffset: "2px",
              },
            })}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={onSignIn}
            className={css({
              width: "100%",
              minHeight: "56px",
              borderRadius: "999px",
              border: "1.5px solid rgba(42, 36, 32, 0.14)",
              backgroundColor: "rgba(255, 251, 245, 0.85)",
              color: theme.colors.contentPrimary,
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: theme.typography.LabelLarge.fontFamily,
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              ":focus-visible": {
                outline: `3px solid ${theme.colors.accent300}`,
                outlineOffset: "2px",
              },
            })}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
