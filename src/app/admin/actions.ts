"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { invitations } from "@/db/schema";
import {
  checkPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

function readTransport(formData: FormData) {
  const transport = formData.get("transport") === "van" ? "van" : "own";
  const meetingPoint = String(formData.get("vanMeetingPoint") ?? "").trim();
  const departureTime = String(formData.get("vanDepartureTime") ?? "").trim();
  return {
    transport,
    vanMeetingPoint: transport === "van" && meetingPoint ? meetingPoint : null,
    vanDepartureTime: transport === "van" && departureTime ? departureTime : null,
  } as const;
}

export async function loginAction(_prevState: { error: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    return { error: "Contraseña incorrecta." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}

export async function createInvitationAction(
  _prevState: { error: string } | undefined,
  formData: FormData
) {
  const guestName1 = String(formData.get("guestName1") ?? "").trim();
  const guestName2Raw = String(formData.get("guestName2") ?? "").trim();
  const seats = Number(formData.get("seats") ?? 1);
  const message = String(formData.get("message") ?? "").trim();

  if (!guestName1) {
    return { error: "El nombre del invitado es obligatorio." };
  }
  if (seats !== 1 && seats !== 2) {
    return { error: "Los cupos deben ser 1 o 2." };
  }

  const db = getDb();
  let slug = generateSlug();

  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await db.query.invitations.findFirst({
      where: eq(invitations.slug, slug),
    });
    if (!existing) break;
    slug = generateSlug();
  }

  await db.insert(invitations).values({
    slug,
    guestName1,
    guestName2: seats === 2 && guestName2Raw ? guestName2Raw : null,
    seats,
    message: message || null,
    ...readTransport(formData),
  });

  return { error: "", slug };
}

export async function deleteInvitationAction(id: number) {
  const db = getDb();
  await db.delete(invitations).where(eq(invitations.id, id));
}

export async function editInvitationAction(
  _prevState: { error: string } | undefined,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const guestName1 = String(formData.get("guestName1") ?? "").trim();
  const guestName2Raw = String(formData.get("guestName2") ?? "").trim();
  const seats = Number(formData.get("seats") ?? 1);
  const message = String(formData.get("message") ?? "").trim();

  if (!id) return { error: "Invitación inválida." };
  if (!guestName1) return { error: "El nombre del invitado es obligatorio." };
  if (seats !== 1 && seats !== 2) return { error: "Los cupos deben ser 1 o 2." };

  const db = getDb();
  await db
    .update(invitations)
    .set({
      guestName1,
      guestName2: seats === 2 && guestName2Raw ? guestName2Raw : null,
      seats,
      message: message || null,
      ...readTransport(formData),
    })
    .where(eq(invitations.id, id));

  return { error: "", success: true };
}
