function toGoogleDateTime(date: string, time: string) {
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

export function buildGoogleCalendarUrl({
  title,
  date,
  startTime,
  endTime,
  location,
  details,
  timezone = "America/Bogota",
}: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  details?: string;
  timezone?: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toGoogleDateTime(date, startTime)}/${toGoogleDateTime(date, endTime)}`,
    location,
    details: details ?? "",
    ctz: timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
