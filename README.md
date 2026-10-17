# Alto

A polished single-page landing demo for take-home style interviews. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

Alto shows brand-first hero craft, intentional motion, and a waitlist form with idle, loading, error, and success states — no auth, database, or backend services.

## Run locally

```bash
npm install
npm run dev
```

Dev server binds to [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Deploy on Vercel

Next.js works with Vercel defaults — no `vercel.json` required.

### Production deploy (recommended)

1. Push this repo to GitHub (`https://github.com/krupa03150/take-home`).
2. In [Vercel](https://vercel.com/new): **Add New… → Project → Import** `krupa03150/take-home`.
3. Leave Framework Preset as **Next.js**, then **Deploy**.
4. Turn on automatic deployments for `main` (and optionally preview deploys for PRs).

CLI alternative (requires a logged-in Vercel account or `VERCEL_TOKEN`):

```bash
npx vercel login
npx vercel link          # create/link project
npx vercel git connect   # attach the GitHub repo for auto-deploys
npx vercel --prod        # production deploy
```

After the first production deploy, the public URL looks like:

`https://<project-name>.vercel.app`

(Document the exact URL here once live.)

### Temporary anonymous deploy

Without Vercel auth, you can still smoke-test with:

```bash
npx vercel deploy --temporary --yes --prod
```

Anonymous deploys expire quickly and must be [claimed](https://vercel.com/docs/cli/deploying-from-cli) to keep. Prefer linking the GitHub repo for a lasting reviewer URL.

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start the Next.js dev server   |
| `npm run build` | Production build               |
| `npm run start` | Serve the production build     |
| `npm run lint`  | Run ESLint                     |

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- shadcn/ui (Button, Input)
- Google fonts: Syne (display) + Figtree (body)
