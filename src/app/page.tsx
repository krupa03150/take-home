import { WaitlistForm } from "@/components/waitlist-form";

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

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-foam text-ink">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-foam md:text-xl"
          >
            Alto
          </a>
          <a
            href="#access"
            className="text-sm font-medium text-mist/85 transition-colors hover:text-foam"
          >
            Get access
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative isolate min-h-[100svh] overflow-hidden text-foam">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_10%_0%,#1f8a7a_0%,transparent_42%),radial-gradient(90%_70%_at_90%_20%,#14665c_0%,transparent_45%),linear-gradient(165deg,#06141a_0%,#0a2a28_48%,#123f3a_100%)]"
          />
          <div
            aria-hidden
            className="animate-drift absolute -left-1/4 top-[-10%] -z-10 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(196,232,216,0.22),transparent_68%)] blur-2xl"
          />
          <div
            aria-hidden
            className="animate-drift absolute -right-[20%] bottom-[-15%] -z-10 h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(31,138,122,0.35),transparent_70%)] blur-3xl [animation-delay:-6s]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(243,250,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(243,250,248,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]"
          />

          <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-24">
            <div className="max-w-2xl">
              <p className="animate-rise font-display text-5xl font-extrabold tracking-tight text-foam sm:text-6xl md:text-7xl lg:text-8xl">
                Alto
              </p>
              <h1 className="animate-rise-delay-1 mt-5 max-w-xl font-display text-3xl font-semibold leading-[1.12] tracking-tight text-foam sm:text-4xl md:text-5xl">
                Ship the take-home that reads like a product.
              </h1>
              <p className="animate-rise-delay-2 mt-5 max-w-lg text-base leading-relaxed text-mist/85 sm:text-lg">
                A single-page demo for interview craft: brand-first hero,
                honest copy, and interaction states reviewers can feel in one
                scroll.
              </p>
              <div id="access" className="animate-rise-delay-3 mt-8">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-tide/10 bg-foam">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-8 md:py-28">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Built for the reviewer who opens one tab.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Alto keeps the slice narrow on purpose: one composition, one
                promise, and enough polish to prove taste without inventing a
                platform.
              </p>
            </div>
            <ul className="space-y-8">
              {craft.map((item) => (
                <li key={item.title} className="border-l-2 border-sea/40 pl-5">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-tide text-foam">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Ready when the prompt hits your inbox.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-mist/80">
                Clone it, rename the brand, keep the craft. Localhost in under a
                minute.
              </p>
            </div>
            <a
              href="#access"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-sea px-5 text-base font-semibold text-foam transition-colors hover:bg-sea/90"
            >
              Join the list
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-tide/15 bg-foam">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-display font-semibold text-ink">Alto</p>
          <p>Take-home demo · Next.js · Tailwind · shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}
