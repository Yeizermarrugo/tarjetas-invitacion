import { formatTime12 } from "@/lib/rsvp-deadline";
import { Bus, Church, CircleCheck, Clock, Gift, Heart, MapPin, Shirt } from "lucide-react";
import type { ReactNode } from "react";
import { Floral } from "./florals";

type Event = {
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
};

export type Transport = "own" | "van";

function ToastGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 7h6l-1 8a2.5 2.5 0 0 1-4 0Z" transform="rotate(-14 12 12)" />
      <path d="M17 7h6l-1 8a2.5 2.5 0 0 1-4 0Z" transform="rotate(14 20 12)" />
      <path d="M12.4 17.2 11 26m-2.5 0h5M19.6 17.2 21 26m-2.5 0h5" />
      <path d="M16 2.5v2M13 3.5l1 1.4M19 3.5l-1 1.4" />
    </svg>
  );
}

function TimeItem({ icon, label, time }: { icon: ReactNode; label: string; time: string }) {
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <span className="text-wood">{icon}</span>
      <span className="mt-2 whitespace-pre-line text-xs uppercase leading-tight tracking-[.14em] text-wood">{label}</span>
      <strong className="mt-1 font-display text-2xl font-normal text-wood">{formatTime12(time)}</strong>
    </div>
  );
}

function VanDetails({
  meetingPoint,
  departureTime,
  returnTime,
}: {
  meetingPoint: string;
  departureTime: string;
  returnTime: string;
}) {
  return (
    <div className="relative mt-10 rounded-xl bg-beige/85 px-4 pb-4 pt-7 text-left">
      <span className="absolute -top-5 left-1/2 flex h-10 w-14 -translate-x-1/2 items-center justify-center rounded-t-full bg-beige/85 text-wood">
        <Bus className="h-6 w-6" strokeWidth={1.6} aria-hidden />
      </span>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-gold/50" />
        <p className="text-sm uppercase tracking-[.16em] text-wood">Transporte asignado</p>
        <span className="h-px flex-1 bg-gold/50" />
      </div>

      <dl className="mt-4 space-y-3">
        <div className="flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden />
          <div className="flex-1">
            <dt className="text-xs uppercase tracking-[.12em] text-wood">Punto de encuentro:</dt>
            <dd className="mt-1 border-t border-wood/40 pt-1 text-center font-display text-sm italic text-wood">{meetingPoint}</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden />
          <div className="flex-1">
            <dt className="text-xs uppercase tracking-[.12em] text-wood">Hora de salida:</dt>
            <dd className="mt-1 border-t border-wood/40 pt-1 text-center font-display text-sm italic text-wood">{formatTime12(departureTime)}</dd>
          </div>
        </div>
      </dl>

      <p className="mt-4 rounded-md bg-beige py-1.5 text-center font-display text-base font-semibold uppercase tracking-[.12em] text-wood">
        Extrema puntualidad
      </p>
      <p className="mt-2 px-1 text-center text-sm leading-snug text-wood/90">
        La van saldrá a la hora indicada y no podrá esperar después de este horario. Agradecemos estar en el punto de
        encuentro con anticipación.
      </p>

      <div className="mt-3 flex items-center gap-3 rounded-lg bg-pearl/70 px-3 py-2">
        <Bus className="h-6 w-6 shrink-0 text-wood" strokeWidth={1.6} aria-hidden />
        <p className="text-center font-display text-sm italic leading-snug text-wood">
          Al culminar el evento, la van saldrá nuevamente de la finca hacia la ciudad, alrededor de las {formatTime12(returnTime)}
        </p>
      </div>
    </div>
  );
}

const actionClass =
  "flex min-h-14 items-center justify-center gap-3 rounded-lg border border-gold/40 bg-pearl/85 px-3 py-2 text-center text-xs uppercase leading-tight tracking-[.12em] text-wood transition-colors hover:border-gold-deep hover:bg-white/60";

