"use client";

import { useActionState, useState } from "react";
import { createInvitationAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TransportFields } from "./transport-fields";
import { whatsappShareUrl } from "@/lib/invite-message";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialState: {
  error: string;
  slug?: string;
  guest?: { guestName1: string; guestName2: string | null; seats: number };
} = { error: "" };

export function CreateInvitationDialog() {
  const [open, setOpen] = useState(false);
  const [seats, setSeats] = useState<1 | 2>(1);
  const [state, formAction, pending] = useActionState(createInvitationAction, initialState);

  const link = state.slug ? `/i/${state.slug}` : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSeats(1);
      }}
    >
      <DialogTrigger
        render={<Button className="bg-gold-deep text-pearl hover:bg-wood" />}
      >
        Crear invitación
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-wood">
            Nueva invitación
          </DialogTitle>
        </DialogHeader>

        {link ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Invitación creada. Comparte este enlace:
            </p>
            <div className="flex items-center gap-2">
              <Input readOnly value={link} className="text-sm" />
              <Button
                type="button"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(window.location.origin + link)}
              >
                Copiar
              </Button>
            </div>
            {state.guest && (
              <Button
                type="button"
                className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
                onClick={() =>
                  window.open(whatsappShareUrl(state.guest!, window.location.origin + link), "_blank", "noopener,noreferrer")
                }
              >
                Enviar por WhatsApp
              </Button>
            )}
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                setOpen(false);
                window.location.reload();
              }}
            >
              Listo
            </Button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="seats">Cupos</Label>
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
              <Label htmlFor="guestName1">
                {seats === 2 ? "Nombre invitado 1" : "Nombre invitado"}
              </Label>
              <Input id="guestName1" name="guestName1" required className="mt-1" />
            </div>

            {seats === 2 && (
              <div>
                <Label htmlFor="guestName2">Nombre invitado 2 (opcional)</Label>
                <Input id="guestName2" name="guestName2" className="mt-1" />
              </div>
            )}

            <TransportFields idPrefix="create" />

            <div>
              <Label htmlFor="message">Mensaje personalizado (opcional)</Label>
              <Textarea id="message" name="message" rows={2} className="mt-1" />
            </div>

            {state.error && <p className="text-sm text-destructive">{state.error}</p>}

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-gold-deep text-pearl hover:bg-wood"
            >
              {pending ? "Creando..." : "Generar invitación"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
