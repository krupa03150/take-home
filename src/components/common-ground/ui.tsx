"use client";

import type { ReactNode } from "react";
import { useStyletron } from "baseui";

/** Shared mobile screen chrome with safe-area padding. */
export function ScreenFrame({
  children,
  tone = "warm",
}: {
  children: ReactNode;
  tone?: "warm" | "brand";
}) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        height: "100%",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        backgroundColor:
          tone === "brand"
            ? theme.colors.backgroundAccentLight
            : theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        paddingTop: "calc(12px + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
        paddingLeft: "20px",
        paddingRight: "20px",
      })}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  loading,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
}) {
  const [css, theme] = useStyletron();
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={css({
        width: "100%",
        minHeight: "52px",
        border: "none",
        borderRadius: "14px",
        backgroundColor: theme.colors.brandBackgroundPrimary,
        color: theme.colors.brandContentOnPrimary,
        fontSize: "17px",
        fontWeight: 700,
        fontFamily: theme.typography.LabelLarge.fontFamily,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.55 : 1,
        ":focus-visible": {
          outline: `2px solid ${theme.colors.accent}`,
          outlineOffset: "2px",
        },
      })}
    >
      {loading ? "Working…" : children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const [css, theme] = useStyletron();
  return (
    <button
      type={type}
      onClick={onClick}
      className={css({
        width: "100%",
        minHeight: "52px",
        borderRadius: "14px",
        border: `1.5px solid ${theme.colors.borderOpaque}`,
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        fontSize: "17px",
        fontWeight: 700,
        fontFamily: theme.typography.LabelLarge.fontFamily,
        cursor: "pointer",
        ":focus-visible": {
          outline: `2px solid ${theme.colors.accent}`,
          outlineOffset: "2px",
        },
      })}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "numeric";
  placeholder?: string;
}) {
  const [css, theme] = useStyletron();
  return (
    <label
      htmlFor={id}
      className={css({
        display: "grid",
        gap: "6px",
      })}
    >
      <span
        className={css({
          fontSize: "14px",
          fontWeight: 700,
          color: theme.colors.contentSecondary,
        })}
      >
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={css({
          minHeight: "48px",
          borderRadius: "12px",
          border: `1.5px solid ${theme.colors.borderOpaque}`,
          backgroundColor: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
          fontSize: "17px",
          paddingLeft: "14px",
          paddingRight: "14px",
          fontFamily: theme.typography.ParagraphMedium.fontFamily,
          ":focus-visible": {
            outline: `2px solid ${theme.colors.accent}`,
            outlineOffset: "1px",
            borderColor: theme.colors.accent,
          },
        })}
      />
    </label>
  );
}

export function ErrorText({ children }: { children: ReactNode }) {
  const [css, theme] = useStyletron();
  if (!children) return null;
  return (
    <p
      role="alert"
      className={css({
        margin: 0,
        fontSize: "15px",
        color: theme.colors.contentNegative,
      })}
    >
      {children}
    </p>
  );
}
