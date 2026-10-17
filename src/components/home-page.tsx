"use client";

import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { Heading, HeadingLevel } from "baseui/heading";
import { StyledLink } from "baseui/link";
import { Tag, KIND as TAG_KIND, HIERARCHY as TAG_HIERARCHY } from "baseui/tag";
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
  const [css, theme] = useStyletron();

  return (
    <Block
      display="flex"
      flexDirection="column"
      minHeight="100%"
      backgroundColor={brand.foam}
      color={brand.ink}
      overrides={{
        Block: {
          props: { "data-alto-stack": "baseui+styletron" },
        },
      }}
    >
      <Block
        position="absolute"
        left={0}
        right={0}
        top={0}
        overrides={{ Block: { style: { zIndex: 20 } } }}
      >
        <HeaderNavigation
          overrides={{
            Root: {
              style: {
                backgroundColor: "transparent",
                borderBottomWidth: 0,
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                maxWidth: "72rem",
                marginLeft: "auto",
                marginRight: "auto",
              },
            },
          }}
        >
          <NavigationList $align={ALIGN.left}>
            <NavigationItem
              className={css({
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: brand.foam,
                listStyleType: "none",
              })}
            >
              Alto
            </NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.center} />
          <NavigationList $align={ALIGN.right}>
            <NavigationItem>
              <Tag
                closeable={false}
                kind={TAG_KIND.accent}
                hierarchy={TAG_HIERARCHY.primary}
                overrides={{
                  Root: {
                    style: {
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "rgba(243,250,248,0.14)",
                      color: brand.foam,
                      borderTopWidth: 0,
                      borderRightWidth: 0,
                      borderBottomWidth: 0,
                      borderLeftWidth: 0,
                    },
                  },
                  Text: { style: { color: brand.foam } },
                }}
              >
                Uber Base Web
              </Tag>
            </NavigationItem>
            <NavigationItem>
              <StyledLink
                href="#access"
                className={css({
                  color: "rgba(215,235,230,0.9) !important",
                  textDecoration: "none",
                  fontWeight: 500,
                })}
              >
                Get access
              </StyledLink>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </Block>

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

          <Block
            maxWidth="72rem"
            marginLeft="auto"
            marginRight="auto"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            minHeight="100svh"
            paddingTop="7rem"
            paddingBottom="4rem"
            paddingLeft="1.5rem"
            paddingRight="1.5rem"
            overrides={{
              Block: {
                style: {
                  "@media screen and (min-width: 768px)": {
                    justifyContent: "center",
                    paddingTop: "6rem",
                    paddingBottom: "6rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                  },
                },
              },
            }}
          >
            <Block maxWidth="40rem">
              <HeadingLevel>
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
                <Heading
                  styleLevel={2}
                  className={`animate-rise-delay-1 ${css({
                    marginTop: "1.25rem !important",
                    marginBottom: "0 !important",
                    maxWidth: "34rem",
                    color: `${brand.foam} !important`,
                    fontFamily: "var(--font-syne), Syne, sans-serif !important",
                  })}`}
                >
                  Ship the take-home that reads like a product.
                </Heading>
                <p
                  className={`animate-rise-delay-2 ${css({
                    margin: "1.25rem 0 0",
                    maxWidth: "32rem",
                    fontSize: "clamp(1rem, 2vw, 1.125rem)",
                    lineHeight: 1.6,
                    color: "rgba(215,235,230,0.85)",
                  })}`}
                >
                  Built with Uber&apos;s Base Web design system and Styletron —
                  brand-first hero, honest copy, and waitlist states reviewers
                  can feel in one scroll.
                </p>
                <div
                  id="access"
                  className={`animate-rise-delay-3 ${css({ marginTop: "2rem" })}`}
                >
                  <WaitlistForm />
                </div>
              </HeadingLevel>
            </Block>
          </Block>
        </section>

        <Block
          backgroundColor={brand.foam}
          overrides={{
            Block: {
              style: { borderTop: "1px solid rgba(13,61,58,0.1)" },
            },
          }}
        >
          <Block
            maxWidth="72rem"
            marginLeft="auto"
            marginRight="auto"
            paddingTop="5rem"
            paddingBottom="5rem"
            paddingLeft="1.5rem"
            paddingRight="1.5rem"
            display="grid"
            overrides={{
              Block: {
                style: {
                  gap: "3rem",
                  "@media screen and (min-width: 768px)": {
                    gridTemplateColumns: "1.1fr 0.9fr",
                    gap: "4rem",
                    paddingTop: "7rem",
                    paddingBottom: "7rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                  },
                },
              },
            }}
          >
            <HeadingLevel>
              <Heading styleLevel={3} color={brand.ink}>
                Built for the reviewer who opens one tab.
              </Heading>
              <p
                className={css({
                  margin: "1rem 0 0",
                  maxWidth: "28rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: theme.colors.contentSecondary,
                })}
              >
                Alto keeps the slice narrow on purpose: one composition, one
                promise, and enough polish to prove taste — now composed from
                Base Web primitives instead of a Tailwind/shadcn mashup.
              </p>
            </HeadingLevel>
            <ul className={css({ listStyle: "none", margin: 0, padding: 0 })}>
              {craft.map((item) => (
                <li
                  key={item.title}
                  className={css({
                    borderLeft: `2px solid ${theme.colors.primary}`,
                    paddingLeft: "1.25rem",
                    marginBottom: "2rem",
                    ":last-child": { marginBottom: 0 },
                  })}
                >
                  <HeadingLevel>
                    <Heading styleLevel={5} color={brand.ink}>
                      {item.title}
                    </Heading>
                    <p
                      className={css({
                        margin: "0.5rem 0 0",
                        fontSize: "0.975rem",
                        lineHeight: 1.55,
                        color: theme.colors.contentSecondary,
                      })}
                    >
                      {item.body}
                    </p>
                  </HeadingLevel>
                </li>
              ))}
            </ul>
          </Block>
        </Block>

        <Block backgroundColor={brand.tide} color={brand.foam}>
          <Block
            maxWidth="72rem"
            marginLeft="auto"
            marginRight="auto"
            display="flex"
            flexDirection="column"
            paddingTop="4rem"
            paddingBottom="4rem"
            paddingLeft="1.5rem"
            paddingRight="1.5rem"
            overrides={{
              Block: {
                style: {
                  gap: "1.5rem",
                  "@media screen and (min-width: 768px)": {
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    paddingTop: "5rem",
                    paddingBottom: "5rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                  },
                },
              },
            }}
          >
            <Block maxWidth="36rem">
              <HeadingLevel>
                <Heading
                  styleLevel={3}
                  color={brand.foam}
                  className={css({ color: `${brand.foam} !important` })}
                >
                  Ready when the prompt hits your inbox.
                </Heading>
              </HeadingLevel>
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
            </Block>
            <Button $as="a" href="#access">
              Join the list
            </Button>
          </Block>
        </Block>
      </main>

      <Block
        backgroundColor={brand.foam}
        overrides={{
          Block: {
            style: { borderTop: "1px solid rgba(13,61,58,0.15)" },
          },
        }}
      >
        <Block
          maxWidth="72rem"
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          flexDirection="column"
          padding="2rem 1.5rem"
          font="ParagraphSmall"
          color="contentSecondary"
          overrides={{
            Block: {
              style: {
                gap: "0.5rem",
                "@media screen and (min-width: 768px)": {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                },
              },
            },
          }}
        >
          <Block font="LabelMedium" color={brand.ink}>
            Alto
          </Block>
          <Block>
            Take-home demo · Next.js · Uber Base Web (`baseui` + Styletron)
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
