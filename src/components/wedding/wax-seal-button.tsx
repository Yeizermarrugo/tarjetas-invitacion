"use client";

import { motion, type Variants } from "framer-motion";
import { WaxSeal } from "@/components/invite/wax-seal";

const variants: Variants = {
  closed: { opacity: 1, y: 0, scale: 1 },
  opening: { opacity: [1, 1, 1, 0], y: [0, 3, -5, 18], scale: [1, 0.94, 1.02, 0.86], transition: { duration: 0.58, times: [0, 0.24, 0.54, 1], ease: "easeOut" } },
  opened: { opacity: 0, scale: 0.86, y: 18 },
};

export function WaxSealButton({ partner1, partner2, state, onOpen }: { partner1: string; partner2: string; state: "closed" | "opening" | "opened"; onOpen: () => void }) {
  return (
    <motion.button type="button" onClick={onOpen} disabled={state !== "closed"} aria-label="Abrir la invitación" className="wax-seal-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#806640]" variants={variants} animate={state} whileHover={state === "closed" ? { scale: 1.035 } : undefined} whileTap={state === "closed" ? { scale: 0.94 } : undefined}>
      <WaxSeal partner1={partner1} partner2={partner2} className="h-full w-full" />
    </motion.button>
  );
}
