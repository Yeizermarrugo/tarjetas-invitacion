import Image from "next/image";
import { Mail } from "lucide-react";
import { BotanicalCorner } from "./botanical-frame";
import { CopyGiftKey } from "./copy-nequi-button";

type Gift = {
  method: string;
  key: string;
  holder: string;
  qrImage: string;
  note: string;
  envelopeRain: string;
  digitalNote: string;
};

export function GiftSection({ gift }: { gift: Gift }) {
  return (
    <div className="relative mx-auto max-w-sm px-2 text-center">
      <BotanicalCorner className="-left-14 -top-14" />
      <BotanicalCorner side="right" className="-right-14 -top-14" />

      <p className="text-[9px] uppercase tracking-[.28em] text-gold-deep">Detalles de regalo</p>
      <h2 className="mt-2 font-script text-5xl text-wood">El mejor regalo</h2>
      <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">{gift.note}</p>

      <div className="relative z-10 mx-auto mt-7 rounded-xl border border-gold/35 bg-pearl/85 px-5 py-5">
        <Mail className="mx-auto h-7 w-7 text-wood" strokeWidth={1.3} aria-hidden />
        <p className="mt-2 font-display text-xl italic text-wood">Lluvia de sobres</p>
        <p className="mt-2 text-sm leading-relaxed text-wood/90">{gift.envelopeRain}</p>
      </div>

      <div className="relative z-10 mx-auto mt-7 flex max-w-[16rem] items-center gap-3">
        <span className="h-px flex-1 bg-gold/50" />
        <span className="font-display text-sm italic text-gold-deep">o</span>
        <span className="h-px flex-1 bg-gold/50" />
      </div>
      <p className="relative z-10 mx-auto mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">{gift.digitalNote}</p>

      <div className="relative z-10 mx-auto mt-5 w-full max-w-[310px] overflow-hidden border border-gold/20 bg-white p-2 shadow-[0_18px_45px_-28px_rgba(70,48,25,.45)]">
        <Image src={gift.qrImage} alt={`Código QR para aportar mediante ${gift.method}`} width={1124} height={1250} sizes="310px" className="h-auto w-full" />
      </div>

      <div className="relative z-10 mt-5">
        <p className="font-display text-lg font-medium text-wood">{gift.holder}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-muted-foreground">Llave {gift.method}</p>
        <p className="mt-2 font-display text-2xl tracking-[.08em] text-gold-deep">{gift.key}</p>
        <CopyGiftKey giftKey={gift.key} />
      </div>
    </div>
  );
}
