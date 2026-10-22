import { BotanicalDivider } from "@/components/invite/botanical-frame";
import { CoupleNames } from "@/components/invite/couple-names";
import { DateVenueCard } from "@/components/invite/date-venue-card";
import { DressCode } from "@/components/invite/dress-code";
import { GiftSection } from "@/components/invite/gift-section";
import { InviteFooter } from "@/components/invite/invite-footer";
import { MusicPlayer } from "@/components/invite/music-player";
import { QuoteBlock } from "@/components/invite/quote-block";
import { RsvpClosed } from "@/components/invite/rsvp-closed";
import { RsvpGate } from "@/components/invite/rsvp-gate";
import { ScrollProgress } from "@/components/invite/scroll-progress";
import { ScrollReveal } from "@/components/invite/scroll-reveal";
import { SealIntro } from "@/components/invite/seal-intro";
import { SectionIcon } from "@/components/invite/section-icon";
import { YouTubePlaylist } from "@/components/invite/youtube-playlist";
import { Countdown } from "@/components/wedding/countdown";
import { getDb } from "@/db";
import { invitations } from "@/db/schema";
import { formatDeadline, isRsvpClosed } from "@/lib/rsvp-deadline";
import { guestNames } from "@/lib/invite-message";
import { weddingConfig } from "@/lib/wedding-config";
import { cache } from "react";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const getInvitation = cache(async (slug: string) =>
  getDb().query.invitations.findFirst({ where: eq(invitations.slug, slug) })
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitation(slug);
  if (!invitation) return {};

  const { partner1, partner2 } = weddingConfig.couple;
  const title = `${partner1} & ${partner2} · Invitación para ${guestNames(invitation)}`;
  const description = `${weddingConfig.displayDate} · ${weddingConfig.ceremony.venue}, ${weddingConfig.ceremony.address}. Abre tu invitación y confírmanos tu asistencia.`;

  return {
    title,
    description,
    // openGraph del hijo reemplaza al del layout: se repite la imagen.
    openGraph: {
      title,
      description,
      url: `/i/${slug}`,
      type: "website",
      locale: "es_CO",
      siteName: `${partner1} & ${partner2}`,
      images: [{ url: "/images/og-invitation.jpg", width: 720, height: 1280, alt: "Sobre de invitación de boda" }],
    },
    robots: { index: false, follow: false },
  };
}

function greeting(guestName1: string, guestName2: string | null, seats: number) {
  if (guestName2) return `Querido/a ${guestName1} y ${guestName2}`;
  if (seats === 2) return `Querido/a ${guestName1} y acompañante`;
  return `Querido/a ${guestName1}`;
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = await getInvitation(slug);

  if (!invitation) notFound();
  if (invitation.rsvpStatus === "declined") {
    const respondedAt = invitation.rsvpRespondedAt
      ? new Intl.DateTimeFormat("es-CO", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "America/Bogota",
      }).format(invitation.rsvpRespondedAt)
      : null;

    return (
      <main className="flex min-h-svh items-center justify-center bg-pearl px-6 py-12">
        <section className="paper-grain w-full max-w-md rounded-2xl border border-gold/35 bg-card px-7 py-10 text-center shadow-[0_18px_55px_rgba(90,62,43,.14)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-beige/50 text-2xl text-gold-deep" aria-hidden>
            ✓
          </div>
          <p className="mt-6 text-[9px] uppercase tracking-[.24em] text-gold-deep">Respuesta registrada</p>
          <h1 className="mt-3 font-script text-5xl text-wood">Gracias por avisarnos</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {invitation.guestName1}, nos indicaste que no podrás acompañarnos en nuestra boda.
            Hemos guardado correctamente tu respuesta.
          </p>
          {respondedAt && (
            <p className="mt-6 border-t border-gold/20 pt-5 text-[10px] uppercase tracking-[.12em] text-muted-foreground">
              Respondido el {respondedAt}
            </p>
          )}
        </section>
      </main>
    );
  }

  const { couple, date, displayDate, arrivalTime, ceremony, van, quote, dressCode, gift, tracks, youtubePlaylist, youtubePlaylistId, story } = weddingConfig;
  const floral = invitation.transport === "van" ? "pampa" : "rosas";

  if (invitation.rsvpStatus === "pending" && isRsvpClosed()) {
    return <RsvpClosed partner1={couple.partner1} partner2={couple.partner2} floral={floral} />;
  }

  return (
    <SealIntro partner1={couple.partner1} partner2={couple.partner2}>
      <ScrollProgress />
      <main className="editorial-sheet flex flex-col">
        <MusicPlayer tracks={tracks} variant="hero" />

        {quote && (
          <ScrollReveal className="px-8 pt-3">
            <QuoteBlock quote={quote} />
          </ScrollReveal>
        )}

        <ScrollReveal className={quote ? "px-6 pt-8" : "px-6 pt-4"}>
          {!quote && <p className="mx-auto mb-6 max-w-md text-balance text-center font-display text-xl italic leading-relaxed text-wood/85 sm:text-2xl">“{story}”</p>}
          <BotanicalDivider className="mb-8 w-40 opacity-75" />
          <CoupleNames partner1={couple.partner1} partner2={couple.partner2} displayDate={displayDate} />
        </ScrollReveal>

        <div className="mx-auto flex w-full max-w-xl flex-col gap-16 px-7 pb-6 pt-14">

          <ScrollReveal><Countdown date={date} /></ScrollReveal>
          <ScrollReveal className="text-center">
            <p className="mx-auto max-w-md text-balance text-base text-muted-foreground">
              {/* {greeting(invitation.guestName1, invitation.guestName2, invitation.seats)}, */}
              Nos encantaría celebrar este día junto a ti.
            </p>
            {invitation.message && (
              <p className="mx-auto mt-4 max-w-md text-balance italic text-wood">
                “{invitation.message}”
              </p>
            )}
            <div className="mx-auto mt-8 max-w-sm border-y border-gold/30 py-4">
              <p className="text-[9px] uppercase tracking-[.24em] text-gold-deep">Celebración solo para adultos</p>
              <p className="mt-2 text-balance text-sm leading-relaxed text-wood">
                Con todo cariño, les contamos que <strong className="font-semibold">no se admiten niños</strong>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal id="ceremonia">
            <DateVenueCard
              guestNames={guestNames(invitation)}
              date={date}
              arrivalTime={arrivalTime}
              ceremony={ceremony}
              transport={invitation.transport}
              van={{
                meetingPoint: invitation.vanMeetingPoint || van.meetingPoint,
                departureTime: invitation.vanDepartureTime || van.departureTime,
                returnTime: van.returnTime,
              }}
            />
          </ScrollReveal>

          <ScrollReveal id="rsvp">
            <RsvpGate
              slug={invitation.slug}
              seats={invitation.seats}
              deadline={formatDeadline()}
              mapsUrl={ceremony.mapsUrl}
              floral={floral}
              confirmed={invitation.rsvpStatus === "confirmed"}
            />
          </ScrollReveal>

          <ScrollReveal id="vestimenta">
            <DressCode dressCode={dressCode} />
          </ScrollReveal>

          <ScrollReveal id="regalo" className="text-center">
            <SectionIcon icon="gift" />
            <div className="mt-6">
              <GiftSection gift={gift} />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <YouTubePlaylist tracks={youtubePlaylist} playlistId={youtubePlaylistId} />
          </ScrollReveal>
        </div>

        <InviteFooter partner1={couple.partner1} partner2={couple.partner2} />
      </main>
    </SealIntro>
  );
}
