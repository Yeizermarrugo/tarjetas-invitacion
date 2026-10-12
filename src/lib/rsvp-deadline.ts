import { weddingConfig } from "./wedding-config";

// La fecha límite se cuenta completa: se puede confirmar hasta las 23:59 (hora Colombia) de ese día.
const deadlineEnd = new Date(`${weddingConfig.rsvpDeadline}T23:59:59-05:00`);

export function isRsvpClosed(now = new Date()) {
  return now > deadlineEnd;
}

export function formatDeadline() {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(deadlineEnd);
}

// "16:00" → "4:00 p. m."; cualquier otro texto (ej. "Por confirmar") se devuelve tal cual.
export function formatTime12(time: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return time;
  const hours = Number(match[1]);
  const suffix = hours >= 12 ? "p. m." : "a. m.";
  return `${hours % 12 || 12}:${match[2]} ${suffix}`;
}
