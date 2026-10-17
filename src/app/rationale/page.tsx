"use client";

import Link from "next/link";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const FIGJAM_URL =
  "https://www.figma.com/board/x67SZPFAjFQ28HnWdnpcyX/take-home-everlaw";

const principles = [
  {
    title: "Connection",
    body: "Shared interests and conversation, not a follower count.",
  },
  {
    title: "Quality time",
    body: "Time together that builds familiarity.",
  },
  {
    title: "Accessibility",
    body: "Participation that stays comfortable when mobility is the barrier.",
  },
];

const screenWhy = [
  {
    title: "Landing, then sign up or sign in",
    body: "Eleanor should already be inside something that feels familiar. Discoverability has to be obvious, and onboarding hurdles have to be few. The first screen has one job: start.",
  },
  {
    title: "Profile setup (name, age, hobby, interests)",
    body: "Matching starts from what she cares about. Shared interests are the conversation starter we are betting on — not a profile that asks for everything.",
  },
  {
    title: "Events feed with photos, Today / Tomorrow, and a filter",
    body: "She browses, then joins a virtual event. Photos make the activity recognizable before she commits. Relative dates match how she plans (“today,” “tomorrow”), not a calendar widget. The filter is “what I want,” tied to interests, so a gardening person is not dumped into a generic feed. Activities lean 65+ (chair yoga, walks, books, baking, memoir) because travel is the thing we removed — the event still has to feel like hers.",
  },
  {
    title: "Virtual, not a room across town",
    body: "The brief’s barrier is getting there. Every event is a call she can join from home. We show who and what before she joins, because meeting strangers is uncomfortable and she wants to know what she is walking into.",
  },
  {
    title: "Profile: friends and events she went to",
    body: "Familiarity is the point. Seeing people she has already met, and gatherings she already attended, is the reconnection loop: more relevant groups → more real connection → a reason to return and tell someone.",
  },
];

