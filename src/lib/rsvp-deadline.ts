import { weddingConfig } from "./wedding-config";

// Fecha límite global: la usan las invitaciones creadas antes de que cada una tuviera la suya
// (columna `rsvp_deadline` en NULL). Las nuevas siempre guardan su propia fecha.
type Deadline = string | null | undefined;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// La fecha límite se cuenta completa: se puede confirmar hasta las 23:59 (hora Colombia) de ese día.
function deadlineEnd(deadline: Deadline) {
  return new Date(`${deadline || weddingConfig.rsvpDeadline}T23:59:59-05:00`);
}

export function isRsvpClosed(deadline?: Deadline, now = new Date()) {
  return now > deadlineEnd(deadline);
}

export function formatDeadline(deadline?: Deadline) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(deadlineEnd(deadline));
}

// Hoy en Colombia como "YYYY-MM-DD" (para el `min` del input y la validación al crear).
export function todayInBogota(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(now);
}

// Valida una fecha "YYYY-MM-DD" del formulario admin. Devuelve un mensaje de error o null.
export function validateDeadline(value: string, { allowPast }: { allowPast: boolean }) {
  if (!DATE_RE.test(value) || Number.isNaN(new Date(`${value}T00:00:00-05:00`).getTime())) {
    return "La fecha límite de confirmación es obligatoria.";
  }
  if (value > weddingConfig.date) {
    return "La fecha límite no puede ser posterior a la boda.";
  }
  if (!allowPast && value < todayInBogota()) {
    return "La fecha límite no puede estar en el pasado.";
  }
  return null;
}

// "16:00" → "4:00 p. m."; cualquier otro texto (ej. "Por confirmar") se devuelve tal cual.
export function formatTime12(time: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return time;
  const hours = Number(match[1]);
  const suffix = hours >= 12 ? "p. m." : "a. m.";
  return `${hours % 12 || 12}:${match[2]} ${suffix}`;
}
