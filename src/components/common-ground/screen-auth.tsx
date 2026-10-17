"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { AuthMode } from "@/lib/app-nav";
import {
  ActionRow,
  ErrorText,
  Field,
  PrimaryButton,
  ScreenFrame,
  SecondaryButton,
} from "@/components/common-ground/ui";

type Props = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onBack: () => void;
  onSignUp: (input: {
    name: string;
    email: string;
    password: string;
  }) => string | null;
  onSignIn: (email: string, password: string) => string | null;
  onContinueWithoutAccount: (name: string) => void;
};

export function ScreenAuth({
  mode,
  onModeChange,
  onBack,
  onSignUp,
  onSignIn,
  onContinueWithoutAccount,
}: Props) {
  const [css, theme] = useStyletron();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const friendlyName = () => {
    const trimmed = name.trim();
    return trimmed || "Friend";
  };

  const submitSignup = () => {
    setError(null);
    if (password && password.length < 6) {
      setError("If you set a password, use at least 6 characters.");
      return;
    }
    if (password && password !== confirm) {
      setError("Passwords don’t match yet.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const err = onSignUp({
        name: friendlyName(),
        email: email.trim(),
        password,
      });
      setLoading(false);
      if (err) setError(err);
    }, 280);
  };

  const submitSignIn = () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Enter the email and password you used on this phone.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const err = onSignIn(email, password);
      setLoading(false);
      if (err) setError(err);
    }, 280);
  };

  return (
    <ScreenFrame>
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to landing"
        className={css({
          minHeight: "44px",
          minWidth: "44px",
          marginLeft: "-8px",
          border: "none",
          background: "transparent",
          color: theme.colors.contentPrimary,
          fontWeight: 700,
          fontSize: "17px",
          cursor: "pointer",
          fontFamily: theme.typography.LabelMedium.fontFamily,
          ":focus-visible": {
            outline: `2px solid ${theme.colors.accent}`,
            outlineOffset: "2px",
          },
        })}
      >
        ← Back
      </button>

      <HeadingLevel>
        <Heading
          styleLevel={3}
          color="contentPrimary"
          className={css({
            marginTop: "8px !important",
            marginBottom: "0 !important",
          })}
        >
          {isSignup ? "Join Common Ground" : "Welcome back"}
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "8px 0 0",
          fontSize: "18px",
          color: theme.colors.contentSecondary,
          lineHeight: 1.45,
        })}
      >
        {isSignup
          ? "A name is enough to start. Everything else is optional."
          : "Sign in with the email you saved on this phone before."}
      </p>

      {isSignup ? (
        <form
          className={css({
            marginTop: "22px",
            display: "grid",
            gap: "18px",
            paddingBottom: "16px",
          })}
          onSubmit={(e) => {
            e.preventDefault();
            submitSignup();
          }}
        >
          <Field
            id="cg-name"
            label="Name"
            value={name}
            onChange={setName}
            autoComplete="name"
            hint="So people in gatherings can recognize you. Leave blank and we’ll call you Friend."
          />
          <Field
            id="cg-email"
            label="Email"
            optional
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={setEmail}
            hint="Only if you want to come back on another device. This demo stays on this phone either way."
          />
          <Field
            id="cg-password"
            label="Password"
            optional
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
            hint="Only needed with an email, if you want to sign back in later on this phone."
          />
          {password ? (
            <Field
              id="cg-confirm"
              label="Confirm password"
              optional
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={setConfirm}
              hint="Same password again so we don’t lock you out by typo."
            />
          ) : null}
          <ErrorText>{error}</ErrorText>
          <ActionRow
            skipLabel="Skip"
            onSkip={() => onContinueWithoutAccount(friendlyName())}
            continueLabel="Continue"
            continueType="submit"
            continueLoading={loading}
          />
          <SecondaryButton
            type="button"
            onClick={() => onContinueWithoutAccount(friendlyName())}
          >
            Continue without an account
          </SecondaryButton>
        </form>
      ) : (
        <form
          className={css({
            marginTop: "22px",
            display: "grid",
            gap: "16px",
          })}
          onSubmit={(e) => {
            e.preventDefault();
            submitSignIn();
          }}
        >
          <Field
            id="cg-email"
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={setEmail}
            hint="The email you saved when you created an account on this phone."
          />
          <Field
            id="cg-password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            hint="The password you chose with that email."
          />
          <ErrorText>{error}</ErrorText>
          <PrimaryButton type="submit" loading={loading}>
            Sign in
          </PrimaryButton>
        </form>
      )}

      <p
        className={css({
          margin: "20px 0 0",
          fontSize: "17px",
          color: theme.colors.contentSecondary,
          textAlign: "center",
        })}
      >
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <button
          type="button"
          onClick={() => {
            setError(null);
            onModeChange(isSignup ? "signin" : "signup");
          }}
          className={css({
            border: "none",
            background: "transparent",
            color: theme.colors.accent600,
            fontWeight: 700,
            fontSize: "17px",
            minHeight: "44px",
            cursor: "pointer",
            padding: "0 4px",
            fontFamily: theme.typography.LabelMedium.fontFamily,
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent}`,
              outlineOffset: "2px",
            },
          })}
        >
          {isSignup ? "Sign in" : "Sign up"}
        </button>
      </p>
    </ScreenFrame>
  );
}
