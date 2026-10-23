@AGENTS.md

# tarjetas-invitacion

Sitio de invitación digital de boda (Yeizer & Diana, 2026-12-10). Next.js 16 App Router + Tailwind 4 + shadcn/ui (base-ui primitives, no Radix — usar prop `render`, no `asChild`). Neon Postgres via Vercel Marketplace + Drizzle ORM. Deploy: Vercel. Repo GitHub **público**.

## Estructura
- `src/app/page.tsx` — raíz responde `notFound()`; solo se entra por enlace personal.
- `src/app/i/[slug]/page.tsx` — invitación personalizada (seal-intro, portada + música, countdown, ceremonia, vestimenta, RSVP, regalo, playlist YouTube).
- `src/app/admin/` — panel admin (dashboard, login, `actions.ts` CRUD invitaciones). `src/proxy.ts` protege `/admin/*`.
- `src/app/actions/rsvp.ts` — server action de confirmación.
- `src/components/invite/` — piezas de la invitación. `rsvp-gate.tsx` es `"use client"` → todo lo que renderiza (ej. `rsvp-confirmed.tsx`) corre en cliente.
- `src/components/wedding/` — legado de la landing vieja; solo `countdown.tsx` sigue en uso.
- `src/components/invite/florals.tsx` — ramos laterales (`rosas`, `pampa`, `ramo`), imágenes izq/der en `public/images/florals/`. Patrón: capa `absolute left-1/2 w-screen max-w-[720px] -translate-x-1/2 overflow-hidden` para que sangren al borde de pantalla.
- `src/db/schema.ts` — tabla `invitations` (slug, guestName1/2, seats, message, transport own|van, van meeting point/hora, rsvp status/attendees/note/respondedAt).
- `src/lib/wedding-config.ts` — toda la data de la boda (fecha, ceremonia/recepción, rsvpDeadline, van, dressCode, regalo Bre-B, tracks, playlist YouTube).
- `src/lib/invite-message.ts` — texto de WhatsApp que acompaña el enlace.
- `src/lib/auth.ts` — password única `ADMIN_PASSWORD`, cookie HMAC con `SESSION_SECRET` (sin cuentas, decisión explícita del usuario).
- `docs/screenshots/` — capturas móviles usadas en el README.

## Variables de entorno
`DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `NEXT_PUBLIC_MOMENTOS_URL` (botón "Ir a Momentos" tras confirmar; debe ser `NEXT_PUBLIC_` porque se lee en cliente; en Vercel tipo **Config**, no Secret; requiere redeploy al cambiar porque se incrusta en build).

## Comandos
- `npm run dev` / `build` / `start` / `lint`
- `npm run db:push` — aplica schema a Neon. **DB compartida con app Momentos**: `drizzle.config.ts` tiene `tablesFilter: ["invitations"]`; para columnas nuevas preferir SQL aditivo manual.
- `npm run db:studio` — Drizzle Studio

## Estado (2026-10-22)
Real: nombres, fecha, ceremonia/recepción (Finca Villa Fe, Arjona Bolívar), foto real de la pareja (`hero-couple-2026.jpg`), video de apertura, regalo Bre-B, playlist YouTube, `story`. Evento **solo adultos**: aviso "no se admiten niños" (negrita, entre líneas doradas) bajo el saludo en `src/app/i/[slug]/page.tsx`.
Pendiente: confirmar `NEXT_PUBLIC_MOMENTOS_URL` en Vercel + redeploy. `ADMIN_PASSWORD`/`SESSION_SECRET` autogenerados (usuario no eligió password propio).
