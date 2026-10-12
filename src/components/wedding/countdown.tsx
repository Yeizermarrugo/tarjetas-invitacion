"use client";

import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const zero: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function calculate(date: string): TimeLeft {
  const distance = Math.max(0, new Date(`${date}T00:00:00`).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export function Countdown({ date }: { date: string }) {
  const [left, setLeft] = useState<TimeLeft>(zero);
  useEffect(() => {
    const update = () => setLeft(calculate(date));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [date]);

  return (
    <section aria-label="Cuenta regresiva para la boda" className="text-center">
      <p className="text-[10px] uppercase tracking-[.35em] text-gold-deep">Falta muy poco</p>
      <h2 className="mt-3 font-display text-4xl text-wood">Contando los días</h2>
      <div className="mx-auto mt-8 grid max-w-md grid-cols-4 divide-x divide-gold/30">
        {(Object.entries(left) as [keyof TimeLeft, number][]).map(([label, value]) => (
          <div key={label} className="px-2">
            <strong className="block font-display text-3xl font-normal text-wood sm:text-4xl">{String(value).padStart(2, "0")}</strong>
            <span className="mt-1 block text-[9px] uppercase tracking-[.18em] text-muted-foreground">{{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
