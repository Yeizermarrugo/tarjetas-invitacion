"use client";

import { motion, type Variants } from "framer-motion";
import { BotanicalDecor } from "./botanical-decor";
import { PaperTexture } from "./paper-texture";

const variants: Variants = {
  closed: { rotateX: 0, transition: { duration: 0.1 } },
  opening: {
    rotateX: [0, -8, -168, -176],
    transition: { delay: 0.5, duration: 1.05, times: [0, 0.12, 0.82, 1], ease: [0.45, 0.05, 0.18, 1] },
  },
  opened: { rotateX: -176 },
};

export function EnvelopeFlap({ state, partner1, partner2 }: { state: "closed" | "opening" | "opened"; partner1: string; partner2: string }) {
  return (
    <motion.div className="envelope-flap" variants={variants} initial={false} animate={state}>
      <div className="envelope-flap-face envelope-flap-front">
        <PaperTexture />
        <BotanicalDecor position="top-left" className="absolute left-0 top-0 w-28 text-[#788269] opacity-70" />
        <BotanicalDecor position="top-right" className="absolute right-0 top-0 w-28 text-[#788269] opacity-70" />
        <div className="flap-monogram">
          <p>Nuestra boda</p>
          <strong>{partner1.charAt(0)} <i>&amp;</i> {partner2.charAt(0)}</strong>
        </div>
      </div>
      <div className="envelope-flap-face envelope-flap-back"><PaperTexture /></div>
    </motion.div>
  );
}
