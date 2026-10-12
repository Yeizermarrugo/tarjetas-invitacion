import { buildGoogleCalendarUrl } from "@/lib/calendar-link";

export function AddToCalendarButton({
  title,
  date,
  startTime,
  endTime,
  location,
}: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}) {
  const url = buildGoogleCalendarUrl({ title, date, startTime, endTime, location });

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-gold-deep px-5 py-2 text-sm font-medium text-gold-deep transition-colors hover:bg-gold-deep hover:text-pearl"
    >
      <span aria-hidden>📅</span> Añadir al calendario
    </a>
  );
}
