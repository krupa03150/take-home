"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import type { AuthMode } from "@/lib/app-nav";
import {
  ErrorText,
  Field,
  PrimaryButton,
  ScreenFrame,
} from "@/components/common-ground/ui";

type Props = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onBack: () => void;
  onSignUp: (email: string, password: string) => string | null;
  onSignIn: (email: string, password: string) => string | null;
};

export function ScreenAuth({
  mode,
  onModeChange,
  onBack,
  onSignUp,
  onSignIn,
}: Props) {
  const [css, theme] = useStyletron();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const submit = () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Enter an email and password to continue.");
      return;
    }
    if (isSignup && password.length < 6) {
      setError("Use at least 6 characters for your password.");
      return;
    }
    if (isSignup && password !== confirm) {
      setError("Passwords don’t match yet.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const err = isSignup
        ? onSignUp(email, password)
        : onSignIn(email, password);
      setLoading(false);
      if (err) setError(err);
    }, 400);
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
          fontSize: "16px",
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
          {isSignup ? "Create your account" : "Welcome back"}
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "8px 0 0",
          fontSize: "17px",
          color: theme.colors.contentSecondary,
          lineHeight: 1.45,
        })}
      >
        {isSignup
          ? "Mock local sign-up — nothing leaves this phone preview."
          : "Sign in with the email you used here before."}
      </p>

      <form
        className={css({
          marginTop: "24px",
          display: "grid",
          gap: "16px",
        })}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
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
          placeholder="you@example.com"
        />
        <Field
          id="cg-password"
          label="Password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />
        {isSignup && (
          <Field
            id="cg-confirm"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={setConfirm}
            placeholder="••••••••"
          />
        )}
        <ErrorText>{error}</ErrorText>
        <PrimaryButton type="submit" loading={loading}>
          {isSignup ? "Sign up" : "Sign in"}
        </PrimaryButton>
      </form>

      <p
        className={css({
          margin: "20px 0 0",
          fontSize: "16px",
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
            fontSize: "16px",
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
