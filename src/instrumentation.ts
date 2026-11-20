// Next.js llama a register() una vez al arrancar cada instancia del servidor y espera a que termine
// antes de atender peticiones. Lo usamos para aplicar migraciones aditivas sin entrar a Neon:
// la DB es compartida con Momentos, así que solo se toca la tabla `invitations` y solo con
// sentencias idempotentes (IF NOT EXISTS). Equivale a drizzle/manual-0001-rsvp-deadline.sql.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || !process.env.DATABASE_URL) return;

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);
  try {
    await sql`ALTER TABLE invitations ADD COLUMN IF NOT EXISTS rsvp_deadline date`;
  } catch (error) {
    console.error("[migración] no se pudo crear invitations.rsvp_deadline:", error);
  }
}
