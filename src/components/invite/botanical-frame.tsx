import Image from "next/image";

export function BotanicalDivider({ className = "" }: { className?: string }) {
  return <Image src="/images/botanical/divider.webp" alt="" width={2164} height={727} className={`mx-auto h-auto w-56 select-none object-contain ${className}`} />;
}

export function BotanicalFooter() {
  // Guirnalda superior volteada en vertical: mismas rosas que el encabezado, en las esquinas de abajo.
  return <Image src="/images/botanical/garland-top.webp" alt="" width={2172} height={724} className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full -scale-y-100 select-none" />;
}
