"use client";

import { submitRsvpAction } from "@/app/actions/rsvp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";

const initialState = { error: "", success: false };

export function PetalBurst() {
  const particles = Array.from({ length: 14 }, (_, i) => {
    const variation = ((i * 37) % 11) / 11;
    const angle = (Math.PI * 2 * i) / 14 + variation * 0.4;
    const distance = 50 + ((i * 43) % 50);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 20;
    const size = 7 + ((i * 19) % 8);
    return { x, y, size, delay: (i * 47) % 120 };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="burst-particle"
          style={{
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}ms`,
            ["--burst-translate" as string]: `translate(${p.x}px, ${p.y}px)`,
          }}
        />
      ))}
    </div>
  );
}

export function RsvpForm({
  slug,
  seats,
  onConfirmed,
}: {
  slug: string;
  seats: number;
  onConfirmed: () => void;
}) {
  const [state, formAction, pending] = useActionState(submitRsvpAction, initialState);
  const [decision, setDecision] = useState<"confirmed" | "declined" | null>(null);

  // Un "no asiste" redirige server-side a su página dedicada; solo la confirmación vuelve acá con success.
  useEffect(() => {
    if (state.success) onConfirmed();
  }, [state.success, onConfirmed]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="decision" value={decision ?? ""} />

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setDecision("confirmed")}
          className={`rounded-md border px-4 py-3 text-sm font-medium transition-all duration-150 active:scale-95 ${decision === "confirmed"
            ? "border-gold bg-gold text-ink"
            : "border-border bg-card hover:border-gold hover:-translate-y-0.5"
            }`}
        >
          Sí, asistiré
        </button>
        <button
          type="button"
          onClick={() => setDecision("declined")}
          className={`rounded-md border px-4 py-3 text-sm font-medium transition-all duration-150 active:scale-95 ${decision === "declined"
            ? "border-wood bg-wood text-pearl"
            : "border-border bg-card hover:border-wood hover:-translate-y-0.5"
            }`}
        >
          No podré asistir
        </button>
      </div>

      {decision === "confirmed" && seats === 2 && (
        <div>
          <Label htmlFor="attendees" className="text-sm text-wood">
            ¿Cuántos asistirán? (máx. {seats})
          </Label>
          <select
            id="attendees"
            name="attendees"
            defaultValue="2"
            className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
          >
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
          </select>
        </div>
      )}
      {decision === "confirmed" && seats === 1 && <input type="hidden" name="attendees" value="1" />}

      {decision && (
        <div>
          <Label htmlFor="note" className="text-sm text-wood">
            Nota (alergias, restricciones, mensaje) — opcional
          </Label>
          <Textarea id="note" name="note" className="mt-1" rows={3} />
        </div>
      )}

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button
        type="submit"
        disabled={!decision || pending}
        className="w-full bg-gold-deep text-pearl transition-transform duration-150 hover:bg-wood active:scale-[0.98]"
      >
        {pending ? "Enviando..." : "Confirmar respuesta"}
      </Button>
    </form>
  );
}
