import { SectionIcon } from "./section-icon";

const PASTELS = [
  { name: "Rosa", hex: "#f2c9cf" },
  { name: "Lavanda", hex: "#d8cbe8" },
  { name: "Celeste", hex: "#c6dbec" },
  { name: "Menta", hex: "#cbe4d3" },
  { name: "Durazno", hex: "#f5d2b8" },
  { name: "Amarillo", hex: "#f1e3ad" },
];

const RESERVED = [
  { name: "Blanco", hex: "#ffffff" },
  { name: "Marfil", hex: "#fbf8ec" },
  { name: "Crema", hex: "#f3e7c9" },
  { name: "Beige", hex: "#e3d1b4" },
];

function Swatch({ hex, name, crossed }: { hex: string; name: string; crossed?: boolean }) {
  return (
    <li className="flex flex-col items-center gap-1.5">
      <span
        className="relative block h-9 w-9 overflow-hidden rounded-full border border-wood/25 shadow-[inset_0_1px_2px_rgba(0,0,0,.06)]"
        style={{ backgroundColor: hex }}
      >
        {crossed && (
          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-wood/70" />
        )}
      </span>
      <span className="text-[10px] uppercase tracking-[.1em] text-wood/80">{name}</span>
    </li>
  );
}

export function DressCode({
  dressCode,
}: {
  dressCode: { style: string; women: string; men: string; reserved: string };
}) {
  return (
    <section aria-labelledby="dress-code-title" className="text-center font-display">
      <SectionIcon icon="hanger" />
      <p className="mt-6 text-xs uppercase tracking-[.24em] text-gold-deep">Código de vestimenta</p>
      <h2 id="dress-code-title" className="mt-2 font-script text-[2.6rem] leading-tight text-wood">
        {dressCode.style}
      </h2>

      <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
        <div className="rounded-xl border border-gold/35 bg-pearl/80 px-5 py-4">
          <p className="text-sm uppercase tracking-[.18em] text-wood">Mujeres</p>
          <span className="mt-2 block h-px w-10 bg-gold/60" />
          <p className="mt-3 text-base leading-snug text-wood/90">{dressCode.women}</p>
        </div>
        <div className="rounded-xl border border-gold/35 bg-pearl/80 px-5 py-4">
          <p className="text-sm uppercase tracking-[.18em] text-wood">Hombres</p>
          <span className="mt-2 block h-px w-10 bg-gold/60" />
          <p className="mt-3 text-base leading-snug text-wood/90">{dressCode.men}</p>
        </div>
      </div>

      <p className="mt-8 text-xs uppercase tracking-[.2em] text-wood/80">Inspiración en tonos pastel</p>
      <ul className="mt-3 flex flex-wrap justify-center gap-3">
        {PASTELS.map((c) => (
          <Swatch key={c.name} {...c} />
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-dashed border-gold-deep/60 bg-beige/70 px-5 py-5">
        <p className="text-sm font-semibold uppercase tracking-[.16em] text-wood">Colores reservados</p>
        <ul className="mt-4 flex justify-center gap-4">
          {RESERVED.map((c) => (
            <Swatch key={c.name} {...c} crossed />
          ))}
        </ul>
        <p className="mt-4 text-base italic leading-snug text-wood">{dressCode.reserved}</p>
      </div>
    </section>
  );
}
