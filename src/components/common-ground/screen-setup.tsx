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

type Step = "name" | "interests" | "age";

const STEPS: Step[] = ["name", "interests", "age"];

export function ScreenSetup({ initialName = "", onComplete }: Props) {
  const [css, theme] = useStyletron();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const finish = (overrides?: Partial<Profile>) => {
    onComplete({
      name: (overrides?.name ?? name).trim() || "Friend",
      age: (overrides?.age ?? age).trim(),
      hobby: overrides?.hobby ?? "",
      interests: overrides?.interests ?? interests,
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
    { title: string; why: string; skipLabel: string; continueLabel: string }
  > = {
    name: {
      title: "What should we call you?",
      why: "So people in gatherings can recognize you.",
      skipLabel: "Skip",
      continueLabel: "Continue",
    },
    interests: {
      title: "What interests you?",
      why: "So your feed shows gatherings that feel familiar.",
      skipLabel: "Skip",
      continueLabel: "Continue",
    },
    age: {
      title: "How old are you?",
      why: "So we can suggest gatherings that fit.",
      skipLabel: "Skip",
      continueLabel: "See my feed",
    },
  };

  const meta = stepMeta[step];
  const stepIndex = STEPS.indexOf(step) + 1;

  return (
    <ScreenFrame>
      <p
        className={css({
          margin: 0,
          fontSize: "16px",
          fontWeight: 700,
          color: theme.colors.accent600,
        })}
        aria-live="polite"
      >
        Step {stepIndex} of {STEPS.length}
      </p>

      <HeadingLevel>
        <Heading
          styleLevel={3}
          color="contentPrimary"
          className={css({
            marginTop: "12px !important",
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
          lineHeight: 1.4,
        })}
      >
        {meta.why}
      </p>

      <form
        className={css({
          marginTop: "28px",
          display: "grid",
          gap: "20px",
        })}
        onSubmit={(e) => {
          e.preventDefault();
          if (step === "name") {
            setName(name.trim() || "Friend");
          }
          goNext();
        }}
      >
        {step === "name" && (
          <Field
            id="cg-name"
            label="Your name"
            value={name}
            onChange={setName}
            autoComplete="name"
            hint="Leave blank and we’ll call you Friend."
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
                marginBottom: "10px",
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
            <div
              className={css({
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
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

        {step === "age" && (
          <Field
            id="cg-age"
            label="Age"
            optional
            value={age}
            onChange={setAge}
            inputMode="numeric"
            hint="Optional — never shown as a public number."
          />
        )}

        <ActionRow
          skipLabel={meta.skipLabel}
          onSkip={() => {
            if (step === "name") {
              setName(name.trim() || "Friend");
              goNext();
              return;
            }
            goNext();
          }}
          continueLabel={meta.continueLabel}
          continueType="submit"
        />
      </form>
    </ScreenFrame>
  );
}
