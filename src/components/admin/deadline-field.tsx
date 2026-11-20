import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDeadline, todayInBogota } from "@/lib/rsvp-deadline";
import { weddingConfig } from "@/lib/wedding-config";

// Fecha límite de confirmación por invitación. Al crear es obligatoria y no admite fechas pasadas;
// al editar se permite una pasada (para cerrar a mano). Las invitaciones antiguas sin fecha propia
// siguen usando la global mientras el campo se deje vacío.
export function DeadlineField({
  idPrefix,
  defaultValue = "",
  required,
  allowPast = false,
}: {
  idPrefix: string;
  defaultValue?: string;
  required: boolean;
  allowPast?: boolean;
}) {
  const id = `${idPrefix}-rsvpDeadline`;
  return (
    <div>
      <Label htmlFor={id}>Fecha límite para confirmar{required ? "" : " (opcional)"}</Label>
      <Input
        id={id}
        name="rsvpDeadline"
        type="date"
        defaultValue={defaultValue}
        required={required}
        min={allowPast ? undefined : todayInBogota()}
        max={weddingConfig.date}
        className="mt-1"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {required
          ? "Se puede confirmar hasta las 11:59 p. m. (hora Colombia) de ese día."
          : `Vacío = fecha general (${formatDeadline()}).`}
      </p>
    </div>
  );
}
