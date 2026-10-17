"use client";

import { useState, type FormEvent } from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, KIND, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
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
      <Block
        maxWidth="28rem"
        padding="scale600"
        backgroundColor="primaryB"
        overrides={{
          Block: {
            style: {
              borderRadius: "12px",
              border: `1px solid ${brand.sea}40`,
              boxShadow: "0 20px 60px -40px rgba(6,20,26,0.45)",
            },
            props: { role: "status", "aria-live": "polite" },
          },
        }}
      >
        <Block font="HeadingSmall" color={brand.ink} marginBottom="scale200">
          You&apos;re in.
        </Block>
        <Block font="ParagraphSmall" color="contentSecondary">
          {message}
        </Block>
        <Button
          kind={KIND.tertiary}
          size={SIZE.compact}
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
              },
            },
          }}
        >
          Add another email
        </Button>
      </Block>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={css({ width: "100%", maxWidth: "28rem" })}
      data-baseweb-form="waitlist"
    >
      <FormControl
        label="Work email"
        caption={
          state === "loading"
            ? "Checking the list…"
            : "No spam. One note when the next cohort opens."
        }
        error={state === "error" ? message : null}
        overrides={{
          Label: {
            style: {
              color: brand.foam,
            },
          },
          Caption: {
            style: {
              color:
                state === "error"
                  ? "#ffb4a8"
                  : "rgba(215,235,230,0.75)",
            },
          },
        }}
      >
        <Block
          display="flex"
          flexDirection="column"
          overrides={{
            Block: {
              style: {
                gap: "0.75rem",
                "@media screen and (min-width: 640px)": {
                  flexDirection: "row",
                  alignItems: "stretch",
                },
              },
            },
          }}
        >
          <Block flex="1" minWidth="0">
            <Input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@studio.com"
              value={email}
              disabled={state === "loading"}
              error={state === "error"}
              clearOnEscape
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
                  },
                },
              }}
            />
          </Block>
          <Button
            type="submit"
            kind={KIND.primary}
            size={SIZE.large}
            isLoading={state === "loading"}
            disabled={state === "loading"}
            overrides={{
              BaseButton: {
                style: {
                  minWidth: "9.5rem",
                  whiteSpace: "nowrap",
                },
              },
            }}
          >
            Request access
          </Button>
        </Block>
      </FormControl>
    </form>
  );
}
