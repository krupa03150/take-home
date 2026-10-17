# Common Ground

Mobile-first take-home: an iPhone app experience for finding **recurring interest circles** so belonging compounds through familiar faces.

Built with **Next.js**, **Uber Base Web** (Styletron), and **Uber Move** typography, themed warm and approachable via `createLightTheme`.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43127](http://127.0.0.1:43127)

Optional durable supervisor (survives shell exit):

```bash
python3 scripts/daemonize-dev-43127.py
```

## Product flow (in the phone)

1. **Explore** — discovery feed  
2. **Circle Details** — sticky Join Circle  
3. **Welcome** — membership confirmation  
4. **Gathering** — simulated group call  
5. **Reconnect** — familiar people + next week  

Design rationale (separate from Eleanor’s path): [/rationale](http://127.0.0.1:43127/rationale)

On desktop, the app appears in a centered 393×852 phone frame with reviewer annotations. On narrow viewports it goes full-bleed.

## Stack

- Next.js App Router + React + TypeScript  
- Uber Base Web (`baseui`) + Styletron SSR  
- Uber Move / Move Text (self-hosted in `public/fonts/`)  
- Warm Common Ground theme tokens on Base Web primitives  
