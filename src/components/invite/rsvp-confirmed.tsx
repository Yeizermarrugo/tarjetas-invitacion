import type { ReactNode } from "react";
import { Camera, CircleCheck, Gift, Heart, Shirt, Trophy } from "lucide-react";
import { weddingConfig } from "@/lib/wedding-config";
import { Button } from "@/components/ui/button";
import { Floral, type FloralVariant } from "./florals";

function Feature({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-wood [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      <div className="text-sm leading-snug text-wood">{children}</div>
    </li>
  );
}

export function RsvpConfirmed({
  slug,
  floral,
  burst,
}: {
  slug: string;
  floral: FloralVariant;
  burst?: ReactNode;
}) {
  const momentosUrl = process.env.NEXT_PUBLIC_MOMENTOS_URL;

  return (
    <div
      className="relative left-1/2 w-screen max-w-[720px] -translate-x-1/2 overflow-hidden px-6 pb-6 text-center font-display [font-variant-numeric:lining-nums]"
      style={{ animation: "card-in 500ms cubic-bezier(0.22,1,0.36,1) both" }}
    >
      {burst}
      <Floral variant={floral} side="right" className="-right-3 bottom-0 w-[46%] max-w-[300px]" />

      <div className="relative z-10 mx-auto max-w-md">
        <CircleCheck className="mx-auto h-14 w-14 text-wood" strokeWidth={1.1} aria-hidden />
        <h2 className="mt-4 font-display text-[2rem] italic leading-tight text-wood">¡Gracias por confirmar!</h2>
        <p className="mt-3 text-base leading-snug text-wood/90">
          Hemos registrado tu respuesta.
          <br />
          ¡Nos vemos pronto!
        </p>

        <a
          href="#vestimenta"
          className="mt-6 flex items-start gap-3 rounded-lg border border-gold/40 bg-pearl/85 px-4 py-3 text-left transition-colors hover:border-gold-deep"
        >
          <Shirt className="mt-0.5 h-5 w-5 shrink-0 text-wood" strokeWidth={1.4} aria-hidden />
          <span className="text-sm leading-snug text-wood">
            <strong className="block text-xs font-normal uppercase tracking-[.16em]">
              Recuerda: {weddingConfig.dressCode.style}
            </strong>
            <span className="italic">{weddingConfig.dressCode.reserved}</span>
          </span>
        </a>

        <div className="my-6 h-px bg-gold/30" />

        <div className="flex items-center justify-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-deep text-pearl shadow-sm">
            <Heart className="h-7 w-7" strokeWidth={1.5} aria-hidden />
          </span>
          <div className="text-left">
            <p className="font-script text-4xl leading-none text-wood">Momentos</p>
            <p className="mt-1 text-[9px] uppercase tracking-[.2em] text-wood/80">Nuestra app de la boda</p>
          </div>
        </div>

        <p className="mt-6 text-left text-sm leading-relaxed text-wood">
          Queremos que seas parte de cada instante.
          <br />
          En <span className="font-display italic">Momentos</span> podrás:
        </p>
        <ul className="mt-4 space-y-3 pr-10 text-left">
          <Feature icon={<Camera strokeWidth={1.4} />}>Subir las fotos que tomes durante toda la boda.</Feature>
          <Feature icon={<Heart strokeWidth={1.4} />}>Ver las fotos de todos los invitados.</Feature>
          <Feature icon={<Trophy strokeWidth={1.4} />}>
            Participar en los concursos:
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              <li>La foto más romántica</li>
              <li>La foto más divertida</li>
            </ul>
          </Feature>
          <Feature icon={<Gift strokeWidth={1.4} />}>Los ganadores recibirán un premio especial.</Feature>
        </ul>

        <p className="mt-6 rounded-lg bg-beige/70 px-4 py-3 font-display text-base italic leading-snug text-wood">
          Tu mirada también cuenta.
          <br />
          ¡Ayúdanos a coleccionar momentos de este día tan especial!
        </p>

        {momentosUrl && (
          <Button
            nativeButton={false}
            render={<a href={`${momentosUrl}/login?code=${encodeURIComponent(slug)}`} target="_blank" rel="noopener noreferrer" />}
            className="mt-6 h-auto rounded-lg bg-gold-deep px-8 py-3 text-base text-pearl hover:bg-wood"
          >
            Ir a Momentos
          </Button>
        )}
      </div>
    </div>
  );
}