export function DateVenueCard({
  date,
  arrivalTime,
  ceremony,
  transport,
  van,
  guestNames,
}: {
  guestNames: string;
  date: string;
  arrivalTime: string;
  ceremony: Event;
  transport: Transport;
  van: { meetingPoint: string; departureTime: string; returnTime: string };
}) {
  const d = new Date(`${date}T00:00:00`);
  const weekday = new Intl.DateTimeFormat("es", { weekday: "long" }).format(d);
  const month = new Intl.DateTimeFormat("es", { month: "long" }).format(d);
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  const isVan = transport === "van";

  return (
    <div className="relative left-1/2 w-screen max-w-[720px] -translate-x-1/2 overflow-hidden px-6 pb-4 pt-2 text-center font-display [font-variant-numeric:lining-nums]">
      {isVan ? (
        <>
          <Floral variant="pampa" side="left" className="-left-3 top-[26%] w-[40%] max-w-[270px]" />
          <Floral variant="pampa" side="right" className="-right-3 top-[26%] w-[40%] max-w-[270px]" />
        </>
      ) : (
        <>
          <Floral variant="rosas" side="left" className="-left-4 bottom-[12%] w-[62%] max-w-[420px]" />
          <Floral variant="rosas" side="right" className="-right-4 bottom-[12%] w-[62%] max-w-[420px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-md">
        <div className="mx-auto max-w-xs rounded-lg bg-beige px-4 py-3 text-wood">
          <p className="text-xs uppercase tracking-[.2em]">Invitación especial para</p>
          <p className="mt-1 text-balance font-display text-2xl italic leading-tight">{guestNames}</p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex flex-1 flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-[0.2em] text-wood">{weekday}</span>
            <span className="h-px w-full bg-wood/40" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base tracking-[.1em] text-wood">{year}</span>
            <span className="font-display text-5xl font-semibold leading-none text-wood">{day}</span>
            <span className="mt-1 text-sm uppercase tracking-[0.2em] text-wood">{month}</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-[0.2em] text-wood">A las</span>
            <span className="h-px w-full bg-wood/40" />
          </div>
        </div>

        <h3 className="mt-6 font-script text-[2.6rem] leading-tight text-wood">Ceremonia y Recepción</h3>
        <p className="mt-2 text-base uppercase tracking-[.18em] text-wood">{ceremony.venue}</p>
        <p className="text-base tracking-[.06em] text-wood">{ceremony.address}</p>

        <div className="mx-auto mt-8 grid max-w-[16rem] grid-cols-2 divide-x divide-wood/30">
          <TimeItem icon={<Church className="h-9 w-9" strokeWidth={1.3} aria-hidden />} label={"Llegada de\ninvitados"} time={arrivalTime} />
          <TimeItem icon={<ToastGlyph className="h-9 w-9" />} label="Ceremonia" time={ceremony.time} />
        </div>

        {isVan ? (
          <VanDetails {...van} />
        ) : (
          <>
            <div className="mx-auto mt-8 flex max-w-[12rem] items-center gap-3 text-gold-deep">
              <span className="h-px flex-1 bg-gold/50" />
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden />
              <span className="h-px flex-1 bg-gold/50" />
            </div>
            <p className="mx-auto mt-6 max-w-[15rem] font-display text-lg italic leading-snug text-wood">
              Agradecemos tu puntualidad para dar inicio a nuestra celebración en el horario previsto.
            </p>
            <div className="h-28" aria-hidden />
          </>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <a href={ceremony.mapsUrl} target="_blank" rel="noreferrer" className={actionClass}>
            <MapPin className="h-6 w-6 shrink-0 text-wood" strokeWidth={1.4} aria-hidden />
            Cómo llegar
          </a>
          <a href="#vestimenta" className={actionClass}>
            <Shirt className="h-6 w-6 shrink-0 text-wood" strokeWidth={1.4} aria-hidden />
            Vestimenta
          </a>
          <a href="#rsvp" className={actionClass}>
            <CircleCheck className="h-6 w-6 shrink-0 text-wood" strokeWidth={1.4} aria-hidden />
            <span>Confirmar<br />asistencia</span>
          </a>
          <a href="#regalo" className={actionClass}>
            <Gift className="h-6 w-6 shrink-0 text-wood" strokeWidth={1.4} aria-hidden />
            Regalo
          </a>
        </div>

        <p className="mt-8 text-base uppercase tracking-[.22em] text-gold-deep">¡Nos vemos pronto!</p>
      </div>
    </div>
  );
}
