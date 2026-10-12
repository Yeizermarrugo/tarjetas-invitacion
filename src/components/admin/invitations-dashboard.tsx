"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { InvitationRow } from "./invitation-row";
import type { Invitation } from "@/db/schema";

type Tab = "todos" | "confirmed" | "declined" | "pending";

const TABS: { key: Tab; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "confirmed", label: "Aceptados" },
  { key: "declined", label: "Rechazados" },
  { key: "pending", label: "Por ver" },
];

function toCsvValue(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function downloadCsv(invitations: Invitation[]) {
  const header = ["Invitado 1", "Invitado 2", "Cupos", "Respuesta", "Asistentes", "Respondido", "Comentario", "Enlace"];
  const rows = invitations.map((i) => [
    i.guestName1,
    i.guestName2 ?? "",
    String(i.seats),
    i.rsvpStatus,
    i.rsvpAttendees != null ? String(i.rsvpAttendees) : "",
    i.rsvpRespondedAt ? new Date(i.rsvpRespondedAt).toISOString() : "",
    i.rsvpNote ?? "",
    `${window.location.origin}/i/${i.slug}`,
  ]);
  const csv = [header, ...rows].map((row) => row.map(toCsvValue).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "invitados.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function InvitationsDashboard({ invitations }: { invitations: Invitation[] }) {
  const [tab, setTab] = useState<Tab>("todos");
  const [search, setSearch] = useState("");

  const counts = useMemo(
    () => ({
      todos: invitations.length,
      confirmed: invitations.filter((i) => i.rsvpStatus === "confirmed").length,
      declined: invitations.filter((i) => i.rsvpStatus === "declined").length,
      pending: invitations.filter((i) => i.rsvpStatus === "pending").length,
    }),
    [invitations]
  );

  const totalSeats = invitations.reduce(
    (sum, i) => sum + (i.rsvpStatus === "declined" ? 0 : i.seats),
    0
  );
  const confirmedSeats = invitations.reduce((sum, i) => sum + (i.rsvpAttendees ?? 0), 0);

  const filtered = useMemo(() => {
    const byTab =
      tab === "todos" ? invitations : invitations.filter((i) => i.rsvpStatus === tab);
    if (!search.trim()) return byTab;
    const q = search.trim().toLowerCase();
    return byTab.filter((i) =>
      `${i.guestName1} ${i.guestName2 ?? ""}`.toLowerCase().includes(q)
    );
  }, [invitations, tab, search]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gold/30 bg-card p-4">
          <p className="text-2xl font-semibold text-wood">{counts.todos}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Invitaciones</p>
        </div>
        <div className="rounded-lg border border-gold/30 bg-gold/10 p-4">
          <p className="text-2xl font-semibold text-wood">{counts.confirmed}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Aceptados · {confirmedSeats}/{totalSeats} cupos
          </p>
        </div>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-2xl font-semibold text-wood">{counts.declined}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">No asistirán</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-2xl font-semibold text-wood">{counts.pending}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Por ver</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-card text-wood shadow-sm"
                  : "text-muted-foreground hover:text-wood"
              }`}
            >
              {t.label}
              <span className="ml-1.5 text-xs text-muted-foreground">
                {counts[t.key === "todos" ? "todos" : t.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Buscar en la lista"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
          />
          <Button variant="outline" onClick={() => downloadCsv(filtered)}>
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gold/30 bg-card">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            {invitations.length === 0
              ? "Aún no hay invitaciones. Crea la primera con el botón de arriba."
              : "Ninguna invitación coincide con el filtro."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invitado(s)</TableHead>
                  <TableHead>Cupos</TableHead>
                  <TableHead>Respuesta</TableHead>
                  <TableHead>Asistentes</TableHead>
                  <TableHead>Respondido</TableHead>
                  <TableHead>Comentario</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((invitation) => (
                  <InvitationRow key={invitation.id} invitation={invitation} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
