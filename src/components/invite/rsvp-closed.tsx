import { CalendarX, Heart } from "lucide-react";
import { Floral, type FloralVariant } from "./florals";

export function RsvpClosed({
  partner1,
  partner2,
  floral,
}: {
  partner1: string;
  partner2: string;
  floral: FloralVariant;
}) {
  return (
    <main className="editorial-sheet flex min-h-svh items-center justify-center px-6 py-16">
      <section className="w-full max-w-md text-center font-display [font-variant-numeric:lining-nums]">
        <Floral variant={floral} side="left" className="-left-3 bottom-0 w-[46%] max-w-[300px]" />

        <div className="relative z-10">
          <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-beige text-wood">
            <CalendarX className="h-11 w-11" strokeWidth={1.2} aria-hidden />
          </span>
          <h1 className="mt-6 font-display text-4xl text-wood">Invitación cerrada</h1>
          <p className="mx-auto mt-3 max-w-xs text-base leading-snug text-wood/90">
            Ha pasado la fecha límite para confirmar la asistencia.
          </p>

          <div className="my-7 h-px bg-gold/30" />

          <p className="mx-auto max-w-xs text-base leading-snug text-wood/90">
            Lamentamos no poder mantener tu(s) cupo(s), ya que han sido asignados a otras personas de nuestra lista de
            invitados.
          </p>
          <p className="mx-auto mt-4 max-w-xs text-base leading-snug text-wood/90">
            Agradecemos tu comprensión y te deseamos lo mejor siempre.
          </p>

          <div className="mx-auto mt-8 flex max-w-[10rem] items-center gap-3 text-gold-deep">
            <span className="h-px flex-1 bg-gold/50" />
            <Heart className="h-3.5 w-3.5 fill-current" aria-hidden />
            <span className="h-px flex-1 bg-gold/50" />
          </div>
          <p className="mt-5 font-script text-5xl text-wood">
            {partner1} y {partner2}
          </p>
        </div>
      </section>
    </main>
  );
}
