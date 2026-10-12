"use client";

import { useActionState, useEffect, useState } from "react";
import { editInvitationAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TransportFields } from "./transport-fields";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Invitation } from "@/db/schema";

const initialState: { error: string; success?: boolean } = { error: "" };

export function EditInvitationDialog({ invitation }: { invitation: Invitation }) {
  const [open, setOpen] = useState(false);
  const [seats, setSeats] = useState<1 | 2>(invitation.seats as 1 | 2);
  const [state, formAction, pending] = useActionState(editInvitationAction, initialState);

  useEffect(() => {
    if (state.success) {
      // Closing follows an external server-action result; it intentionally synchronizes the dialog.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      window.location.reload();
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Editar</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-wood">
            Editar invitación
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={invitation.id} />

          <div>
            <Label>Cupos</Label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSeats(1)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  seats === 1 ? "border-gold bg-gold/20 text-wood" : "border-border"
                }`}
              >
                1 persona
              </button>
              <button
                type="button"
                onClick={() => setSeats(2)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  seats === 2 ? "border-gold bg-gold/20 text-wood" : "border-border"
                }`}
              >
                2 personas
              </button>
            </div>
            <input type="hidden" name="seats" value={seats} />
          </div>

          <div>
            <Label htmlFor={`edit-guestName1-${invitation.id}`}>
              {seats === 2 ? "Nombre invitado 1" : "Nombre invitado"}
            </Label>
            <Input
              id={`edit-guestName1-${invitation.id}`}
              name="guestName1"
              defaultValue={invitation.guestName1}
              required
              className="mt-1"
            />
          </div>

          {seats === 2 && (
            <div>
              <Label htmlFor={`edit-guestName2-${invitation.id}`}>
                Nombre invitado 2 (opcional)
              </Label>
              <Input
                id={`edit-guestName2-${invitation.id}`}
                name="guestName2"
                defaultValue={invitation.guestName2 ?? ""}
                className="mt-1"
              />
            </div>
          )}

          <TransportFields
            idPrefix={`edit-${invitation.id}`}
            defaultTransport={invitation.transport}
            defaultMeetingPoint={invitation.vanMeetingPoint ?? ""}
            defaultDepartureTime={invitation.vanDepartureTime ?? ""}
          />

          <div>
            <Label htmlFor={`edit-message-${invitation.id}`}>
              Mensaje personalizado (opcional)
            </Label>
            <Textarea
              id={`edit-message-${invitation.id}`}
              name="message"
              defaultValue={invitation.message ?? ""}
              rows={2}
              className="mt-1"
            />
          </div>

          {state.error && <p className="text-sm text-destructive">{state.error}</p>}

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-gold-deep text-pearl hover:bg-wood"
          >
            {pending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
