# Relax Aircon

Website for Relax Aircon, AC, fridge and washing machine service in Vadodara. Live at https://www.relaxaircon.in

Next.js 14 (App Router), deployed on Vercel.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values.
3. `npm run dev`

## Environment variables (set these in Vercel too)

| Variable | Needed for |
| --- | --- |
| `SESSION_SECRET` | Staff login. Random, 32+ characters (`openssl rand -hex 32`). |
| `ADMIN_PASSWORD` | Owner login at `/login`. 8+ characters, use a long passphrase. |
| `TECH_PASSWORD` | Technician login. Optional. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Employee records. |
| `AADHAAR_ENCRYPTION_KEY` | Encrypting Aadhaar numbers (64 hex chars). |

Without `SESSION_SECRET` and `ADMIN_PASSWORD`, staff login stays disabled. Without the Supabase keys, the employee API returns 503.

## Structure

- `lib/site.ts`: phone number, hours, services, prices and areas. Edit business details here.
- `middleware.ts` and `lib/auth.ts`: protect `/dashboard/*` and `/api/*` with a signed session cookie.
- `app/robots.ts`, `app/sitemap.ts`: SEO files.
- `public/google6ae2d81557a24664.html`: Google Search Console verification. Do not delete.
- Bookings are sent to the owner's WhatsApp with the details filled in. The admin and technician dashboards still show sample data.
