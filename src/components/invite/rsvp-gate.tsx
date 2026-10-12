"use client";

import { useCallback, useState } from "react";
import { CalendarDays, CircleCheck, Gift, Heart, MapPin, Users } from "lucide-react";
import { PetalBurst, RsvpForm } from "./rsvp-form";
import { RsvpConfirmed } from "./rsvp-confirmed";
import { Floral, type FloralVariant } from "./florals";

const linkClass =
  "flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gold/40 bg-pearl/80 px-3 py-2 text-sm text-wood transition-colors hover:border-gold-deep hover:bg-white/60";

export function RsvpGate({
  slug,
  seats,
  deadline,
  mapsUrl,
  floral,
  confirmed,
}: {
  confirmed: boolean;
  slug: string;
  seats: number;
  deadline: string;
  mapsUrl: string;
  floral: FloralVariant;
}) {
  const [open, setOpen] = useState(false);
  const [justConfirmed, setJustConfirmed] = useState(false);
  const handleConfirmed = useCallback(() => setJustConfirmed(true), []);

  // Mismo componente antes y después de confirmar: al revalidar la página el estado
  // local sobrevive y la animación de pétalos no se corta.
  if (confirmed || justConfirmed) {
    return <RsvpConfirmed slug={slug} floral={floral} burst={justConfirmed ? <PetalBurst /> : undefined} />;
  }

  return (
    <div className="relative left-1/2 w-screen max-w-[720px] -translate-x-1/2 overflow-hidden px-6 pb-6 text-center font-display [font-variant-numeric:lining-nums]">
      <Floral variant={floral} side="left" className="-left-3 bottom-0 w-[46%] max-w-[300px]" />

      <div className="relative z-10 mx-auto max-w-md">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-beige text-wood">
          <CalendarDays className="h-7 w-7" strokeWidth={1.4} aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-[2rem] leading-tight text-wood">Confirma tu asistencia</h2>
        <p className="mx-auto mt-2 max-w-xs text-base leading-snug text-wood/90">
          Nos encantará compartir este día tan especial contigo.
          {seats === 2 ? " Tu invitación incluye 2 cupos." : " Tu invitación incluye 1 cupo."}
        </p>

        <div className="relative mt-8 rounded-xl bg-beige/60 px-4 pb-5 pt-6">
          <span className="absolute -top-3.5 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gold-deep font-display text-base font-semibold text-pearl" aria-hidden>
            !
          </span>
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-gold-deep/50" />
            <p className="text-sm font-semibold uppercase leading-tight tracking-[.12em] text-wood">
              Confirma antes del
              <br />
              {deadline}
            </p>
            <span className="h-px flex-1 bg-gold-deep/50" />
          </div>
          <p className="mt-3 text-base leading-snug text-wood/90">
            Si no confirmas tu asistencia antes de esta fecha, la invitación se cerrará y tu(s) cupo(s) serán asignados a
            otras personas.
          </p>
          <p className="mt-3 text-base leading-snug text-wood/90">
            Contamos con un número limitado de invitados y queremos que todos puedan vivir esta celebración como la hemos
            planeado.
          </p>
          <p className="mt-3 font-display text-lg italic text-wood">¡Gracias por tu comprensión!</p>
        </div>

        {open ? (
          <div className="mt-6 border-t border-gold/30 pt-6 text-left font-sans">
            <RsvpForm slug={slug} seats={seats} onConfirmed={handleConfirmed} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold-deep px-6 py-3.5 text-base text-pearl shadow-sm transition-transform duration-150 hover:bg-wood active:scale-[0.98]"
          >
            <CircleCheck className="h-5 w-5" strokeWidth={1.6} aria-hidden />
            Confirmar asistencia
          </button>
        )}

        <div className="ml-auto mt-3 grid w-[88%] grid-cols-2 gap-2.5">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className={`${linkClass} col-span-2`}>
            <MapPin className="h-4 w-4" strokeWidth={1.6} aria-hidden />
            Cómo llegar
          </a>
          <a href="#regalo" className={linkClass}>
            <Gift className="h-4 w-4" strokeWidth={1.6} aria-hidden />
            Regalo
          </a>
          <a href="#ceremonia" className={linkClass}>
            <Users className="h-4 w-4" strokeWidth={1.6} aria-hidden />
            Ver detalles
          </a>
        </div>

        <div className="mx-auto mt-6 flex max-w-[10rem] items-center gap-3 text-gold-deep">
          <span className="h-px flex-1 bg-gold/50" />
          <Heart className="h-3.5 w-3.5 fill-current" aria-hidden />
          <span className="h-px flex-1 bg-gold/50" />
        </div>
      </div>
    </div>
  );
}
