"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Transport = "own" | "van";

export function TransportFields({
  idPrefix,
  defaultTransport = "own",
  defaultMeetingPoint = "",
  defaultDepartureTime = "",
}: {
  idPrefix: string;
  defaultTransport?: Transport;
  defaultMeetingPoint?: string;
  defaultDepartureTime?: string;
}) {
  const [transport, setTransport] = useState<Transport>(defaultTransport);

  return (
    <div className="space-y-3">
      <div>
        <Label>Transporte</Label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {(
            [
              ["own", "Vehículo propio"],
              ["van", "Vans de la boda"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTransport(value)}
              className={`rounded-md border px-3 py-2 text-sm ${
                transport === value ? "border-gold bg-gold/20 text-wood" : "border-border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input type="hidden" name="transport" value={transport} />
      </div>

      {transport === "van" && (
        <div className="grid grid-cols-[1fr_8rem] gap-2">
          <div>
            <Label htmlFor={`${idPrefix}-vanMeetingPoint`}>Punto de encuentro</Label>
            <Input
              id={`${idPrefix}-vanMeetingPoint`}
              name="vanMeetingPoint"
              defaultValue={defaultMeetingPoint}
              placeholder="Por confirmar"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`${idPrefix}-vanDepartureTime`}>Hora de salida</Label>
            <Input
              id={`${idPrefix}-vanDepartureTime`}
              name="vanDepartureTime"
              type="time"
              defaultValue={defaultDepartureTime}
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
