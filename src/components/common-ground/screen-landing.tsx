"use client";

import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import {
  PrimaryButton,
  SecondaryButton,
  ScreenFrame,
} from "@/components/common-ground/ui";

type Props = {
  onSignUp: () => void;
  onSignIn: () => void;
};

export function ScreenLanding({ onSignUp, onSignIn }: Props) {
  const [css, theme] = useStyletron();

  return (
    <ScreenFrame tone="brand">
      <div
        className={css({
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "28px",
          backgroundImage: `radial-gradient(120% 70% at 10% 0%, ${theme.colors.accent200} 0%, transparent 55%)`,
        })}
      >
        <div>
          <p
            className={css({
              margin: "8px 0 0",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: theme.colors.accent600,
            })}
          >
            Common Ground
          </p>
          <HeadingLevel>
            <Heading
              styleLevel={2}
              color="contentPrimary"
              className={css({
                marginTop: "14px !important",
                marginBottom: "0 !important",
                color: `${theme.colors.contentPrimary}`,
              })}
            >
              Show up again next week.
            </Heading>
          </HeadingLevel>
          <p
            className={css({
              margin: "14px 0 0",
              fontSize: "18px",
              lineHeight: 1.45,
              color: theme.colors.contentSecondary,
              maxWidth: "20rem",
            })}
          >
            Virtual community events where familiar faces make belonging feel
            easier — not one-off rooms that reset every time.
          </p>
        </div>

        <div
          aria-hidden
          className={css({
            flex: 1,
            minHeight: "160px",
            borderRadius: "20px",
            backgroundImage: `linear-gradient(155deg, ${theme.colors.accent600} 0%, ${theme.colors.accent300} 55%, ${theme.colors.accent100} 100%)`,
            display: "flex",
            alignItems: "flex-end",
            padding: "18px",
          })}
        >
          <p
            className={css({
              margin: 0,
              color: theme.colors.contentInversePrimary,
              fontSize: "16px",
              lineHeight: 1.4,
              fontWeight: 600,
              maxWidth: "16rem",
            })}
          >
            Bake, walk, listen, repair — together, on a call that knows your
            name.
          </p>
        </div>

        <div className={css({ display: "grid", gap: "12px" })}>
          <PrimaryButton onClick={onSignUp}>Sign up</PrimaryButton>
          <SecondaryButton onClick={onSignIn}>Sign in</SecondaryButton>
        </div>
      </div>
    </ScreenFrame>
  );
}