export default function RationalePage() {
  const [css, theme] = useStyletron();

  const sectionTitle = css({
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: theme.colors.contentPrimary,
    fontFamily: theme.typography.HeadingXSmall.fontFamily,
  });

  const body = css({
    margin: "8px 0 0",
    fontSize: "17px",
    lineHeight: 1.5,
    color: theme.colors.contentSecondary,
  });

  const stack = css({
    marginTop: "28px",
    display: "grid",
    gap: "22px",
  });

  return (
    <div
      className={css({
        minHeight: "100dvh",
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.contentPrimary,
        padding:
          "calc(20px + env(safe-area-inset-top, 0px)) 20px calc(32px + env(safe-area-inset-bottom, 0px))",
        maxWidth: "40rem",
        marginLeft: "auto",
        marginRight: "auto",
      })}
    >
      <Link
        href="/"
        className={css({
          display: "inline-flex",
          alignItems: "center",
          minHeight: "44px",
          fontWeight: 700,
          color: theme.colors.contentAccent,
          textDecoration: "none",
          fontSize: "16px",
          ":focus-visible": {
            outline: `2px solid ${theme.colors.accent}`,
            outlineOffset: "2px",
          },
        })}
      >
        ← Back to app
      </Link>

      <HeadingLevel>
        <Heading
          styleLevel={2}
          color="contentPrimary"
          className={css({
            marginTop: "16px !important",
            marginBottom: "0 !important",
          })}
        >
          Design rationale
        </Heading>
      </HeadingLevel>
      <p className={body}>
        Working hypotheses from the brief and the FigJam board — not validated
        findings. Kept off Eleanor’s critical path.
      </p>
      <p className={body}>
        Source:{" "}
        <a
          href={FIGJAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            color: theme.colors.contentAccent,
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            ":focus-visible": {
              outline: `2px solid ${theme.colors.accent}`,
              outlineOffset: "2px",
            },
          })}
        >
          take-home-everlaw FigJam
        </a>
      </p>

      <div className={stack}>
        <section>
          <h2 className={sectionTitle}>The challenge</h2>
          <p className={body}>
            Design a platform that helps older adults overcome barriers to
            social connection and build relationships that get more valuable as
            the network grows.
          </p>
          <ul
            className={css({
              margin: "12px 0 0",
              paddingLeft: "1.2rem",
              fontSize: "17px",
              lineHeight: 1.5,
              color: theme.colors.contentSecondary,
              display: "grid",
              gap: "8px",
            })}
          >
            <li>
              <strong
                className={css({
                  color: theme.colors.contentPrimary,
                  fontWeight: 700,
                })}
              >
                User goal:
              </strong>{" "}
              reduce loneliness through meaningful relationships.
            </li>
            <li>
              <strong
                className={css({
                  color: theme.colors.contentPrimary,
                  fontWeight: 700,
                })}
              >
                Business goal:
              </strong>{" "}
              grow an active network so more people means more relevant groups.
            </li>
          </ul>
          <p className={body}>
            About 28% of non-institutionalized adults 65+ live alone. About 75%
            use the internet; about 45% use social media. Physical limits,
            sensory impairments, self-consciousness about mobility aids, and
            transportation all make showing up in person harder. Digital reach
            exists; confidence does not.
          </p>
        </section>

        <section>
          <h2 className={sectionTitle}>Who this is for</h2>
          <p className={body}>
            <strong
              className={css({
                color: theme.colors.contentPrimary,
                fontWeight: 700,
              })}
            >
              Primary audience:
            </strong>{" "}
            adults 65+ whose mobility makes traditional in-person social life
            difficult. Not every older adult.
          </p>
          <p className={body}>
            Focusing one segment is deliberate. We cannot design for the whole
            65+ community at once. A specific group either supports the
            hypothesis or tells us where to look next. If it works, it is the
            path to scale.
          </p>
          <p className={body}>
            <strong
              className={css({
                color: theme.colors.contentPrimary,
                fontWeight: 700,
              })}
            >
              Eleanor Mitchell, 73.
            </strong>{" "}
            Retired, lives alone in a suburban home, family is not nearby. She
            can get around, but travel to a club is tiring. She uses a phone and
            tablet for messages, video, and familiar sites. Interests:
            gardening, reading, cooking, books.
          </p>
          <blockquote
            className={css({
              margin: "14px 0 0",
              padding: "14px 16px",
              borderLeft: `3px solid ${theme.colors.accent}`,
              backgroundColor: theme.colors.backgroundSecondary,
              borderRadius: "0 12px 12px 0",
              fontSize: "17px",
              lineHeight: 1.45,
              color: theme.colors.contentPrimary,
              fontStyle: "italic",
            })}
          >
            “I don&apos;t need something to keep me busy. I&apos;d love to have
            people I genuinely look forward to talking to.”
          </blockquote>
          <p className={body}>
            Her day: mornings are independent but quiet; afternoons she sees a
            gardening club and skips it because of the trip; evenings she misses
            people who remember last week&apos;s conversation.
          </p>
        </section>

        <section>
          <h2 className={sectionTitle}>Principles</h2>
          <p className={body}>
            Meaningful relationships are not “more taps.” The product should let
            people connect, spend time, and choose to come back. These are
            hypotheses.
          </p>
          <ul
            className={css({
              listStyle: "none",
              margin: "14px 0 0",
              padding: 0,
              display: "grid",
              gap: "12px",
            })}
          >
            {principles.map((item) => (
              <li
                key={item.title}
                className={css({
                  padding: "14px 16px",
                  borderRadius: "12px",
                  backgroundColor: theme.colors.backgroundSecondary,
                })}
              >
                <p
                  className={css({
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 700,
                    color: theme.colors.contentPrimary,
                  })}
                >
                  {item.title}
                </p>
                <p
                  className={css({
                    margin: "4px 0 0",
                    fontSize: "16px",
                    lineHeight: 1.45,
                    color: theme.colors.contentSecondary,
                  })}
                >
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={sectionTitle}>Why the product is shaped this way</h2>
          <div
            className={css({
              marginTop: "12px",
              display: "grid",
              gap: "18px",
            })}
          >
            {screenWhy.map((item) => (
              <div key={item.title}>
                <h3
                  className={css({
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 700,
                    color: theme.colors.contentPrimary,
                  })}
                >
                  {item.title}
                </h3>
                <p className={body}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>What we are not claiming</h2>
          <p className={body}>
            Small groups may feel kinder than a huge forum. Recurring time may
            turn a nice hour into a friendship. Interests alone may not be
            enough. Some people will find groups intimidating. Digital
            confidence varies. Strangers introduce privacy and scam risk; the
            MVP should not pretend that is solved.
          </p>
          <p className={body}>
            We have not shown that groups beat one-to-one, or that Eleanor would
            prefer video. The board marks those as hypotheses.
          </p>
        </section>

        <section>
          <h2 className={sectionTitle}>Journey this prototype covers</h2>
          <p className={body}>
            Discover the app → sign up → share interests → browse virtual events
            → join → see friends and past events. Conversations and calendar are
            on the board and intentionally later.
          </p>
        </section>
      </div>
    </div>
  );
}
