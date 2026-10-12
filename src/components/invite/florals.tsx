import Image from "next/image";

export type FloralVariant = "rosas" | "pampa";

const FLORALS = {
  rosas: {
    left: { src: "/images/florals/rosas-izq.webp", width: 983, height: 1529 },
    right: { src: "/images/florals/rosas-der.webp", width: 975, height: 1530 },
  },
  pampa: {
    left: { src: "/images/florals/pampa-izq.webp", width: 588, height: 1649 },
    right: { src: "/images/florals/pampa-der.webp", width: 558, height: 1647 },
  },
} as const;

export function Floral({
  variant,
  side,
  className = "",
}: {
  variant: FloralVariant;
  side: "left" | "right";
  className?: string;
}) {
  const img = FLORALS[variant][side];
  return (
    <Image
      src={img.src}
      alt=""
      width={img.width}
      height={img.height}
      sizes="(min-width: 720px) 420px, 62vw"
      className={`pointer-events-none absolute h-auto select-none ${className}`}
    />
  );
}
