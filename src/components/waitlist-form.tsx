"use client";

import { useState, type FormEvent } from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { brand } from "@/lib/theme";

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [css] = useStyletron();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setState("error");
      setMessage("Enter a valid work email to join the list.");
      return;
    }

    setState("loading");
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setState("success");
    setMessage(`You're on the list — we'll write ${trimmed} when seats open.`);
    setEmail("");
  }

  if (state === "success") {
    return (
      <div
        className={css({
          maxWidth: "28rem",
          padding: "1.1rem 1.25rem",
          borderRadius: "1rem",
          backgroundColor: "rgba(255,255,255,0.9)",
          border: `1px solid rgba(31, 138, 122, 0.25)`,
          boxShadow: "0 20px 60px -40px rgba(6,20,26,0.45)",
          backdropFilter: "blur(8px)",
        })}
        role="status"
        aria-live="polite"
      >
        <p
          className={css({
            margin: 0,
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: brand.ink,
          })}
        >
          You&apos;re in.
        </p>
        <p
          className={css({
            margin: "0.35rem 0 0",
            fontSize: "0.925rem",
            lineHeight: 1.5,
            color: "#3d5c58",
          })}
        >
          {message}
        </p>
        <Button
          kind="tertiary"
          type="button"
          onClick={() => {
            setState("idle");
            setMessage("");
          }}
          overrides={{
            BaseButton: {
              style: {
                marginTop: "0.65rem",
                paddingLeft: 0,
                paddingRight: 0,
                color: brand.sea,
                ":hover": { backgroundColor: "transparent", color: brand.tide },
              },
            },
          }}
        >
          Add another email
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={css({ width: "100%", maxWidth: "28rem" })}
    >
      <FormControl
        label={() => null}
        caption={() =>
          state === "error" ? (
            <span style={{ color: "#ffb4a8" }}>{message}</span>
          ) : state === "loading" ? (
            <span className={css({ color: "rgba(215,235,230,0.8)" })}>
              Checking the list…
              <span
                aria-hidden
                className={`animate-shimmer ${css({
                  display: "inline-block",
                  marginLeft: "0.5rem",
                  height: "0.5rem",
                  width: "6rem",
                  borderRadius: "999px",
                  verticalAlign: "middle",
                  backgroundImage:
                    "linear-gradient(90deg, rgba(215,235,230,0.15), rgba(215,235,230,0.75), rgba(215,235,230,0.15))",
                  backgroundSize: "200% 100%",
                })}`}
              />
            </span>
          ) : (
            <span className={css({ color: "rgba(215,235,230,0.7)" })}>
              No spam. One note when the next cohort opens.
            </span>
          )
        }
        error={state === "error" ? message : null}
        overrides={{
          ControlContainer: { style: { marginBottom: 0 } },
          Caption: { style: { marginTop: "0.75rem" } },
        }}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            "@media screen and (min-width: 640px)": {
              flexDirection: "row",
              alignItems: "stretch",
            },
          })}
        >
          <label className="sr-only" htmlFor="waitlist-email">
            Work email
          </label>
          <div className={css({ flex: 1, minWidth: 0 })}>
            <Input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@studio.com"
              value={email}
              disabled={state === "loading"}
              error={state === "error"}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
                if (state === "error") {
                  setState("idle");
                  setMessage("");
                }
              }}
              overrides={{
                Root: {
                  style: {
                    height: "3rem",
                    boxShadow: "0 16px 40px -28px rgba(6,20,26,0.55)",
                  },
                },
                Input: {
                  style: {
                    fontSize: "1rem",
                    color: brand.ink,
                    "::placeholder": { color: "rgba(61,92,88,0.7)" },
                  },
                },
              }}
            />
          </div>
          <Button
            type="submit"
            isLoading={state === "loading"}
            disabled={state === "loading"}
            overrides={{
              BaseButton: {
                style: {
                  height: "3rem",
                  minWidth: "9.5rem",
                  fontSize: "1rem",
                  fontWeight: 650,
                  whiteSpace: "nowrap",
                },
              },
            }}
          >
            Request access
          </Button>
        </div>
      </FormControl>
    </form>
  );
}
