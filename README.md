# Tarjetas de Invitación · Yeizer & Diana

Invitación digital de boda con enlace personalizado por invitado, confirmación de asistencia (RSVP) y panel de administración.

**Boda:** 10 de diciembre de 2026 · Finca Villa Fe, Arjona (Bolívar), Colombia.

---

## Características

### Invitación personalizada (`/i/[slug]`)

Cada invitado recibe un enlace único con su nombre. La invitación incluye:

- **Apertura cinematográfica**: video de un sobre con sello de cera que se abre al tocarlo.
- **Música de fondo**: reproductor que empieza al abrir el sobre.
- **Nombres del invitado** destacados, más un mensaje personal opcional.
- **Cuenta regresiva** hasta el día de la boda.
- **Ceremonia y recepción**: fecha, lugar, horarios y botón "Cómo llegar" (Google Maps).
- **Transporte en van**: punto de encuentro y hora de salida por invitado, más hora de regreso.
- **Código de vestimenta**: estilo, indicaciones para mujeres y hombres, paleta pastel sugerida y colores reservados para los novios.
- **Confirmación de asistencia**: el invitado acepta o declina y elige cuántos cupos usará. La confirmación cierra automáticamente en la fecha límite.
- **Regalo**: lluvia de sobres el día de la boda o aporte digital por Bre-B (QR y llave copiable).
- **Playlist de YouTube** con las canciones de la boda.

### Panel de administración (`/admin`)

Protegido con contraseña. Permite:

