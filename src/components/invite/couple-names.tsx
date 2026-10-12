export function CoupleNames({
  partner1,
  partner2,
  displayDate,
}: {
  partner1: string;
  partner2: string;
  displayDate: string;
}) {
  return (
    <div className="text-center">
      <p className="font-script text-[3.4rem] leading-none text-wood sm:text-7xl">
        {partner1} <span className="px-1 text-3xl text-gold-deep">&amp;</span> {partner2}
      </p>
      <p className="mx-auto mt-5 max-w-sm text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
        Te invitan a celebrar su matrimonio<br />el día {displayDate}
      </p>
    </div>
  );
}
