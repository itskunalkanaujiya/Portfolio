# Premium Portfolio

A production-ready, Awwwards-style personal portfolio built with Next.js 15 (App
Router), TypeScript, Tailwind CSS, Framer Motion, GSAP-ready hooks, React Three
Fiber, Prisma, and PostgreSQL.

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, React Three Fiber / drei, Lenis smooth scroll, React Hook Form + Zod
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (designed for [Neon](https://neon.tech))
- **Auth:** JWT (via `jose`, edge-compatible) + bcrypt password hashing for the admin panel
- **Email:** Nodemailer (contact form notifications)
- **Deployment:** Vercel

---

## 1. Installation

```bash
npm install
```

## 2. Environment Variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

| Variable                                                  | Description                                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` / `DIRECT_URL`                             | PostgreSQL connection strings (Neon gives you both)                                               |
| `NEXT_PUBLIC_SITE_URL`                                    | Your production domain, used in metadata/sitemap/robots                                           |
| `NEXT_PUBLIC_SITE_NAME`                                   | Site title used in metadata                                                                       |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`                     | Not read directly by the app — see "Admin Panel" below for how the real admin user is created     |
| `JWT_SECRET`                                              | Long random string used to sign admin session tokens. Generate one with `openssl rand -base64 32` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | SMTP credentials for contact-form email notifications (e.g. a Gmail App Password)                 |
| `CONTACT_RECEIVER_EMAIL`                                  | Where contact form notifications are sent                                                         |
| `NEXT_PUBLIC_GITHUB_URL` / `NEXT_PUBLIC_LINKEDIN_URL`     | Optional, used if you wire them into `lib/data/nav.ts`                                            |

## 3. Database Setup

This project ships with a full Prisma schema (`prisma/schema.prisma`) covering
Projects, Education, Experience, Achievements, Gallery, Testimonials, Blog
posts, Contact messages, and the Admin user.

**Note on the fallback layer:** every homepage section reads through
`src/lib/queries.ts`, which tries Postgres first and falls back to static
placeholder data if the database isn't reachable. This means `npm run dev`
works immediately after `npm install`, even before you've set up a database —
useful for previewing the design. Once you connect a real database, real rows
automatically take over.

### Push the schema (quick start, no migration history)

```bash
npm run db:push
```

### Or create a versioned migration (recommended for production)

```bash
npm run db:migrate
```

### Seed placeholder data

```bash
npm run db:seed
```

This creates:

- An admin user: `admin@example.com` / `changeme123` (**change this immediately** — see below)
- Sample education, experience, projects, achievements, gallery items, testimonials, and one blog post

### Inspect your data

```bash
npm run db:studio
```

## 4. Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 5. Admin Panel

Visit `/admin` to log in. The seed script creates a default account
(`admin@example.com` / `changeme123`) — **replace this before deploying**:

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_NEW_PASSWORD', 10))"
```

Then update that admin's `passwordHash` directly in the database (via
`npm run db:studio`, or a one-off script), or delete the seeded admin and
create a new one with your generated hash.

The dashboard (`/admin/dashboard`) currently implements full CRUD for
**Projects** (add / edit / delete) as the reference implementation. The API
routes follow a consistent, repeatable pattern:

```
GET    /api/projects        → list
POST   /api/projects        → create   (requires admin session)
GET    /api/projects/[id]   → read one
PUT    /api/projects/[id]   → update   (requires admin session)
DELETE /api/projects/[id]   → delete   (requires admin session)
```

To add CRUD for the other models (Education, Experience, Achievements,
Gallery, Testimonials, Blog), copy `src/app/api/projects/route.ts` and
`src/app/api/projects/[id]/route.ts`, swap `prisma.project` for the model you
need, add a matching Zod schema in `lib/validations.ts`, and add a new tab/
table to `src/app/admin/dashboard/page.tsx` following the existing Projects
table + modal form pattern. Route protection (`getAdminSession`) and the
`/admin/dashboard` middleware guard already cover any new admin sub-routes you
add under `/admin/dashboard/*`.

Contact messages are stored in `ContactMessage` and can be read via
`npm run db:studio` or by adding a simple `/admin/dashboard/messages` list
page (`prisma.contactMessage.findMany()`), same pattern as above.

## 6. Content You Need to Replace

Search the codebase for these placeholders and swap in your real info:

- `Kunal Kanaujiya`, `YOUR_PHOTO`, `Kunal_Kanaujiya_Resume.pdf` — Navbar, Hero, Footer, metadata
- `YOUR_COLLEGE`, `YOUR_SCHOOL` — `prisma/seed.ts` (Education)
- `COMPANY_NAME`, `COMPANY_LOGO` — `prisma/seed.ts` (Experience)
- `PROJECT_IMAGE_*`, project titles/descriptions — `prisma/seed.ts` or the Admin dashboard
- `CERTIFICATE_IMAGE_*` — Achievements
- `GALLERY_IMAGE_*` — Gallery
- Social links — `src/lib/data/nav.ts`
- Skills / proficiency levels — `src/lib/data/skills.ts`
- Coding profile usernames — `src/lib/data/coding-profiles.ts`
- Stats (projects completed, problems solved, etc.) — `src/lib/data/stats.ts`

See also `public/images/README.md` and `public/resume/README.md` for exactly
which image/PDF files to drop in.

## 7. Deployment on Vercel

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all variables from `.env.example` in the Vercel project's Environment
   Variables settings.
4. Set the **Build Command** to `next build` (default) — `postinstall` already
   runs `prisma generate` automatically.
5. Provision a [Neon](https://neon.tech) Postgres database, copy its pooled
   and direct connection strings into `DATABASE_URL` and `DIRECT_URL`.
6. After the first deploy, run migrations against production either via a
   Vercel deploy hook, or locally:
   ```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   DATABASE_URL="<production-url>" npx tsx prisma/seed.ts
   ```
7. Update `NEXT_PUBLIC_SITE_URL` to your real domain (needed for correct
   sitemap/robots/OpenGraph output).

## 8. Performance & Accessibility Notes

- Sections are server components by default; only interactive pieces
  (forms, filters, sliders, the 3D hero, cursor) are client components.
- The Three.js hero (`components/three/HeroScene.tsx`) is loaded with
  `next/dynamic` and `ssr: false` to keep it out of the server bundle.
  Consider `next/dynamic` for anything else you add to `Projects.tsx`/`Gallery.tsx`
  if you swap in heavier real image galleries.
- All interactive elements have visible focus states (see `globals.css`) and
  `aria-label`s.
- `prefers-reduced-motion` is respected in the particle canvas, Lenis smooth
  scroll, and globally via a CSS media query that shortens all animations.
- Once you add real images, use `next/image` (see `public/images/README.md`)
  for automatic optimization and lazy loading.

## 9. Project Structure

```
prisma/               Schema, seed script
src/
  app/                 Routes (App Router), API routes, SEO files (robots.ts, sitemap.ts, manifest.ts)
  components/
    sections/          One component per homepage section
    ui/                 Reusable primitives (Button, GlassCard, Counter, etc.)
    three/              React Three Fiber hero scene
  lib/
    data/               Static placeholder content (skills, nav, coding profiles, stats)
    queries.ts          DB-first-with-fallback data layer
    prisma.ts           Prisma client singleton
    auth.ts             JWT sign/verify (admin sessions)
    validations.ts      Zod schemas
    mailer.ts           Nodemailer transporter + contact notification
  hooks/                useScrollProgress, useActiveSection, useMousePosition
  middleware.ts         Protects /admin/dashboard
  types/                Shared TypeScript types
```

---

Built to be extended — the Projects CRUD is the reference pattern for wiring
up the rest of the admin panel as your content grows.