- Crear, editar y eliminar invitaciones (nombres, cupos, mensaje y transporte).
- Generar el enlace único de cada invitado y copiarlo.
- Ver el estado de cada RSVP: pendiente, confirmado o declinado.
- Buscar, filtrar y exportar la lista de invitados a CSV.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Actions) · React 19 · TypeScript |
| Estilos | Tailwind CSS 4 · [shadcn/ui](https://ui.shadcn.com) sobre Base UI |
| Animación | Framer Motion |
| Base de datos | [Neon](https://neon.tech) Postgres (vía Vercel Marketplace) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) + drizzle-kit |
| Validación | Zod |
| Deploy | [Vercel](https://vercel.com) |

---

## Estructura

```
src/
├── app/
│   ├── i/[slug]/page.tsx      # Invitación personalizada
│   ├── admin/                 # Panel (dashboard, login, server actions)
│   ├── actions/rsvp.ts        # Server action de confirmación
│   └── page.tsx               # Raíz: responde 404 (solo se accede por enlace)
├── components/
│   ├── invite/                # Piezas de la invitación
│   ├── admin/                 # Dashboard y diálogos de invitaciones
│   └── ui/                    # Componentes shadcn/ui
├── db/
│   ├── schema.ts              # Tabla `invitations`
│   └── index.ts               # Cliente Neon + Drizzle
├── lib/
│   ├── wedding-config.ts      # Todos los datos de la boda
│   ├── auth.ts                # Sesión del admin (cookie firmada HMAC)
│   └── rsvp-deadline.ts       # Fecha límite y formato de horas
└── proxy.ts                   # Protege las rutas /admin/*
public/
├── video/                     # Video de apertura del sobre
├── images/                    # Fotos, QR, florales y texturas
└── audio/                     # Música de fondo
```

---

## Puesta en marcha

### Requisitos

- Node.js 20 o superior
- Una base de datos Postgres en Neon

### Instalación

```bash
git clone https://github.com/Yeizermarrugo/tarjetas-invitacion.git
cd tarjetas-invitacion
npm install
```

### Variables de entorno

Crea `.env.local` en la raíz:

```bash
# Conexión a Neon Postgres
DATABASE_URL="postgresql://..."

# Contraseña de acceso al panel /admin
ADMIN_PASSWORD="..."

# Secreto para firmar la cookie de sesión (cadena aleatoria larga)
SESSION_SECRET="..."

# Opcional: URL de la app "Momentos" que se muestra al confirmar asistencia
NEXT_PUBLIC_MOMENTOS_URL="https://..."
```

Para generar un `SESSION_SECRET`:

```bash
openssl rand -base64 32
```

Si el proyecto está vinculado a Vercel, puedes traer las variables con `vercel env pull .env.local`.

> `.env.local` está en `.gitignore`. Nunca subas credenciales al repositorio.

### Base de datos

Aplica el esquema a Neon:

```bash
npm run db:push
```

### Desarrollo

```bash
npm run dev
```

- Panel: <http://localhost:3000/admin>
- Invitación: <http://localhost:3000/i/[slug]> (crea una invitación desde el panel para obtener el slug)

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run db:push` | Aplica `src/db/schema.ts` a la base de datos |
| `npm run db:studio` | Abre Drizzle Studio para ver y editar datos |

---

## Personalización

Los datos de la boda viven en **`src/lib/wedding-config.ts`**:

| Campo | Contenido |
|---|---|
| `couple` | Nombres de los novios |
| `date`, `displayDate`, `arrivalTime` | Fecha y hora de llegada |
| `ceremony`, `reception` | Lugar, dirección, horarios y enlace de Maps |
| `rsvpDeadline` | Fecha límite para confirmar (cierra a las 23:59, hora Colombia) |
| `van` | Valores por defecto del transporte y hora de regreso |
| `dressCode` | Estilo, indicaciones y colores reservados |
| `gift` | Texto de regalo, lluvia de sobres, llave Bre-B y QR |
| `tracks` | Música de fondo (archivos en `public/audio/`) |
| `youtubePlaylist` | Canciones de la playlist (ID de YouTube, título, artista, duración) |
| `story`, `quote` | Frase de presentación o versículo |

Los horarios se escriben en formato de 24 horas (`"23:00"`) y se muestran como `11:00 p. m.`.

Las fotos y videos se reemplazan en `public/` manteniendo el nombre de archivo, sin tocar código.

> **Playlist de YouTube:** algunos videos oficiales bloquean la reproducción dentro de otros sitios. Si una canción no suena, usa otra versión del video; el reproductor salta automáticamente las que fallan.

---

## Modelo de datos

Tabla `invitations`:

| Columna | Tipo | Descripción |
|---|---|---|
| `slug` | `text` (único) | Identificador del enlace `/i/[slug]` |
| `guest_name_1`, `guest_name_2` | `text` | Nombre(s) del invitado |
| `seats` | `integer` | Cupos asignados (1 o 2) |
| `message` | `text` | Mensaje personal opcional |
| `transport` | `enum` (`own`, `van`) | Forma de llegada |
| `van_meeting_point`, `van_departure_time` | `text` | Datos de la van para ese invitado |
| `rsvp_status` | `enum` (`pending`, `confirmed`, `declined`) | Estado de la confirmación |
| `rsvp_attendees`, `rsvp_note` | `integer`, `text` | Asistentes confirmados y nota |
| `rsvp_responded_at`, `created_at` | `timestamptz` | Fechas de respuesta y creación |

---

## Seguridad

- El panel usa **una sola contraseña** (`ADMIN_PASSWORD`), sin cuentas de usuario.
- La sesión es una cookie `httpOnly` firmada con HMAC (`SESSION_SECRET`).
- `src/proxy.ts` redirige a `/admin/login` cualquier petición a `/admin/*` sin sesión válida.
- Los enlaces de invitación usan slugs aleatorios, difíciles de adivinar.

---

## Despliegue

El proyecto está pensado para Vercel:

1. Importa el repositorio en Vercel.
2. Agrega la integración de Neon desde el Marketplace (crea `DATABASE_URL`).
3. Configura `ADMIN_PASSWORD`, `SESSION_SECRET` y, si aplica, `NEXT_PUBLIC_MOMENTOS_URL`.
4. Despliega. Cada push a `main` genera un despliegue de producción.

---

Hecho con cariño para el 10 · 12 · 2026.
