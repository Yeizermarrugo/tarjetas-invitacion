import { weddingConfig } from "./wedding-config";
import { formatDeadline } from "./rsvp-deadline";

type Guest = { guestName1: string; guestName2: string | null; seats: number };

export function guestNames({ guestName1, guestName2, seats }: Guest) {
  if (guestName2) return `${guestName1} y ${guestName2}`;
  if (seats === 2) return `${guestName1} y acompañante`;
  return guestName1;
}

// Mensaje que acompaña el enlace al enviarlo por WhatsApp. La vista previa (foto del sobre)
// la arma WhatsApp solo con las etiquetas Open Graph de /i/[slug].
export function inviteMessage(guest: Guest, url: string) {
  const { partner1, partner2 } = weddingConfig.couple;
  const plural = Boolean(guest.guestName2) || guest.seats > 1;

  return [
    `Querido/a ${guestNames(guest)} 🤍`,
    "",
    `Con mucha alegría queremos contar${plural ? "les" : "te"} que ¡nos casamos! Y no imaginamos ese día sin ${plural ? "ustedes" : "ti"}.`,
    "",
    `Preparamos esta invitación con mucho cariño. Ábrela para ver todos los detalles y, por favor, confírmanos tu asistencia antes del ${formatDeadline()}.`,
    "",
    `💌 ${url}`,
    "",
    "Con amor,",
    `${partner1} & ${partner2}`,
  ].join("\n");
}

export function whatsappShareUrl(guest: Guest, url: string) {
  return `https://wa.me/?text=${encodeURIComponent(inviteMessage(guest, url))}`;
}
