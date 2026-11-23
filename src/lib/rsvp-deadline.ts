import { weddingConfig } from "./wedding-config";

type WithDeadline = { rsvpDeadline?: string | null; rsvpStatus?: string };

// Fecha que aplica a una invitación: la propia o, si no tiene, la general.
export function deadlineOf(invitation?: WithDeadline) {
  return invitation?.rsvpDeadline || weddingConfig.rsvpDeadline;
}

// La fecha límite se cuenta completa: se puede confirmar hasta las 23:59 (hora Colombia) de ese día.
function deadlineEnd(deadline: string) {
  return new Date(`${deadline}T23:59:59-05:00`);
}

// Una invitación confirmada (aunque sea por 1 de 2 cupos) nunca se cierra, sin importar su fecha.
export function isRsvpClosed(invitation?: WithDeadline, now = new Date()) {
  if (invitation?.rsvpStatus === "confirmed") return false;
  return now > deadlineEnd(deadlineOf(invitation));
}

export function formatDeadline(invitation?: WithDeadline) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(deadlineEnd(deadlineOf(invitation)));
}

// Hoy en Colombia como YYYY-MM-DD.
export function todayInBogota(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(now);
}

function addDays(day: string, days: number) {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// Fecha por defecto para una invitación nueva: hoy + rsvpWindowDays, sin pasar el día de la boda.
export function defaultNewDeadline(now = new Date()) {
  const candidate = addDays(todayInBogota(now), weddingConfig.rsvpWindowDays);
  return candidate < weddingConfig.date ? candidate : weddingConfig.date;
}

// Valida una fecha YYYY-MM-DD del formulario admin. Devuelve null si es inválida.
export function parseDeadlineInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  if (Number.isNaN(new Date(`${value}T12:00:00Z`).getTime())) return null;
  if (value > weddingConfig.date) return null;
  return value;
}

// "16:00" → "4:00 p. m."; cualquier otro texto (ej. "Por confirmar") se devuelve tal cual.
export function formatTime12(time: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return time;
  const hours = Number(match[1]);
  const suffix = hours >= 12 ? "p. m." : "a. m.";
  return `${hours % 12 || 12}:${match[2]} ${suffix}`;
}
