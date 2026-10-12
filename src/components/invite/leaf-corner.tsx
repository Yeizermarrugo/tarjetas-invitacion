import Image from "next/image";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Size = "sm" | "md" | "lg";

const SIZE_PX: Record<Size, number> = { sm: 90, md: 140, lg: 200 };

export function LeafCorner({
  position = "top-left",
  size = "md",
  className = "",
}: {
  position?: Position;
  size?: Size;
  className?: string;
}) {
  const scaleX = position.includes("right") ? -1 : 1;
  const scaleY = position.includes("bottom") ? -1 : 1;
  const px = SIZE_PX[size];

  return (
    <Image
      src="/images/leaf-corner.png"
      alt=""
      width={600}
      height={400}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: px, height: "auto", transform: `scale(${scaleX},${scaleY})` }}
    />
  );
}
