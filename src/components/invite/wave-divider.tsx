const PATHS = [
  "M0,80 C240,140 360,20 600,60 C840,100 960,20 1200,50 C1320,65 1380,90 1440,80 L1440,160 L0,160 Z",
  "M0,110 C260,60 420,150 660,100 C880,55 1040,130 1260,95 C1340,82 1400,95 1440,105 L1440,160 L0,160 Z",
  "M0,130 C300,90 500,160 760,120 C980,88 1140,150 1440,120 L1440,160 L0,160 Z",
];

export function WaveDivider({
  colors,
  className = "",
  flip = false,
}: {
  colors: string[];
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={`absolute inset-x-0 h-28 w-full sm:h-36 ${flip ? "top-0 rotate-180" : "bottom-0"} ${className}`}
    >
      {colors.map((color, i) => (
        <path key={i} d={PATHS[i % PATHS.length]} fill={color} opacity={i === colors.length - 1 ? 1 : 0.5} />
      ))}
    </svg>
  );
}
