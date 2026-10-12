import { BotanicalFooter } from "./botanical-frame";

const LINKS = [
  { href: "#rsvp", label: "Confirmar asistencia" },
  { href: "#ceremonia", label: "Lugar del evento" },
  { href: "#regalo", label: "Regalo" },
];

export function InviteFooter({ partner1, partner2 }: { partner1: string; partner2: string }) {
  return (
    <footer className="relative min-h-80 overflow-hidden px-6 pb-28 pt-16 text-center">
      <BotanicalFooter />
      <p className="relative z-10 mt-4 font-script text-5xl text-wood">
        {partner1} &amp; {partner2}
      </p>
      <p className="relative z-10 mx-auto mt-3 max-w-xs text-[10px] uppercase leading-relaxed tracking-[.2em] text-muted-foreground">Agradecemos inmensamente<br />con mucho cariño</p>
      <nav className="relative z-10 mt-8 flex flex-col items-center gap-3">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm text-muted-foreground transition-colors hover:text-gold-deep"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
