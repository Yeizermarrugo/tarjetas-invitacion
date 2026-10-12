"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { invitations } from "@/db/schema";
import { isRsvpClosed } from "@/lib/rsvp-deadline";

export async function submitRsvpAction(
  _prevState: { error: string; success: boolean } | undefined,
  formData: FormData
) {
  const slug = String(formData.get("slug") ?? "");
  const decision = String(formData.get("decision") ?? "");
  const attendees = Number(formData.get("attendees") ?? 0);
  const note = String(formData.get("note") ?? "").trim();

  if (!slug || (decision !== "confirmed" && decision !== "declined")) {
    return { error: "Solicitud inválida.", success: false };
  }

  if (isRsvpClosed()) {
    return { error: "El plazo para confirmar ya terminó.", success: false };
  }

  const db = getDb();
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.slug, slug),
  });

  if (!invitation) {
    return { error: "Invitación no encontrada.", success: false };
  }

  const finalAttendees =
    decision === "confirmed"
      ? Math.min(Math.max(attendees, 1), invitation.seats)
      : 0;

  await db
    .update(invitations)
    .set({
      rsvpStatus: decision,
      rsvpAttendees: finalAttendees,
      rsvpNote: note || null,
      rsvpRespondedAt: new Date(),
    })
    .where(eq(invitations.slug, slug));

  revalidatePath(`/i/${slug}`);
  revalidatePath("/admin");

  if (decision === "declined") {
    redirect(`/i/${slug}`);
  }

  return { error: "", success: true };
}
