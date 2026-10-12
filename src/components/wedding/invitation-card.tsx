"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { PaperTexture } from "./paper-texture";

const variants: Variants = {
  closed: { y: "0%", scale: 1, rotate: 0 },
  opening: {
    y: ["0%", "0%", "-10%", "-7%"], scale: [1, 1, 1.015, 1], rotate: [0, 0, 0.45, 0],
    transition: { delay: 0.92, duration: 1.38, times: [0, 0.08, 0.83, 1], ease: [0.2, 0.78, 0.24, 1] },
  },
  opened: { y: "-7%", scale: 1, rotate: 0 },
};

export function InvitationCard({ state }: { state: "closed" | "opening" | "opened" }) {
  return (
    <motion.div className="envelope-card" variants={variants} initial={false} animate={state}>
      <PaperTexture />
      <div className="relative h-full w-full overflow-hidden">
        <Image src="/images/hero-couple-2026.jpg" alt="Fotografía principal de la boda" fill priority unoptimized sizes="(max-width: 640px) 100vw, 470px" className="scale-[1.65] object-cover object-[52%_42%] brightness-[1.08] saturate-[.82] sm:scale-[1.4]" />
        <div className="absolute inset-x-0 top-0 h-[57%] bg-gradient-to-b from-[#f8f4eb] from-0% via-[#f8f4eb] via-72% to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(68,54,38,.07),transparent_20%,transparent_80%,rgba(68,54,38,.07))]" />
      </div>
    </motion.div>
  );
}
