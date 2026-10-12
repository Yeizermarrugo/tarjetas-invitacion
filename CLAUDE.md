@AGENTS.md

# tarjetas-invitacion

Sitio de invitación digital de boda (Yeizer & Diana, 2026-12-10). Next.js App Router + Tailwind + shadcn/ui (base-ui primitives, no Radix — usar prop `render`, no `asChild`). Neon Postgres via Vercel Marketplace + Drizzle ORM. Deploy target: Vercel.

## Estructura
- `src/app/page.tsx` — landing pública de la boda (envelope intro, countdown, galería, RSVP gate, música, regalo).
- `src/app/i/[slug]/page.tsx` — invitación personalizada por invitado.
- `src/app/admin/` — panel admin (`page.tsx` dashboard, `login/page.tsx`, `actions.ts` server actions CRUD invitaciones).
- `src/app/actions/rsvp.ts` — server action de confirmación de asistencia.
- `src/components/invite/` — piezas de la invitación individual (seal-intro animado, rsvp-form, music-player, quick-actions, etc).
- `src/components/wedding/` — piezas de la landing pública (envelope, countdown, gallery, wax-seal-button).
- `src/components/admin/` — dashboard + diálogos crear/editar invitación.
- `src/db/schema.ts` — tabla `invitations` (slug, guestName1/2, seats, rsvpStatus/attendees/note/respondedAt).
- `src/lib/wedding-config.ts` — toda la data de la boda (fecha, ceremonia/recepción, regalo Bre-B, playlist YouTube, galería).
- `src/lib/auth.ts` — auth admin: password única vía `ADMIN_PASSWORD`, cookie firmada HMAC con `SESSION_SECRET` (sin cuentas de usuario, decisión explícita del usuario).

## Comandos
- `npm run dev` / `build` / `start` / `lint`
- `npm run db:push` — aplica `src/db/schema.ts` a Neon (via `dotenv -e .env.local`)
- `npm run db:studio` — Drizzle Studio

## Estado (2026-08-21)
Real: nombres, fecha, ceremonia/recepción (Finca Villa Fe, Arjona Bolívar), playlist YouTube, regalo Bre-B.
Placeholder aún: `story` (copy genérico), `videoUrl`/`spotifyPlaylistUrl` vacíos, fotos de `public/images/` son stock Unsplash (mismos nombres de archivo para reemplazar sin tocar código). `ADMIN_PASSWORD`/`SESSION_SECRET` autogenerados en `.env.local` (gitignored) y en Vercel env — usuario no eligió su propio password aún.

Antes de considerar la invitación lista para invitados reales: confirmar que `wedding-config.ts` tiene datos reales y que las fotos fueron reemplazadas.
