type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export function BotanicalDecor({ position = "top-left", className = "" }: { position?: Position; className?: string }) {
  const transform = {
    "top-left": "",
    "top-right": "scale(-1 1)",
    "bottom-left": "scale(1 -1)",
    "bottom-right": "scale(-1 -1)",
  }[position];

  return (
    <svg aria-hidden viewBox="0 0 180 150" className={className} style={{ transform }} fill="none">
      <path d="M8 142C38 103 62 71 130 18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M39 106C18 98 15 78 18 67c18 3 29 18 21 39ZM65 78C47 65 50 46 58 36c16 9 21 26 7 42ZM94 50C83 33 91 18 102 11c13 13 12 29-8 39ZM45 101c17 2 29-9 33-22-17-3-31 6-33 22ZM72 72c18 1 28-12 31-25-18-1-29 10-31 25ZM105 42c16 1 25-10 28-22-16-2-27 8-28 22Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1" />
      <circle cx="125" cy="22" r="3" fill="currentColor" fillOpacity=".35" />
      <circle cx="137" cy="13" r="2" fill="currentColor" fillOpacity=".3" />
    </svg>
  );
}
