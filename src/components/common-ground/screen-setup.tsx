"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { INTEREST_OPTIONS } from "@/lib/data";
import {
  ActionRow,
  Field,
  ScreenFrame,
} from "@/components/common-ground/ui";

type Profile = {
  name: string;
  age: string;
  hobby: string;
  interests: string[];
};

type Props = {
  initialName?: string;
  onComplete: (profile: Profile) => void;
};

type Step = "name" | "age" | "hobby" | "interests";

const STEPS: Step[] = ["name", "age", "hobby", "interests"];

export function ScreenSetup({ initialName = "", onComplete }: Props) {
  const [css, theme] = useStyletron();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const finish = (next?: Partial<Profile>) => {
    const resolvedName = (next?.name ?? name).trim() || "Friend";
    onComplete({
      name: resolvedName,
      age: (next?.age ?? age).trim(),
      hobby: (next?.hobby ?? hobby).trim(),
      interests: next?.interests ?? interests,
    });
  };

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1]!);
      return;
    }
    finish();
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const stepMeta: Record<
    Step,
    { title: string; why: string; skipLabel: string }
  > = {
    name: {
      title: "What should we call you?",
      why: "Your name helps people in gatherings recognize you.",
      skipLabel: "Skip",
    },
    age: {
      title: "How old are you?",
      why: "Age helps us suggest gatherings that fit your stage of life.",
      skipLabel: "Skip",
    },
    hobby: {
      title: "What’s a hobby you enjoy?",
      why: "A hobby tells us the kind of time you like to spend with others.",
      skipLabel: "Skip",
    },
    interests: {
      title: "What interests you?",
      why: "Interests shape your feed so events feel familiar, not random.",
      skipLabel: "Skip for now",
    },
  };

  const meta = stepMeta[step];
  const stepIndex = STEPS.indexOf(step) + 1;

  return (
    <ScreenFrame>
      <p
        className={css({
          margin: 0,
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: theme.colors.accent600,
        })}
      >
        Profile setup · {stepIndex} of {STEPS.length}
      </p>
      <HeadingLevel>
        <Heading
          styleLevel={3}
          color="contentPrimary"
          className={css({
            marginTop: "8px !important",
            marginBottom: "0 !important",
          })}
        >
          {meta.title}
        </Heading>
      </HeadingLevel>
      <p
        className={css({
          margin: "10px 0 0",
          fontSize: "18px",
          color: theme.colors.contentSecondary,
          lineHeight: 1.45,
        })}
      >
        {meta.why}
      </p>

      <form
        className={css({
          marginTop: "24px",
          display: "grid",
          gap: "18px",
          paddingBottom: "24px",
        })}
        onSubmit={(e) => {
          e.preventDefault();
          if (step === "name") {
            const resolved = name.trim() || "Friend";
            setName(resolved);
            goNext();
            return;
          }
          goNext();
        }}
      >
        {step === "name" && (
          <Field
            id="cg-name"
            label="Name"
            value={name}
            onChange={setName}
            autoComplete="name"
            hint="Leave blank and we’ll use Friend — you can change it later."
          />
        )}

        {step === "age" && (
          <Field
            id="cg-age"
            label="Age"
            optional
            value={age}
            onChange={setAge}
            inputMode="numeric"
            hint="Optional. We only use this to fit gatherings — never shown as a public number."
          />
        )}

        {step === "hobby" && (
          <Field
            id="cg-hobby"
            label="Hobby"
            optional
            value={hobby}
            onChange={setHobby}
            hint="Optional. One thing you enjoy — baking, birds, books, anything."
          />
        )}

        {step === "interests" && (
          <fieldset
            className={css({
              margin: 0,
              padding: 0,
              border: "none",
            })}
          >
            <legend
              className={css({
                fontSize: "16px",
                fontWeight: 700,
                color: theme.colors.contentPrimary,
                marginBottom: "6px",
              })}
            >
              Interests{" "}
              <span
                className={css({
                  fontWeight: 600,
                  color: theme.colors.contentTertiary,
                })}
              >
                Optional
              </span>
            </legend>
            <p
              className={css({
                margin: "0 0 12px",
                fontSize: "17px",
                lineHeight: 1.4,
                color: theme.colors.contentSecondary,
              })}
            >
              Tap any that sound like you. You can skip and still see events.
            </p>
            <div
              className={css({
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              })}
            >
              {INTEREST_OPTIONS.map((interest) => {
                const active = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleInterest(interest)}
                    className={css({
                      minHeight: "48px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${
                        active ? theme.colors.accent : theme.colors.borderOpaque
                      }`,
                      backgroundColor: active
                        ? theme.colors.backgroundAccentLight
                        : theme.colors.backgroundPrimary,
                      color: active
                        ? theme.colors.accent700
                        : theme.colors.contentPrimary,
                      fontSize: "17px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: theme.typography.LabelMedium.fontFamily,
                      ":focus-visible": {
                        outline: `2px solid ${theme.colors.accent}`,
                        outlineOffset: "2px",
                      },
                    })}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <ActionRow
          skipLabel={meta.skipLabel}
          onSkip={() => {
            if (step === "name") {
              const resolved = name.trim() || "Friend";
              setName(resolved);
              goNext();
              return;
            }
            if (step === "interests") {
              finish();
              return;
            }
            goNext();
          }}
          continueLabel={step === "interests" ? "See my feed" : "Continue"}
          continueType="submit"
        />
      </form>
    </ScreenFrame>
  );
}
