"use client";

import { useState } from "react";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { INTEREST_OPTIONS } from "@/lib/data";
import {
  ErrorText,
  Field,
  PrimaryButton,
  ScreenFrame,
} from "@/components/common-ground/ui";

type Props = {
  initialName?: string;
  onComplete: (profile: {
    name: string;
    age: string;
    hobby: string;
    interests: string[];
  }) => void;
};

export function ScreenSetup({ initialName = "", onComplete }: Props) {
  const [css, theme] = useStyletron();
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const submit = () => {
    setError(null);
    if (!name.trim()) {
      setError("What should we call you?");
      return;
    }
    if (!age.trim() || Number.isNaN(Number(age)) || Number(age) < 13) {
      setError("Enter an age of 13 or older.");
      return;
    }
    if (!hobby.trim()) {
      setError("Share one hobby so we can match the vibe.");
      return;
    }
    if (interests.length === 0) {
      setError("Pick at least one interest.");
      return;
    }
    onComplete({
      name: name.trim(),
      age: age.trim(),
      hobby: hobby.trim(),
      interests,
    });
  };

  return (
    <ScreenFrame>
      <p
        className={css({
          margin: 0,
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: theme.colors.accent600,
        })}
      >
        Profile setup
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
          A little about you
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
        We’ll use this to suggest virtual events that feel like your people.
      </p>

      <form
        className={css({
          marginTop: "22px",
          display: "grid",
          gap: "16px",
          paddingBottom: "24px",
        })}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Field
          id="cg-name"
          label="Name"
          value={name}
          onChange={setName}
          autoComplete="name"
          placeholder="Eleanor"
        />
        <Field
          id="cg-age"
          label="Age"
          value={age}
          onChange={setAge}
          inputMode="numeric"
          placeholder="28"
        />
        <Field
          id="cg-hobby"
          label="Hobby"
          value={hobby}
          onChange={setHobby}
          placeholder="Sourdough on Sundays"
        />

        <fieldset
          className={css({
            margin: 0,
            padding: 0,
            border: "none",
          })}
        >
          <legend
            className={css({
              fontSize: "14px",
              fontWeight: 700,
              color: theme.colors.contentSecondary,
              marginBottom: "10px",
            })}
          >
            Interests
          </legend>
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
                    minHeight: "44px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
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
                    fontSize: "15px",
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

        <ErrorText>{error}</ErrorText>
        <PrimaryButton type="submit">See events near my interests</PrimaryButton>
      </form>
    </ScreenFrame>
  );
}
