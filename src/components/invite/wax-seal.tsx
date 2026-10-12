function SprigLeaf({ y, side, length }: { y: number; side: 1 | -1; length: number }) {
  const width = length * 0.32;
  const tipX = side * length;
  return (
    <path
      d={`M 0 ${y}
          Q ${side * length * 0.4} ${y - width} ${tipX} ${y - length * 0.3}
          Q ${side * length * 0.4} ${y + width * 0.4} 0 ${y} Z`}
    />
  );
}

function Sprig() {
  return (
    <>
      <path d="M-1.6,0 L1.6,0 L1.6,-71 Q1.6,-74 0,-74 Q-1.6,-74 -1.6,-71 Z" />
      <SprigLeaf y={-10} side={1} length={22} />
      <SprigLeaf y={-10} side={-1} length={22} />
      <SprigLeaf y={-30} side={1} length={26} />
      <SprigLeaf y={-30} side={-1} length={26} />
      <SprigLeaf y={-50} side={1} length={22} />
      <SprigLeaf y={-50} side={-1} length={22} />
      <SprigLeaf y={-68} side={1} length={14} />
      <SprigLeaf y={-68} side={-1} length={14} />
    </>
  );
}

export function WaxSeal({
  partner1,
  partner2,
  className,
  style,
}: {
  partner1: string;
  partner2: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      role="img"
      aria-label={`Sello de ${partner1} y ${partner2}`}
    >
      <defs>
        {/* warm antique-gold wax with directional light and imperfect material */}
        <radialGradient id="sealBody" cx="32%" cy="26%" r="85%">
          <stop offset="0%" stopColor="#f2d49a" />
          <stop offset="38%" stopColor="#c8934d" />
          <stop offset="76%" stopColor="#9a622b" />
          <stop offset="100%" stopColor="#68401f" />
        </radialGradient>
        <radialGradient id="sealSheen" cx="28%" cy="18%" r="42%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sealRim" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stopColor="#000" stopOpacity="0" />
          <stop offset="93%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#4a3c22" stopOpacity="0.4" />
        </radialGradient>
        <filter id="sealBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* base disc + drop shadow ring for depth */}
      <path d="M100 9C120 8 131 14 146 20c17 7 31 18 39 35 8 16 8 31 7 48-1 19-5 35-19 49-13 14-29 25-47 31-18 6-36 8-54 2-18-5-35-14-46-29-12-15-18-32-18-51 0-18 5-36 17-50 12-15 26-29 44-36 10-4 20-9 31-10Z" fill="#35200f" opacity=".38" transform="translate(0 4)" />
      <path d="M100 9C120 8 131 14 146 20c17 7 31 18 39 35 8 16 8 31 7 48-1 19-5 35-19 49-13 14-29 25-47 31-18 6-36 8-54 2-18-5-35-14-46-29-12-15-18-32-18-51 0-18 5-36 17-50 12-15 26-29 44-36 10-4 20-9 31-10Z" fill="url(#sealBody)" />
      <circle cx="100" cy="100" r="92" fill="url(#sealRim)" />
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#4a3c22"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="100" r="76" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="100" cy="100" r="92" fill="url(#sealSheen)" />

      {/* embossed sprig: blurred dark/light offset copies read as pressed relief */}
      <g transform="translate(100,138)">
        <g transform="translate(1.4,1.6)" fill="#4a3c22" opacity="0.55" filter="url(#sealBlur)">
          <Sprig />
        </g>
        <g transform="translate(-1,-1.1)" fill="#fffaf0" opacity="0.8" filter="url(#sealBlur)">
          <Sprig />
        </g>
        <g fill="#d9a45d" opacity="0.96">
          <Sprig />
        </g>
      </g>
    </svg>
  );
}
