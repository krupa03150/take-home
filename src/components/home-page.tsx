"use client";

import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { WaitlistForm } from "@/components/waitlist-form";
import { brand } from "@/lib/theme";

const craft = [
  {
    title: "Brand before boilerplate",
    body: "The first screen names the product, states the promise, and shows atmosphere — not a dashboard of filler widgets.",
  },
  {
    title: "Motion with intent",
    body: "Entrance, drift, and feedback animations that guide attention without turning the page into a carnival.",
  },
  {
    title: "States that earn trust",
    body: "Idle copy, loading shimmer, and a clear success path so reviewers see how you handle the quiet moments.",
  },
];

export function HomePage() {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        minHeight: "100%",
        flexDirection: "column",
        backgroundColor: brand.foam,
        color: brand.ink,
      })}
    >
      <header
        className={css({
          position: "absolute",
          insetInline: 0,
          top: 0,
          zIndex: 20,
        })}
      >
        <div
          className={css({
            margin: "0 auto",
            width: "100%",
            maxWidth: "72rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            "@media screen and (min-width: 768px)": {
              paddingLeft: "2rem",
              paddingRight: "2rem",
            },
          })}
        >
          <a
            href="#top"
            className={css({
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: brand.foam,
              textDecoration: "none",
              "@media screen and (min-width: 768px)": { fontSize: "1.25rem" },
            })}
          >
            Alto
          </a>
          <a
            href="#access"
            className={css({
              fontSize: "0.925rem",
              fontWeight: 500,
              color: "rgba(215,235,230,0.85)",
              textDecoration: "none",
              transition: "color 160ms ease",
              ":hover": { color: brand.foam },
            })}
          >
            Get access
          </a>
        </div>
      </header>

      <main id="top" className={css({ flex: 1 })}>
        <section
          className={css({
            position: "relative",
            isolation: "isolate",
            minHeight: "100svh",
            overflow: "hidden",
            color: brand.foam,
          })}
        >
          <div
            aria-hidden
            className={css({
              position: "absolute",
              inset: 0,
              zIndex: -10,
              backgroundImage:
                "radial-gradient(120% 80% at 10% 0%, #1f8a7a 0%, transparent 42%), radial-gradient(90% 70% at 90% 20%, #14665c 0%, transparent 45%), linear-gradient(165deg, #06141a 0%, #0a2a28 48%, #123f3a 100%)",
            })}
          />
          <div
            aria-hidden
            className={`animate-drift ${css({
              position: "absolute",
              left: "-25%",
              top: "-10%",
              zIndex: -10,
              height: "70%",
              width: "70%",
              borderRadius: "9999px",
              backgroundImage:
                "radial-gradient(circle, rgba(196,232,216,0.22), transparent 68%)",
              filter: "blur(28px)",
            })}`}
          />
          <div
            aria-hidden
            className={`animate-drift ${css({
              position: "absolute",
              right: "-20%",
              bottom: "-15%",
              zIndex: -10,
              height: "55%",
              width: "55%",
              borderRadius: "9999px",
              backgroundImage:
                "radial-gradient(circle, rgba(31,138,122,0.35), transparent 70%)",
              filter: "blur(36px)",
              animationDelay: "-6s",
            })}`}
          />
          <div
            aria-hidden
            className={css({
              position: "absolute",
              inset: 0,
              zIndex: -10,
              opacity: 0.18,
              backgroundImage:
                "linear-gradient(rgba(243,250,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(243,250,248,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 78%)",
            })}
          />

          <div
            className={css({
              margin: "0 auto",
              display: "flex",
              minHeight: "100svh",
              width: "100%",
              maxWidth: "72rem",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "7rem 1.5rem 4rem",
              "@media screen and (min-width: 768px)": {
                justifyContent: "center",
                padding: "6rem 2rem",
              },
            })}
          >
            <div className={css({ maxWidth: "40rem" })}>
              <p
                className={`animate-rise ${css({
                  margin: 0,
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "clamp(3rem, 10vw, 6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  color: brand.foam,
                })}`}
              >
                Alto
              </p>
              <h1
                className={`animate-rise-delay-1 ${css({
                  margin: "1.25rem 0 0",
                  maxWidth: "34rem",
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
                  fontWeight: 650,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: brand.foam,
                })}`}
              >
                Ship the take-home that reads like a product.
              </h1>
              <p
                className={`animate-rise-delay-2 ${css({
                  margin: "1.25rem 0 0",
                  maxWidth: "32rem",
                  fontSize: "clamp(1rem, 2vw, 1.125rem)",
                  lineHeight: 1.6,
                  color: "rgba(215,235,230,0.85)",
                })}`}
              >
                A single-page demo for interview craft: brand-first hero, honest
                copy, and interaction states reviewers can feel in one scroll —
                now on Uber Base Web.
              </p>
              <div
                id="access"
                className={`animate-rise-delay-3 ${css({ marginTop: "2rem" })}`}
              >
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>

        <section
          className={css({
            borderTop: "1px solid rgba(13,61,58,0.1)",
            backgroundColor: brand.foam,
          })}
        >
          <div
            className={css({
              margin: "0 auto",
              width: "100%",
              maxWidth: "72rem",
              display: "grid",
              gap: "3rem",
              padding: "5rem 1.5rem",
              "@media screen and (min-width: 768px)": {
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "4rem",
                padding: "7rem 2rem",
              },
            })}
          >
            <div>
              <h2
                className={css({
                  margin: 0,
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 650,
                  letterSpacing: "-0.02em",
                  color: brand.ink,
                })}
              >
                Built for the reviewer who opens one tab.
              </h2>
              <p
                className={css({
                  margin: "1rem 0 0",
                  maxWidth: "28rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "#3d5c58",
                })}
              >
                Alto keeps the slice narrow on purpose: one composition, one
                promise, and enough polish to prove taste without inventing a
                platform.
              </p>
            </div>
            <ul className={css({ listStyle: "none", margin: 0, padding: 0 })}>
              {craft.map((item) => (
                <li
                  key={item.title}
                  className={css({
                    borderLeft: "2px solid rgba(31,138,122,0.4)",
                    paddingLeft: "1.25rem",
                    marginBottom: "2rem",
                    ":last-child": { marginBottom: 0 },
                  })}
                >
                  <h3
                    className={css({
                      margin: 0,
                      fontFamily: "var(--font-syne), Syne, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 650,
                      color: brand.ink,
                    })}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={css({
                      margin: "0.5rem 0 0",
                      fontSize: "0.975rem",
                      lineHeight: 1.55,
                      color: "#3d5c58",
                    })}
                  >
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={css({
            backgroundColor: brand.tide,
            color: brand.foam,
          })}
        >
          <div
            className={css({
              margin: "0 auto",
              width: "100%",
              maxWidth: "72rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "4rem 1.5rem",
              "@media screen and (min-width: 768px)": {
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "5rem 2rem",
              },
            })}
          >
            <div className={css({ maxWidth: "36rem" })}>
              <h2
                className={css({
                  margin: 0,
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 650,
                  letterSpacing: "-0.02em",
                })}
              >
                Ready when the prompt hits your inbox.
              </h2>
              <p
                className={css({
                  margin: "0.75rem 0 0",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "rgba(215,235,230,0.8)",
                })}
              >
                Clone it, rename the brand, keep the craft. Localhost in under a
                minute.
              </p>
            </div>
            <Button
              $as="a"
              href="#access"
              overrides={{
                BaseButton: {
                  style: {
                    height: "3rem",
                    paddingLeft: "1.25rem",
                    paddingRight: "1.25rem",
                    fontSize: "1rem",
                    fontWeight: 650,
                    textDecoration: "none",
                  },
                },
              }}
            >
              Join the list
            </Button>
          </div>
        </section>
      </main>

      <footer
        className={css({
          borderTop: "1px solid rgba(13,61,58,0.15)",
          backgroundColor: brand.foam,
        })}
      >
        <div
          className={css({
            margin: "0 auto",
            width: "100%",
            maxWidth: "72rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "2rem 1.5rem",
            fontSize: "0.875rem",
            color: "#3d5c58",
            "@media screen and (min-width: 768px)": {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            },
          })}
        >
          <p
            className={css({
              margin: 0,
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontWeight: 650,
              color: brand.ink,
            })}
          >
            Alto
          </p>
          <p className={css({ margin: 0 })}>
            Take-home demo · Next.js · Uber Base Web
          </p>
        </div>
      </footer>
    </div>
  );
}
