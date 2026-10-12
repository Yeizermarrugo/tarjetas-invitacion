"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LeafCorner } from "./leaf-corner";

type Track = { url: string; title: string };

function PlayGlyph({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 5v14l12-7Z" />
    </svg>
  );
}

function SkipGlyph({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      style={{ transform: direction === "prev" ? "scaleX(-1)" : undefined }}
    >
      <path d="M6 5h2v14H6V5Zm3 7 9 7V5l-9 7Z" />
    </svg>
  );
}

function ShuffleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h4l10 12h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 6h4v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18h4l3.5-4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 18h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RepeatGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h13a3 3 0 0 1 3 3v2" strokeLinecap="round" />
      <path d="M9 4 4 7l5 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 17H7a3 3 0 0 1-3-3v-2" strokeLinecap="round" />
      <path d="M15 20l5-3-5-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayerPill({
  isPlaying,
  canSkip,
  shuffle,
  repeat,
  onToggle,
  onPrev,
  onNext,
  onShuffle,
  onRepeat,
}: {
  isPlaying: boolean;
  canSkip: boolean;
  shuffle: boolean;
  repeat: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
}) {
  return (
    <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-4 rounded-full bg-pearl/95 px-5 py-3 shadow-md backdrop-blur">
      <button
        type="button"
        onClick={onShuffle}
        className={`transition-colors ${shuffle ? "text-gold-deep" : "text-wood/50 hover:text-wood"}`}
        aria-label="Aleatorio"
        aria-pressed={shuffle}
      >
        <ShuffleGlyph />
      </button>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canSkip}
        className="text-wood transition-transform hover:scale-110 disabled:opacity-30"
        aria-label="Canción anterior"
      >
        <SkipGlyph direction="prev" />
      </button>
      <button
        type="button"
        onClick={onToggle}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-deep text-pearl transition-transform hover:scale-105 active:scale-95"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        <PlayGlyph playing={isPlaying} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canSkip}
        className="text-wood transition-transform hover:scale-110 disabled:opacity-30"
        aria-label="Siguiente canción"
      >
        <SkipGlyph direction="next" />
      </button>
      <button
        type="button"
        onClick={onRepeat}
        className={`transition-colors ${repeat ? "text-gold-deep" : "text-wood/50 hover:text-wood"}`}
        aria-label="Repetir"
        aria-pressed={repeat}
      >
        <RepeatGlyph />
      </button>
    </div>
  );
}

function useMusicPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(true);

  const current = tracks[index];

  useEffect(() => {
    function startFromInvitation() {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    }
    function pauseForYouTube() {
      audioRef.current?.pause();
    }
    window.addEventListener("wedding:open", startFromInvitation);
    window.addEventListener("wedding:youtube-play", pauseForYouTube);
    return () => {
      window.removeEventListener("wedding:open", startFromInvitation);
      window.removeEventListener("wedding:youtube-play", pauseForYouTube);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }

  function go(delta: 1 | -1) {
    if (tracks.length < 2) return;
    if (shuffle) {
      let next = index;
      while (next === index) next = Math.floor(Math.random() * tracks.length);
      setIndex(next);
      return;
    }
    setIndex((i) => (i + delta + tracks.length) % tracks.length);
  }

  return {
    audioRef,
    current,
    isPlaying,
    shuffle,
    repeat,
    toggle,
    go,
    setShuffle,
    setRepeat,
    setIsPlaying,
  };
}

export function MusicPlayer({
  tracks,
  variant = "section",
}: {
  tracks: Track[];
  variant?: "hero" | "section";
}) {
  const { audioRef, current, isPlaying, shuffle, repeat, toggle, go, setShuffle, setRepeat, setIsPlaying } =
    useMusicPlayer(tracks);

  const audioEl = current && (
    <audio
      key={current.url}
      ref={audioRef}
      src={current.url}
      preload="none"
      loop={repeat}
      onEnded={() => !repeat && go(1)}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );

  const pill = tracks.length > 0 && (
    <PlayerPill
      isPlaying={isPlaying}
      canSkip={tracks.length > 1}
      shuffle={shuffle}
      repeat={repeat}
      onToggle={toggle}
      onPrev={() => go(-1)}
      onNext={() => go(1)}
      onShuffle={() => setShuffle((s) => !s)}
      onRepeat={() => setRepeat((r) => !r)}
    />
  );

  if (variant === "hero") {
    return (
      <section className="relative w-full overflow-hidden pt-24 sm:pt-28">
        <Image src="/images/botanical/garland-top.webp" alt="" width={2172} height={724} priority className="pointer-events-none absolute inset-x-0 top-0 z-10 h-auto w-full select-none" />
        <div className="relative z-20 mx-auto mb-4 flex h-16 w-72 items-center justify-center text-center">
          {tracks.length === 0 ? (
            <div aria-label="Música pendiente de configurar" className="flex items-center gap-3 text-gold-deep opacity-65">
              <span className="h-px w-16 bg-gold/50" /><span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50">♪</span><span className="h-px w-16 bg-gold/50" />
            </div>
          ) : pill}
        </div>
        <div className="relative h-[58svh] min-h-[420px] w-full overflow-hidden sm:h-[680px]">
          <Image src="/images/hero-couple-2026.jpg" alt="Fotografía de la pareja" fill priority unoptimized sizes="(max-width: 720px) 100vw, 720px" className="scale-[1.15] object-cover object-[50%_0%] sm:scale-[1.25]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-pearl via-pearl/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pearl via-pearl/35 to-transparent" />
        </div>
        {audioEl}
      </section>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center">
        <h2 className="font-display text-3xl text-wood">La música de nuestra boda</h2>
        <div className="mt-8 flex h-24 items-center justify-center rounded-lg border border-dashed border-gold/40 bg-card/40 text-sm text-muted-foreground">
          Playlist pendiente de agregar
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="font-display text-3xl text-wood">La música de nuestra boda</h2>
      <p className="mt-2 text-sm text-muted-foreground">Toca play para escuchar nuestra canción.</p>

      <div className="relative mx-auto mt-8 max-w-sm">
        <LeafCorner position="top-left" size="lg" className="absolute -left-6 -top-8 z-10" />
        <LeafCorner position="top-right" size="lg" className="absolute -right-6 -top-8 z-10" />

        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
          <Image src="/images/hero-couple-2026.jpg" alt="" fill unoptimized className="scale-[1.65] object-cover object-[52%_42%] sm:scale-[1.4]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40" />
          {pill}
          <p className="absolute bottom-5 left-0 right-0 px-6 font-display text-xl italic text-pearl [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
            {current.title}
          </p>
        </div>
      </div>

      {audioEl}
    </div>
  );
}
