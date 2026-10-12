"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type InvitationState = "closed" | "opening" | "opened";

// Segundo del video en que el sobre ya está abierto; después el clip vuelve a cerrarse.
const OPEN_AT_SECONDS = 4.9;

export function SealIntro({ children }: { partner1: string; partner2: string; children: React.ReactNode }) {
  const [state, setState] = useState<InvitationState>("closed");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
  }, []);

  async function open() {
    if (state !== "closed") return;
    window.dispatchEvent(new Event("wedding:open"));
    if (reduceMotion) {
      setState("opened");
      return;
    }

    setState("opening");
    const video = videoRef.current;
    if (!video) {
      setState("opened");
      return;
    }

    video.currentTime = 0;
    try {
      await video.play();
      fallbackTimer.current = setTimeout(() => setState("opened"), (OPEN_AT_SECONDS + 1) * 1000);
    } catch {
      setState("opened");
    }
  }

  function finishOpening() {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    setState("opened");
  }

  return (
    <div className="invitation-experience" data-invitation-state={state}>
      <div aria-hidden={state !== "opened"} className={state === "opened" ? "relative" : "pointer-events-none fixed inset-0 overflow-hidden opacity-0"}>
        {children}
      </div>

      <AnimatePresence>
        {state !== "opened" && (
          <motion.section
            key="cinematic-envelope"
            aria-label="Sobre de invitación de boda"
            className={`cinematic-intro ${state === "opening" ? "pointer-events-none" : ""}`}
            initial={false}
            exit={{ opacity: 0, scale: 1.025, filter: "blur(5px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden className="cinematic-ambient" />
            <div className="cinematic-frame">
              <video
                ref={videoRef}
                className="cinematic-video"
                poster="/images/invitation-poster.jpg"
                muted
                playsInline
                preload="auto"
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime >= OPEN_AT_SECONDS) finishOpening();
                }}
                onEnded={finishOpening}
                onError={finishOpening}
                aria-hidden
              >
                <source src="/video/invitation-opening.mp4" type="video/mp4" />
              </video>

              <motion.button
                type="button"
                onClick={open}
                aria-label="Abrir la invitación"
                className="cinematic-seal-hitbox focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-white"
                animate={state === "closed" ? { scale: [1, 1.045, 1] } : { opacity: 0 }}
                transition={state === "closed" ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }}
              />
            </div>

            <motion.p className="cinematic-hint" animate={{ opacity: state === "closed" ? [0.55, 1, 0.55] : 0 }} transition={{ duration: 2.4, repeat: Infinity }}>
              Toca el sello para abrir
            </motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
