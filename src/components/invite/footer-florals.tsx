const LEAVES = [
  { d: 10, side: 1 as const },
  { d: 10, side: -1 as const },
  { d: 20, side: 1 as const },
  { d: 20, side: -1 as const },
  { d: 30, side: 1 as const },
  { d: 30, side: -1 as const },
  { d: 40, side: 1 as const },
];

function Sprig({ x, flip = false, scale = 1 }: { x: number; flip?: boolean; scale?: number }) {
  return (
    <g transform={`translate(${x},50) scale(${flip ? -scale : scale},${scale})`}>
      <g className="vine-sway" style={{ transformOrigin: "0px 0px" }}>
        <path
          d="M0,0 L0,-46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.7"
        />
        {LEAVES.map((l, i) => (
          <ellipse
            key={i}
            cx={l.side * 9}
            cy={-l.d}
            rx="8"
            ry="3.2"
            fill="currentColor"
            opacity={0.9 - i * 0.05}
            transform={`rotate(${l.side * -32} ${l.side * 9} ${-l.d})`}
          />
        ))}
      </g>
    </g>
  );
}

export function FooterFlorals() {
  return (
    <svg aria-hidden viewBox="0 0 320 56" className="mx-auto h-14 w-72 text-gold sm:w-80">
      <Sprig x={70} />
      <Sprig x={160} flip />
      <Sprig x={250} scale={0.85} />

      <style>{`
        .vine-sway { animation: vine-sway 5.5s ease-in-out infinite alternate; }
        g:nth-of-type(2) .vine-sway { animation-duration: 6.5s; animation-delay: -1s; }
        g:nth-of-type(3) .vine-sway { animation-duration: 4.8s; animation-delay: -2.5s; }
        @keyframes vine-sway {
          from { transform: rotate(-3deg); }
          to { transform: rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vine-sway { animation: none; }
        }
      `}</style>
    </svg>
  );
}
