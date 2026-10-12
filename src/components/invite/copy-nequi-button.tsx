"use client";

import { toast } from "sonner";

export function CopyGiftKey({ giftKey }: { giftKey: string }) {
  function copy() {
    navigator.clipboard
      .writeText(giftKey.replaceAll(" ", ""))
      .then(() => toast.success("Llave Bre-B copiada"))
      .catch(() => toast.error("No se pudo copiar"));
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-4 rounded-full border border-gold/45 px-5 py-2 text-[10px] font-medium uppercase tracking-[.16em] text-gold-deep transition-colors hover:border-gold-deep hover:bg-white/50"
    >
      Copiar llave Bre-B
    </button>
  );
}
