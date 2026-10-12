"use client";

import { useTransition } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteInvitationAction } from "@/app/admin/actions";
import { EditInvitationDialog } from "./edit-invitation-dialog";
import { initialsOf, colorFor } from "@/lib/avatar-color";
import type { Invitation } from "@/db/schema";
import { whatsappShareUrl } from "@/lib/invite-message";

const statusLabel: Record<Invitation["rsvpStatus"], string> = {
  pending: "Pendiente",
  confirmed: "Aceptada",
  declined: "Rechazada",
};

const statusClass: Record<Invitation["rsvpStatus"], string> = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-gold/25 text-wood",
  declined: "bg-destructive/10 text-destructive",
};

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }).format(
    new Date(date)
  );
}

export function InvitationRow({ invitation }: { invitation: Invitation }) {
  const [isPending, startTransition] = useTransition();
  const guestLabel = invitation.guestName2
    ? `${invitation.guestName1} y ${invitation.guestName2}`
    : invitation.guestName1;

  function copyLink() {
    const url = `${window.location.origin}/i/${invitation.slug}`;
    navigator.clipboard.writeText(url);
  }

  function shareWhatsapp() {
    const url = `${window.location.origin}/i/${invitation.slug}`;
    window.open(whatsappShareUrl(invitation, url), "_blank", "noopener,noreferrer");
  }

  function handleDelete() {
    if (!confirm(`¿Eliminar invitación de ${guestLabel}?`)) return;
    startTransition(() => deleteInvitationAction(invitation.id));
  }

  return (
    <TableRow style={{ opacity: isPending ? 0.4 : 1 }}>
      <TableCell>
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-pearl"
            style={{ backgroundColor: colorFor(guestLabel) }}
          >
            {initialsOf(invitation.guestName1)}
          </span>
          <div className="flex flex-col">
            <span className="font-medium text-wood">{guestLabel}</span>
            <span className="text-xs text-muted-foreground">
              {invitation.transport === "van" ? "Vans" : "Vehículo propio"}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>{invitation.seats}</TableCell>
      <TableCell>
        <Badge className={statusClass[invitation.rsvpStatus]}>
          {statusLabel[invitation.rsvpStatus]}
        </Badge>
      </TableCell>
      <TableCell>
        {invitation.rsvpStatus === "confirmed" ? `${invitation.rsvpAttendees ?? 0}` : "—"}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDate(invitation.rsvpRespondedAt)}
      </TableCell>
      <TableCell className="max-w-[16rem] truncate text-sm text-muted-foreground" title={invitation.rsvpNote ?? undefined}>
        {invitation.rsvpNote || "—"}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="sm" onClick={shareWhatsapp} className="bg-[#25D366] text-white hover:bg-[#1ebe5b]">
            WhatsApp
          </Button>
          <Button variant="outline" size="sm" onClick={copyLink}>
            Copiar
          </Button>
          <a
            href={`/i/${invitation.slug}`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Ver
          </a>
          <EditInvitationDialog invitation={invitation} />
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive">
            Eliminar
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
