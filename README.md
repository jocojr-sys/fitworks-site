# FitWorks Studio website

Next.js 14 (App Router) + TinaCMS, deployed on Vercel. All page copy, services, prices, FAQ, hours and contact details are editable at `/admin` without touching code.

## Local development

```bash
npm install
cp .env.example .env        # fill in the values (see below)
npm run dev                 # site on http://localhost:3000, editor on http://localhost:3000/admin
```

`npm run dev` runs Tina's local content server plus `next dev`. Edits made in `/admin` are written straight to the JSON files in `content/`; commit them like any other change.

## Where things live

| What | Where |
|---|---|
| Site name, email, address, nav, footer | `content/settings/global.json` |
| Home page sections | `content/pages/home.json` |
| Fitting Technology page | `content/pages/technology.json` |
| Fits and pricing page copy | `content/pages/fits.json` |
| Each fit service (price, duration, what's included) | `content/services/*.json` |
| Booking page | `content/pages/book.json` |
| Editor schema (what fields exist) | `tina/config.ts` |
| Styles | `app/globals.css` |
| Booking email delivery | `app/api/book/route.ts` (Resend) |
| Fit finder rules | `components/FitFinder.tsx` |

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | TinaCloud project client ID |
| `TINA_TOKEN` | TinaCloud read-only content token |
| `NEXT_PUBLIC_TINA_BRANCH` | Git branch Tina reads/writes (Vercel sets `VERCEL_GIT_COMMIT_REF` automatically; this is a fallback) |
| `RESEND_API_KEY` | Resend API key for the booking form |
| `BOOKING_TO_EMAIL` | Where booking requests are sent |
| `BOOKING_FROM_EMAIL` | Verified sender address in Resend |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for the sitemap |

## Deploy

`npm run build` runs `tinacms build` (generates the client and `/admin`) and then `next build`. Vercel runs this automatically on every push.
