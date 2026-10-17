"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm({ className }: { className?: string }) {
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
        className={cn(
          "rounded-2xl border border-sea/25 bg-white/80 px-5 py-4 text-left shadow-[0_20px_60px_-40px_rgba(6,20,26,0.45)] backdrop-blur-sm",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-lg font-semibold text-ink">
          You&apos;re in.
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-3 h-9 px-0 text-sea hover:bg-transparent hover:text-tide"
          onClick={() => {
            setState("idle");
            setMessage("");
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
      className={cn("w-full max-w-md text-left", className)}
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor="waitlist-email">
          Work email
        </label>
        <Input
          id="waitlist-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          disabled={state === "loading"}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === "error") {
              setState("idle");
              setMessage("");
            }
          }}
          aria-invalid={state === "error"}
          className="h-12 flex-1 rounded-xl border-white/20 bg-white/90 px-4 text-base text-ink shadow-[0_16px_40px_-28px_rgba(6,20,26,0.55)] placeholder:text-muted-foreground/80"
        />
        <Button
          type="submit"
          disabled={state === "loading"}
          className="h-12 rounded-xl bg-sea px-5 text-base font-semibold text-foam hover:bg-sea/90"
        >
          {state === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="size-3.5 rounded-full border-2 border-foam/30 border-t-foam animate-spin"
              />
              Joining…
            </span>
          ) : (
            "Request access"
          )}
        </Button>
      </div>

      <div className="mt-3 min-h-5" aria-live="polite">
        {state === "loading" && (
          <p className="text-sm text-mist/80">
            Checking the list…
            <span
              aria-hidden
              className="ml-2 inline-block h-2 w-24 rounded-full bg-gradient-to-r from-mist/20 via-mist/70 to-mist/20 animate-shimmer align-middle"
            />
          </p>
        )}
        {state === "error" && (
          <p className="text-sm text-[#ffb4a8]">{message}</p>
        )}
        {state === "idle" && (
          <p className="text-sm text-mist/70">
            No spam. One note when the next cohort opens.
          </p>
        )}
      </div>
    </form>
  );
}
