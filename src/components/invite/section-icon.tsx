type IconName = "rings" | "video" | "music" | "gift" | "hanger";

function IconGlyph({ name }: { name: IconName }) {
  switch (name) {
    case "rings":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="9" cy="14" r="5" />
          <circle cx="15" cy="14" r="5" />
          <path d="M12 4 L10.5 7 L13.5 7 Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="3" y="7" width="12" height="10" rx="1.5" />
          <path d="M15 10.5 L21 7.5 V16.5 L15 13.5 Z" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M9 18V5.5L20 4v12.5" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="17.5" cy="16.5" r="2.5" />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="4" y="9" width="16" height="11" rx="1" />
          <path d="M4 12.5h16M12 9v11" />
          <path d="M12 9c-2-4-7-3-6 0 1 2 4 1.5 6 0 2 1.5 5 2 6 0 1-3-4-4-6 0Z" />
        </svg>
      );
    case "hanger":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 6.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2V10" />
          <path d="M12 10 3.5 16.2c-.8.6-.4 1.8.6 1.8h15.8c1 0 1.4-1.2.6-1.8Z" />
        </svg>
      );
  }
}

export function SectionIcon({ icon }: { icon: IconName }) {
  return (
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold text-wood">
      <IconGlyph name={icon} />
    </div>
  );
}
