"use client";

import { useEffect, useRef, useState } from "react";

type YouTubePlayerInstance = {
  playVideoAt: (index: number) => void;
  loadVideoById: (videoId: string) => void;
  getPlaylistIndex: () => number;
  destroy: () => void;
};

type YouTubePlayerEvent = { target: YouTubePlayerInstance; data: number };

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          events: {
            onReady: (event: YouTubePlayerEvent) => void;
            onStateChange: (event: YouTubePlayerEvent) => void;
            onError?: (event: YouTubePlayerEvent) => void;
          };
        },
      ) => YouTubePlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export type YouTubeTrack = {
  youtubeId: string;
  title: string;
  artist: string;
  duration: string;
};

function PlayIcon({ active }: { active: boolean }) {
  return active ? (
    <span className="flex items-end gap-0.5" aria-hidden>
      <span className="h-3 w-0.5 animate-pulse bg-current" />
      <span className="h-4 w-0.5 animate-pulse bg-current [animation-delay:150ms]" />
      <span className="h-2 w-0.5 animate-pulse bg-current [animation-delay:300ms]" />
    </span>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}

export function YouTubePlaylist({ tracks, playlistId }: { tracks: YouTubeTrack[]; playlistId?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const playerReadyRef = useRef(false);
  const activeIndexRef = useRef(0);
  const current = tracks[activeIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let cancelled = false;

    function connectPlayer() {
      if (cancelled || !window.YT?.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player("wedding-youtube-player", {
        events: {
          onReady: () => {
            playerReadyRef.current = true;
          },
          // Video que YouTube no deja reproducir embebido (error 101/150): salta a la siguiente.
          onError: (event) => {
            if (playlistId) return;
            const next = (activeIndexRef.current + 1) % tracks.length;
            setActiveIndex(next);
            event.target.loadVideoById(tracks[next].youtubeId);
          },
          onStateChange: (event) => {
            // Sin playlistId cada canción se carga por su youtubeId; al terminar (0) pasa a la siguiente.
            if (event.data === 0 && !playlistId) {
              const next = (activeIndexRef.current + 1) % tracks.length;
              setActiveIndex(next);
              event.target.loadVideoById(tracks[next].youtubeId);
              return;
            }
            if (event.data !== 1) return;
            window.dispatchEvent(new Event("wedding:youtube-play"));
            if (!playlistId) return;
            const index = event.target.getPlaylistIndex();
            if (index >= 0 && index < tracks.length) setActiveIndex(index);
          },
        },
      });
    }

    if (window.YT?.Player) {
      connectPlayer();
    } else {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        connectPlayer();
      };
      if (!document.getElementById("youtube-iframe-api")) {
        const script = document.createElement("script");
        script.id = "youtube-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      playerReadyRef.current = false;
      playerRef.current = null;
    };
  }, [tracks, playlistId]);

  if (!current) return null;

  function selectTrack(index: number) {
    window.dispatchEvent(new Event("wedding:youtube-play"));
    setActiveIndex(index);
    if (playerReadyRef.current && playerRef.current) {
      if (playlistId) playerRef.current.playVideoAt(index);
      else playerRef.current.loadVideoById(tracks[index].youtubeId);
    } else {
      setFallbackIndex(index);
      setAutoplay(true);
    }
  }

  const playerUrl = playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}&index=${fallbackIndex}&controls=1&playsinline=1&rel=0&enablejsapi=1${autoplay ? "&autoplay=1" : ""}`
    : `https://www.youtube.com/embed/${tracks[fallbackIndex].youtubeId}?controls=1&playsinline=1&rel=0&enablejsapi=1${autoplay ? "&autoplay=1" : ""}`;

  return (
    <section aria-labelledby="wedding-playlist-title" className="text-center">
      <p className="text-[9px] uppercase tracking-[.24em] text-gold-deep">Nuestra selección</p>
      <h2 id="wedding-playlist-title" className="mt-2 font-script text-5xl text-wood">
        La música de nuestra boda
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
        Algunas de las canciones que harán parte de nuestro día.
      </p>

      <div className="mx-auto mt-8 w-[200px] overflow-hidden rounded-2xl border border-gold/35 bg-wood shadow-[0_16px_40px_rgba(90,62,43,.16)]">
        <iframe
          id="wedding-youtube-player"
          width="200"
          height="200"
          src={playerUrl}
          title={`${current.title} — ${current.artist}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="block h-[200px] w-[200px]"
        />
      </div>

      <div className="mt-5">
        <p className="font-display text-xl text-wood">{current.title}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-muted-foreground">{current.artist}</p>
      </div>

      <ol className="mx-auto mt-7 max-h-[300px] overflow-y-auto overscroll-contain rounded-2xl border border-gold/25 bg-card/65 text-left shadow-sm [scrollbar-color:var(--gold)_transparent] [scrollbar-width:thin]">
        {tracks.map((track, index) => {
          const active = index === activeIndex;
          return (
            <li key={track.youtubeId} className="border-b border-gold/15 last:border-b-0">
              <button
                type="button"
                onClick={() => selectTrack(index)}
                aria-label={`Reproducir ${track.title} de ${track.artist}`}
                aria-current={active ? "true" : undefined}
                className={`grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 py-3.5 transition-colors ${
                  active ? "bg-beige/70 text-gold-deep" : "text-wood hover:bg-beige/35"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? "bg-gold-deep text-pearl" : "border border-gold/35 text-gold-deep"}`}>
                  <PlayIcon active={active} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base">{track.title}</span>
                  <span className="mt-0.5 block truncate text-[10px] uppercase tracking-[.12em] text-muted-foreground">{track.artist}</span>
                </span>
                <span className="text-[10px] tabular-nums text-muted-foreground">{track.duration}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 text-[9px] uppercase tracking-[.14em] text-muted-foreground">
        Reproducción proporcionada por YouTube
      </p>
    </section>
  );
}
