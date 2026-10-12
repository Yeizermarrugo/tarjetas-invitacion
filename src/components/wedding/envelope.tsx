"use client";

import { motion } from "framer-motion";
import { EnvelopeBody } from "./envelope-body";
import { EnvelopeFlap } from "./envelope-flap";
import { InvitationCard } from "./invitation-card";
import { WaxSealButton } from "./wax-seal-button";

type State = "closed" | "opening" | "opened";

export function Envelope({ partner1, partner2, state, onOpen }: { partner1: string; partner2: string; state: State; onOpen: () => void }) {
  return (
    <motion.div className="envelope-stage" animate={state === "opening" ? { y: [0, 4, 0], scale: [1, 0.995, 1] } : {}} transition={{ duration: 1.8 }}>
      <div className="envelope-shell">
        <EnvelopeBody />
        <motion.div
          className="envelope-card-window"
          initial={false}
          animate={{
            clipPath:
              state === "closed"
                ? "inset(0% 0% 0% 0%)"
                : "inset(-105% -8% -40% -8%)",
          }}
          transition={{ delay: state === "opening" ? 0.82 : 0, duration: 0.01 }}
        >
          <InvitationCard state={state} />
        </motion.div>
        <EnvelopeFlap state={state} partner1={partner1} partner2={partner2} />
        <WaxSealButton partner1={partner1} partner2={partner2} state={state} onOpen={onOpen} />
      </div>
    </motion.div>
  );
}
