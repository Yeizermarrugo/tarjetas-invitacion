export function QuoteBlock({ quote }: { quote?: string }) {
  if (!quote) return null;

  return (
    <div className="mx-auto max-w-md text-center">
      <p className="font-display text-xl italic leading-relaxed text-gold-deep sm:text-2xl">
        {quote}
      </p>
    </div>
  );
}
