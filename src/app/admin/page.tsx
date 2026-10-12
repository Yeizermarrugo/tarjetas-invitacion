import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { invitations } from "@/db/schema";
import { logoutAction } from "./actions";
import { CreateInvitationDialog } from "@/components/admin/create-invitation-dialog";
import { InvitationsDashboard } from "@/components/admin/invitations-dashboard";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const db = getDb();
  const all = await db.query.invitations.findMany({
    orderBy: desc(invitations.createdAt),
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-deep">
            Panel
          </p>
          <h1 className="mt-2 font-display text-3xl text-wood">Lista de invitados</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Resumen de las respuestas recibidas a tu invitación.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CreateInvitationDialog />
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              Salir
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <InvitationsDashboard invitations={all} />
      </div>
    </main>
  );
}
