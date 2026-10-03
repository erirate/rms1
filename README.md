This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Agent tooling

Configured in `.claude/settings.json` (project scope), so they load for anyone opening this repo in Claude Code:

- **Graphify**: `graphify update .` rebuilds the code graph in `graphify-out/` (gitignored). Needs `uv tool install graphifyy`.
- **Agent Skills**: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`.
- **Ponytail**: SessionStart hook; `/ponytail lite|full|ultra|off` sets the level.
- **OmniRoute** (opt-in): `npm install -g omniroute` (needs Node 22.22.2+ or 24+), then
  `OMNIROUTE_SERVER_HOST=127.0.0.1 omniroute serve --daemon --no-open`, connect providers in the dashboard at
  http://localhost:20128, and run `./scripts/claude-omniroute.sh`. OpenAI-compatible tools use
  `http://localhost:20128/v1` with model `auto/thrifty`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
