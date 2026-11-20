-- Fecha límite de confirmación por invitación. Aditivo y seguro de re-ejecutar.
-- Las invitaciones existentes quedan en NULL y siguen usando weddingConfig.rsvpDeadline (2026-11-07).
-- Ejecutar en Neon ANTES de desplegar el código que lee esta columna.
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS rsvp_deadline date;
