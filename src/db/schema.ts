import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const rsvpStatusEnum = pgEnum("rsvp_status", ["pending", "confirmed", "declined"]);
export const transportEnum = pgEnum("transport", ["own", "van"]);

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  guestName1: text("guest_name_1").notNull(),
  guestName2: text("guest_name_2"),
  seats: integer("seats").notNull().default(1),
  message: text("message"),
  transport: transportEnum("transport").notNull().default("own"),
  vanMeetingPoint: text("van_meeting_point"),
  vanDepartureTime: text("van_departure_time"),
  rsvpStatus: rsvpStatusEnum("rsvp_status").notNull().default("pending"),
  rsvpAttendees: integer("rsvp_attendees"),
  rsvpNote: text("rsvp_note"),
  rsvpRespondedAt: timestamp("rsvp_responded_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
